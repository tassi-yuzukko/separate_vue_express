import express from 'express';
import bodyParser from 'body-parser';
// corsポリシーに抵触するため、その対策としてcorsを利用する
import cors from 'cors';

// データベースを使用
import sqlite3 from "sqlite3";

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3333;

app.post('/test', function (req, res) {
    console.log("/test に来た");
    return res.send({
        message: req.body.text
    });
})

app.post('/add', function (req, res) {
    console.log(`/add に来た text:${req.body.text} text:${req.body.time}`);

    const db = new sqlite3.Database("./test.db");
    db.serialize(() => {
        db.run("create table if not exists members(name,time)");
        db.run("insert into members(name,time) values(?,?)", req.body.text, req.body.time);
        db.each("select * from members", (err, row) => {
            console.log(`${row.name} ${row.time}`);
        });
        db.get("select count(*) from members", (err, count) => {
            console.log(count["count(*)"]);
        })
    });
    db.close();

    return res.send({
        message: "OK"
    });
})

app.listen(process.env.PORT || port, () => console.log('Example app listening http://localhost:' + port))