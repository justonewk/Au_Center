/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { message } from 'antd';
import UserManagementContentDetails from './UserManagementContentDetails';
import UserManagementHeader from '../UserManagementHeader';
import { groupdifferentRequest } from '../UserManagementCommonFuncs';
import { getajax } from '../../../public/ajax';
import { SetUserListData } from '../../../public/CommonFuncs'
import { browserHistory } from 'react-router';
import { root } from '../../../root';

import '../../../style/index.css';
import '../../../style/UserManagement.css';
import '../../../style/UserManagementDetail.css';
const rootapp = root();
const Ajax = getajax.ajaxFun;
// 角色基本信息转换


class UserManagementDetail extends React.Component {

    state = {
        LeftSlidedatalist: [],
        activeid: 1,
        admin: [], //用户列表的管理员
        group: [], //用户列表的成员
        hascheckbox: false, //不要复选框
        originalUserlist: [],
        selectedKeys: [],
        userOpPermit: {},
        subsysOpPermit:{},


    }
    GetUserManagemengGroup=(e) => { //获取全部用户组列表
        let data = {}
        Ajax('post', 'front/query', 'usergroup_list', data, this.GetUserManagemengCallback)
    }

    componentDidMount() {
        let userData = JSON.parse(window.sessionStorage.getItem("userData"))
        let userDataLocal_permit = userData.local_permit;
        // console.log("权限控制是什么",userDataLocal_permit)
        let obj = {};
        let roleobj={};
        for (let i in userDataLocal_permit) {
            if (i.indexOf("md_user_mgr") > -1) {
                let key = "";
                if (i.indexOf(".") > -1) {
                    key = i.split(".")
                    obj[key[1]] = userDataLocal_permit[i]
                }

            }else if(i.indexOf("md_subsys_mgr") > -1){
                 let key = "";
                if (i.indexOf(".") > -1) {
                    key = i.split(".")
                    roleobj[key[1]] = userDataLocal_permit[i]
                }
            }
        }
        console.log("用户权限控制是", obj)
        this.setState({
            userOpPermit: obj,
            subsysOpPermit:roleobj
        })
        this.getuserlist(obj);
        console.log(this.props.location.query.selectedKeys)
        if (this.props.location.query.selectedKeys) {
            groupdifferentRequest([this.props.location.query.selectedKeys], obj, this.onSetUserList, this.onDepartmentSuccess)
        }

    }

    onDepartmentSuccess=(data) => {
        if (data.ret === 1) {
            this.onSetUserList(data.data, "single", this.state.userOpPermit)
        } else {
            message.error(data.errmsg);
        }

    }

    getuserlist=(Permit) => {
        let userlist = window.sessionStorage.getItem("userList")

        let data = JSON.parse(userlist)

        this.GetUserManagemengGroup();

        this.onSetUserList(data, "all", Permit)

    }
    onSetUserList=(datas, str, Permit) => {
        let data = SetUserListData(datas, str, Permit)
        this.setState({
            "originalUserlist": datas,
            "admin": data.Admin,
            "group": data.group
        })
    }

    // 获取成功之后的操作
    GetUserManagemengCallback=(data) => {
        // console.log("datausergroup_list",data)
        // let allnum = GetUserALLnum(data.data);
        // // 根据权限判断是否添加全部数据

        let showdata = [{
            id: "-1",
            name: "全部用户",
            memnum: this.state.group.length
        }]
        this.state.userOpPermit.op_user_advancedmgr ? showdata.push(...data.data) : showdata = data.data;
        if (data.ret === 1) {
            this.setState({
                LeftSlidedatalist: showdata
            })
        } else {
            message.error(data.errmsg);
        }
    }
    onClickHeaderTab=(id) => {
        this.setState({
            activeid: id
        })
    }
    onDepartment=(usergroupid) => {
        console.log("左边点击的key", usergroupid)

        //跳转列表页
        browserHistory.push({
            pathname: rootapp+'app/UserManagement',
            query: {
                selectedKeys: usergroupid
            }
        })

    }
    //大区选择
    render() {
        console.log("用户详情的权限数据是什么", this.state.userOpPermit)
        return (
            <div >
         { /*用户管理的头部*/ }
    <UserManagementHeader
            activeid={this.state.activeid}
            onClickHeaderTab={this.onClickHeaderTab}
            />
      { /*用户管理内容*/ }
    <UserManagementContentDetails
            selectedKeys={[this.props.location.query.selectedKeys]}
            openKeys={this.props.location.query.selectedKeys.indexOf("-")>-1&&this.props.location.query.selectedKeys!=="-1"?[this.props.location.query.selectedKeys.split("-")[1]]:[]}
            activetabid={this.state.activeid}
            LeftSlidedatalist={this.state.LeftSlidedatalist}
            group={this.state.group}
            hascheckbox={this.state.hascheckbox}
            admin={this.state.admin}
            userOpPermit={this.state.userOpPermit}
            subsysOpPermit={this.state.subsysOpPermit}
            GetUserManagemengGroup={this.GetUserManagemengGroup}
            onceAjaxUserListdata={this.getuserlist}
            onDepartment={this.onDepartment}
            onSetUserList={this.onSetUserList}
            originalUserlist={this.state.originalUserlist}
            uid={this.props.location.query.uid}
            />
          </div>
        )
    }
}
export default UserManagementDetail;