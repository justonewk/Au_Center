/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal, message } from 'antd';
import CheackGroupC from '../PublicComponent/CheackGroupCustom/CheackGroupC'
import { getajax, getDepartmentUserList ,} from '../../public/ajax';
import { RemovingChannelUsers } from '../../public/CommonFuncs'
const Ajax = getajax.ajaxFun;
class NewmemberModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedListGame: [],
            showselectdata: [],
            usableAllUser: [],
            alldata: [],
        };
    }
    componentDidMount() {

        this.getuserlist();

    }

    getuserlist=() => {
        let data = window.sessionStorage.getItem("userList")
        // let data = RemovingChannelUsers( JSON.parse(userlist))
        let userlist =RemovingChannelUsers( JSON.parse(data))
        let checkuser = [];
        // console.log("this.props.originalUserlist",this.props.originalUserlist)
        this.props.originalUserlist.forEach(function(item, index) {
            checkuser.push(item.uid)
        })
    
        let temps = []; //临时数组1  
        let temparray = []; //临时数组2 
        for (let i = 0; i < checkuser.length; i++) {
            temps[checkuser[i]] = true; //巧妙地方：把数组B的值当成临时数组1的键并赋值为真 
        }
        ;
        for (let i = 0; i < userlist.length; i++) {
            // console.log("temps[userlist[i].uid]",temps[userlist[i].uid])
            if (!temps[userlist[i].uid] && userlist[i].userstate === 0) {
                temparray.push(userlist[i]); //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组 
            }
            ;
        }
        ;
        let temptt = [];
        // console.log("checkuser", userlist)
        console.log("状态全部为真", temparray)
        temparray.forEach(function(item, index) {
            temptt.push({
                value: item.uid,
                label: item.nickname + '(' + item.username + ')'
            })
        })
        this.setState({
            alldata: temptt
        })


    }
    gameSelectOk=(checkedListGame) => {
        let usergroupid = this.props.selectedKeysleft
        let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
   
        let data = {
            "usergroupid": useriddata[0],
            "users": checkedListGame,
        }
        let that = this;
        Ajax('post', 'front/query', 'usergroup_addmember', data, (e) => {
            if (e.ret === 1) {
                message.success("添加用户成功");

                this.setState({
                    checkedListGame: [],
                })
                let usergroupid = that.props.selectedKeysleft
                let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
                let parentid = useriddata[1] ? useriddata[1] : ""
                let data = {
                    "usergroupid": useriddata[0],
                    "parentgroupid": parentid
                }
                // 获取分组下的成员列表
                getDepartmentUserList(data, that.props.onDepartmentSuccess)
                this.props.onHandleCancel();
                // 为什么会隐藏掉?
                this.props.GetUserManagemengGroup();
            } else {
                message.error(e.errmsg)
            }
        })
    }
    gameSelectCancel=() => {
        //取消选择,也关闭窗口
        this.handleCancel()
    }
    handleCancel=() => {
        this.props.onHandleCancel()
    }
    render() {
        // console.log("miot", this.props.originalUserlist)
        // console.log("全部数据是", this.state.alldata)
        return (
            <Modal
            maskClosable={false}
            title="添加分组成员"
            visible={this.props.addNewmembertag}
            width={800}
            onCancel={this.handleCancel}
            className="addNewuserToRole addNewuserToUserlist"
            footer={null}
            >
              <CheackGroupC
            checkedList={this.state.checkedListGame}
            showselectdata={this.state.showselectdata}
            onOK={this.gameSelectOk}
            titlename={this.props.newaddfont}
            onCancel={this.gameSelectCancel}
            data={this.state.alldata}
            constdata={this.state.alldata}
            />
        </Modal>
        )
    }
}
export default NewmemberModal;