/**
 * Created by Administrator on 2017/5/12.
 */

var singlelogin = "";
var laodzhiflag = false;
var swurl = "";
var urlpost = "";
var urlpostnot=""
var datavale = "";
var wsurl = "";
var webs = "";
var statrtajax = false;
var clientServerurl = "";
var ssid = "";

$(function () {
    console.log("浏览器刷新会这里来吗？1")
    //请求路径
    $.ajax({
        method: 'get',
        url: 'http://192.168.10.17/root.json',
        async: false,
        success: function (data) {
            let zhishow= $("#toolbar").attr("class")
            console.log("zhishow",zhishow)
            let datas = data[zhishow];
             console.log("datas1", datas)
            swurl = datas;
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(textStatus + ' ' + errorThrown);
        }
    });
    //请求相对的路径
    $.ajax({
        method: 'get',
        url: swurl + 'ipconfiguration.json',
        success: function (data) {

            // console.log("datas2", data)
            authoritySwitchFun(data)
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(textStatus + ' ' + errorThrown);
        }
    });
    //设置权限
    function authoritySwitchFun(datas) {
        console.log("data", datas)
        singlelogin = datas.singlelogin;
        urlpost = datas.serverip;
        urlpostnot = datas.noport;
        wsurl = datas.wsserverip;
        // clientServerurl = datas[1].clientServer;
        ssid = datas.ssid
    }


    //执行加载函数，开始定时器
    //  if (singlelogin) {
    var int = setInterval(function () {
        // console.log("浏览器刷新会这里来吗？3", statrtajax, datavale)
        datavale = JSON.parse(window.sessionStorage.getItem("userData"));
        var tag = JSON.parse(window.sessionStorage.getItem("loginsuccesstag"));

        if (datavale != null) {
            $("#toolbar").addClass("toolbar-wraper")
            showtopBar()
            websockego()
            window.clearInterval(int)
            statrtajax = true
            //登录成功之前检查退出的
            console.log("浏览器刷新会这里来吗？3", statrtajax, datavale)
            var int2 = setInterval(function () {
                datavale = JSON.parse(window.sessionStorage.getItem("userData"));
                if (datavale == null) {
                    $("#toolbar").html("")
                    window.location.reload();
                    window.clearInterval(int2)
                    //   
                }
            })
        }

    }, 200)
// }



})


//登录成功显示topbar
function showtopBar() {
    console.log("singlelogin===",singlelogin)
    if (singlelogin) {
        $("#toolbar").load(swurl + "toolbar/toolbar.html  #container", function () {
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
            // $(".a-btn").on("click",function(){
            //     window.location.href=$(this).attr("data-href")
            // })
            var temp1 = $("#singleIcon-img").attr("src")
            $("#singleIcon-img").attr("src", urlpostnot + temp1)
            var temp2 = $("#settings-img").attr("src")
            $("#settings-img").attr("src", urlpostnot + temp2)
            var temp3 = $("#close-img").attr("src")
            $("#close-img").attr("src", urlpostnot + temp3)
            $("#close-img2").attr("src", urlpostnot + temp3)
        });


    }

}

function websockego() {
    // console.log("浏览器刷新会这里来吗？websockego")
    let gmid = datavale.gmid
    let token = datavale.token
    let datas = {
        "gmid": gmid,
        "token": token
    }
    let datasJons = JSON.stringify(datas)

    let url = wsurl + 'websocket/' + gmid + '/' + token + '/' + ssid
    webs = new WebSocket(url)
    console.log("ws1", webs)

    webs.onopen = function (event) {

        //// 发送一个初始化消息
        console.log("数据是",
            datasJons)
        webs.send(datasJons);
    };
    //监听消息
    webs.onmessage = function (event) {
        // console.log("浏览器刷新会这里来吗？onmessage")
        //console.log("数据是", event)
        let data = JSON.parse(event.data)
        console.log("获取到的地址", data);
        if (data.ret === 0) {

        } else {

            showgo(data);
        }


    };
    webs.onclose = function (event) {
        console.log("chenqiao")

        webs.close(); //关闭TCP连接
    };

}

function showgo(data) {
    console.log("进来一次", clientServerurl, data)
    if (data.ret == 0) {
        // window.location.href = clientServerurl
    } else {
        $("#subsystem").html("")
        let htmlstr = "<div class='dowrn' id=sysselect>"
        data.forEach(function (value, index, array) {
            console.log("数据 value.icon", value.icon)
            var iconurl = urlpost + "temp/" + value.icon
            var imgur = value.icon ? iconurl : urlpostnot + "aucenternew/toolbar/img/default.png";
            htmlstr += "<div class=gosys>"
            htmlstr +=" <a class = a-btn target = _blank  href = " + value.loginlink +
                ">"
              htmlstr += "<img src=" + imgur + "><span>" + value.name + "</span>"
              htmlstr += " </div></div>"

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
    console.log("这里来了没有呢？", newword, queren)
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
            console.log(textStatus + ' ' + errorThrown);
        }
    });

}
