
/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import $ from 'jQuery';
import UserManagementSiderLeft from '../UserManagementSiderLeft';
import UserManagementDetailRight from './UserManagementDetailRight';
// 角色基本信息转换
class UserManagementContentDetails extends React.Component {

    ;
    state = {
        selectKey: this.props.selectedKeys, //左边选择的key
        addNewUser: false, //新增分组状态打开
        addNewmembertag: false, //新增成员模态框
        defaultopenKeys: [],
        openKeys:this.props.openKeys,
    }
    /*设置当前的key*/
    onSelectLeftKey=(selectKey) => {
        this.props.onDepartment(selectKey)
        this.setState({
            selectKey: selectKey,
            addNewUser: false
        })
    }
    // 新增用户
    onAddNewUser=() => {
        if (this.state.selectKey[0] === "-1") {
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
        // console.log("defaultopenKeys++++++",this.props.selectedKeys,this.props.selectedKeys[0].indexOf("-"),defaultopenKeys,Keys,Keys.length)
        this.resize();
        this.screenChange();
        this.setState({
            selectKey: this.props.selectedKeys
        })
    }
    screenChange = () => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize = () => {
        // 设置真实dom的高度
        // var t2 = this.refs.wrapper;
        var t = this.refs.userright;
        // console.log("这里的值是", $(window).height()-340);
        $(t).css("height", $(window).height() - 340)
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
    setOpenKeys=(openKeys)=>{
        this.setState({
     
            openKeys:openKeys

        })  
    }
    //大区选择
    render() {
        // console.log("this.state.defaultopenKeys",this.state.defaultopenKeys)
        return (
            <div className="data-wrapper">
          
      { /*用户管理左边导航*/ }
      <div className="left">
      <UserManagementSiderLeft
            selectedKeys={this.state.selectKey}
            openKeys={this.state.openKeys}
            LeftSlidedatalist={this.props.LeftSlidedatalist}
            userOpPermit={this.props.userOpPermit}
            onSelectKey={this.onSelectLeftKey}
            onCustomClick={this.onCustomClick}
            setOpenKeys={this.setOpenKeys}
            defaultopenKeys={this.state.defaultopenKeys}
            GetUserManagemengGroup={this.props.GetUserManagemengGroup}
            />
      { /*用户管理右边具体内容*/ }
      </div>
       <div className="right Details" ref="userright">
      <UserManagementDetailRight
            groupingid={this.state.selectKey}
            userOpPermit={this.props.userOpPermit}
            uid={this.props.uid}
            />
      </div>
       
          </div>
        )
    }
}
export default UserManagementContentDetails;