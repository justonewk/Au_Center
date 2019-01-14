/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
import { root } from '../root';
const rootapp = root();
export const ws = () => {
    console.log("请求ws","ipconfiguration")
    let swurl = ""
    // console.log("dddwj")
    $.ajax({
        method: 'get',
        url: rootapp + 'ipconfiguration.json',
        async: false,
        success: function(data) {
            let datas = data.data;
            swurl = datas[3].wsServer;
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
    return swurl
}