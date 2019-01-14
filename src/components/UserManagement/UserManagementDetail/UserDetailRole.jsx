import React from 'react';
import { Button,  message, Pagination, Modal } from 'antd';
import ContentList from '../../PublicComponent/ContentList/ContentList';
import { getajax } from '../../../public/ajax'
import NewRoleModal from './NewRoleModal'
import {  browserHistory } from 'react-router';
import { root } from '../../../root';
const rootapp = root();
// const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Ajax = getajax.ajaxFun;
// const roleData = [];
function getRoledataValue(id, roledata) {
    let datashow = {
        "subid": "",
        "syslid": "",
        "sysname": ""
    }
    for (let i = 0; i < roledata.length; i++) {
        if (roledata[i].roleid === id) {
            datashow["subid"] = roledata[i].sysgroupid;
            datashow["syslid"] = roledata[i].syslid;
            datashow["sysname"] = roledata[i].sysname;
        }
    }
    return datashow;
}
class UserDetailRole extends React.Component {

    state={
        roleData: [{
            data: [
                [{
                    "title": "王昆",
                    "data": ["权限中心", "内充管理", "尘缘gm"]
                }]
            ],
            optiondata: [{
                id: "1001",
                data: ["详情", "取消关联"]
            }],
            iconurl: "",
            checkboxcheack: true,
            id: "1004"
        }, {
            data: [
                [{
                    "title": "chenqiao",
                    "data": ["权限中心", "内充管理", "尘缘gm"]
                }]
            ],
            optiondata: [{
                id: "1001",
                data: ["详情", "取消关联"]
            }],
            iconurl: "",
            checkboxcheack: true,
            id: "1002"
        }],
        pageSize: 5,
        pagenum: 1,
        addRoletag: false,
        relevancedata: [],

    }
    componentDidMount() {
        // getUserRoleList(this.props.roledata)
    }
    // 取消关联或者跳转详情
    optionClick=(data, id) => {
        console.log("data,e", data, id)
        if (data === "取消关联") {
            let that = this;
            confirm({
                title: data + "该角色?",
                content: '',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    that.CancelRole(that, id)
                },
                onCancel() {
                    console.log('Cancel');
                },
            })

        } else if (data === "详情") {
            console.log("用户的数据是什么", this.props.userDetaildata,data, id)
            let roledata = this.props.userDetaildata.role.length > 0 ? this.props.userDetaildata.role : []
            // window.sessionStrorage.setItem("rid",id)
            window.sessionStorage.setItem("rid", id);
            let qurendata = getRoledataValue(id, roledata);
            console.log("qurendata", qurendata)
            window.sessionStorage.setItem("subid", qurendata.subid);

            browserHistory.push({
                pathname: rootapp+'app/RoleDetail',
                query: {
                    syslid: qurendata.syslid,
                    sysname: qurendata.sysname
                }
            })
        }
    }
    //取消关联角色
    CancelRole=(that, id) => {
        
        let data = {
            "uid": parseInt(that.props.uid,10),
            "roleid": id,
        }

        Ajax('post', 'front/query', 'user_delrelaterrole', data, (e) => {
            if (e.ret === 1) {

                //调用绑定成功，从新请求用户的基本信息
                that.props.onOkRoleSucess(parseInt(that.props.uid,10))
            // that.props.onHandleCancel()
            } else {
                message.error(e.errmsg);
            }
        })
    }
    // 关联新角色
    addNewsRole=() => {
        this.setState({
            "addRoletag": !this.state.addRoletag
        })
        // if(this.state.addRoletag){

    // }
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
    onHandleCancel=() => {
        this.setState({
            addRoletag: false
        })
    }

    render() {
        const {pagenum, pageSize, addRoletag} = this.state;
        const {roleData, userOpPermit} = this.props
        // console.log("roleData============", roleData)
        return (
            <div className="UserDetailRole">
          <div className="top">
          {userOpPermit.op_user_relaterole && <Button type="primary"  icon="plus" onClick={this.addNewsRole}>
            关联新角色
          </Button>}
          </div>
          <div className="data">
            
            {addRoletag &&
            <NewRoleModal
            uid={this.props.uid}
            onHandleCancel={this.onHandleCancel}
            onOkRoleSucess={this.props.onOkRoleSucess}
            userDetaildata={this.props.userDetaildata}
            addRoletag={addRoletag}
            />}
           
          {roleData.slice((pagenum - 1) * pageSize, (pagenum - 1) * pageSize + pageSize).map((item, index) => {
                return (
                    <ContentList data={item.data}
                    key={item.id}
                    id={item.id}
                    hasicon={item.iconurl === "" ? false : true}
                    optiondata={item.optiondata}
                    iconurl={item.iconurl}
                    checkboxcheack={item.checkboxcheack}
                    optionClick={this.optionClick}

                    />
                )
            })
            }
     
     {roleData.length !== 0 && <div className="Pagination-zdy">
      <Pagination
            size="small"
            current={pagenum}
            pageSize={pageSize}
            defaultPageSize={pageSize}
            total={roleData.length}
            pageSizeOptions={["5", "10", "15", "20"]}
            onChange={this.changeNum}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showTotal={(e) => {
                return "共 " + e + " 条"
            }}
            /></div>}
          </div>
         </div>
        )
    }
}
export default UserDetailRole;