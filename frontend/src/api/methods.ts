import Api from './index'

export default {
    testPosting() {
        const item = { text: 'Success!' }
        return Api().post('/test', item)
    },
    addPosting(text: string) {
        const item = { text: text, time: getCurrentTime() }
        return Api().post('/add', item)
    }
    // 他の処理も追加可能
}

//現在時刻取得（yyyy/mm/dd hh:mm:ss）
function getCurrentTime() {
    const now = new Date();
    const res = "" + now.getFullYear() + "/" + padZero(now.getMonth() + 1) +
        "/" + padZero(now.getDate()) + " " + padZero(now.getHours()) + ":" +
        padZero(now.getMinutes()) + ":" + padZero(now.getSeconds());
    return res;
}

//先頭ゼロ付加
function padZero(num: number) {
    let result;
    if (num < 10) {
        result = "0" + num;
    } else {
        result = "" + num;
    }
    return result;
}