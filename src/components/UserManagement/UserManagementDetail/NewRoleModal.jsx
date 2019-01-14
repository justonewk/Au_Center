/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal, message } from 'antd';
import Multistage from '../../PublicComponent/Multistage/Multistage/Multistage'
import { getdefaultRoleData } from '../../../public/CommonFuncs'
import { getajax, getRolelist } from '../../../public/ajax'
const Ajax = getajax.ajaxFun;
class NewRoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bindingRole: [],
      defaultCheackRole: ["R5828180614"],
      defaultShowRole: [],
      roledata: [],
      constroledata: [],
    };
  }
  componentDidMount() {
    let roledata = JSON.parse(window.sessionStorage.getItem("conf_sysroles"))
    let defaultdata = getdefaultRoleData(this.props.userDetaildata.role)
    if (roledata == null) {
      getRolelist("conf_sysroles", this.sucRoleList);
    } else {
      this.setState({
        roledata: roledata,
        constroledata: roledata,
        defaultCheackRole: defaultdata.id,
        defaultShowRole: defaultdata.showdata,

      })
    }
  }
  sucRoleList = (e) => {
    if (e.ret === 1) {
      let defaultdata = getdefaultRoleData(this.props.userDetaildata.role)
      this.setState({
        roledata: e.data,
        constroledata: e.data,
        defaultCheackRole: defaultdata.id,
        defaultShowRole: defaultdata.showdata,
      })
      window.sessionStorage.setItem("conf_sysroles", JSON.stringify(e.data)) //游戏列表

      this.Delay()
    } else {
      message.error(e.errmsg);
    }
  }


  bindingRole = (datatemp) => {
    console.log("datatemp", datatemp)
    let data = {
      "uid": parseInt(this.props.uid,10),
      "roles": datatemp,
    }
    let that = this;
    Ajax('post', 'front/query', 'user_setrelateroles', data, (e) => {
      if (e.ret === 1) {

        //调用绑定成功，从新请求用户的基本信息
        that.props.onOkRoleSucess(parseInt(that.props.uid,10))
        that.props.onHandleCancel()
      } else {
        message.error(e.errmsg);
      }
    })
  }


  gameSelectOk = (checkedListGame) => {

  }
  gameSelectCancel = () => {
    //取消选择
  }
  handleCancel = () => {
    this.props.onHandleCancel()
  }
  onBindingRole = (relevancedata) => {
    this.setState({
      relevancedata
    })
  }
  render() {
    console.log("roledata", this.state.roledata)
    return (
      <Modal
        maskClosable={false}
        title="关联新角色"
        visible={this.props.addRoletag}
        width={800}
        onCancel={this.handleCancel}
        className="addNewuserToRole addNewuserToUserlist right"
        footer={null}
        key={JSON.stringify(this.state.defaultCheackRole)}
      >
        <div className="addnewrole">
          <Multistage
            handleCancel={this.handleCancel}
            bindingRole={this.bindingRole}
            Cannel={this.handleCancel}
            roledata={this.state.roledata}
            constroledata={this.state.constroledata}
            defaultCheackRole={this.state.defaultCheackRole}
            defaultShowRole={this.state.defaultShowRole}
            showCannel={true}
          />
        </div>

      </Modal>
    )
  }
}
export default NewRoleModal;