import React from 'react';
import ShowSelectRole from './Multistage/ShowSelectRole'
import LimitRoleModle from './LimitRole/LimitRoleModle'
import { getsysid, getdefaultRoleData } from '../../public/CommonFuncs'
class GameSelectRole extends React.Component {
    state = {

        activeid: "-1",
        selectdata: this.props.showselectdata,
        roledata: [],
        constroledata: [],
        defaultCheackRole: [],
        defaultShowRole: [],
        addRoletag: false,

    }
    onConfigurationRole = (index, data) => {
        console.log("点击配置角色的时候是调用的这里面吗？+++++++++", index)
        if (this.state.activeid === index) {
            //这时候的数据是什么：
            console.log("点击配置角色的时候是调用的这里面吗？&&&&&&2", index)
            // this.props.onChangeGameRole(this.state.selectdata)
            this.setState({
                activeid: "-1",

            })
        } else {
            console.log("点击配置角色的时候是调用的这里面吗？&&&&&&33", index)
            let defaultCheackRole = "";
            let defaultShowRole = "";
            if (data) {
                defaultCheackRole = data.id
                defaultShowRole = data.innerdata

            } else {
                defaultCheackRole = [];
                defaultShowRole = [];
            }
            this.setState({
                activeid: index,
                addRoletag: true,
                defaultCheackRole: defaultCheackRole,
                defaultShowRole: defaultShowRole,


            })
        }
    }
    onBindinggame = (postid, showdata) => {
        console.log("showselectdata原始绑定数据%%%%======",
            this.props.showselectdata, postid, showdata, this.state.activeid)
        let datas = this.props.showselectdata
        let activeid = this.state.activeid
        for (let i = 0; i < datas.length; i++) {
            if (activeid === datas[i].value) {
                // let objarry=[{"id":postid,"showdata":showdata}]
                let showdata = getsysid(this.props.UserRole, postid);
                let showdatamodel = getdefaultRoleData(showdata)
                console.log("showdatamodel", showdatamodel.showdata)
                datas[i]["data"] = { "id": postid, "showdata": showdata, "innerdata": showdatamodel.showdata };
            }

        }
        this.props.onChangeGameRole(datas)
        this.closemode();
    }
    closemode = () => {
        this.setState({
            addRoletag: false,
        })
    }
    onHandleCancel = () => {
        this.closemode();
    }
    render() {

        console.log("this.props.showselectdata", this.props.showselectdata)
        const { isShow } = this.props
        return (
            <div className="content-data">
                <div className="showGameok">
                    {this.props.isOk && !this.props.configurationRoletag && this.props.showselectdata.map((item, index) => {
                        return (
                            <div className="okshow" key={index}>
                                <span className="item">{item.label}</span>

                            </div>
                        )
                    })
                    }
                    {this.props.isShow && this.props.isOk && !this.props.configurationRoletag && <div className="reload-writer blue" onClick={this.props.onReset}>重新配置游戏</div>}
                </div>


                {this.props.configurationRoletag &&
                    this.props.showselectdata.map((item, index) => {
                        return (
                            <div className="box" key={index}>
                                <div className="box-top">
                                <div className="okshow" >
                                    <span className="item">{item.label}</span>
                                </div>
                                {isShow &&
                                 <div className="option blue"
                                        onClick={this.onConfigurationRole.bind(this, item.value, item.data)}>
                                        { "配置角色"}</div>}
                                </div>
                                {item.data && <ShowSelectRole
                                    relevancedata={item.data.showdata}
                                />}
                            </div>
                        )
                    })
                }

                <div className="gameSpecialRole">
                    <LimitRoleModle
                        key={this.state.activeid}
                        addRoletag={this.state.addRoletag}
                        bindingRole={this.onBindinggame}
                        roledata={this.props.UserRole}
                        onHandleCancel={this.onHandleCancel}
                        defaultCheackRole={this.state.defaultCheackRole}
                        defaultShowRole={this.state.defaultShowRole}
                    />
                </div>
            </div>
        )

    }
}
export default GameSelectRole;