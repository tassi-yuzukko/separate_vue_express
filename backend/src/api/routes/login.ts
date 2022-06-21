import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/', function (req: { body: { id: string; pass: string; }; }, res: { send: (arg0: { message: string; }) => void; }, next: any) {

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
