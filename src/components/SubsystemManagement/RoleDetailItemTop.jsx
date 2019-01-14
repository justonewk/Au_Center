import React from 'react';
import {Button,message,Input,Upload, Icon,Modal} from 'antd'
import {Link,browserHistory } from 'react-router';

import {getajax} from '../../public/ajax';
import defaultimg from  '../../style/imgs/subsys.png';
import { getipconfig } from '../../getipconfig';
const getip = getipconfig();
const confirm = Modal.confirm;
const imgurl = getip.serverip+'temp/';
const Ajax=getajax.ajaxFun;
const Ajaxupload=getajax.ajaxUpload;
class RoleDetailItemTop extends React.Component {
  constructor(props) {
    super(props);
  };
  state={
    isEditMode:false,
    datavalue:{
      rid:'',
      name:'',
      memo:'',
      time:'',
      sysname:window.sessionStorage.getItem("subname"),
     },
     roleState:1,

  }
  GoEdit=()=>{
    this.setState({
      isEditMode:true,
    })
  }

  testFunc=(e)=>{//保存数据提交的回调
   const {datavalue}=this.props;
   if(datavalue.name==''||datavalue.name==null){
      message.error("请输入角色名称");
      return
   }
   else if(datavalue.name.length>16||datavalue.name.length<2){
      message.error("角色名称长度为2-16位")
      return
   }
   if(datavalue.memo.length>20){
         message.error("角色简介长度不超过20位");
         return 
      }
   let htData={
            roleid:datavalue.rid,
            rolename:datavalue.name,
            roleintroduct:datavalue.memo
           
          }
     Ajax('post','front/query','role_edit',htData,(e)=>{
           if(e.ret==1){
            message.success("保存成功")
            this.setState({
                isEditMode:false,
              })
            this.props.getTopData();
           }
           else{
             message.error(e.errmsg)
           }
         }
           )

  }
  ColseFunc=()=>{//关闭
    //let that=this;
    const {isEditMode}=this.state
    confirm({
    title: isEditMode?"你当前还有内容没有保存,是否确定关闭":"是否确定关闭当前页面",
    content:'',
    okText:"确认",
    cancelText:"取消",
    okType: 'danger',
    onOk() {
     browserHistory.push({
         pathname:'/app/SubsystemManagement',
       })
    },
    onCancel() {
      console.log('Cancel');
    },
  });
      
  }
   SetName=(e)=>{//编辑子系统名称
    let val=e.target.value;

     if(val!=null&&val!=''){
        this.props.SetName(val)
     }
     else if(val.length>16||val.length<2){
      this.props.SetName(val)
       message.error("角色名称长度为2-16位")
     }
     else{
       this.props.SetName(val)
        message.error("请输入角色名称")
     }
  }
  SetMemo=(e)=>{//编辑简介
      let val=e.target.value;
      if(val.length>20){
         message.error("角色简介长度不超过20位");
         return 
      }
     this.props.SetMemo(val)
  }
  CancelDeit=()=>{//取消按钮
    this.setState({
           isEditMode:false,
      })
        this.props.getTopData();
  }
  


  render() {
    const {isEditMode}=this.state;
    const {datavalue,roleState,local_permit}=this.props;
    return (
      <div className="SubsystemDetailItemTop"> 
       <div className='top'>
        
         <div className="title" style={{paddingLeft:0}}>
         {!isEditMode?<h2>{datavalue.name}</h2>:
          <div><p className="leftName">角色名称:</p><Input onPressEnter={this.testFunc} className="setName" value={datavalue.name} onChange={this.SetName} onBlur={this.SetName} placeholder="请输入子系统名称"/></div>
         }
           <span>创建于{datavalue.time}</span>
         </div>
          {!isEditMode?<Button onClick={this.ColseFunc}  className="Btn closeBtn">关闭</Button>
           :<Button onClick={this.CancelDeit}  className="Btn closeBtn">取消</Button>}
          {roleState==0&&isEditMode&&<Button onClick={this.testFunc} className="Btn" type="primary">保存</Button>
          }
          {roleState==0&&!isEditMode&&local_permit["md_subsys_mgr.op_subsys_editrole"]&&
          <Button onClick={this.GoEdit}  className="edit Btn">编辑</Button>
          }
         </div>
        {!isEditMode?
         <p className='desc' style={{'paddingLeft':"20px"}}>{datavalue.memo}</p>:
        <div className="roleDetailItem"><p className="leftName">角色简介:</p><Input onPressEnter={this.testFunc} className="setdesc"  onChange={this.SetMemo} onBlur={this.SetMemo} value={datavalue.memo}  placeholder="请输入简介,不能超过20个字"/></div>
        }
        <div className='form'>
        <div className="roleItem">
             <p className='itemtitle'>所属子系统</p> 
             <p className='itemtext'>{datavalue.sysname}</p> 
        </div>
        <div className="roleItem">
             <p className='itemtitle'>角色Id</p> 
             <p className='itemtext'>{datavalue.rid}</p> 
        </div>
        </div>
      </div>
    )
  }
}
export default RoleDetailItemTop;