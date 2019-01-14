import React from 'react';
import { Modal, Button,Input ,message} from 'antd';
import { getajax } from '../../../public/ajax'
import { validatorCheck } from '../../../public/validator'
import { getmd5 } from '../../../public/getmd5';
const Ajax = getajax.ajaxFun;
class ModifyPassword extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    value:"",
    erromsg:""
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
     
      confirmLoading: true,
    });
    // 修改密码进行加密
    let data={"uid":this.props.uid,"newpwd":getmd5(this.state.value)}

    Ajax('post', 'front/query', 'user_adminresetpwd', data, (e) => {
      if (e.ret === 1) {
          console.log(e.data)
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }, 2000);
      } else {
          message.error(e.errmsg);
      }
  })
    
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  onChange=(e)=>{
    console.log("value",e.target.value)
     this.setState({value:e.target.value})
    // validatorCheck("pws", e.target.value, this.callback)
    
    
  }
  callback=(e)=>{
    console.log("e===",e)
    if(e===undefined){
      this.setState({erromsg:""})
    }else{
      this.setState({erromsg:e})
    }
   
  }
  password=(e)=>{
    validatorCheck("pws", e.target.value, this.callback)
   
  }

  render() {
    const { visible, confirmLoading, value,erromsg } = this.state;
    return (
      <div className="user_adminresetpwd">
        <Button type="default" onClick={this.showModal}>
         修改密码
        </Button>
        <Modal title="修改密码"
          visible={visible}
          className="user_adminresetpwd_model"
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
         <div className="data"><span>新密码:</span> 
         <Input value={value} onChange={this.onChange} onBlur={this.password}/></div>
        <p className="error">{erromsg}</p>
        </Modal>
      </div>
    );
  }
}
export default ModifyPassword;
