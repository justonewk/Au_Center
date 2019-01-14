/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal, Icon, message } from 'antd';
import LeftSlide from '../PublicComponent/LeftSlide';
import AddGroupModal from '../PublicComponent/AddGroupModal/AddGroupModal';

import $ from 'jquery';
import { getajax } from '../../public/ajax'
const confirm = Modal.confirm;
const Ajax = getajax.ajaxFun;
const SubMenudata = [{
    "name": "删除",
    "id": "0"
}, {
    "name": "编辑",
    "id": "1"
}, {
    "name": "新增",
    "id": "2"
}]
const SubMenudatatemp = [{
    "name": "编辑",
    "id": "1"
}, {
    "name": "新增",
    "id": "2"
}]
const Menudata = [{
    "name": "删除",
    "id": "0"
}, {
    "name": "编辑",
    "id": "1"
}]
// 角色基本信息转换

class UserManagementSiderLeft extends React.Component {


    state = {
        visible: false,
        title: "",
        // selectedKeys:[],
        openKeys: this.props.defaultopenKeys,
        TitleSelect: "ant-menu-submenu-select",
        defaultData: {
            "title": "",
            "description": ""
        }
    }
    componentDidMount() {
        // 默认打开值适用于二级结构
        let Keys = this.props.selectedKeys[0] !== "-1" ? (this.props.selectedKeys[0].indexOf("-") > -1 ? this.props.selectedKeys[0].split("-") : []) : []

        let defaultopenKeys = Keys.length > 1 ? [Keys[1]] : []
        // console.log("默认打开的值",Keys,defaultopenKeys)
        this.setState({
            openKeys: defaultopenKeys
        })
    }
    onClickOperation=(data, e) => {
        data.domEvent.stopPropagation();
        data.domEvent.nativeEvent.stopImmediatePropagation();
        //console.log("$%$%", data, e)
        //切割字符串split("-")
        var arry1 = data.key.split("-");
        console.log(arry1)
        switch (arry1[0]) {
        case "0":this.delgroupFunc(arry1[1]);
            break;
        case "1":
            this.addgroupFunc("重命名分组", arry1[2], arry1[1], "1", arry1[3]);
            break;
        case "2":
            this.addgroupFunc("新增分组", "", arry1[1], "2", ""); break;
        default: ;
       
        }

    // this.setState({visible:true,defaultData:{"title":"用户分组","description":""}})
    }
    onClickMenu=(e) => {
        // console.log("被点击时调用菜单========", e) 
        this.props.onSelectKey([e.key])
    }

    onSelectShow=({item, key, selectedKeys}) => {
        // console.log("选中一个菜单onSelectShow========",item, key, selectedKeys )
        // this.setState({selectedKeys:[key]})
        this.props.onSelectKey([key])
    //进行数据的请求
    }
    onTitleClick=(key, item) => {
        // console.log("获取到的常量是什么",modeldata)
          console.log("菜单头部点击",key, item)
        // this.setState({selectedKeys:[item.key]}) 
        
        this.props.onSelectKey([item.key])
        this.props.setOpenKeys([])
    //进行数据的请求
    }
    onCustomClick=(item, parentkey, e) => {
        //展开或者关闭菜单
        //阻止冒泡
        // console.log("问题是",item,parentkey);
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // let oldopenkey = this.state.openKeys;
        // let newopenkey = [...oldopenkey];
        // // console.log("onCustomClick%%%%%%%",item,parentkey)
        // if (item.id === parentkey) {
        //     // 表示是顶级目录
        //     if ($.inArray(item.id, newopenkey) > -1) {
        //         this.setState({
        //             openKeys: []
        //         })
        //     } else {
        //         this.setState({
        //             openKeys: [item.id]
        //         })
        //     }
        // } else {
        //     if ($.inArray(item.id, newopenkey) > -1) {
        //         newopenkey.remove(item.id)
        //     } else {
        //         newopenkey.push(item.id);
        //     }

        //     this.setState({
        //         openKeys: newopenkey
        //     })
        // }
        this.props.onCustomClick(item, parentkey, e)
    }
    // 模态框的操作
    //提交修改
    addgroupFunc=(AddModalName, title, currentid, type, parentid) => { //新增弹窗模态框
        this.setState({
            defaultData: { //编辑构造数据
                title: title,
                type: type, //新增1
                currentid: currentid,
                parentid: parentid,
            },
        })
        setTimeout(() => {
            this.setState({
                visible: true,
                AddModalName: AddModalName,
            })
        }, 0); //通过延时处理
    }
    delgroupFunc=(id) => {
        let that = this;
        confirm({
            title: '你确认是否删除该分组?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.DelSubSys(id)
            },
            onCancel() {},
        });
    }
    DelSubSys=(id) => { //删除
        console.log(id)
        let data = {
            usergroupid: id,
        }
        Ajax('post', 'front/query', 'usergroup_delete', data, (e) => {
            if (e.ret === 1) {
                message.success("删除分组成功");
                // window.sessionStorage.setItem("subid",'-1')
                // 请求用户列表
                this.props.GetUserManagemengGroup()
            } else {
                message.error(e.errmsg);
            }
        })
    }
    HideModal=(e) => {
        console.log("点击取消关闭模态框", e);
        this.setState({
            visible: false,
        })
    }
    AddGroupSubFunc=(temp, key, parentid, currentid) => {
        //修改操作调用

        let optiontype = "";
        // 0删除，1，编辑2，新增
        console.log("key", key, temp, currentid, parentid)
        let data = ""
        switch (key) {
        case 2:
        case "2":
            optiontype = "usergroup_add";
            data = {
                "usergroupname": temp.title,
                "parentgroupid": currentid
            };
            break;
        case 1:
        case "1":
            optiontype = "usergroup_edit";
            data = {
                "usergroupid": currentid,
                "usergroupname": temp.title,
                "parentgroupid": parentid
            };
            break;
            default:  break;
        }

        console.log("新增请求前的数据", data, optiontype)
        Ajax('post', 'front/query', optiontype, data, this.success)
    }
    success=(e) => {
       // console.log("qqq成功之后的数据", e)
        if (e.ret === 1) { //构建列表数据
            this.setState({
                visible: false,
            })
            this.props.GetUserManagemengGroup()
        } else {
            message.error(e.errmsg);
        }
    // 新增和修改成功都重新请求用户列表
    //
    }

    render() {
        // console.log("zouzheli3333333",this.state.openKeys)
        const {userOpPermit,openKeys} = this.props
        return (

            <div>
        <div className="subsysLeftTop"><p className="name">用户分组</p>
        {userOpPermit.op_user_advancedmgr && <Icon className="addsub" type="plus" onClick={this.addgroupFunc.bind(this, "新增用户分组", "", "", "2", "")}/>}</div>
       <LeftSlide
            datalist={this.props.LeftSlidedatalist}
            onClickMenu={this.onClickMenu}
            onCustomClick={this.onCustomClick}
            onSelect={this.onSelectShow}
            selectedKeys={this.props.selectedKeys}
            onTitleClick={this.onTitleClick}
            openKeys={openKeys}
            TitleSelect={this.state.TitleSelect}
            SubMenudata={SubMenudata}
            SubMenudatatemp={SubMenudatatemp}
            Menudata={Menudata}
            onClickOperation={this.onClickOperation}
            />
         <AddGroupModal
            visible={this.state.visible}
            title={this.state.AddModalName}
            defaultData={this.state.defaultData}
            onOk={this.AddGroupSubFunc}
            onCancel={this.HideModal}
            />
        
          </div>



        )
    }
}
export default UserManagementSiderLeft;