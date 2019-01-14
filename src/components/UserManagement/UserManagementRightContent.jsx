/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import {  Checkbox, Button, Modal, message, Pagination } from 'antd';
import { getajax, getUserList, getDepartmentUserList } from '../../public/ajax';
import { browserHistory } from 'react-router';
import ContentList from '../PublicComponent/ContentList/ContentList';
import CardBoxs from '../PublicComponent/CardBoxs/CardBoxs';
import NewmemberModal from './NewmemberModal'
import { root } from '../../root';
import FrontSeek from '../PublicComponent/FrontSeek';
import usertemp from '../../style/imgs/addtemp.png';
import UserModifyBatch from './UserModifyBatch'
// UserModifyBatch
const rootapp = root();
// 角色基本信息转换
//模拟的假数据
const Ajax = getajax.ajaxFun;
const confirm = Modal.confirm;
class UserManagementRightContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pagenum: 1,  
        };
    }
    getUserListSuccess=() => {
        // console.log("执行顺序")
        // setTimeout(() => {
            const {userOpPermit}=this.props;
        this.props.onceAjaxUserListdata(userOpPermit)
     // },0);
    }
    onDepartmentSuccess=(data) => {
        console.log("右边数据请求没有",data)
        if (data.ret === 1) {
            // 请求右边的用户列表数据
            this.props.onSetUserList(data.groupinfo,data.data, "single", this.props.userOpPermit)
            //请求左边的用户数据
          
        } else {
            message.error(data.errmsg);
        }

    }
    changeNum=(e) => { //分页

        this.setState({
            pagenum: e,
        })
    }
    changePageSize=(e, size) => { //分页
        console.log("页码", e)
        this.setState({
            pageSize: size,
            pagenum: 1,
        })
    }
    optionClick=(data, id) => {
        console.log("操作点击的id和内容", data, id)
        if (data === "详情") {

            browserHistory.push({
                pathname: rootapp+'app/UserManagementDetail',
                query: {
                    uid: id,
                    selectedKeys: this.props.selectedKeys
                }
            })
        } else if (data === "移除") {
            let usergroupid = this.props.selectedKeys
            let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
            // let parentid = useriddata[1] ? useriddata[1] : ""
            let that = this;
            confirm({
                title: data + "该角色?",
                content: '',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    let da = {
                        "userid": id,
                        "usergroupid": useriddata[0]
                    }
                    // 判断是请求全部的用户列表还是当下的用户类别

                    Ajax('post', 'front/query', 'usergroup_delmember', da, (e) => {
                        if (e.ret === 1) {
                            message.success('成功');
                            // console.log("selectedKeys",that.props.selectedKeys[0])
                            // if(that.props.selectedKeys[0]=="-1"){
                            //   getUserList({},that.getUserListSuccess);
                            //   }else{
                            let usergroupid = that.props.selectedKeys
                            let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
                            let parentid = useriddata[1] ? useriddata[1] : ""
                            let data = {
                                "usergroupid": useriddata[0],
                                "parentgroupid": parentid
                            }
                            // 请求分组列表下的分组列表
                            getDepartmentUserList(data, that.onDepartmentSuccess)
                            //请求用户分组列表数据
                            this.props.GetUserManagemengGroup();
                        } else {
                            message.error(e.errmsg);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else if (data === "禁用" || data === "启用") {
            let stats = data === "禁用" ? 1 : 0;
            let that = this;
            confirm({
                title: data + "该角色?",
                content: '',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    let da = {
                        "uid": id,
                        "userstate": stats
                    }
                    // 判断是请求全部的用户列表还是当下的用户类别

                    Ajax('post', 'front/query', 'user_changestate', da, (e) => {
                        if (e.ret === 1) {
                            message.success(data + '成功');
                            // console.log("selectedKeys",that.props.selectedKeys[0])
                            if (that.props.selectedKeys[0] === "-1") {
                                getUserList({}, that.getUserListSuccess);
                            } else {
                                let usergroupid = that.props.selectedKeys
                                let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
                                let parentid = useriddata[1] ? useriddata[1] : ""
                                let data = {
                                    "usergroupid": useriddata[0],
                                    "parentgroupid": parentid
                                }
                                // 请求用户列表数据
                                getDepartmentUserList(data, that.onDepartmentSuccess)
                                //请求用户分组列表数据
                                this.props.GetUserManagemengGroup();
                            }
                        } else {
                            message.error(e.errmsg);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else if (data === "取消管理员权限") {
            console.log("点击取消管理员权限")
            let usergroupid = this.props.selectedKeys
            let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
            // let parentid = useriddata[1] ? useriddata[1] : ""
            let that = this;
            confirm({
                title: data,
                content: '',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    let da = {
                        "userid": id,
                        "usergroupid": useriddata[0]
                    }
                    // 判断是请求全部的用户列表还是当下的用户类别

                    Ajax('post', 'front/query', 'usergroup_delmember', da, (e) => {
                        if (e.ret === 1) {
                            message.success('成功');
                         
                            let usergroupid = that.props.selectedKeys
                            let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
                            let parentid = useriddata[1] ? useriddata[1] : ""
                            let data = {
                                "usergroupid": useriddata[0],
                                "parentgroupid": parentid
                            }
                            // 请求分组列表下的分组列表
                            getDepartmentUserList(data, that.onDepartmentSuccess)
                            //请求用户分组列表数据
                            this.props.GetUserManagemengGroup();
                        } else {
                            message.error(e.errmsg);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }
    CheckboxonChange=(data, id) => {
        console.log("选中一行数据", data, id)
    }
    onCheackAll=() => {
        this.props.onCheackAll()
    }
    seek=(data)=>{
        this.props.seek(data)
        this.setState({
            pagenum: 1,
        })
    }
    //点击获取数据
    onClickGetdata=(usergroupid,parentgroupid)=>{
        console.log("点击获取数据",usergroupid,parentgroupid)
        let returndata=[];
        let openKey=[parentgroupid];
        if(parentgroupid===""){
            returndata.push(usergroupid)
        }else{
            let temp=usergroupid+"-"+parentgroupid
            returndata.push(temp)
        }
        console.log("返回的值是",returndata)

        this.props.onSelectKey(returndata,openKey)
    }

    //大区选择
    render() {
        const {pagenum, pageSize} = this.state;

        const { admin, userOpPermit, newaddfont, group,groupdata} = this.props;
       console.log("测试admin, group=============", admin, group,this.props.group.length,groupdata)
        
        return (
            <div className="userWrapper-inline-right">
            <div className="userlist-top">
            {this.props.hascheckbox && <Checkbox className="userlist-top-item" onCheackAll={this.onCheackAll}/>}
            <Button className="userlist-top-item"
            type="primary" icon="plus"
            style={{
                "display": userOpPermit.op_user_advancedmgr || userOpPermit.op_usergroup_add ? "block" : "none"
            }}
            disabled={this.props.admin.length >= 3 && this.props.selectedKeys[0] !== "-1"}
            onClick={this.props.onAddNewUser}>
           {newaddfont}
            </Button>
            {userOpPermit.op_user_advancedmgr&&<span className="addAdministrator">
            <UserModifyBatch  onSetUserList={this.props.onSetUserList} userOpPermit={this.props.userOpPermit}/></span>}
            {this.props.hascheckbox && <Button className="userlist-top-item userlist-top-item-disable" type="ghost">禁用</Button>}
            <div className="titleserch" >
            <FrontSeek
             placeholder="请输入用户名"
             dataall={this.props.group} serchGroup={this.props.serchGroup} tag="list" seek={this.seek} />
            </div>
            </div>
            {admin.length > 0 && <div className="userlist adminlist" >
            <span className="title">管理员</span>
            {userOpPermit.op_usergroup_add && <span className="addAdministrator" onClick={this.props.onAddNewUser}>添加管理员</span>}
            
            <div >
              {admin.map((item, index) => {
                return (
                    <ContentList data={item.data}
                    key={item.id}
                    id={item.id}
                    hasicon={item.iconurl === "" ? false : true}
                    optiondata={item.optiondata}
                    iconurl={item.iconurl}
                    hascheckbox={this.props.hascheckbox}
                    checkboxcheack={item.checkboxcheack}
                    optionClick={this.optionClick}
                    CheckboxonChange={this.CheckboxonChange}/>
                )
            })
            }
            </div>
            </div>
            }
          
            <div className="userlist">
           {this.props.admin.length > 0 && <span className="title">成员</span>}

            <div>
          {this.props.group.slice((pagenum - 1) * pageSize, (pagenum - 1) * pageSize + pageSize).map((item, index) => {
                return (
                    <ContentList data={item.data}
                    key={item.id}
                    id={item.id}
                    hasicon={item.iconurl === "" ? false : true}
                    optiondata={item.optiondata}
                    iconurl={item.iconurl}
                    hascheckbox={this.props.hascheckbox}
                    checkboxcheack={item.checkboxcheack}
                    optionClick={this.optionClick}
                    CheckboxonChange={this.CheckboxonChange}/>
                )
            })
            }
      </div>
      {this.props.group.length !== 0 && <div className="Pagination-zdy"><Pagination
            size="small"
            current={pagenum}
            pageSize={pageSize}
            defaultPageSize={pageSize}
            total={this.props.group.length}
            pageSizeOptions={["10", "20", "30", "40"]}
            onChange={this.changeNum}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showTotal={(e) => {
                return "共 " + e + " 条"
            }}
            /></div>}
          </div>
          {this.props.addNewmembertag && <NewmemberModal
            addNewmembertag={this.props.addNewmembertag}
            originalUserlist={this.props.originalUserlist}
            onHandleCancel={this.props.onHandleCancel}
            selectedKeysleft={this.props.selectedKeys}
            newaddfont={this.props.newaddfont}
            onDepartmentSuccess={this.onDepartmentSuccess}
            GetUserManagemengGroup={this.props.GetUserManagemengGroup}
            />}
            {/* 临时测试样式 */}
            <CardBoxs data={groupdata} onClickGetdata={this.onClickGetdata}></CardBoxs>
            {(this.props.group.length ===0&&groupdata.length===0)&&<img src={usertemp} className="tempimg" />}
          </div>
        )
    }
}
export default UserManagementRightContent;