import React, {
  Component
} from 'react';
import {
  browserHistory
} from 'react-router';
import {
  root
} from '../../root';
// import {url} from'../../public/url';
import {
  message
} from 'antd';
import {
  getajax,
  getUserList
} from '../../public/ajax';
import {
  SingleAjax
} from '../../public/singleAjax';
import {
  getipconfig
} from '../../getipconfig';
import {
  Encrypt
} from '../../public/aes';
const publicKey = "qwertyuiop[]asdf"
const getip = getipconfig();
const wkUrl = getip.serverip;
const singleUrl = getip.singleloginIp;
const SingleLogin = getip.singlelogin;
const Ajax = getajax.ajaxFun;
const ajaxSingFunGet = getajax.ajaxSingFunGet;
const sysid = getip.ssid //"JLHDcb3459f0eee2c571b943573ae3a11504664108"
const rootapp = root();
// const fwposturl=url();
// function getgetUserListSuccess() {
//   browserHistory.push({
//            pathname:'app/Home',
//          })
// }
const postLogin = WrappedComponent => class extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: "",
        pws: ""
      },
      loading: false,
    }
  }
  // 
  handleSubmit = (data) => {
    if (data.pws === '' || data.username === '') {
      message.error("请输入账号和密码")
    } else {
      let logindata = {
        password: data.pws,
        username: data.username
      }
      this.setState({
        loading: true,
      })
      if (SingleLogin) {
        let url = singleUrl + "cas/login" + "?mode=rlogin&service=" + wkUrl + "sso/login";
        SingleAjax('get', url, '', "jsonpcallback", (e) => {
          console.log("loginqqqqqqqqqqqqq", e)
          let lgdata = {
            username: data.username,
            password: Encrypt(data.pws, publicKey),
            lt: e.lt,
            execution: e.execution,
            _eventId: "submit"
          }
          let loginurl = singleUrl + "cas/login"
          SingleAjax('post', loginurl, lgdata, "logincallback", (e) => {
            console.log("cas/login", e, e.ret)

            if (e.ret === "0") {
              this.getToken()
            } else {
              this.setState({
                loading: false,
              })
              message.error(e.msg);
            }

          })
        })
      } else {
        Ajax('post', 'admin/login', '', logindata, (e) => {

          if (e.ret === 1) {
            window.sessionStorage.setItem("loginuser", data.username) //
            window.sessionStorage.setItem("userData", JSON.stringify(e.data))
            // window.sessionStorage.setItem("loginsuccesstag", "true")
            this.getChaneList();

          } else {
            this.setState({
              loading: false,
            })
            message.error(e.errmsg);
          }
        })
      }

      //  browserHistory.push({
      //   pathname:'app/Home',
      // })

    }

  }
  getGameList = () => { //获取全部游戏数据
    let data = {}
    Ajax('post', 'front/query', 'conf_games', data, (e) => {

      if (e.ret === 1) {

        window.sessionStorage.setItem("gameList", JSON.stringify(e.data)) //游戏列表
        getUserList({}, this.getUserListSuccess)
      } else {
        this.setState({
          loading: false,
        })
        message.error(e.errmsg);
      }

    })
  }
  getChaneList = () => {
    let data = {}
    Ajax('post', 'front/query', 'conf_channels', data, (e) => {
      if (e.ret === 1) {
        window.sessionStorage.setItem("channelsList", JSON.stringify(e.data)) //渠道列表
        this.getGameList();
      } else {
        this.setState({
          loading: false,
        })
        message.error(e.errmsg);
      }

    })
  }
  getUserListSuccess = () => {
    this.setState({
      loading: false,
    })
    browserHistory.push({
      pathname: rootapp + 'app/Home',
    })
  }
  success = (data) => {
    var storage = window.sessionStorage;
    if (data.ret === 1) {
      storage.clear();
      storage.setItem("subid", ''); //登录成功之后帮我留着有用
    } else {
      // let strs = [];
      // strs = data.errmsg;
      this.setState({
        cuwoshow: data.errmsg
      });
    }
  }
  getToken = (res) => {
    // console.log("sysid====", sysid)
    // console.log("getToken,getToken", singleUrl)
    let url = singleUrl + "cas/login?service=" + encodeURIComponent(wkUrl + "validlogin/")
    // console.log("getToken,getToken", url)
    SingleAjax('get', url, '', "getUserInfo", (e) => {
      console.log("e=================", e)
   
     
      let sign = e.sign
      let tocken = e.tocken
      let data = {
        systemId: sysid,
        sign: sign,
        token: tocken,
      }
      console.log("data=================", e)
      let murl = wkUrl + "sso/user"
      ajaxSingFunGet(murl, data, (e) => {
        console.log("eeeee=====", e)
        if (e.ret === 1) {
          window.sessionStorage.setItem("loginuser", e.data.nickname) //
          window.sessionStorage.setItem("userData", JSON.stringify(e.data))
          //console.log("hutao", window.sessionStorage.getItem("userData"))
          this.getChaneList();
          let userDataall={
            "sysid":sysid,
            "gmid": e.data.gmid,
        }
          window.sessionStorage.setItem("sso_user_data", JSON.stringify(userDataall))
        } else {
          message.error(e.errmsg)
          this.setState({
            loading: false,
          })
        }
      })
    })
  }
  //单点登录测试
  componentWillMount() {
    if (SingleLogin) {
      this.getToken();
    }
  }
  render() {
    const props = {
      handleSubmit: this.handleSubmit,
      fields: this.state.fields,
      loading: this.state.loading
    }
    return (<
      WrappedComponent {...props
      }
    />
    );
  }
};
export default postLogin;