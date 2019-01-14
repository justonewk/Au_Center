/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
import {
    root
} from '../root';
const rootapp = root();
export const getSwitch = () => {
    console.log("请求getSwitch","ipconfiguration")
    let Switch = ""
    $.ajax({
        method: 'get',
        url: rootapp + 'ipconfiguration.json',
        async: false,
        success: function(data) {
            // let datas = data.data;
            // console.log(data.data, datas[0].authoritySwitch, rootapp)
            Switch = data.authoritySwitch;
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
    return Switch
}