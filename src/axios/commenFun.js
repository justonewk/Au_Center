/**
 * Created by Administrator on 2017/5/12.
 */
//http://192.168.10.17:8090/loginPost
import $ from 'jquery';
// import {getmd5} from'./getmd5';
import {hashHistory} from 'react-router';
// import {url} from'./url';
import { getipconfig } from '../getipconfig';
const getip = getipconfig();
const fwposturl = getip.serverip;
// const fwposturl=url();
const commenFunc= {
    ajaxtest:function(url,type,data,callback){
    //   console.log(fwposturl,"胡涛")
          $.ajax({
            method: type,
            //method: 'get',
            url: url,
            data: data,
            async: false,
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function(data) {
              callback(data)
            },
            error: function(jqXHR, textStatus, errorThrown) {

            }
        });
    },
     locaTionherf:function(url,type,ids,callback){
          
          let datas=JSON.parse(window.sessionStorage.getItem("userData"))
          let gameid=parseInt(window.sessionStorage.getItem("gamecheck"))
          return fwposturl+'/'+url+"?gmid="+datas.gmid+"&token="+datas.token+"&gameid="+gameid+"&"+ids
     },
      ajax:function(url,type,data,callback){
        console.log(fwposturl,"胡涛")
         let dataJson=data==''?{}:data;
          
          let datas=JSON.parse(window.sessionStorage.getItem("userData"))
          let gameid=parseInt(window.sessionStorage.getItem("gamecheck"));
          dataJson["gmid"]=datas.gmid;
          dataJson["token"]=datas.token;
          dataJson["gameid"]=gameid;
         $.ajax({
                    method:type,
                    url: fwposturl+'/'+url,
                    data: dataJson,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data) {
                        if(data.ret==0){
                            hashHistory.push('/')
                         }
                         else{
                           callback(data)
                         } 
                        
                        
                       
                    }.bind(this),
                    error: function (jqXHR, textStatus, errorThrown) {
                        //console.log(textStatus + ' ' + errorThrown);
                    }
                });
    },
    loginAjax:function(url,type,data,callback){
      console.log("登录",data)
       $.ajax({
                    type:"post",
                    url: fwposturl+'/'+url,
                    data: data,
                    dataType: "json", 
                    cache: false,
                    crossDomain: true == !(document.all),
                    beforeSend: function(XMLHttpRequest){
                    },
                    success: function (data) {
                         console.log("data:",data);
                         callback(data)
                       
                    }.bind(this),
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus + ' ' + errorThrown);
                    }
                });
    },
     getBeforeDate:function(n){//几天前
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if(day <= n) {
            if(mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
       let   s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
       console.log(s)
       return s;
    },
    getTime:function(d){//转换为时间戳
         let  str = d.replace(/-/g,'/'); 
         let date = new Date(str); 
        return     date.getTime()/1000
    },
    timeFunc(value) {//时间戳转为2012-12-12 12:12:12
        let time = new Date(parseInt(value) * 1000);
        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        let t = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mi) + ':' + add0(s)
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeFuncMin(value) {//时间戳转为2012.12.12 
        let time = new Date(parseInt(value) * 1000);
        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        let t = y + '.' + add0(m) + '.' + add0(d) 
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        return t;
    },
    timeFuncString(value) {//时间戳转为2012.12.12 
        let time = new Date(parseInt(value) * 1000);
        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let wek = time.getDay();
        let mi = time.getMinutes();
        let s = time.getSeconds();
        let t = y + '.' + add0(m) + '.' + add0(d) 
        //let t= y + '-' + add0(m) + '-' + add0(d) +"-"+wek
        //console.log("转换成功之后的时间:",t)
        return t;
    },
   SingleAjax(type,url,data,callbackname,callback){
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
   },
    CommenAjax(type,url,data,callback){
    $.ajax({
        url : fwposturl+url,
        data:data,
        type : type,
        xhrFields: {
            withCredentials: true
        },
        success : function(data) {
           
            callback(data)
        },
        error : function(jqXHR, textStatus, errorThrown) {
            
        }
    });
   },
//    设置设备和系统的上面卡片的数据格式
   setTopCard(title,data){
       let alldata=[]
        for(let key in data){
            let obj={"name":"",value:""} 
            switch(key){
              
                case "brand":obj.name="";obj.value=data[key];break;
                case "modlenum":obj.name=title[1];obj.value=data[key];break;
                case "devnum":obj.name=title[2];obj.value=data[key];break;
                case "devnumpro":obj.name=title[3];obj.value=Number(data[key]* 100).toString().match(/^\d+(?:\.\d{0,2})?/)+"%";break;
                case "exception":obj.name=title[4];obj.value=data[key];break;
                case "exceptionpro":obj.name=title[5];obj.value=Number(data[key]* 100).toString().match(/^\d+(?:\.\d{0,2})?/)+"%";break;
                default:break;
            }
            alldata.push(obj)
        }
       return alldata
   },
   setTopCardSys(title,data){
    let alldata=[]
     for(let key in data){
         let obj={"name":"",value:""} 
         switch(key){
             case "system":obj.name="";obj.value=data[key];break;
             case "modlenum":obj.name=title[1];obj.value=data[key];break;
             case "devnum":obj.name=title[2];obj.value=data[key];break;
             case "devnumpro":obj.name=title[3];obj.value=Number(data[key]* 100).toString().match(/^\d+(?:\.\d{0,2})?/)+"%";break;
             case "exception":obj.name=title[4];obj.value=data[key];break;
             case "exceptionpro":obj.name=title[5];obj.value=Number(data[key]* 100).toString().match(/^\d+(?:\.\d{0,2})?/)+"%";break;
             default:break;
         }
         alldata.push(obj)
     }
    return alldata
},
// 转换pie数据为表格数据
setPiedataToTable(data,keytemp){
    let alldata=[]
    for(let i=0;i<data.length;i++){
    let obj={"brand":data[i][0],
        "devnum":data[i][1],
        "devnumpro":data[i][2],
        "exception":data[i][3],
        "exceptionpro":data[i][4]};
        alldata.push(obj)      
    }
return alldata
},
exportFunc(typetem=0,timestart,timeend,devmodel,systemVersion,model,callback){
    
    let data ="type="+typetem+ "&excepstack=-1" + "&timestart=" + commenFunc.getTime(timestart) + "&timeend=" + commenFunc.getTime(timeend)+"&devmodel="+devmodel+"&systemversion="+systemVersion+"&model="+model
    window.location.href =commenFunc.locaTionherf("exportexcle/", "get", data, callback)
},
gettempfilters(){
    let typename= JSON.parse(window.sessionStorage.getItem("typename"));
    console.log("类型是什么",typename)
    let alldata=[]
    for(let i=0;i<typename.length;i++){
     console.log("类型是什么",typename[i])
     let newobj={
               text: typename[i],
               value: typename[i],
             }
             alldata.push(newobj)      
    }
     let returndata=alldata||[]
     return returndata;
 }
};

export default commenFunc;