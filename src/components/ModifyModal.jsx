import React from 'react';
import { Modal,Input,Button } from 'antd';

class ModifyModal extends React.Component{
	
    componentDidMount(){
      
    }
    render() {
    	const {visible,loading,oldpws,newpws,getNewFunc,newpws1,getNewFunc1,getOldFunc,handleOk,handleCancel}=this.props;
        return (
            <Modal
          title="修改登陆密码"
          visible={visible}
          footer={[
            <Button key="submit" type="primary" loading={loading}  onClick={handleOk}>确定</Button>,
            <Button key="back"   onClick={handleCancel}>
              取消
            </Button>,
          ]}
          width={400}
          className='ModifyModal'
          closable={false}
        >
          <div className='all'>
            <div className="label"><span>原始密码&nbsp;&nbsp;</span><Input type="password" onChange={getOldFunc} value={oldpws} onPressEnter={handleOk} placeholder="请输入原始密码"/></div>
            <div className="label"><span>&nbsp;新密码&nbsp;&nbsp;</span><Input type="password" onChange={getNewFunc} value={newpws} onPressEnter={handleOk}  placeholder="请输入新密码"/></div>
            <div className="label"><span>确认密码&nbsp;&nbsp;</span><Input type="password" onChange={getNewFunc1} value={newpws1}  onPressEnter={handleOk} placeholder="请输入新密码"/></div>

          </div>
        </Modal>
        )

    }
}
export default ModifyModal;