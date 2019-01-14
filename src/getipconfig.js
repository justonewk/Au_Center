/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
 import { root } from './root';
 const rooturl = root();
export const getipconfig = () => {
    let swurl = {
        "clientip": "",
        "serverip": "",
        "websocketip":"",
        "singleloginIp":"",
        "singlelogin":""
    }
    // console.log("root:",rooturl)
    let rooturltepm = rooturl === "/" ? "/ipconfiguration.json?timestamp=" + new Date().getTime() : rooturl +"/ipconfiguration.json?timestamp=" + new Date().getTime()
    let getipconfigdata= window.sessionStorage.getItem("qx_getipconfigdata")
    if(getipconfigdata){
        // console.log("没有请求",rooturl)
        swurl=JSON.parse(getipconfigdata)
    }else{
        // console.log("请求","ipconfiguration")
    $.ajax({
        method: 'get',
        url: rooturltepm,
        async: false,
        success: function(data) {
            let clientiptemp = data.clientip;
            let serveriptemp = data.serverip
            let websocktiptemp = data.websocktip
            swurl.clientip = clientiptemp;
            swurl.serverip = serveriptemp;
            swurl.websocktip = websocktiptemp;
            swurl.singleloginIp=data.singleloginIp;
            swurl.singlelogin=data.singlelogin;
            swurl.ssid=data.ssid
            window.sessionStorage.setItem("qx_getipconfigdata",JSON.stringify(swurl))
            //console.log("获取到了ip配置吗？", data, swurl.serverip)
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}
    return swurl
}