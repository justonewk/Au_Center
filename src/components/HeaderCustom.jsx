import React, { Component } from 'react';
import { Menu,Layout,Icon,message,Dropdown} from 'antd';
import {browserHistory } from 'react-router';
import '../style/baseall.css';
import { SingleAjax } from '../public/singleAjax';
import { getmd5 } from '../public/getmd5';
import {validatorCheck} from '../public/validator';
import { getajax,getUserList } from '../public/ajax';
import {exit} from '../public/exit'
import edit from '../style/imgs/edit.png';
import down from '../style/imgs/down.png';
import up from '../style/imgs/up.png';
import out from '../style/imgs/out.png';
import ModifyModal from './ModifyModal';
import { getipconfig } from '../getipconfig';
import { root } from '../root';
const rootapp = root();
const getip = getipconfig();
const SingleLogin=getip.singlelogin;
const wkUrl = getip.serverip;
const Ajax=getajax.ajaxFun;
const { Header } = Layout;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class HeaderCustom extends Component {
    state = {
       user: '',
       data:'',
       visible:false,
       Modalvisible:false,
       loading:false,
       oldpws:'',
       newpws:'',
      newpws1:'',
       reloadLoading:false,
       local_permit:window.sessionStorage.getItem('userData')==null?[]:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
    };
    componentWillMount(){
      let username= window.sessionStorage.getItem("loginuser")//
     let  userData= window.sessionStorage.getItem('userData')
      if(username===""||username===null||username===undefined||userData===null){
       // alert("数据请求错误,请重新登录")
           browserHistory.push({
           pathname:rootapp+'login',
          })
      }
        
    }
    updateCache=(e)=>{
      this.setState({
        reloadLoading:true,
      })
       Ajax('post','front/query','user_admin_refresh_cache',{},(e)=>{
         if(e.ret===1){
              message.success("更改缓存成功");
              this.setState({
        reloadLoading:false,
      })
         this.getGameList();
         this.getChaneList();
           } 
           else{
            message.error(e.errmsg)
           }
       })
    }
   getGameList=()=>{//获取全部游戏数据
        let data={
            }
      Ajax('post','front/query','conf_games',data,(e)=>{
        if(e.ret===1){
         window.sessionStorage.setItem("gameList",JSON.stringify(e.data))//游戏列表
          getUserList({},(e)=>{

          })
        }
        else{
           message.error(e.errmsg);
        }
     })
    }
    getChaneList=()=>{
         let data={
            }
      Ajax('post','front/query','conf_channels',data,(e)=>{
        if(e.ret===1){
         
         window.sessionStorage.setItem("channelsList",JSON.stringify(e.data))//渠道列表
        }
        else{
           message.error(e.errmsg);
        }
    
     }) 
    }
    onClickDrop=(res)=>{
      let e=res.key
      if(e==0){
      }
      else if(e==1){
        this.setState({
          Modalvisible:true,
        })
      }
      else if(e==3){
      if(SingleLogin){
        SingleAjax('get',wkUrl+'admin/logout','',"jsonpCallback",(e)=>{
          browserHistory.push(rootapp+'login');
          sessionStorage.removeItem("userData"); //删除指定键名数据
         })
      }
      else{
        exit();
      }
         
      }
    }
    changeVisible=(e)=>{
      this.setState({
        visible:e,
      })
    }
    handleOk=(e)=>{
      const {oldpws,newpws,newpws1}=this.state;
      let bool=false;
       validatorCheck('pws',newpws,e=>{
        if(e===undefined){
               bool=true;
        }
        else{
           message.error(e);
           bool=false
           return 
        }
                 
      })
       if(bool){
            if(oldpws===''){
                   message.error("原始密码不能为空");
            }
           else  if(newpws===''){
                message.error("新密码不能为空");
            }
            else if(oldpws!==''&&oldpws===newpws){
              message.error("新密码和原始密码不能一样");
            }

            else if(newpws!==''&&newpws!==newpws1){
              message.error("两次新密码不一致");
            }
            else{
              this.setState({
                loading:true,
              })
                let data={
                  oldpwd:getmd5(oldpws),
                  newpwd:getmd5(newpws)
                }
          Ajax('post','front/query','user_resetpwd',data,(e)=>{
            this.setState({
                loading:false,
              })
            if(e.ret===1){
                this.setState({
                  Modalvisible:false
                })   
            }
            else {
               message.error(e.errmsg);
            }
        
         })
            }
       }
      


    }
    handleCancel=(e)=>{
      this.setState({
        Modalvisible:false,
      })
    }
    getNewFunc=(e)=>{
      this.setState({
        newpws:e.target.value
      })

      if(e.target.value===''){
            message.error("新密码不能为空");
        }

    }
    getNewFunc1=(e)=>{
      this.setState({
        newpws1:e.target.value
      })
      if(e.target.value===''){
            message.error("请再次输入新密码");
        }
    }
    getOldFunc=(e)=>{
      this.setState({
        oldpws:e.target.value
      })
       if(e.target.value===''){
            message.error("原始密码不能为空");
        }
    }
    render() {
     const {local_permit,visible,Modalvisible,loading,oldpws,newpws,newpws1,reloadLoading}=this.state;
     const menu =(<Menu onClick={this.onClickDrop.bind(this)} className="dropname">
            {/*<Menu.Item key="0">
              <p><img src={home}/>个人主页</p>
            </Menu.Item>*/}
           {local_permit["op_modify_pwd"]&&<Menu.Item key="1">
              <p><img src={edit} alt="修改密码"/>修改密码</p>
            </Menu.Item>} 
            <Menu.Item key="3"> <p><img src={out} alt="退出"/>退出登陆</p></Menu.Item>
          </Menu>)
        return (
            <Header  style={{ background: '#fff', padding: 0, height: 80 }} className="custom-theme topslide" >
                <Menu mode="horizontal" style={{ lineHeight: '80px'}}>
                  <Menu.Item key="quit" style={{  float: 'right',right:'.2%'}}>
                  </Menu.Item>
                   <Menu.Item key="quit1" style={{  float: 'right'}}>
                    <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.changeVisible}>
                    <a className="ant-dropdown-link" href=" ">
                      <span>{window.sessionStorage.getItem("loginuser")} </span>
                      <img src={visible?up:down} alt="下载文件"/>
                    </a>
                  </Dropdown>
                  </Menu.Item>
                 {local_permit["op_refresh_cache"]&& 
                  <Menu.Item key="last" className="updateCacheItem"   style={{  float: 'right'}}>
                      更新缓存: &nbsp;<Icon   onClick={this.updateCache} type={reloadLoading?"loading":"reload"} />
                  </Menu.Item>
                 }
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                        color: #555;
                        background: #f7f7f7;
                        position:'relative';
                        z-index:999
                    }
                     .ant-menu{
                  color: #fff;
                  background: #4D4D4D;}
                `}</style>
                <ModifyModal 
                visible={Modalvisible}
                loading={loading}
                oldpws={oldpws}
                newpws={newpws}
                 newpws1={newpws1}
                handleOk={this.handleOk}
                getOldFunc={this.getOldFunc}
                getNewFunc={this.getNewFunc}
                getNewFunc1={this.getNewFunc1}
                handleCancel={this.handleCancel}
                 />
              
                
            </Header>
        )
    }
}

export default HeaderCustom;