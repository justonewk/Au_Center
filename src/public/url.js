/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
import { root } from '../root';
const rootapp = root();
export const url = () => {
    console.log("请求url","ipconfiguration")
    let swurl = ""
    let getipconfigdata= window.sessionStorage.getItem("getipconfigdata")
    if(getipconfigdata){
        swurl=JSON.parse(getipconfigdata).DataServer
    }else{
    $.ajax({
        method: 'get',
        url: rootapp + 'ipconfiguration.json',
        async: false,
        success: function(data) {
            // let datas = data.data;
            swurl = data.DataServer;
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}
    return swurl
}