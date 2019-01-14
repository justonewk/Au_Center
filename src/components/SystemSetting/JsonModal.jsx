import React, { Component } from 'react';
import { Modal,Icon,Button,message,Input } from 'antd';
import {getajax} from '../../public/ajax';
const Ajax=getajax.ajaxFun;
const {TextArea} = Input;
class JsonModal extends Component {
    state = {

    };


   
    handleOk=()=>{
      this.props.Submit()
    }
    handleCancel=()=>{
       this.props.hideModal()
    }
    TextChange=(e)=>{
      console.log(e)
      this.props.DataChange(e.target.value)
    }
    render() {
      const {visible,loading,data,title,errmsg}=this.props;
        return (
            <Modal
             maskClosable={false}
             visible={visible}
             width={500}
             className="JsonModal"
             title={title}
             onOk={this.handleOk}
             onCancel={this.handleCancel}
            footer={[
              <Button   loading={loading}  key="handleOk" type="primary" loading={loading} onClick={this.handleOk}>
               提交
              </Button>,
              <Button key="onCancel"  onClick={this.handleCancel}>取消</Button>,
          ]}
            >
            <div className="textdiv">
              <TextArea style={{"resize":"none"}}  className="ContentText"
                  onChange={this.TextChange} value={data} 
                 ></TextArea>
                 
            </div>
             <p className="errorTip" >{errmsg}</p>
            </Modal>
        )
    }
}

export default JsonModal;