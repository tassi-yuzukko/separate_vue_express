import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', function (req: Request, res: Response, next: NextFunction) {

        console.log("/login に来た");

        if (req.body.id == 'test' && req.body.pass == 'test') {
            return res.send({
                message: 'OK'
            })
        } else {
            return res.send({
                message: '認証エラー'
            })
        }

    })
}
