/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
import { getmd5 } from './getmd5';
import { message } from 'antd';
import { hashHistory } from 'react-router';
export const progresscallBack = (url, timesign, data, cmd, ajaxsuccess) => {

    let datavale = JSON.parse(window.sessionStorage.getItem("data"))
    let sign = getmd5(datavale.gmid, datavale.token, timesign);
    let datas = {
        "gmid": datavale.gmid,
        "timesign": timesign.toString(),
        "token": datavale.token,
        "cmd": cmd,
        "sign": sign,
        "v": 1,
        "data": data
    }
    // returnVaule=(data)=>{

    // }
    let flag = false;
    let resdata = "";
    let datasJons = JSON.stringify(datas)
    let hide = "";
    $.ajax({
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

           


        },
        success: function(data) {
            setTimeout(hide, 1);
            // hide
            flag = true;
            resdata = data
            let datas = JSON.parse(data);
            if (datas.ret == 0 && datas.err == "9992") {
                hashHistory.push({
                    pathname: '/',
                })
            }
            ajaxsuccess(data)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            setTimeout(hide, 2500);
            flag = false;
            resdata = ""

        // hashHistory.push({
        //     pathname: '/',
        // })
        }
    });

}