import React, { Component } from 'react';
import formCreate from '../PublicComponent/formCreate';
import addLoginStyle from './addLoginStyle';
import postLogin from './postLogin';
import bg from '../../style/imgs/bglogin.png';
import logo from '../../style/imgs/logo.png';
import { Button} from 'antd';
class Login extends Component {
    render() {
      const {loading}=this.props
        return (
           <div className="login" style={{backgroundImage: 'url(' +bg + ')'}}>     
        <div className="wrapper" >
        <img src={logo} alt=""/>
        <p className="title">用户登录</p>
        <div className="content-data">
        <div className="item-row-login">
          <input name="username"
          placeholder="用户名"
           value={this.props.fields["username"]} {...this.props.getField('username')}  className="item-input"/>
          <b className="tips">{this.props.errmsg["username"]}</b>
        </div>
        <div className="item-row-login">
          <input 
           placeholder="密码"
           type="password"
          text="pws" name="pws" value={this.props.fields["pws"]} {...this.props.getField('pws')}  className="item-input"/>
            
            <b className="tips">{this.props.errmsg["pws"]}</b>
        </div>
        <Button
        loading={loading}
        type="primary"
        disabled={this.props.fields["pws"]==''||this.props.errmsg["username"]==''}
        onClick={this.props.handleSubmit}  className="show">登录</Button>
            </div>
      </div>
      
      </div>
        )
    }
}
export default addLoginStyle(postLogin(formCreate(Login)));