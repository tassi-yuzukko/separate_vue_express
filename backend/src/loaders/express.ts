import express from 'express';
import cors from 'cors';
//import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '../api/index.js';
import config from '../config/index.js';
export default ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // // Some sauce that always add since 2014
    // // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // // Maybe not needed anymore ?
    // app.use(require('method-override')());

    // Transforms the raw string of req.body into json
    app.use(express.json());
    // Load API routes
    app.use(config.api.prefix, routes());

    // // API Documentation
    // app.use(OpticMiddleware({
    //     enabled: process.env.NODE_ENV !== 'production',
    // }));

    /// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(404);
        res.locals.error = {};
        res.render('error', { message: "404: The page was not found" });
    });

    /// error handlers
    app.use((err: any, req: any, res: any, next: any) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};