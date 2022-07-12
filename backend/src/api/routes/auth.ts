import AuthService from '@/services/authService';
import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', async function (req: Request, res: Response, next: NextFunction) {

        console.log("/login に来た");

        const authService = new AuthService();

        if (await authService.executeAuth(req.body.id, req.body.pass)) {
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
