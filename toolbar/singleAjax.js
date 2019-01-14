
import $ from 'jquery';
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
