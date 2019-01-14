
import $ from 'jquery';
import { getmd5, allgetmd5 } from './getmd5';
import { message } from 'antd';
import { browserHistory } from 'react-router';
import { root } from '../root';
import { Encrypt } from './aes';
import { getipconfig } from '../getipconfig';
const publicKey = "qwertyuiop[]asdf"
const getip = getipconfig();
const resulturl = getip.clientip;
const testUrl = getip.serverip;
const rootapp = root();
export const ajaxcallback = (url, timesign, data, cmd, ajaxsuccess, met) => {

    let userData = JSON.parse(sessionStorage.getItem("userData"))
   // let timesign = (new Date()).valueOf();
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
    //防止游戏气候太快的数据渲染问题
    if (data.frontParameter != undefined) {
        if (data.frontParameter.count >= 2) {
            if (show && show.readystate != 4) {
                show.abort();

            }
        }
    }
    let flag = false;
    let resdata = "";
    let datasJons = JSON.stringify(datas)
    let hide = "";
    if (met == "get") {
        console.log("  ####")
        //get请求
        $.ajax({
            method: 'get',
            url: rootapp + url,
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function() {
                hide = message.loading('数据加载中..', 0);

            },
            success: function(data) {
                setTimeout(hide, 1);
                console.log("本地数据请求回来了没有", data);
                 if(data.status===302){
                          browserHistory.push(rootapp+'login');
                    }
                ajaxsuccess(data.data)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                setTimeout(hide, 2500);
                flag = false;
                resdata = ""


            }
        });

    } else {
        var show = $.ajax({
            method: 'post',
            //method: 'get',
            url: url,
            data: datasJons,

            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function() {

                hide = message.loading('数据加载中..', 0);


            },
            success: function(data) {
                setTimeout(hide, 1);
                // hide
                flag = true;
                resdata = data

                let datas = JSON.parse(data);
                if (datas.ret == 0 && datas.err == "9992") {
                    browserHistory.push({
                        // pathname: rootapp,
                    })
                } else if (datas.status == 302) {
                    // browserHistory.push({
                    //     pathname: datas.location,
                    // })
                    //  location.href = datas.location;
                }
                ajaxsuccess(data)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                setTimeout(hide, 2500);
                flag = false;
                resdata = ""


            }
        });
    }

}