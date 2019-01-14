/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import {  message } from 'antd';
import UserManagementContent from './UserManagementContent';
import UserManagementHeader from './UserManagementHeader';
import { getajax, getDepartmentUserList } from '../../public/ajax';
import { SetUserListData,RemovingChannelUsers } from '../../public/CommonFuncs'
import '../../style/index.css';
import '../../style/UserManagement.css';
const Ajax = getajax.ajaxFun;


class UserManagement extends React.Component {
   
    state = {
        LeftSlidedatalist: [],
        activeid: 1,
        admin: [], //用户列表的管理员
        group: [], //用户列表的成员
        serchGroup:[],
        groupdata:[],//用户分组
        hascheckbox: false, //不要复选框
        originalUserlist: [],
        userOpPermit: {},
        newaddfont:"新增用户",
        ajaxusertag:true,
    }
    GetUserManagemengGroup=(e) => { //获取全部用户组列表
        let data = {}
    
        Ajax('post', 'front/query', 'usergroup_list', data, this.GetUserManagemengCallback)
    }
    

    componentDidMount() {
        console.log("查询数据是什么+++++", this.props.location.query.selectedKeys)
        if (this.props.location.query.selectedKeys) {
            //   //详情页面过来
            this.differentRequest([this.props.location.query.selectedKeys])
        }
        //获取权限
        let userData = JSON.parse(window.sessionStorage.getItem("userData"))
        let userDataLocal_permit = userData.local_permit;
        console.log("权限控制是什么", userDataLocal_permit,userData.length)
        let obj = {};
        for (let i in userDataLocal_permit) {
            if (i.indexOf("md_user_mgr") > -1) {
                let key = "";
                if (i.indexOf(".") > -1) {
                    key = i.split(".")
                    obj[key[1]] = userDataLocal_permit[i]
                }

            }
        }
        console.log("用户权限控制是", obj)
        this.setState({
            userOpPermit: obj
        })
        this.getuserlist(obj)
    }

    getuserlist=(Permit) => {
        let userlist = window.sessionStorage.getItem("userList");
        // console.log("过滤之前的数据userlist",userlist)
        let data = RemovingChannelUsers( JSON.parse(userlist))
        this.GetUserManagemengGroup();
        // console.log("过滤之后的数据",data)
        /*表示一来就请求的全选用户列表,usergroupid? */
       Permit.op_user_advancedmgr&&this.onSetUserList([],data, "all", Permit)
    }
    onSetUserList=(groupinfo,datas, str, Permit) => {
        console.log("userOpPermit", this.state.userOpPermit)
         
        let data = SetUserListData(datas, str, Permit)
        console.log("newdata===============", data,datas)
        this.setState({
            originalUserlist: datas,
            admin: data.Admin,
            group: data.group,
            groupdata:groupinfo,
            serchGroup: data.group
        })
    }
    // componentWillReceiveProps (){
    //  // console.log("这里来了￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥")
    //   this.getuserlist();
    // }
    // 获取成功之后的操作
    GetUserManagemengCallback=(data) => {

        // let allnum = GetUserALLnum(data.data);
        // 根据权限判断是否添加全部数据
        console.log(" this.state.group,this.state.originalUserlist", this.state.group,this.state.originalUserlist)
        // 读取本地的的全部数据 
        // let userlist = window.sessionStorage.getItem("userList")
        // let datatemp = JSON.parse(userlist)
        // console.log("datatemp.length=========",datatemp.length,this.state.group.length)
        let datatemp = window.sessionStorage.getItem("userList")
        // let data = RemovingChannelUsers( JSON.parse(userlist))
        let userlist =RemovingChannelUsers(JSON.parse(datatemp))
        let showdata = [];
        // if(this.state.ajaxusertag){
           let obj= {
                id: "-1",
                name: "全部用户",
                memnum:userlist.length
            }
            showdata.push(obj)
        // }
        
        this.state.userOpPermit.op_user_advancedmgr ? showdata.push(...data.data) : showdata = data.data;
        console.log("showdata",showdata)
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
        this.differentRequest(usergroupid)


    }
    differentRequest=(usergroupid) => {
        console.log("数据不是吗？", usergroupid)
        let newaddfontshow ="";
        if (usergroupid[0] === "-1") {
            // 查看全部用户
            let userlist = window.sessionStorage.getItem("userList")
            let datas = JSON.parse(userlist)
            this.onSetUserList([],datas, "all", this.state.userOpPermit)
            newaddfontshow="新增用户"
            // 是否获取的是全部用户
            this.setState({ajaxusertag:true})
        } else {
            let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid;
            // newaddfontshow = usergroupid[0].indexOf("-") > -1 ? "新增成员" : "新增管理员"
            newaddfontshow="新增成员";
            let parentid = useriddata[1] ? useriddata[1] : ""
            
            let data = {
                "usergroupid": useriddata[0],
                "parentgroupid": parentid,
               
            }
            this.setState({ajaxusertag:false})
            // console.log("上传的数据", data)
            getDepartmentUserList(data, this.onDepartmentSuccess)
        }
        this.setState({newaddfont: newaddfontshow})
    }
    onDepartmentSuccess=(data) => {
        if (data.ret === 1) {
            this.onSetUserList(data.groupinfo,data.data, "single", this.state.userOpPermit)
        } else {
            message.error(data.errmsg);
        }

    }
    seek=(data)=>{
    this.setState({
        group: data
    })
    }
    //大区选择
    render() {
        // console.log("this.state.userOpPermit",this.state.userOpPermit)
        return (
            <div  className="userWrapper">
         { /*用户管理的头部*/ }
    <UserManagementHeader
            activeid={this.state.activeid}
            onClickHeaderTab={this.onClickHeaderTab}
            />
      { /*用户管理内容*/ }
    <UserManagementContent
            selectedKeys={this.props.location.query.selectedKeys ? [this.props.location.query.selectedKeys] : ["-1"]}
            openKeys={this.props.location.query.selectedKeys ?(this.props.location.query.selectedKeys.indexOf("-")>-1&&this.props.location.query.selectedKeys!=="-1"?[this.props.location.query.selectedKeys.split("-")[1]]:[]):[]}
            activetabid={this.state.activeid}
            LeftSlidedatalist={this.state.LeftSlidedatalist}
            group={this.state.group}
            serchGroup={this.state.serchGroup}
            seek={this.seek}
            hascheckbox={this.state.hascheckbox}
            admin={this.state.admin}
            userOpPermit={this.state.userOpPermit}
            GetUserManagemengGroup={this.GetUserManagemengGroup}
            onceAjaxUserListdata={this.getuserlist}
            onDepartment={this.onDepartment}
            onSetUserList={this.onSetUserList}
            groupdata={this.state.groupdata}
            newaddfont={this.state.newaddfont}
            originalUserlist={this.state.originalUserlist}
            />
          </div>
        )
    }
}
export default UserManagement;