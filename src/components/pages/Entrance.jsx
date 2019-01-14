/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {getCookie} from'../../axios/getCookie';
// import {setCookie} from'../../axios/setCookie';
// import {delCookie} from'../../axios/delCookie';
// import {
//     Form,
//     Icon,
//     Input,
//     Button,
//     Checkbox,
//     Spin,
// } from 'antd';
import $ from 'jquery';
import {
    hashHistory ,browserHistory
} from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import dlbg from '../../style/imgs/dlbg.png';
import bg from '../../style/imgs/bglogin.png';
import btnbg from '../../style/imgs/btnbg.png';
import {
    url
} from '../../axios/url';
import {
    Encrypt
} from '../../axios/aes';
import {
    Decrypt
} from '../../axios/aes';
import {
    ajax
} from '../../axios/ajax';
import {
    clientserver
} from '../../axios/clientserver';
import {
    AuthorityCenter
} from '../../axios/AuthorityCenter';
import {
    exit
} from '../../axios/exit';
import { root } from '../../axios/root';
const rootapp = root();
const FormItem = Form.Item;
const publicKey="qwertyuiop[]asdf"
//const yangzlogin99= "http://192.168.1.77:8999";
const kehaddress=clientserver();
const yangzlogin77= AuthorityCenter();
const yangzlogin99=url();
// import {getCookie} from'../axios/getCookie';
//import {setCookie} from'../axios/setCookie';
// 添加cookie
function setCookie(name,value) { 
  
   var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
     } 
const fwposturl = url();

function getQueryString(name) { 
const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
const r = window.location.search.substr(1).match(reg); 
if (r != null){
 return unescape(r[2]);    
    }else{

   return null; 
} 
}
//删除cookie
function delCookie(name) 
{ 
  
     if (getCookie(name)) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        setCookie(name, "", expdate);
    }
} 

