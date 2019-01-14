/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal, message} from 'antd';
import { getCheckgamelist, setGameListPost} from '../../../public/CommonFuncs'
import {  ajaxGame } from '../../../public/ajax'
import CheackGroupC from '../../PublicComponent/CheackGroupCustom/CheackGroupC'
class NewGameModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bindingRole: [],
            gamename: "超能",
            CheackGroupCdata: [],
            defaultCheckedList: [],
            defaultshowselectdata: this.props.defaultshowselectdata,
        };
    }
    componentDidMount() {
        let ChanneStorage = window.sessionStorage;
        let data = JSON.parse(ChanneStorage.getItem("gameList"));
        let gamelistdatashow = getCheckgamelist(data)
        this.setState({
            CheackGroupCdata: gamelistdatashow,
            defaultshowselectdata: this.props.defaultshowselectdata,
            defaultCheckedList: this.props.defaultCheckedList
        })

    }
    // 游戏选择好了
    ongameSelectOk=(defaultCheckedList, defaultshowselectdata) => {
        console.log("defaultCheckedList,defaultshowselectdata",
         defaultCheckedList, defaultshowselectdata, this.props.defaultshowselectdata)
        // for (let i = 0; i < this.props.defaultshowselectdata.length)
        // 
        let postdata = setGameListPost(defaultshowselectdata, this.props.defaultshowselectdata)
        // this.setState({isOk:true,defaultCheckedList,defaultshowselectdata})
        let datas = {
            "uid": parseInt(this.props.uid,10),
            "game_permits": postdata,
        }

        ajaxGame(datas, this.sucess, this.error)
    }

    ongameSelectCancel=() => {

        // 选中的不展示
        // 删除选中的list
        //删除右侧展示的选中列表
        console.log("取消选择游戏")
        
        // let datas = {
        //     "uid": parseInt(this.props.uid),
        //     "game_permits": [],
        // }

        // ajaxGame(datas, this.sucess, this.error)
        // this.setState({
        //     defaultCheckedList: [],
        //     defaultshowselectdata: []
        // }
        // )
        // 只用关闭模态框就好
        this.handleCancel()

    }

    sucess=() => {
        this.props.onOkgameSucess(parseInt(this.props.uid,10))
        this.props.onHandleCancel()
    }
    error=(errmsg) => {
        message.error(errmsg);
    }


    gameSelectOk=(checkedListGame) => {

    }
    handleCancel=() => {
        this.props.onHandleCancel()
    }

    render() {
        console.log("defaultCheckedList", this.state.defaultshowselectdata)
        return (
            <Modal
            maskClosable={false}
            title="修改游戏"
            visible={this.props.addRoletag}
            width={800}
            onCancel={this.handleCancel}
            className="addNewuserToRole addNewuserToUserlist right"
            footer={null}
            >
            <CheackGroupC
            checkedList={this.state.defaultCheckedList}
            showselectdata={this.state.defaultshowselectdata}
            onOK={this.ongameSelectOk}
            titlename="游戏"
            onCancel={this.ongameSelectCancel}
            data={this.state.CheackGroupCdata}
            constdata={this.state.CheackGroupCdata}
            />
        </Modal>
        )
    }
}
export default NewGameModal;