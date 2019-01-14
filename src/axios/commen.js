import axios from 'axios'
import { getmd5 } from './getmd5';
import { Encrypt } from './aes';
import { getipconfig } from '../getipconfig';
const getip = getipconfig();
const resulturl = getip.clientip;
const testUrl = getip.serverip;
axios.defaults.withCredentials = true;
let getajax = {
    ajaxFun(type, urlhouzu, data, callback) {
        let datas = ""
        let postdata = ""

        //postdata = JSON.stringify(datas)
        if (type == "get") {
            axios.get(resulturl + urlhouzu, {
                params: data
            }, {})
                .then(function(response) {
                    console.log("fanhui:", response.data)
                    callback(response.data)
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else if (type == "post") {
            //alert("王刚刚过过过过逗比")
            // console.log("www:", data)
            let datavale = JSON.parse(sessionStorage.getItem("userInfo"))
            //(sessionStorage.getItem("userInfo"))
            let sign = ""
            let datas = ""

            if (urlhouzu == "loginPost") {
                datas = {
                    "gmid": "",
                    "v": "1",
                    "token": "",
                    "sign": "",
                    "timesign": "",
                }
            } else {

                let timesign = (new Date()).valueOf();
                sign = getmd5(datavale.gmid, datavale.token, timesign);
                data.gmid = datavale.gmid;
                datas = {
                    "gmid": datavale.gmid,
                    "v": "1",
                    "token": datavale.token,
                    "sign": sign,
                    "timesign": timesign.toString(),
                    "data": data.data,
                    "cmd": data.cmd,

                }
            }

            //datas = eval('(' + (JSON.stringify(datas) + JSON.stringify(data)).replace(/}{/, ',') + ')');
            console.log("datas:", datas);
            //console.log("data:",data)
            // console.log(datas);

            axios.post(testUrl + urlhouzu, datas)
                .then(function(response) {
                    //console.log(response.data)
                    // alert(response.data.ret)
                    if (response.data.ret == 0 && response.data.err == 1111) {
                        alert("请重新登录");
                        window.location.href = resulturl
                    } else if (response.data.ret == 0 && response.data.err == 1005) {
                        alert("无权限");
                        window.location.href = resulturl
                    } else if (response.data.ret == 0 && response.data.err == 1003) {
                        alert("请求数据验证失败,请重新登录");
                        window.location.href = resulturl
                    } else {
                        callback(response.data)
                    }


                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    // 可以执行错误回调的ajax请求
    ajaxErrorFun(type, urlhouzu, data, callback, errorfun) {
        let datas = ""
        let postdata = ""
        if (type == "get") {
            axios.get(resulturl + urlhouzu, {
                params: data
            }, {})
                .then(function(response) {
                    console.log("fanhui:", response.data)
                    callback(response.data)
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else if (type == "post") {


            let sign = ""
            let datas = ""
            const publicKey = "0102030405060708"
            if (urlhouzu == "loginPost") {
                data.name = Encrypt(data.name, publicKey);
                data.password = Encrypt(data.password, publicKey);
                console.log("加密的值", data)
                datas = data
            } else {
                let datavale = JSON.parse(window.sessionStorage.getItem("userInfo"))
                console.log("获取到用户信息没有", datavale)
                let timesign = (new Date()).valueOf();
                sign = getmd5(datavale.gmid, datavale.token, timesign);
                data.gmid = datavale.gmid;
                datas = {
                    "gmid": datavale.gmid,
                    "v": "1",
                    "token": datavale.token,
                    "sign": sign,
                    "timesign": timesign.toString(),
                    "data": data.data,
                    "cmd": data.cmd
                }
            }
            // datas = eval('(' + (JSON.stringify(datas) + JSON.stringify(data)).replace(/}{/, ',') + ')');
            // console.log(datas);
            axios.post(testUrl + urlhouzu, datas)
                .then(function(response) {
                    // console.log("请求成功走这里", response.data)
                    if (response.data.ret == 0 && response.data.err == 1111) {
                        alert("请重新登录");
                        window.location.href = resulturl
                    } else if (response.data.ret == 0 && response.data.err == 1005) {
                        alert("无权限");
                        window.location.href = resulturl
                    } else if (response.data.ret == 0 && response.data.err == 1003) {
                        alert("请求数据验证失败,请重新登录");
                        window.location.href = resulturl
                    } else {
                        callback(response.data)
                    }
                // callback(response.data)
                })
                .catch(function(error) {
                    // console.log("请求错误走这里")
                    errorfun(error);
                });
        }
    },
    bgCreatFunc(val) {
        let color = ["#fd9526", "#2a98ff", "#e3ab4e", "#37d451", "#ff9660", "#8a6cf9"];
        // let temp = [color[Math.floor(Math.random() * color.length)]]
        // for (let i = 0; i < val; i++) {
        //     let bol = true;
        //     let numebers = Math.floor(Math.random() * color.length);
        //     if (numebers == temp[temp.length - 1]) {
        //         i--;
        //         bol = false;
        //     }
        //     if (bol) {
        //         temp.push(color[numebers])
        //     }
        // }
        // console.log(temp)
        let temp = []
        for (var i = 0; i < val; i++) {
            temp.push(color[i % color.length])
        }
        return temp;

    },
    timeFunc(value) {
        let time = new Date(parseInt(value) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        let t = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mi) + ':' + add0(s)
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeYearFunc(value) {
        let time = new Date(parseInt(value) * 1000);
        let time1 = new Date();

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let ynow = time1.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        if (y < ynow) {
            return y;
        } else {
            return '';
        }

    },
    timeMonthFunc(value) {
        let time = new Date(parseInt(value) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = add0(m) + '/' + add0(d)
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeDayFunc(value) {
        let time = new Date(parseInt(value) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = add0(y) + '/' + add0(m) + '/' + add0(d)
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeHoursFunc(value) {
        let time = new Date(parseInt(value) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = add0(h) + ':' + add0(mi)
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeFuncMonth() {
        let time = new Date();

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = y + '年' + add0(m) + "月"
        //console.log("转换成功之后的时间:",t)
        return t;
    }
};

export { getajax }