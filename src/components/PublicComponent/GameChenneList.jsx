import React from 'react';
import {  Button } from 'antd';
import Channe from './ChanneCustom/Channe'
import GameSelectChanne from './GameSelectChanne';
import $ from 'jquery'


class GameChenneList extends React.Component {
    state = {

        showselectdata: [],
        isOk: false,
        activeid: "-1",
        gameRoleOk: true,
        defaultCheckedList: [],
        defaultshowselectdata: [],
        Channe: [],
        noChannegameid: [],
    }
    // 游戏选择好了
    // ongameSelectOk=(defaultCheckedList,defaultshowselectdata)=>{
    //  this.setState({isOk:true,defaultCheckedList,defaultshowselectdata})
    // }
    // 取消游戏选择
    ongameSelectCancel = () => {

        // 选中的不展示
        // 删除选中的list
        //删除右侧展示的选中列表
        console.log("取消选择游戏")
        this.setState({
            isOk: false,
            defaultCheckedList: [],
            defaultshowselectdata: []
        }
        )

    }

    // 显示游戏的角色配置

    //
    onReset = () => {
        this.setState({
            isOk: false
        })
    }
    // onChangeGameRole=(data)=>{
    //   this.setState({defaultshowselectdata:data,gameRoleOk:true})
    //    // this.props.bindinggame(data)
    // }
    bindinggame = () => {
        this.props.bindinggameChane()
    }
    prev = () => {

        this.props.bindinggameChane("prev")
    }
    handleChanne = (data, key) => {
        console.log("ddd", data, key)
    }
    onConfigurationRole = (id) => {
        if (id === this.state.activeid) {
            this.setState({
                activeid: -1
            })
        } else {
            this.setState({
                activeid: id
            })
        }
    }
    onOk = (key, checkedList, showcheckedListname) => {
        console.log(`key=,${key},checkedList=${checkedList},showcheckedListname=${showcheckedListname}`)

        let tempdata = this.props.gamedata

        for (let i = 0; i < tempdata.length; i++) {

            if (tempdata[i].value === key) {
                tempdata[i]["showcheckedListname"] = showcheckedListname;
                tempdata[i]["checkedList"] = checkedList;
            }
        }
        this.setState({
            activeid: "-1",
            gameRoleOk: false
        })
        console.log("tempdata===", tempdata)
        this.props.onSetGameChane(tempdata)
    }
    onhasChanne = (data) => {
        let noChanne = this.state.noChannegameid
        noChanne.push(data)
        console.log("noChanne", noChanne)
        this.setState({
            noChannegameid: noChanne
        })
        //    this.setstate hasChanne
    }
    render() {


        const { noChannegameid } = this.state;
        let showtag;
        console.log("选择的游戏是activeid：noChannegameid", this.state.activeid, noChannegameid)
        return (

            <div className="wrapper-gamelsit">
                <div>选择相关的游戏渠道</div>
                <div className="content-data">
                    {!this.state.isOk && this.props.gamedata.map((item, index) => {

                        showtag = $.inArray(item.value, noChannegameid) > -1
                        console.log("有没有渠道", showtag)
                        return (

                            <div className="box Channewrapper" key={index} 
                            >
                                 <div className="box-top">
                                    <div className="okshow Channename" >
                                        <span className="item">{item.label}</span>
                                    </div>

                                    {this.props.isShow && !showtag&&<div className="option blue" onClick={this.onConfigurationRole.bind(this, item.value)}>
                                        {item.value === this.state.activeid ? "完成选择" : "选择渠道"}</div>}
                                </div>
                               
                                <Channe
                                    isShow={this.props.isShow && !this.state.isOk && item.value === this.state.activeid}
                                    handleChanne={this.handleChanne.bind(this, item.label, item.value)}
                                    defaultValue={item.checkedList}
                                    stateshow={true}
                                    datacontent={item.showcheckedListname}
                                    onOK={this.onOk.bind(this, item.value)}
                                    propstag={item.value}
                                    disabled={false}
                                    onhasChanne={this.onhasChanne}
                                />
                                { /*选择的渠道显示*/}
                                <GameSelectChanne
                                    showselectdata={item.showcheckedListname}
                                    isShow={true}
                                    onceEditShow={false}
                                // onChangeGameRole={this.onChangeGameRole}
                                />
                            </div>
                        )
                    })

                    }
                </div>

                {this.props.isShow &&
                    <div className={this.state.isOk ? "footer" : "dim-footer"} >
                        <div className="btn">
                            <Button disabled={this.state.activeid === "-1" ? false : true}
                                type="primary" onClick={this.bindinggame}>
                                下一步
          </Button>
                        </div>

                        <Button disabled={this.state.activeid === "-1" ? false : true}
                            className="pre bule" onClick={this.prev} >保存并返回上一步</Button>
                    </div>}
            </div>

        )

    }
}
export default GameChenneList;