/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost

export const getCookie=(name) =>{
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 // console.log(document.cookie)
    if(arr===document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
  }