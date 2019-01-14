import React from 'react';
import { Tabs, message } from 'antd';
import UseDetailGame from './UseDetailGame'
import UserDetailRole from './UserDetailRole'
import { getajax } from '../../../public/ajax'
import { getGameListData, getGameroleData, getGamelistid } from '../../../public/CommonFuncs'

const TabPane = Tabs.TabPane;
const Ajax = getajax.ajaxFun;
class UserManagementDetailRightBottom extends React.Component {

    state = {
        bottomtabList: [{
            "name": "关联角色",
            "id": "1"
        }, {
            "name": "可访问游戏数据",
            "id": "2"
        }],
        tabDeafult: "1",
        permitsdata: [],
        gamelist: [{
            "gid": ""
        }],
        showkey: "",
        gamerolelist: [],
        gamelistid: [],
        gamerole: [],


    }
    componentDidMount() {
        this.getUserPermits()
    }
    getUserPermits = () => {
        let data = {
            "uid": parseInt(this.props.uid, 10),
        }

        Ajax('post', 'front/query', 'user_detailpermits', data, (e) => {
            if (e.ret === 1) {

                //调用绑定成功，从新请求用户的基本信息
                console.log("用户权限数据请求", e.data.permits.game_permit)
                let gamelistShow = getGameListData(e.data.permits.game_permit)
                let gamerolelistshow = getGameroleData(e.data.permits.game_permit)
                let gamelistid = getGamelistid(gamerolelistshow)
                console.log("游戏列表===",gamelistShow)
                this.setState({
                    permitsdata: e.data.permits,
                    gamerolelist: gamerolelistshow,
                    gamelist: gamelistShow,
                    gamelistid: gamelistid,
                    showkey: JSON.stringify(e.data.permits)
                })

            } else {
                message.error(e.errmsg);
            }
        })
    }
    MenuTab = (key) => {
        console.log("key", key)
        if (key === 2) {
            this.getUserPermits()
        }
    }
    onOkChannelSucess = () => {
        // 重新请求用户的权限
        this.getUserPermits()
    }
    render() {


        return (
            <div className="userlist userlistbottm">
                <Tabs defaultActiveKey="1" onChange={this.MenuTab}>

                    <TabPane tab="关联角色" key="1">
                        <UserDetailRole
                            uid={this.props.uid}
                            userOpPermit={this.props.userOpPermit}
                            userDetaildata={this.props.userDetaildata}
                            roleData={this.props.role}
                            onOkRoleSucess={this.props.onOkRoleSucess}
                        />

                    </TabPane>
                    <TabPane tab="可访问游戏数据" key="2">
                        <UseDetailGame
                            key={this.state.showkey}
                            uid={this.props.uid}
                            roleData={JSON.stringify(this.props.role)}
                            userOpPermit={this.props.userOpPermit}
                            permitsdata={this.state.permitsdata}
                            onOkChannelSucess={this.onOkChannelSucess}
                            gamelsit={this.state.gamelist}
                            gamerolelist={this.state.gamerolelist}
                            gamelistid={this.state.gamelistid}
                            userDetaildata={this.props.userDetaildata}
                        />

                    </TabPane>

                </Tabs>
            </div>
        )
    }
}
export default UserManagementDetailRightBottom;