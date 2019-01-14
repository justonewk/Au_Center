import { getmd5, allgetmd5 } from './getmd5';
import {  browserHistory } from 'react-router';
import $ from 'jquery';
import { Encrypt } from './aes';
import { getipconfig } from '../getipconfig';
const publicKey = "qwertyuiop[]asdf"
const getip = getipconfig();
const testUrl = getip.serverip;
export const SingleAjax = (type,url,data,callbackname,callback) => {
  $.ajax({
        url : url,
        dataType : "jsonp",
        data:data,
        jsonpCallback : callbackname,
        type : type,
        success : function(data) {
        	//console.log()
            callback(data)
        },
        error : function(jqXHR, textStatus, errorThrown) {
            //因为不管第几个登陆，都会尝试获取tocken，但，第一个登陆的，肯定是失败的。所以，就不处理
        }
    });
}
