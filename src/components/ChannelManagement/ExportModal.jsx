import React, { Component } from 'react';
import { Modal,Icon,Button,message,Upload,Progress } from 'antd';
import {getajax} from '../../public/ajax';
import { getipconfig } from '../../getipconfig';
import $ from 'jquery'
const Ajax=getajax.ajaxFun;
const getip = getipconfig();
const fwposturl = getip.serverip;
const AjaxUpload=getajax.ajaxUpload;
const Dragger = Upload.Dragger;
class ExportModal extends Component {
    state = {
      user: '',
        data:'',
        fileList: [],//文件列表
        percent: 0,
        setIntervalTime: 1000,
        proActive: '',
        progressshow: 'none',
        proStaus: 'active',
        loading:false,
    };
    resetFileList=()=>{
      this.setState({
            fileList:[],
            progressshow: 'none',
            proStaus: 'active',
            percent:0,
          })
    }
    setPermitFunc=(e)=>{
     console.log("eeeeee",this.state.fileList,JSON.stringify(this.state.fileList[0]))
      this.timer = setInterval(function() {
            this.ProgressFunc();
        }.bind(this), 1000)
      let htData={
            gameid:this.props.radioCheck.toString(),
          }
         let formData = new FormData();
          formData.append('file',this.state.fileList[0]);
          AjaxUpload('post','front/readExcel','checkout_agentorchannel',htData,formData,(e)=>{
          
           if(e.ret==1){
             message.success("导入成功")

             this.setState({
                       percent: 100,
                       loading:false,
                        proStaus: 'success',
                  })
            clearInterval(this.timer)
             this.resetFileList();
             this.props.upLoadSuccess();
             this.props.hideExportFunc()
           }
           else{
            this.setState({
                        percent: 100,
                         loading:false,
                        proStaus: 'exception',
                  })
            clearInterval(this.timer)
                this.props.upLoadSuccess();
               //window.location.href = fwposturl + e.data;
                message.error("导入失败:"+e.errmsg);
                setTimeout(() => {
                    this.setState({
                       progressshow: 'none',
                       present: 0,
                       proStaus: 'active',
                    });
               }, 3000);
           } 
          })
        }  
    ProgressFunc=()=>{
      let data={}
       Ajax('post','front/query','progress_bar',data,(e)=>{
         let presentData = JSON.parse(e);
         this.setState({
            percent: ((presentData.data) * 100).toFixed(2),
            proStaus: 'active',
          })
      })
    }
    handleOk=()=>{
      this.setState({
        progressshow:"block",
        percent:0,
        proStaus: 'active',
        loading:true,
      })
       this.setPermitFunc()
    }
    handleCancel=()=>{
       this.props.hideExportFunc()
    }
    render() {
      const {visible,gameToname}=this.props;
      const {loading}=this.state
      const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file.type)
        if (file.type.indexOf('sheet')>-1||file.type.indexOf('excel')>-1) {
           this.setState(({ fileList }) => ({
            fileList: [ file],
            progressshow:"block",
            percent:0,
             proStaus: 'active',
            }));

         }
         else{
           message.error('请选择excel文件');
                return false
         }
       
        return false;
      },
      fileList: this.state.fileList,
    };
        return (
            <Modal
            maskClosable={false}
             visible={visible}
            title={'导入'+gameToname+'渠道数据'}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button   loading={loading} disabled={this.state.fileList.length!=1} key="handleOk" type="primary" loading={loading} onClick={this.handleOk}>
               上传
              </Button>,
              <Button key="onCancel"  onClick={this.handleCancel}>取消</Button>,
          ]}
            >
               <Dragger   {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
            <p className="ant-upload-hint">渠道文件类型:.xls/.xlsx</p>
          </Dragger>
            <Progress status={this.state.proStaus} percent={this.state.percent}  width={400} style={{
                'display': this.state.progressshow
            }} />
            </Modal>
        )
    }
}

export default ExportModal;