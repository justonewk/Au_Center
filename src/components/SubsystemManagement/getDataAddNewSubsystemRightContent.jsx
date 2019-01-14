import React, { Component } from 'react';
import $ from 'jquery';
import { message, Button } from 'antd';
import {getajax} from '../../public/ajax';
import { RemovingChannelUsers} from '../../public/CommonFuncs'
const Ajax=getajax.ajaxUpload;
const getDataAddNewSubsystemRightContent= WrappedComponent => class extends Component {
constructor(props) {
        super(props);
        console.log("fff",props)
    }
    state={
      datavalue:{},
      imgFileReset:false,//清空图片
      readyImg:false,
      readyFile:false,
       imgname:'',
       Filename:'',
      
    }
    setImg=(readyImg,imgname)=>{
      console.log("imgname",readyImg,imgname)
       this.setState({
            readyImg:readyImg,
            imgname:imgname
           })
    }
    setFile=(readyFile,Filename)=>{
      console.log("Filename",Filename)
      this.setState({
            Filename:Filename,
            readyFile:readyFile
           })
    }
   onOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return ;
      }
       console.log("form:",values)
       // Ajax('post','front/querywithupload','system_add',values,(e)=>{
       //    console.log("fanhui:",e)
       //    })
       let htData={
            name:values.name,
            group:values.group,
            loginlink:values.loginlink,
            memo:values.memo,
            noticelink:values.noticelink,
            support_games:values.support_games.toString(),
            version:values.version,
            contact_uid:values.contact_uid.toString()
          }
       let formData = new FormData();
         if(values.icon!=undefined&&values.icon!=''){
           formData.append('icon', values.icon.file);
         }
          formData.append('permitDef',values.permitDef.file);
          Ajax('post','front/querywithupload','system_add',htData,formData,(e)=>{
           if(e.ret==1){
             form.resetFields();
             this.setState({
              readyImg:false,
              readyFile:false,
               imgname:'',
               Filename:'',
             })
             this.props.CallbackData(e)
           }
           else{
            this.props.CallbackData(e)
             //message.error(e.errmsg)
           }
           
          })
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
    render() {
      console.log("userList===44",JSON.parse(window.sessionStorage.getItem("userList")).length)
    	const props={
    		...this.props,
    		onOk:this.onOk,
        GroupList: JSON.parse(window.sessionStorage.getItem('groupList')),
        defaultGroupId:window.sessionStorage.getItem("subid"),//默认选择分组
    		defaultData:this.props.defaultData==undefined?{}:this.props.defaultData,
    		wrappedComponentRef:this.saveFormRef,
    		onCancel:this.props.onCancel,
        imgFileReset:this.state.imgFileReset,
        setImg:this.setImg,
        setFile:this.setFile,
        readyImg:this.state.readyImg,
        readyFile:this.state.readyFile,
        imgname:this.state.imgname,
        Filename:this.state.Filename,
        userList:RemovingChannelUsers(JSON.parse(window.sessionStorage.getItem("userList")))
    	}
        return (
         <div className="">
         <WrappedComponent {...props} />
        </div>);
    }
};
export default getDataAddNewSubsystemRightContent;
