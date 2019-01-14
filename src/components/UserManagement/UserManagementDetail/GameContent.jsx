import React from 'react';
import { message } from 'antd';
import NewGameChannelModal from './NewGameChannelModal'
import NewGameRoleModal from './NewGameRoleModal'
// import SelectRole from '../../PublicComponent/Ganged/SelectRole';
import { getajax, getRolelist } from '../../../public/ajax'
import ShowSelectRole from '../../PublicComponent/Multistage/ShowSelectRole'
import { getdefaultRoleData, getuUserRole, getDefalutRoleid } from '../../../public/CommonFuncs'
const Ajax = getajax.ajaxFun;


class GameContent extends React.Component {

    state = {
        bottomtabList: [{
            "name": "关联角色",
            "id": "1"
        }, {
            "name": "可访问游戏数据",
            "id": "2"
        }],
        tabDeafult: "1",
        channeldata: [
        ],
        relevancedata: [
            // [{"name":"简乐互动","id":"sys7913180607"},
            // {"name":"test","id":"JLHD7500024748aa3f815ceef382cada0b411528342143"}
            // ,{"name":["test"],"id":["1"]}]
        ],
        channelrole: this.props.relevancedata,
        channelmodiftag: false,
        channelrolemodifytag: false,
        gamemodifytag: false,
        UserRole: [],
        defaultShowRole: [],
        defaultCheackRole: [],
        showmodifybtn: false,//当前游戏下游渠道显示修改渠道
     



    }
    componentDidMount() {
        let roledata = JSON.parse(window.sessionStorage.getItem("conf_sysroles"))
        // let defaultdata=getdefaultRoleData(this.props.userDetaildata.role)


        if (roledata == null) {
            // 请求角色的列表
            getRolelist("conf_sysroles", this.sucRoleList);
        } else {
            console.log("游戏原本的权限========", this.props.gamerolelist,
                this.props.userDetaildata.role, this.props.relevancedata)
            let datatemp = getDefalutRoleid(this.props.userDetaildata.role)
            let UserRole = getuUserRole(roledata, datatemp)
            console.log("当前用户下的系统==========", UserRole)
            this.setState({
                UserRole: UserRole,
                constroledata: UserRole,
            })
        }
     
    }
    // 设置角色的默认数据
    sucRoleList = (e) => {
        if (e.ret === 1) {
            // console.log("第一次来这里发生请求的时候========****", this.props.gamerolelist,
            // this.props.userDetaildata.role, this.props.relevancedata)
            let datatemp = getDefalutRoleid(this.props.userDetaildata.role)
            let UserRole = getuUserRole(e.data, datatemp)
            // console.log("发生请求的时候用户数据", UserRole)     
            this.setState({
                roledata: e.data,
                constroledata: e.data,
                UserRole: UserRole,
                
                // constroledata: UserRole,  
                // dimdata:dimdata
            })
            window.sessionStorage.setItem("conf_sysroles", JSON.stringify(e.data)) //游戏列表
            //直接来时没有数据的


        } else {
            message.error(e.errmsg);
        }
    }
    // 修改渠道弹框弹出
    modifiChannel = () => {
        this.setState({
            channelmodiftag: true,
        })
    }

    //修改游戏角色
    modifiGameRole = () => {
        this.setState({
            channelrolemodifytag: true,
        })

    }

    // 关闭角色模态框
    onHandleCancelGameRole = () => {
        console.log("请求成功")
        this.setState({
            channelrolemodifytag: false
        })
    }
    onCancelRelevance = (id) => {

    }

