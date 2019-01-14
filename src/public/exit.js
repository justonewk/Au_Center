/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
import {  browserHistory } from 'react-router';
import { root } from '../root';
import { getipconfig } from '../getipconfig';
const getip = getipconfig();
const testUrl = getip.serverip;
const rootapp = root();
export const exit = () => {
    window.sessionStorage.clear();
    $.ajax({
        url: testUrl + 'admin/logout',
        type: "post",
        dataType: "json",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(res) {

            console.log("data" + res)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
     browserHistory.push(rootapp+'login');
   // window.sessionStorage.clear();
}