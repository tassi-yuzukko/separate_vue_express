import { Router } from 'express';
import login from './routes/login.js';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    login(app);

    return app
}