function zidianfangyi(name){
  var obj={url:"",name:""}
    switch (name) {
  case "rolesearch"://查询角色
    obj.url="SelectRole";
    obj.name="查询角色";
    break;
  case "accountsearch": //账号查询
   obj.url="SelectAccount";
    obj.name="账号查询";
    break; 
  case "roleinfo": //角色讯息
     obj.url="InformationRole";
      obj.name="角色信息";
    break; 
  case "sysmail"://系统邮件
    obj.url="SystemMail";
     obj.name="系统邮件";
    break;
    case "sysnotice": //发送公告
   obj.url="SendAnnouncement";
    obj.name="发送公告";
   break; 
  case "accblock": //账号禁封
     obj.url="BanAccount";
      obj.name="账号禁封";
    break; 
  case "chatmonitor"://聊天监控
    obj.url="ChatMonitoring";
     obj.name="聊天监控";
    break;
     case 7://邮件详情
    obj.url="SystemMailDetails";
     obj.name="查询角色";
     break;
  case 8://公告详情
    obj.url="AnnouncementDetails";
     obj.name="查询角色";
     break;
     case "playerlog"://聊天监控
    obj.url="ConsumptionRecord";
     obj.name="消费记录";
    break;
}
return obj;

}
 function home(datas) {
    console.log("进入用户验证没有呢?")
   let gameIdStr = 14;
   // var storage=window.sessionStorage;
   console.log("地址有没有获取到",yangzlogin99)
    $.ajax({
        url : yangzlogin99+"/sso/user",
        type : "post",
        dataType : "text",
        data : {
            data : datas,
            gameIdStr : gameIdStr
        },
         xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
        success : function(data) {
             data = JSON.parse(data);
                console.log(data.data,data)
            // window.location.href = "/";
             delCookie("data") ;
             if (data.ret==1) {
                           window.sessionStorage.setItem("data", JSON.stringify(data.data));
                             setCookie("data",JSON.stringify(data.data));
                             let address=zidianfangyi(data.data.modules[0])
                              let addresspost = rootapp+'app/table/'+address.url
                                //window.location.href='app/table/'+address.url
                             browserHistory.push({
                                pathname: addresspost,
                            })
                         }else{

                 console.log("cuowu")  
                 }           
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}


class Entrance extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {
        cuowushow: {},
        disabled: false,
        loading: false,
        validAddr:"",
        ssoToken:"",
        gameIdStr:"JLHDdeb564ef9077ad448932c8909e9ef1501052438"
    }

    componentDidMount() {

       const token =  getQueryString("tocken");
         console.log(token,getCookie("validAddr"),window.location.href)
        // alert("window.location.href",)
        if( token==null && getCookie("validAddr") == null ){
            $.ajax({
                method: 'post',
                data:{},
                dataType : "json",
                url: yangzlogin77+'/validlogin/?url='+kehaddress,
                beforeSend: function() { // 禁用按钮防止重复提交
                    this.setState({ loading: true })

                }.bind(this),
                success: function(data) {
                  
                    if (data.status == 302) {
                   
                       console.log("第一步弹窗：",data.location)
                       setCookie("validAddr",data.location);
                       setCookie("ssoAddr",data.location.split("?")[0]);
                       location.href=getCookie("validAddr");
                    }
                }.bind(this),
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("第444步弹窗：")
                    this.setState({
                        "loading": false
                    })
                }.bind(this)
            });
        }else if(token!=null){
            console.log("第22步弹窗：")
           
            delCookie("validAddr");
            delCookie("ssoAddr");
            
            $.ajax({
            url : yangzlogin77+"/validlogin/user",
            type : "get",
            dataType : "jsonp",
            jsonpCallback : "jsonpcallback",
            data : {
                systemId : "JLHDdeb564ef9077ad448932c8909e9ef1501052438"
            },
            success : function(data) {
                console.log("有token直接访问",data)
                if (data.ret == 1) {
                   
                    setCookie("gmid",data.data.gmid);
                    setCookie("token",data.data.token);
                    home(JSON.stringify(data));
                } else {
                    message.error("对不起，你没有访问该系统的权限！");
                        exit()
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ' ' + errorThrown);
            }
        });
        }
    }
     handleSubmit = (e) => {
         e.preventDefault();
   
    let ssoAddr = getCookie("ssoAddr");  
   
    let url = ssoAddr +"?mode=rlogin&amp;service="+kehaddress;
    let urls = url.split("amp;");       
    let urlshow = urls[0] + urls[1];
    // 不能用弹窗，弹窗会添加问号
    console.log("第二步："+urlshow);
  
    $.ajax({
            url : urlshow,
            dataType : "jsonp",
            jsonpCallback : "jsonpcallback",
            success : function(data) {
               console.log("成功的数据",data)
                this.props.form.setFields({
                  lt: {
                    value: data.lt,
                  },
                  execution: {
                    value: data.execution,
                  },
                  _eventId:{
                   value:"submit"
                  }
                });
                 
              setTimeout(() => {
            this.postformdata();
        }, 1);                   
            }.bind(this),
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("错误的地方",textStatus + ' ' + errorThrown);
            }
        });
     }

     postformdata=()=>{
       console.log("tijiaoshujui")
        let url=getCookie("ssoAddr")
         this.props.form.validateFields((err, values) => {
        values.password=Encrypt(values.password,publicKey);
    
                    if (!err) {
                        $.ajax({
                            method: 'post',
                             url: url,
                            data: values,
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                             success: function (data) {
                                this.postdata(data)
                             
                }.bind(this),
                error : function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }

                 })
             }
         })
     }

     postdata=(result)=>{
        console.log("result",result,result.split("&")[1],result.split("&")[2])
      //let data=result.split("&")[1].split("\")")[0];
       let arrdata=result.split("&");
       let dataceshi={ret:arrdata[1].split("=")[1],msg:arrdata[2].split("=")[1]}
        if (dataceshi.ret == "") { 
            console.log("第三步："+getCookie("validAddr"));
        location.href = getCookie("validAddr");
        } else {
        //$("#errorMsg").html("<span style='color:red'>" + result.msg+ "</span>");
        let showdata=dataceshi.msg.split("\");")
        message.error(showdata[0])
        // $('#login-form')[0].reset();
    }
     }

    render() {
    const { getFieldDecorator } = this.props.form;
        return ( 
            <div className="login" style={{backgroundImage: 'url(' +bg + ')'}}>

                <div className="login-form" style={{backgroundImage: 'url(' +dlbg + ')'}}>
                    
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}} className="divfrom" >
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                       placeholder="密码"/>
                            )}
                        </FormItem>
                         <FormItem>
                            {getFieldDecorator('lt', {
                                
                            })(
                                <Input type="hidden"/>
                            )}
                        </FormItem>
                         <FormItem>
                            {getFieldDecorator('_eventId', {
                                
                            })(
                                <Input type="hidden"/>
                            )}
                        </FormItem>
                         <FormItem>
                            {getFieldDecorator('execution', {
                                
                            })(
                                <Input type="hidden"/>
                            )}
                        </FormItem>
                        <FormItem>
             

                            <Button type="primary" htmlType="submit" className="show" style={{width: '41%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>

                    <div className="ant-form-explain">
                        <p key="cuow" className="cuow">{this.state.cuwoshow}</p>
                    </div>
                </div>

            </div>

        );
    }
}

export default Form.create()(Entrance);