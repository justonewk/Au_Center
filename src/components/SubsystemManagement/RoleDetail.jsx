
import React from 'react';
import SubsystemManagementHeader from './SubsystemManagementHeader'
import {message} from 'antd';
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import RoleDetailRightContent from './RoleDetailRightContent';
import '../../style/SubsystemManagement.css';
import $ from 'jquery'
import {getajax} from '../../public/ajax';
const Ajax=getajax.ajaxFun;
class RoleDetail extends React.Component {

  state={
    permit:[],//权限列表
    rolelist:[],//角色列表
    local_permit:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
  }
  getPermitsFunc=()=>{//获取权限列表
      let data={
          "slid":this.props.location.query.syslid
      }
      Ajax('post','front/query','system_detailpermits',data,(e)=>{
         if(e.ret==1){
          let permit=[e.data.permitDef][0].children;
          let tempper=[];
            this.setState({//子系统所有权限列表
              permit:permit,
            })    
        }
        else{
            message.error(e.errmsg)
        }
      })
    }
    componentWillMount() {
        this.getPermitsFunc();
    }
    screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        var t2 = this.refs.wrapper;
        var t = this.refs.userright;
      
       $(t).css("height",$(window).height()-280)
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
      }
  render() {
    return (
      <div className="SubsystemManagement"> 
        <SubsystemManagementHeader/>
         <div className="data-wrapper">  
          {/*子系统管理左边导航*/}
            <div className="left">
            <SubsystemManagementSiderLeft local_permit={this.state.local_permit} lefttitle={this.props.lefttitle} LeftSlidedatalist={this.props.LeftSlidedatalist}/>
            {/*子系统管理右边具体内容*/}
            </div>
            <div className="right" ref="userright">
            <RoleDetailRightContent local_permit={this.state.local_permit} {...this.props} permit={this.state.permit} rolelist={this.state.rolelist}/>
            </div>
          </div>
      </div>
    )
  }
}
export default RoleDetail;