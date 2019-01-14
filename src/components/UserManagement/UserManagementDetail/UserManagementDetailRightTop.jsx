import React from 'react';
import { Button, message, Modal, Row, Col } from 'antd';
import UserBaseMessageForm from '../UserBaseMessage'
import { getajax } from '../../../public/ajax'
import { browserHistory } from 'react-router';
import { root } from '../../../root';
import ModifyPassword from './ModifyPassword'
const Ajax = getajax.ajaxFun;
const confirm = Modal.confirm;
const rootapp = root();
class UserManagementDetailRightTop extends React.Component {

    state={
        tabList: [],
        tabDeafult: window.sessionStorage.getItem("rid"),
        isEditMode: false,
        nextButton: false,
        isdetails: true,
    }
    onEixt=() => {
        if (this.state.isEditMode) {
            this.onHandleSubmit()
            this.setState({
                isEditMode: false
            })
        } else {
            this.setState({
                isEditMode: true,
                nextButton: true
            })
        }

    }
    onHandleSubmit=(data) => {
        //提交表格数据
        let that = this;
        this.setState({
            isEditMode: false,
            nextButton: false
        })
        console.log("修改用户数据提交的表单",data)
        let datas = data;
        datas["uid"] = parseInt(this.props.uid,10)
        console.log("修改用户数据提交的表单", datas)

        Ajax('post', 'front/query', 'user_edit', datas, (e) => {
            if (e.ret === 1) {

                //调用绑定成功，从新请求用户的基本信息
                that.props.onOkRoleSucess(parseInt(that.props.uid,10))
            // that.props.onHandleCancel()
            message.success("操作成功")
            } else {
                message.error(e.errmsg);
            }
        })
    }
    onClose=() => {
        if (!this.state.isEditMode){
            // 没有编辑
            this.onDepartment()
        }else{
            // 正在编辑
            let that=this;
        confirm({
            title:  "正在编辑页面，确认取消",
            content: '',
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                that.setState({ isEditMode:false})
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        }

    }
    onDepartment = () => {
        let  usergroupid="-1"
        console.log("左边点击的key", usergroupid)

        //跳转列表页
        browserHistory.push({
            pathname: rootapp + 'app/UserManagement',
            query: {
                selectedKeys: usergroupid
            }
        })

    }

    render() {
        const {isEditMode, nextButton, isdetails} = this.state;
        const {userOpPermit} = this.props;
        return (
            <div className="userlist">
          <div className="top">
          <Row>
          <Col span={18} >
         
            <div className="name">{this.props.userDetaildata.nickname}</div>
            <div className="samll">{this.props.userDetaildata.usergroupname}</div>
          </Col>
          <Col span={6} className="option-edit">
        
          {userOpPermit.op_user_edit && !isEditMode&& <Button className="eidt" onClick={this.onEixt}>{isEditMode ? "保存" : "编辑"}</Button>}
          {userOpPermit.op_user_edit&&<ModifyPassword uid={parseInt(this.props.uid,10)}/>}
           <Button type="dashed" className="colse" onClick={this.onClose}>{isEditMode?"取消":"关闭"}</Button>
           </Col>
           </Row>
          </div>
          <div className="data userDetailBase">
           <UserBaseMessageForm
            title=""
            isEditMode={isEditMode}
            datavalue={this.props.userDetaildata}
            displayshow={nextButton}
            fontbutton="保存"
            onHandleSubmit={this.onHandleSubmit}
            isdetails={isdetails}
            />
          </div>
         </div>
        )
    }
}
export default UserManagementDetailRightTop;