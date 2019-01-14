/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import UserManagementSiderLeft from './UserManagementSiderLeft';
import UserManagementRightContent from './UserManagementRightContent';
import AddNewUser from './AddNewUser';
import $ from 'jQuery';


// 角色基本信息转换

class UserManagement extends React.Component {
    state = {
        selectKey: this.props.selectedKeys, //左边选择的key
        addNewUser: false, //新增分组状态打开
        addNewmembertag: false, //新增成员模态框
        defaultopenKeys: [],
        openKeys:[],

    }
    /*设置当前的key*/
    onSelectLeftKey=(selectKey) => {
        console.log("onSelectLeftKey============", selectKey)
        this.props.onDepartment(selectKey)
        this.setState({
            selectKey: selectKey,
            addNewUser: false
        })
    }
    // 右边点击实现左边的key
    onSelectRightKey=(selectKey,openKeys)=>{
        console.log("onSelectLeftKey============", selectKey,openKeys) 
        this.props.onDepartment(selectKey)
        this.setState({
            selectKey: selectKey,
            addNewUser: false,
            // openKeys:openKeys

        })
        this.setOpenKeys(openKeys)
    }
    setOpenKeys=(openKeys)=>{
        this.setState({
     
            openKeys:openKeys

        })  
    }
    // 新增用户
    onAddNewUser=() => {
        if (this.state.selectKey[0] === "-1"&&this.props.userOpPermit.op_user_advancedmgr) {
            // 全部用户则新增用户
            this.setState({
                addNewUser: true
            })

        } else {
            // 新增成员
            this.setState({
                addNewUser: false,
                addNewmembertag: true
            })
        }
    }
    onHandleCancel=() => {
        this.setState({
            addNewmembertag: false
        })
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
        // console.log("获取到的原生对象",$(t2).height())
        // console.log("defaultopenKeys++++++",this.props.selectedKeys)
        if (this.props.selectedKeys[0]) {

            this.setState({
                selectKey: this.props.selectedKeys,
                openKeys:this.props.openKeys,
            })
        }


    }
    screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        // var t2 = this.refs.wrapper;
        var t = this.refs.userright;
         console.log(`这里的值是 ${$(window).height()-340}`);
       $(t).css("height",$(window).height()-340)
    }
    onaddnewok=() => {
        this.setState({
            addNewUser: false
        })
        // 返回全部用户
        this.props.onDepartment(["-1"])
        // 请求左边列表
        this.props.GetUserManagemengGroup()
    }
    onCustomClick=(item, parentkey, e) => {
        //展开或者关闭菜单
        //阻止冒泡
        // console.log("问题是",item,parentkey);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let oldopenkey = this.state.openKeys;
        let newopenkey = [...oldopenkey];
        // console.log("onCustomClick%%%%%%%",item,parentkey)
           console.log("问题是",item,parentkey,oldopenkey);
        if (item.id === parentkey) {
            // 表示是顶级目录
            if ($.inArray(item.id, newopenkey) > -1) {
                this.setState({
                    openKeys: []
                })
            } else {
                this.setState({
                    openKeys: [item.id]
                })
            }
        } else {
            if ($.inArray(item.id, newopenkey) > -1) {
                newopenkey.remove(item.id)
            } else {
                newopenkey.push(item.id);
            }

            this.setState({
                openKeys: newopenkey
            })
        }
       
    }
    //大区选择
    render() {
        console.log("this.state.openKeys====",this.state.openKeys);
        return (
            <div className="data-wrapper" ref="wrapper">
          
      { /*用户管理左边导航*/ }
      <div className="left">
      <UserManagementSiderLeft
            selectedKeys={this.state.selectKey}
            openKeys={this.state.openKeys}
            LeftSlidedatalist={this.props.LeftSlidedatalist}
            onSelectKey={this.onSelectLeftKey}
            userOpPermit={this.props.userOpPermit}
            onCustomClick={this.onCustomClick}
            setOpenKeys={this.setOpenKeys}
            defaultopenKeys={this.state.defaultopenKeys}
            GetUserManagemengGroup={this.props.GetUserManagemengGroup}
            />
      { /*用户管理右边具体内容*/ }
      </div>
      <div className="right" ref="userright">
      {!this.state.addNewUser && this.props.activetabid === 1 ?
                <UserManagementRightContent
                selectedKeys={this.state.selectKey}
                group={this.props.group}
                serchGroup={this.props.serchGroup}
                admin={this.props.admin}
                userOpPermit={this.props.userOpPermit}
                hascheckbox={this.props.hascheckbox}
                onCheackAll={this.props.onCheackAll}
                onSetUserList={this.props.onSetUserList}
                groupdata={this.props.groupdata}
                usableAllUser={this.props.usableAllUser}
                onceAjaxUserListdata={this.props.onceAjaxUserListdata}
                addNewmembertag={this.state.addNewmembertag}
                originalUserlist={this.props.originalUserlist}
                onHandleCancel={this.onHandleCancel}
                GetUserManagemengGroup={this.props.GetUserManagemengGroup}
                newaddfont={this.props.newaddfont}
                seek={this.props.seek}
               
                onSelectKey={this.onSelectRightKey}
                onAddNewUser={this.onAddNewUser}/>
                
                : !this.state.addNewUser && <div>开发中....</div>
            }
    {this.props.activetabid === 1 && this.state.addNewUser && <AddNewUser
            selectedKeys={this.state.selectKey}
            onSetUserList={this.props.onSetUserList}
            userOpPermit={this.props.userOpPermit}
            addnewok={this.onaddnewok}
            GetUserManagemengGroup={this.props.GetUserManagemengGroup}

            />}
      </div>
       
          </div>
        )
    }
}
export default UserManagement;