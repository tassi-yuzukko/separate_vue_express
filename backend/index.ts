import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
// corsポリシーに抵触するため、その対策としてcorsを利用する
import cors from 'cors';

//import indexRouter from './routes/index';
//import usersRouter from './routes/users';
import loginRouter from './routes/login.js';

// データベースを使用
import sqlite3 from "sqlite3";

const dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/fnclogin', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

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