import React from 'react';
import { Link,browserHistory } from 'react-router';
import { Steps,Input,Tree,Button,message,Modal} from 'antd';
import SearchTree from '../PublicComponent/SearchTree/SearchTree'
import '../../style/AddNewRole.css';
import {getajax} from '../../public/ajax';
import { root } from '../../root';
const rootapp = root();
const Step = Steps.Step;
const Ajax=getajax.ajaxFun;
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
class AddNewRoleRightContent extends React.Component {
  constructor(props) {
    super(props);
  };
 state={
  current:0,
  rolename:'',
  roledesc:'',
  roletree:[],
  topbtnDisable:true,
  errname:'',
  errmemo:'',
 }
   ColseFunc=()=>{//关闭当前页面
    //let that=this;
    const {rolename,roledesc,roletree}=this.state
    confirm({
    title: rolename!=''||roledesc!=''||roletree.length!=0?"你当前还有内容没有保存,是否确定关闭":"是否确定关闭当前页面",
    content:'',
    okText:"确认",
    cancelText:"取消",
    okType: 'danger',
    onOk() {
      browserHistory.push({
         pathname:rootapp+'app/SubsystemDetail',
       })
    },
    onCancel() {
      console.log('Cancel');
    },
  });
      
  }
 getSameRole=(value)=>{
  let data={
        rolename:value,
        "slid":this.props.location.state.uid,
    }
    let that=this;
   Ajax('post','front/query','role_name_verification',data,(e)=>{
        if(e.ret===1){
                that.setState({
                  topbtnDisable:false,
                  errname:""
                })
                return true;
              }
              else{
                that.setState({
                  topbtnDisable:true,
                  errname:e.errmsg
                })
                return false;
                /*message.error(e.errmsg)*/
                
         }
     })
 }
 changeName=(e)=>{
  this.setState({
      rolename:e.target.value
    })
 }
 HandelName=(e)=>{
    if(e.target.value==''){
      this.setState({
                  topbtnDisable:true,
                  errname:"请输入角色名称"
                })
    }
    else if(e.target.value.length>16||e.target.value<2){
       this.setState({
         topbtnDisable:true,
        errname:"角色名称长度为2-16位"
      })

        return 
    }
    else{
      this.getSameRole(e.target.value)
    }
    
 }
 HandelDesc=(e)=>{
   if(e.target.value.length>20){
     this.setState({
      errmemo:"角色简介内容不能超过20个字"
      }) 
    }
    else{
      this.setState({
      errmemo:""
      })
    }
   this.setState({
      roledesc:e.target.value
    })
   // if(e.target.value==''){
   //    message.error("请输入角色简介");
   //  }
 }
 nextStep=(e)=>{
  if(e==1){
    if(this.state.rolename==''){
      this.setState({
        errname:"请输入角色名称"
      })
      
     return 
    }
    else if(this.state.rolename.length>16||this.state.rolename.length<2){
       this.setState({
        errname:"角色名称长度为2-16位"
      })

        return 
    }
    else{
      console.log("hutao")
      // this.setState({
      //   errname:""
      // })
      this.getSameRole(this.state.rolename)
       
       }
     if(this.state.roledesc.length>20){
          this.setState({
            errmemo:"角色简介长度不超过20位"
          })
         
            return 
        }
        if(this.state.roledesc.length<=20){
          this.setState({
            errmemo:""
          })
         
           
        }
        
         console.log("hutaoqqq",e)  
    }
    this.setState({
           current:e
          })
   
 }
 upStep=(e)=>{
  this.setState({
    current:e
   })
 }
 getCheckData=(e)=>{//获取tree选中值
   console.log("tree",e);
   this.setState({
    roletree:e,
   })
 }
 AddRoleFunc=()=>{
   let data={
          "slid":this.props.location.state.uid,
          "rolename":this.state.rolename,
          "roleintroduct":this.state.roledesc,
          "permitlist":this.state.roletree.toString()
      }
      Ajax('post','front/query','role_add',data,(e)=>{
        console.log(e)
         if(e.ret==1){
              message.success("新增角色成功");
              this.setState({
                rolename:'',
                roledesc:'',
                roletree:[],
                current:0
              })
          }
          else{
             message.error("新增角色失败:"+e.errmsg);
          }
      })
 }
  render() {
    const {errmemo,errname,current,rolename,roledesc,roletree,topbtnDisable}=this.state;
    //const {getCheckData}=this.getCheckData
    const first=(
      <div className="first">
        <p className='title'> 角色名称及内容简介</p>
        <div className="item"><p className="name">角色名称</p>
        {current==0?
          <div className="myname">
          <Input onPressEnter={this.nextStep.bind(this, 1)} className={errname==""?"text":"err text"} value={rolename}  placeholder="请输入角色名称" onChange={this.changeName}  onBlur={this.HandelName}/>
          <span className="errtips">&nbsp; &nbsp;{errname}</span>
          </div>
          :<p className="text">{rolename}</p>
        }
        </div>
        <div className="item"><p className="name">角色简介</p>
         {current==0?
            <div><Input onPressEnter={this.nextStep.bind(this, 1)} className={errmemo==""?"text":"err text"} value={roledesc}  placeholder="请输入角色简介,不超过20个字" onChange={this.HandelDesc}/>
            <span className="errtips">&nbsp; &nbsp;{errmemo}</span>
            </div>
            :<p className="text">{roledesc}</p>
         }
        </div>
         {current==0&&
            <Button disabled={topbtnDisable} className="marginB30" type="primary" onClick={this.nextStep.bind(this, 1)}>下一步</Button>
        }
      </div>
      )
    const seconed=(
       <div>
        <p className='title' style={{marginBottom:0}}> 角色名称及内容简介</p>
         {current==1||current==2?
          <div className="checkList">
           <SearchTree checkable={true}  TreeData={JSON.parse(window.sessionStorage.getItem("permit"))} defaultTree={roletree} getCheckData={this.getCheckData.bind(this)} current={current} ></SearchTree>
          </div>:''}
         {current==1&&
          <div>
            <Button type="primary" onClick={this.nextStep.bind(this, 2)}>下一步</Button>
            <Button className="typeText" onClick={this.upStep.bind(this, 0)}>保存并返回上一步</Button>
          </div>
        }
         
       </div>
      )
    const third=(
      <div>
      <p className='title'> 保存和编辑内容并生成新角色</p>
      {current==2&&
        <div >
          <Button type="primary" onClick={this.AddRoleFunc.bind(this, 0)}>完成新增</Button>
          <Button className="typeText" onClick={this.upStep.bind(this, 0)}>重新编辑</Button>
        </div>
      }
      </div>
      )
    return (
      <div className="userlist AddNewRole"> 
      <p className="addroletitle">{window.sessionStorage.getItem("subname")===undefined?"全部子系统":window.sessionStorage.getItem("subname")}/{this.props.location.state.uname}/<span>新增角色</span></p>
       <h2 style={{float:"left"}}>{this.props.location.state.uname}新增角色</h2>
        <Button style={{float:'right'}} onClick={this.ColseFunc}  className="Btn closeBtn">关闭</Button>
       <Steps style={{margin:'60px 0'}} direction="vertical" size="small" current={current}>
        <Step title="填写角色基本信息" description={first} />
        <Step title="选择子系统内可访问的权限" description={seconed} />
        <Step title="完成" description={third} />
      </Steps>
      </div>
    )
  }
}
export default AddNewRoleRightContent;