import React from 'react';
import { Tabs, message } from 'antd';
import UserManagementDetailRightTop from './UserManagementDetailRightTop'
import UserManagementDetailRightBottom from './UserManagementDetailRightBottom'
import { groupdifferentRequest, getUserRoleList } from '../UserManagementCommonFuncs';
import { getUserDetails } from '../../../public/ajax';

const TabPane = Tabs.TabPane;

class UserManagementDetailRight extends React.Component {
 
    state={
        tabList: [],
        tabDeafult: window.sessionStorage.getItem("uid"),
        userDetaildata: [],
        roledata: []

    }
    componentDidMount() {
        //请求当前分组下的用户
        // this.props.groupingid
        groupdifferentRequest(this.props.groupingid, this.props.userOpPermit, this.onSetUserList, this.onDepartmentSuccess)

    }
    onDepartmentSuccess=(data) => {
        console.log("请求3")
        if (data.ret === 1) {
            this.onSetUserList(data.data, "single", this.props.userOpPermit)
        } else {
            message.error(data.errmsg);
        }

    }
    // 和用户列表的onSetUserList是不一样的函数，不能混改
    onSetUserList=(datas) => {
        //请求的是头部的列表数据

        let tempuid = "";
        if (this.props.uid) {
            tempuid = this.props.uid.toString()
        } else {
            tempuid = datas[0].uid.toString()
        }
        this.ajaxuserDetail(parseInt(tempuid,10))
        this.setState({
            "tabList": datas,
            tabDeafult: tempuid
        })
    }
    // 请求用户的详情信息
    ajaxuserDetail=(uid) => {
        let data = {
            "uid": uid,
        }
        getUserDetails(data, this.ScussuserDetail)
    }
    ScussuserDetail=(data) => {
        if (data.ret === 1) {
            this.setState({
                userDetaildata: data.data,
                roledata: getUserRoleList(data.data.role, this.props.userOpPermit,this.props.subsysOpPermit)
            })
        } else {
            message.error(data.errmsg);
        }
    }
    onOkRoleSucess=(uid) => {

        let data = {
            "uid": uid,
        }
        getUserDetails(data, this.ScussuserDetail)
    }
    MenuTab=(key) => {
        // console.log("tabkey",key);

        this.ajaxuserDetail(parseInt(key,10))
        this.setState({
            tabDeafult: key
        })
    }

    render() {
        const {tabDeafult, tabList, userDetaildata, roledata} = this.state;
        console.log("this.roledata======",roledata)
        let _this = this;
        const {userOpPermit,subsysOpPermit} = this.props
        return (
            <div className="userlist">
            <Tabs defaultActiveKey={tabDeafult} activeKey={tabDeafult} onChange={this.MenuTab}>
               {tabList.map(function(item, index) {
                return (
                    <TabPane tab={item.nickname + "(" + item.username + ")"} key={item.uid.toString()}>
                   <UserManagementDetailRightTop
                    userDetaildata={userDetaildata}
                    uid={tabDeafult}
                    userOpPermit={userOpPermit}
                    onOkRoleSucess={_this.onOkRoleSucess}
                    />
                   <UserManagementDetailRightBottom
                    uid={tabDeafult}
                    role={roledata}
                    userOpPermit={userOpPermit}
                    subsysOpPermit={subsysOpPermit}
                    userDetaildata={userDetaildata}
                    onOkRoleSucess={_this.onOkRoleSucess}
                    />
                 
                    </TabPane>
                )
            })
            }
         </Tabs>
         </div>
        )
    }
}
export default UserManagementDetailRight;