/**
 * Created by Administrator on 2017/5/12.
 */


 var datavale = "";
var webs = "";
var statrtajax = false;
var singlelogin = true; 
var urlpost = "http://192.168.10.17:9888/"; //ipconfiguration中的serverip
var wsurl = "ws://192.168.10.17:9888/";//权限中心的ws地址
var weburl="http://192.168.10.17/toolbar/";//weburl是存放toolbar的服务器地址
var singleUrl = "http://192.168.40.118:8080/";//单点登录服务器地址
function SingleAjax  (type,url,data,callbackname,callback){
    $.ajax({
          url : url,
          dataType : "jsonp",
          data:data,
          jsonpCallback : callbackname,
          type : type,
          success : function(data) {
              ////console.log()
              callback(data)
          },
          error : function(jqXHR, textStatus, errorThrown) {
              //因为不管第几个登陆，都会尝试获取tocken，但，第一个登陆的，肯定是失败的。所以，就不处理
          }
      });
  }
function getToken(){
    let userDataall= JSON.parse(window.sessionStorage.getItem("sso_user_data")) 
    // console.log("getItem",userDataall)
    console.log("window.location.host======",window.location.host)
    let url = singleUrl + "cas/login" + "?service=" + encodeURIComponent(urlpost + "validlogin" + "/")
    SingleAjax('get', url, '', "getUserInfo", (e) => {
    //   //console.log("测试一下数据是不是对的==========", e,userDataall)
      let data = {
        systemId: userDataall.sysid
      }
      let ssodata=e
      let href=userDataall.href
      showtopBar(ssodata,userDataall)
    
    })
  }
$(function () {
    // //console.log("浏览器刷新会这里来吗？1")
    // 设置图片地址
   
    if (singlelogin) {
    getToken()
    }


})


//登录成功显示topbar
function showtopBar(ssodata,userDataall) {
    // //console.log("singlelogin===",singlelogin)
    if (singlelogin) {
        $("#toolbar").load( weburl+ "toolbar.html #container", "",function () {
            // $("#root").css("margin-top", "24px")
            $("#btn-open").on("click", function () {
                // $("#btn-open").removeClass("hiden");
                // $("#contentshow").addClass("show");
                $("#btn-open").hide();
                $("#contentshow").show();
            })

            // 关闭子系统列表
            $("#colse").on("click", function () {
                $("#btn-open").show();
                $("#contentshow").hide();
            })
            $("#closepaw").on("click", function () {
                $("#modify-paw-box").hide()
            })
            $("#modify-btn") .on("click", function () {
                $("#modify-paw-box").show()
            })
            var temp1 = $("#singleIcon-img").attr("src")
            $("#singleIcon-img").attr("src", weburl + temp1)
            var temp2 = $("#settings-img").attr("src")
            $("#settings-img").attr("src", weburl + temp2)
            var temp3 = $("#close-img").attr("src")
            $("#close-img").attr("src", weburl + temp3)
            $("#close-img2").attr("src", weburl + temp3)
            websockego(ssodata,userDataall)
        });


    }

}

function websockego(ssodata,userdata) {
    // //console.log("浏览器刷新会这里来吗？e",userdata)
    let gmid = userdata.gmid
    let sign =ssodata.sign
    let ticket=ssodata.tocken
    let href=window.location.href//encodeURIComponent(window.location.host)
    let hreftemp=href.split("://")[1].split("/")[0]+","+href.split("://")[1].split("/")[1]
    console.log("window.location.host1111======",hreftemp)
    let datas = {
        "gmid": gmid,
        "sign": sign,
        "ticket":ticket,
    }
    let datasJons = JSON.stringify(datas)

    let url = wsurl + 'websocket/' + gmid + '/'+ticket+"/" + sign + '/' + userdata.sysid+'/'+hreftemp
    webs = new WebSocket(url)
    // //console.log("ws1", webs)

    webs.onopen = function (event) {

        //// 发送一个初始化消息
        //console.log("数据是",
            // datasJons)
        webs.send(datasJons);
    };
    //监听消息
    webs.onmessage = function (event) {
        // //console.log("浏览器刷新会这里来吗？onmessage")
        ////console.log("数据是", event)
        let data = JSON.parse(event.data)
        //console.log("获取到的地址", data);
        if (data.ret === 0) {
            //console.log("没有子系统");
        } else {

            showgo(data);
        }


    };
    webs.onclose = function (event) {
        // //console.log("chenqiao")

        webs.close(); //关闭TCP连接
    };

}

function showgo(data) {
    // //console.log("进来一次", clientServerurl, data)
    if (data.ret == 0) {
        // window.location.href = clientServerurl
    } else {
        $("#subsystem").html("")
        let htmlstr = "<div class='dowrn' id=sysselect>"
        data.forEach(function (value, index, array) {
            // //console.log("数据 value.icon", value.icon)
            var iconurl = urlpost + "temp/" + value.icon
            var imgur = value.icon ? iconurl : weburl + "img/default.png";
            var link=value.loginlink!=undefined?value.loginlink:" ";
            htmlstr += "<div class=gosys>"
            htmlstr +=" <a class = a-btn target = _blank  href = " + link +">"
            htmlstr += "<img src=" + imgur + "><span>" + value.name + "</span>"
            htmlstr += "</a> </div></div>"

        });
        htmlstr += "</div>"

        $("#subsystem").append(htmlstr)
    }
}

function getmd5(gmid, token, timesign) {
    var obgj = "";
    obgj = "gmid" + gmid + "token" + token + "time" + timesign;
    var password = hex_md5(obgj);
    return password
}
function ok_submit() {
    var newword= $("#newword").val();
     var queren = $("#queren").val();
     if (newword === "" || queren===""){
        $("#show-err").html("新旧密码都不能为空！")
         $("#show-err").addClass("errmsgshow")
     }else{
          $("#show-err").html("")
         postpassword(newword, queren); 
          $("#show-err").removeClass("errmsgshow")
     }
    

}
//修改密码提交
function postpassword(newword, queren) {
    //console.log("这里来了没有呢？", newword, queren)
    let newpwd = hex_md5(newword);
    let oldpwd = hex_md5(queren);
    let gmid = datavale.gmid;
    let token = datavale.token;
    let timesign = (new Date()).valueOf();
    let sign = getmd5(datavale.gmid, datavale.token, timesign);
    let datas = {
        "cmd": "user_resetpwd",
        "gmid": gmid,
        "timesign": timesign.toString(),
        "token": datavale.token,
        "sign": sign,
        "v": 1,
        "data": {
            "gmid": gmid,
            "mobile": "",
            "newpwd": newpwd,
            "oldpwd": oldpwd,
        }
    }
    let datasJons = JSON.stringify(datas)
    $.ajax({
        method: 'post',
        url: urlpost + "/front/query",
        data: datasJons,
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            let datavalue = JSON.parse(data);
            if (datavalue.ret == 1) {
                  $("#show-err").html("修改成功")
                  $("#show-err").addClass("scussshow")
                  $("#show-err").removeClass("errmsgshow")
               
            } else {
                  $("#show-err").html(datavalue.errmsg)
                $("#show-err").addClass("errmsgshow")
                $("#show-err").removeClass("scussshow")
             
            }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus + ' ' + errorThrown);
        }
    });

}