    onBindingRole = (postid, showdata) => {
        // console.log("showselectdata原始绑定数据%%%%======", 
        //   this.props.showselectdata,postid,showdata,)
        // let datas=this.props.showselectdata
        // let activeid=this.state.activeid
        // for(let i=0;i<datas.length;i++){
        //   if(activeid==datas[i].value){
        //       // let objarry=[{"id":postid,"showdata":showdata}]
        //         let showdata= getsysid(this.props.UserRole,postid);
        //      datas[i]["data"]={"id":postid,"showdata":showdata,"innerdata":showdata};
        //   }

        // }
    }
    // 请求用户的游戏渠道权限
    getUserChannel = () => {


        let data = {
            "uid": parseInt(this.props.uid, 10),
        }
        // let that = this;
        Ajax('post', 'front/query', 'user_detailpermits', data, (e) => {
            if (e.ret === 1) {
                console.log(e.data)
                //调用绑定成功，从新请求用户的基本信息
                // that.props.onOkRoleSucess(parseInt(that.props.uid))
                // that.props.onHandleCancel()
            } else {
                message.error(e.errmsg);
            }
        })
    }
    // 渠道修改成功，关闭模态框
    onOkChanelSucess = () => {
        this.onHandleCancelChannel()
        this.props.onOkChannelSucess()
    }
    // 关闭渠道修改模态框
    onHandleCancelChannel = () => {
        console.log("关闭模态框")
        this.setState({
            channelmodiftag: false
        })
    }
    // onHandleCancel=()=>{
    //   this.props.onOkRoleSucess(parseInt(this.props.uid))

    // }
    onOkGameRolelSucess = () => {
        // 成功之后关闭模态框
        this.props.onOkChannelSucess()
        this.onHandleCancelGameRole();
    }
    onhasChanne = (data) => {
        this.setState({ showmodifybtn: true })
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.roleData !== this.state.roleDatatemp) {
    //       console.log("用户角色发生变化")
    //   }
    // }

    render() {

        const { channelmodiftag, channelrolemodifytag } = this.state;
        const { showcheckedListname, relevancedata, userOpPermit } = this.props

        // console.log("this.props.relevancedata==========&&&&&&&&",
        //     this.props.showcheckedListname,
        //     this.props.checkedList,
        //     this.props.userDetaildata,
        //     this.props.relevancedata)
        console.log("弹出模态框游戏角色的key", this.props.roleData,this.state.UserRole)
        return (
            <div className="GameContent">
                <div className="show-chaneel">
                    <div className="top">
                        <div className="left">渠道权限</div>
                        {userOpPermit.op_user_editchannel && <div className="right" onClick={() => this.modifiChannel()}>修改渠道</div>}
                    </div>
                    <div>
                        {showcheckedListname.map((item) => {
                            return (
                                <span className="channeName" key={item.key}>{item.value}</span>
                            )
                        })}
                    </div>

                    <NewGameChannelModal
                        uid={this.props.uid}
                        onHandleCancel={this.onHandleCancelChannel}
                        onOkChanelSucess={this.onOkChanelSucess}
                        addRoletag={channelmodiftag}
                        gid={this.props.gid}
                        checkedList={this.props.checkedList}
                        gamename={this.props.gamename}
                        channeldata={this.props.channeldata}
                        showcheckedListname={this.props.showcheckedListname}
                        onhasChanne={this.onhasChanne}
                    />
                </div>
                <div className="show-role">
                    <div className="top">
                        <div className="left">特殊角色</div>
                        {userOpPermit.op_user_gameroe && <div className="right" onClick={() => this.modifiGameRole()}>修改特殊权限</div>}
                    </div>
                    <div className="role-wrapper">
                        {/*<SelectRole
            isEdit={false}
            relevancedata={relevancedata}
            onCancelRelevance={this.onCancelRelevance}
            />
        */}
                        <ShowSelectRole
                            relevancedata={relevancedata}
                        />
                    </div>
                    <NewGameRoleModal
                        key={this.props.roleData}
                        uid={this.props.uid}
                        gid={this.props.gid}
                        relevancedata={relevancedata}
                        onHandleCancel={this.onHandleCancelGameRole}
                        onOkGameRolelSucess={this.onOkGameRolelSucess}
                        addRoletag={channelrolemodifytag}
                        gamename={this.props.gamename}//显示游戏的名字
                        gamerolelist={this.props.gamerolelist}
                        roledata={this.state.UserRole}//原始系统，用户所在的系统
                        defaultCheackRole={getdefaultRoleData(relevancedata).id}
                        defaultShowRole={getdefaultRoleData(relevancedata).showdata}
                        onBindingRole={this.onBindingRole}
                    />
                </div>
            </div>
        )
    }
}
export default GameContent;