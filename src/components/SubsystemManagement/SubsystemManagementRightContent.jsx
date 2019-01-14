import React from 'react';
import SystemCard  from '../PublicComponent/SystemCard/SystemCard';
import { Button,Row, Col ,Modal,message } from 'antd';
import {browserHistory } from 'react-router';
import FrontSeek from '../PublicComponent/FrontSeek';
import subtemp from '../../style/imgs/addtemp.png';
import {getajax} from '../../public/ajax'
import { root } from '../../root';
const Ajax=getajax.ajaxFun;
const confirm = Modal.confirm;
const rootapp = root();
class SubsystemManagementRightContent extends React.Component {
    state = {
      CardData:[],
      constCardData:[],
      };
    getDetail=(e)=>{
      //console.log(window.sessionStorage.getItem("SystemCard"))
      console.log("这里是什么",e)
       window.sessionStorage.setItem("syslid",e.syslid);
       browserHistory.push({
         pathname: rootapp+'app/SubsystemDetail',
       })

    }
     getRoleDetail=(e)=>{
      
       browserHistory.push({
         pathname: rootapp+'app/RoleDetail',
         state:{uid:e},
       })

    }
    Switch=(sys)=>{
      let that=this;
      confirm({
        title:sys.sysstate===0?('禁用'+sys.sysname+'?'):('启用'+sys.sysname+'?'),
        content: '',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
        let state=sys.sysstate===0?1:0;
          console.log('OK');
        let  data={
                   "slid":sys.syslid,
                   "sysstate":state
              }
      Ajax('post','front/query','system_changestate',data,(e)=>{
        if(e.ret===1){
          message.success(sys.sysstate==0?('禁用'+sys.sysname+'成功'):('启用'+sys.sysname+'成功'));
          that.getSystemCard();
        }
        else{
           message.error(e.errmsg);
        }
     })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  
    }
    AddNewSub=()=>{
     
      browserHistory.push({
        pathname: rootapp+'app/AddNewSubsystem',
         // state:{uid:e.key},
      })
    }
     getSystemCard=()=>{//获取子系统列表
      let subid=window.sessionStorage.getItem("subid")==null?'-1':window.sessionStorage.getItem("subid")
       let data={
          sysgroupid:subid,
      }
      Ajax('post','front/query','systemgroup_details',data,(e)=>{
        console.log("详情走这里","systemgroup_details")
        if(e.ret===1){
          window.sessionStorage.setItem("SystemCard",JSON.stringify(e.data))
          this.setState({
            CardData:e.data,
            constCardData: e.data
          })
        }
        else{
           message.error(e.errmsg);
        }
     })
    }
    componentWillReceiveProps(nextprops){
        window.sessionStorage.setItem("SystemCard",'')
       this.getSystemCard();
     }
     componentDidMount(){
       window.sessionStorage.setItem("SystemCard",'')
      this.getSystemCard();
    }
  seek=(data)=>{
    this.setState({

      CardData:data
    })
  }
    render() {
      const {local_permit}=this.props;
        return (
         <div className="userlist">
          <div className="topBtnGroup">
                           
           { local_permit["md_subsys_mgr.op_subsys_advancedmgr"]&&window.sessionStorage.getItem("subid")!=-1&&<Button onClick={this.AddNewSub} type="primary" className="addchildSys">新增子系统</Button>} 
              <div className="titleserch" >
                <FrontSeek dataall={this.state.CardData}
                   placeholder="请输入子系统名称"
                  serchGroup={this.state.constCardData} tag="role" seek={this.seek} />
              </div>
          </div>
          <div className="systemCardGroup">
          {this.state.CardData.length===0?<img className="subtemp" src={subtemp} />:
          <Row gutter={36} >
          {this.state.CardData.map(function(item,index) {
             return(
              <Col className="sysitem" key={index} lg={8} xl={8} xxl={6}>
              <SystemCard
                key={item.sysname}
               local_permit={local_permit}
               getDetail={this.getDetail}
               Switch={this.Switch}
               data={item}
               />
            </Col>
              )
          }.bind(this))
        }
          </Row>
          }
          </div>   
         </div>
        )
    }
}
export default SubsystemManagementRightContent;