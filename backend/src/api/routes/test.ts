import { Router, Request, Response, NextFunction } from 'express';
import path from 'path'
// データベースを使用
import sqlite3 from "sqlite3";
import testService from '@/services/testService'
import TestService from '@/services/testService';

const route = Router();

export default (app: Router) => {
    app.use('/test', route);

    route.post('/', function (req: Request, res: Response, next: NextFunction) {

        console.log("/test に来た");
        return res.send({
            message: req.body.text
        });

    })

    route.post('/add', async function (req, res) {

        console.log(`/add に来た text:${req.body.text} text:${req.body.time}`);

        const testService = new TestService();
        await testService.service(req.body.text);

        // const currentWorkingDirectory = process.cwd();
        // console.log(`${currentWorkingDirectory}`);
        // const dbPath = path.join(currentWorkingDirectory, 'test.db');
        // console.log(`${dbPath}`);

        // const db = new sqlite3.Database(dbPath);
        // db.serialize(() => {
        //     db.run("create table if not exists members(name,time)");
        //     db.run("insert into members(name,time) values(?,?)", req.body.text, req.body.time);
        //     db.each("select * from members", (err, row) => {
        //         console.log(`${row.name} ${row.time}`);
        //     });
        //     db.get("select count(*) from members", (err, count) => {
        //         console.log(count["count(*)"]);
        //     })
        // });
        // db.close();

        return res.send({
            message: "OK"
        });
    })
}
