import axios from 'axios'
import { getmd5, allgetmd5 } from './getmd5';
import { message} from 'antd';
import {  browserHistory } from 'react-router';
import $ from 'jquery';
import { Encrypt } from './aes';
import { getipconfig } from '../getipconfig';
import { root } from '../root';
const rootapp = root();
const publicKey = "qwertyuiop[]asdf"
const getip = getipconfig();
const testUrl = getip.serverip;
axios.defaults.withCredentials = true;
let getajax = {
    ajaxFun(type, urlhouzu, cmd, data, callback) {
        let datas = ""
        if (type === "get") {
            axios.get(testUrl + urlhouzu, {
                params: data
            }, {})
                .then(function(response) {
                  
                    callback(response.data)
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else if (type === "post") {
            if (urlhouzu === "admin/login") {
                data.password = getmd5(data.password)
                datas = Encrypt(data, publicKey);
                console.log("登录请求", data)
            } else {
                let userData = sessionStorage.getItem("userData")==null?[]:JSON.parse(sessionStorage.getItem("userData"))
                let timesign = (new Date()).valueOf();
                let sign = allgetmd5(userData.gmid, userData.token, timesign);
                data.gmid = userData.gmid;

                datas = {
                    "gmid": userData.gmid,
                    "v": 1,
                    "token": userData.token,
                    "sign": sign,
                    "timesign": timesign.toString(),
                    "data": data,
                    "cmd": cmd,
                }

            }
            // console.log("这里什么怎么回事？",testUrl + urlhouzu)
            axios.post(testUrl + urlhouzu, datas)
                .then(function(e) {
                    console.log("hutao==========",e.data)
                    if(e.data.status===302){
                          browserHistory.push(rootapp+'login');
                    }else if(e.data.status===9992){
                        message.error("参数错误")
                    }
                     if(e.data.ret===0){//没有成功9222
                        // console.log("e.data.ret===0,e.data.err",e.data.err,e.data.errmsg)
                        if(e.data.err===9222){
                            // console.log("e.data.errmsg====",e.data.err,e.data.errmsg)
                            message.error(e.data.errmsg)
                        }else{
                          browserHistory.push(rootapp+'login');   
                        }
                          
                    }else{
                       
                         callback(e.data)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    ajaxSingFunGet(singurl,data,callback){
        axios.get(singurl, {
            params: data
        }, {})
            .then(function(response) {
              
                callback(response.data)
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    ajaxUpload(type, urlhouzu, cmd, data, formData, callback) {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
                let timesign = (new Date()).valueOf();
                let sign = allgetmd5(userData.gmid, userData.token, timesign);
                data.gmid = userData.gmid;
        let datas = {
            "gmid": userData.gmid,
                    "v": 1,
                    "token": userData.token,
                    "sign": sign,
                    "timesign": timesign.toString(),
                    "data": data,
                    "cmd": cmd,
        }
        formData.append("data", JSON.stringify(datas));
        $.ajax({
            url: testUrl + urlhouzu,
            method: type,
            contentType: false,
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            //  headers: {
            //         Accept: "multipart/form-data; charset=utf-8"
            //     },
            crossDomain: true,
            data: formData,
            success: (e) => {
                let data = JSON.parse(e)
                callback(data)
            }
        })

    },
    timeFunc(value) {
        let time = new Date(parseInt(value,10) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        // let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        let t = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mi) + ':' + add0(s)
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeYearFunc(value) {
        let time = new Date(parseInt(value,10) * 1000);
        let time1 = new Date();

        // function add0(m) {
        //     return m < 10 ? '0' + m : m
        // }
        let y = time.getFullYear();
        let ynow = time1.getFullYear();
        // let m = time.getMonth() + 1;
        // let d = time.getDate();
        // let h = time.getHours();
        // let wek = time.getDay();
        // let mi = time.getMinutes();
        // let s = time.getSeconds();
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
        let time = new Date(parseInt(value,10) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        // let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        // let h = time.getHours();
        // let mi = time.getMinutes();
        // let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = add0(m) + '/' + add0(d)
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    getBeforeDate: function(n) { //几天前
        // var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        console.log(s)
        return s;
    },
    timeDayFunc(value) {
        let time = new Date(parseInt(value,10) * 1000);

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
        let time = new Date(parseInt(value,10) * 1000);

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        // let y = time.getFullYear();
        // let m = time.getMonth() + 1;
        // let d = time.getDate();
        let h = time.getHours();
        let mi = time.getMinutes();
        // let s = time.getSeconds();
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
        // let d = time.getDate();
        // let h = time.getHours();
        // let mi = time.getMinutes();
        // let s = time.getSeconds();
        // let t= y + '-' + add0(m) + '-' + add0(d) +' '+add0(h)+':'+add0(mi)+':'+add0(s)
        let t = y + '年' + add0(m) + "月"
        //console.log("转换成功之后的时间:",t)
        return t;
    }
};
const Ajax = getajax.ajaxFun;

export const getRolelist = (tag, sucRoleList) => {
    let data = {}

    // 请求角色
    Ajax('post', 'front/query', tag, data, sucRoleList)
}
export const getUserList = (data, sucgetUserList, errror) => { //获取全部用户数据


    Ajax('post', 'front/query', 'conf_users', data, (e) => {
        if (e.ret === 1) {
            console.log("userlist:", e.data);

            //console.log("arr",array)
            let arrdata = e.data; //按中文名排序
            //排序展示不要20181015
            // arrdata.sort(function compareFunction(param1, param2) {

            //     return param1.nickname.localeCompare(param2.nickname, 'zh-Hans-CN', {
            //         sensitivity: 'accent'
            //     });
            // }
            // );

            window.sessionStorage.setItem("userList", JSON.stringify(arrdata)) //游戏列表
            sucgetUserList()
        } else {
            errror()
        }

    })
}
export const getDepartmentUserList = (data, departmentUserList) => {


    // 请求角色
    Ajax('post', 'front/query', "usergroup_details", data, departmentUserList)
}
// 请求用户的详情数据
export const getUserDetails = (data, Success) => {


    // 请求角色
    Ajax('post', 'front/query', "user_detail", data, Success)
}

export const ajaxGame = (datas, scussee, error) => {
    Ajax('post', 'front/query', 'user_editgamepermits', datas, (e) => {
        if (e.ret === 1) {
            console.log("游戏绑定成功")

            scussee()
        } else {
            error(e.errmsg)
        // message.error();
        }
    })
}
export const ajaxRole = (datas, scussee, error) => {
    Ajax('post', 'front/query', 'user_setrelateroles', datas, (e) => {
        if (e.ret === 1) {
            console.log("游戏绑定成功")

            scussee()
        } else {
            error(e.errmsg)
        // message.error();
        }
    })
}

export const ajaxGameChannel = (datas, scussee, error) => {
    Ajax('post', 'front/query', 'user_editchannelpermits', datas, (e) => {
        if (e.ret === 1) {
            console.log("游戏绑定成功")

            scussee()
        } else {
            error(e.errmsg)
        // message.error();
        }
    })
}
export { getajax }