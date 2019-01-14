import React from 'react';
import { Button } from 'antd';
import GameContent from './GameContent'
import NewGameModal from './NewGameModal'
import { getChannelData, getOriginalChanel, getshowRoleonce } from '../../../public/CommonFuncs'
class UseDetailGame extends React.Component {

    state = {
        bottomtabList: [{
            "name": "关联角色",
            "id": "1"
        }, {
            "name": "可访问游戏数据",
            "id": "2"
        }],
        tabDeafult: "1",
        gamelsit: [{
            "name": "龙纹",
            "gid": "14"
        }, {
            "name": "超能",
            "gid": "15"
        }, {
            "name": "兵器少女",
            "gid": "12"
        }],
        gid: "",
        activeid: "",
        checkedList: [],
        gamename: "",
        showcheckedListname: [],
        channeldata: [],
        addRoletag: false,
        gamerole: [],
        relevancedata: [],

    }
    componentDidMount() {
        //请求用户的权限数据
        if (this.props.gamelsit.length > 0) {
            this.onGetgamedetaile(this.props.gamelsit[0].gid, this.props.gamelsit[0].name)
            let relevancedata = getshowRoleonce(this.props.gamelsit[0].gid, this.props.gamerolelist)
            this.setState({
                gid: this.props.gamelsit[0].gid,
                activeid: this.props.gamelsit[0].gid,
                relevancedata: relevancedata
            })
        } else {

        }

    }
    //取消关联角色
    onGetgamedetaile = (gid, name) => {
        console.log("游戏渠道默认默认数据", this.props.permitsdata)
        let ChanelShow = getChannelData(this.props.permitsdata.channel_permit.children, gid)
        let channeldata = getOriginalChanel(this.props.permitsdata.channel_permit.children)
        console.log("channeldata", channeldata, ChanelShow)
        let relevancedata = getshowRoleonce(gid, this.props.gamerolelist)
        this.setState({
            gid: gid,
            activeid: gid,
            gamename: name,
            checkedList: ChanelShow.checkedList,
            channeldata: channeldata,
            relevancedata: relevancedata,
            showcheckedListname: ChanelShow.showcheckedListname
        })
    }
    // 修改游戏
    onModifyGame = () => {
        this.setState({
            addRoletag: true
        })

    }
    onHandleCancel = () => {
        this.setState({
            addRoletag: false
        })
        // this.props.onOkChannelSucess()
    }
    onOkgameSucess = () => {
        console.log("游戏修改成功=======")
        this.setState({
            addRoletag: false
        })
        this.props.onOkChannelSucess()
    }

    render() {
        const { activeid, relevancedata } = this.state;
        const { gamelsit, gamerolelist, gamelistid, userOpPermit } = this.props
        let _this = this;
        console.log("gamerolelist", gamerolelist)
        return (
            <div className="UseDetailGame">

                <div className="top">
                    {userOpPermit.op_user_editgame && <span className="addgame blue" onClick={this.onModifyGame}> 修改游戏</span>}
                    {gamelsit.map(function (item, index) {
                        return (

                            <Button
                                className={activeid === item.gid ? "gamenamebtn activebtn" : "gamenamebtn"}
                                key={item.gid}
                                onClick={_this.onGetgamedetaile.bind(this, item.gid, item.name)}>
                                {item.name}
                            </Button>

                        )
                    })

                    }
                </div>
                <GameContent
                    gid={this.state.gid}
                    uid={this.props.uid}
                    key={this.props.roleData}
                    roleData={this.props.roleData}
                    gamelsit={gamelsit}
                    gamerolelist={gamerolelist}
                    relevancedata={relevancedata}
                    channeldata={this.state.channeldata}
                    checkedList={this.state.checkedList}
                    gamename={this.state.gamename}
                    onOkChannelSucess={this.props.onOkChannelSucess}
                    onBindingRole={this.onBindingRole}
                    userOpPermit={this.props.userOpPermit}
                    userDetaildata={this.props.userDetaildata}
                    showcheckedListname={this.state.showcheckedListname}
                />
                <NewGameModal
                    uid={this.props.uid}
                    key={JSON.stringify(gamerolelist)}
                    addRoletag={this.state.addRoletag}
                    onHandleCancel={this.onHandleCancel}
                    defaultCheckedList={gamelistid}
                    onOkgameSucess={this.onOkgameSucess}
                    defaultshowselectdata={gamerolelist}


                />
            </div>
        )
    }
}
export default UseDetailGame;