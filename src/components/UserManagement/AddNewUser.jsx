
import React from 'react';
import { Steps, Button, message, Modal } from 'antd';
import UserBaseMessageForm from './UserBaseMessage'
import ShowSelectRole from '../PublicComponent/Multistage/ShowSelectRole'
import Multistage from '../PublicComponent/Multistage/Multistage/Multistage'
import GameChenneList from '../PublicComponent/GameChenneList'
import GameList from '../PublicComponent/GameList'
import { getajax, getUserList, ajaxGameChannel, ajaxGame, ajaxRole, getRolelist} from '../../public/ajax'
import {  ConstructPostData } from '../../public/CommonFuncs'
import { getdefaultRoleData,getsysid,getuUserRole} from '../../public/CommonFuncs'
import UploadFiles from '../PublicComponent/UploadFiles';
import { getmd5} from '../../public/getmd5';
import '../../style/AddNewUser.css';
const confirm = Modal.confirm;
const Ajax = getajax.ajaxFun;
const Step = Steps.Step;
class AddNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            datavalue: {
                "username": "",
                "nickname": "",
                "ddaccount": "",
                "mobile": "",
                "email": "",
                "secpass":"123456",
                "pass":"123456",
                "partner":''
            },
            isEditMode: false,
            "displayshow": true,
            "userid": "",
            relevancedata: [],
            UserRole:[],
            BindingRoledata: [],
            Channe: [],
            GameChannedata: [],
            selectSubsys: {
                "prentkey": [],
                "childrenkey": []
            },
            defaultCheackRole:[],
            defaultShowRole:[],
            "roledata": [],
            "constroledata": [],
            "rolebtndisable":false,
            rolepostdata:[],
            userhasgid:"",
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({
            current
        });
        if (current === 1) {
            this.setState({
                displayshow: false
            });
        }


    }
    prev() {
        // console.log("this.state.current", this.state.current)
        const current = this.state.current - 1;
        this.setState({
            current
        });
    }
    // 提交用户逇基本信息
    onHandleSubmit=(data) => {
        // 提交用户的基本信息
        data["pass"] = data.secpass
    data.secpass = getmd5(data.secpass)
        
        // data.secpass = Encrypt(data.secpass, publicKey);
        // let tempdata = datas;
         console.log('Received values of form: ', data );

        if (this.state.userid!=="") {
            // 修改
            let datas = data;
            datas["uid"] = this.state.userid
            Ajax('post', 'front/query', 'user_edit', datas, (e) => {
                if (e.ret === 1) {

                    //调用绑定成功，从新请求用户的基本信息
                    // this.props.onOkRoleSucess(parseInt(that.props.uid))
                    // that.props.onHandleCancel()
                    this.next();
                } else {
                    message.error(e.errmsg);
                }
            })
         }else{
            //  新增
        Ajax('post', 'front/query', "user_add", data, this.userInforSuccess)
        this.setState({
            datavalue: data
        })
    }
    }
    userInforSuccess=(res) => {
        if (res.ret === 1) {
            // this.getUserList();
            // 更新用户列表缓存数据
            getUserList({}, this.getUserListSuccess)

            this.setState({
                "userid": res.gmid
            })
        // this.getRolelist()
        } else {
            message.error(res.errmsg);
        }
    }
    // 缓存数据更新成功之后,刷新左边的用户数据列表
    getUserListSuccess=() => {
        this.next();
        let userlist = window.sessionStorage.getItem("userList")
        let datas = JSON.parse(userlist)
        this.props.onSetUserList(datas, "all",this.props.userOpPermit);
        this.props.GetUserManagemengGroup();
    }
 

    onBindingRole=(relevancedata) => {
        this.setState({
            relevancedata
        })
    }
    //角色确认，并没有像后台提交
    onokfrendRole = (datatemp)=>{
     //角色确认 
        console.log("//角色确认前端存在",datatemp)
        this.setRoleDeflutdata(datatemp)
        // this.setState({
        //     rolebtndisable: true,
        // })
    }
    setRoleDeflutdata = (datatemp)=>{
        let showdata = getsysid(this.state.roledata, datatemp);
        // 成功之后设置默认选中的
        let defaultdata = getdefaultRoleData(showdata)
        // 根据角色的id过滤系统和组
        // rolebtndisable表示有确认选择
        let UserRole = getuUserRole(this.state.roledata, datatemp)
        this.setState({
            rolebtndisable: true,
            relevancedata: showdata,
            UserRole: UserRole,
            defaultCheackRole: defaultdata.id,
            defaultShowRole: defaultdata.showdata,
            rolepostdata: datatemp,
        })
    }
    //向后台提交绑定角色 新增角色
    bindingRole=() => {
        // let rolesshow = getroleid(datatemp)
        // let selectSubsys = getSystemData(datatemp);
        // console.log("datatemp", datatemp, rolesshow)
        let datatemp=this.state.rolepostdata;
        let data = {
            "uid": this.state.userid,
            "roles": datatemp,
        }
        ajaxRole(data, this.scusseRole, this.errorRole)
        Ajax('post', 'front/query', 'user_setrelateroles', data, (e) => {
            if (e.ret === 1) {
                console.log("角色绑定成功",datatemp)
                // 通过角色id查找系统id
                this.setRoleDeflutdata(datatemp)
                this.props.GetUserManagemengGroup()
                // this.next()
                // this.setState({ userhasgid: e.gmid})
               
            } else {
                message.error(e.errmsg);
            }
        })
    }
   
    // 角色上一步
    Roleprev = () => {
        let that = this;
        if (this.state.relevancedata.length>0) {
            // 表示是选择时候的上一步
            confirm({
                title: "保存数据",
                content: '',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    that.prev()
                    that.bindingRole()
                },
                onCancel() {
                    that.prev()
                },
            });
        } else {

            //表示是没有选择上一步
            this.prev()
        }
    }
    // 角色下一步Rolenext
    Rolenext=()=>{
        this.next()
        this.bindingRole()
    }
    //重新选择角色
    onceSetRole=()=>{
        this.setState({
            rolebtndisable: false
        })
    }
    handleChanne=(Channe) => {
        this.setState({
            Channe
        })
    }




    // 绑定game
    onBindinggame=(data) => {
        console.log("绑定的游戏", data)
        let GameChannedatatemp = data;
        for (let i = 0; i < GameChannedatatemp.length; i++) {
            GameChannedatatemp[i]["showcheckedListname"] = [];
            GameChannedatatemp[i]["checkedList"] = [];
            if (GameChannedatatemp[i]["data"]===undefined) {
                GameChannedatatemp[i]["data"] = {"id": [], "innerdata": [],"showdata":[]}  
            }
        }
        this.setState({
            GameChannedata: GameChannedatatemp
        })
        

        let datas = {
            "uid": this.state.userid,
            "game_permits": data
        }
       
        ajaxGame(datas, this.scussee, this.error)
      

    }
    scussee=() => {
        this.next()
    }
    scusseepre=()=>{
        this.prev()
    }
    error=(errmsg) => {
        message.error(errmsg);
    }

    onSetGameChane=(data) => {
        this.setState({
            GameChannedata: data
        })
    }
    bindinggameChane=(tag) => {
        //  console.log("提交的数据this.state.GameChannedata",this.state.GameChannedata)
        let chaneid = ConstructPostData(this.state.GameChannedata)
        let datas = {
            "uid": this.state.userid,
            "channels": chaneid
        }
        // ajaxGameChannel(datas, this.scussee, this.error)
        if(tag==="prev"){
            // 上一步还是
            ajaxGameChannel(datas, this.scusseepre, this.error)
           
        }else{
            // 下一步
          ajaxGameChannel(datas, this.scussee, this.error)  
        }
        
    }
    ok=() => {
        this.props.addnewok()
    }
     componentDidMount() {
          let  roledata=JSON.parse(window.sessionStorage.getItem("conf_sysroles"))
        // let defaultdata=getdefaultRoleData(this.props.userDetaildata.role)
  if (roledata == null) {
    // 请求角色的列表
            getRolelist("conf_sysroles", this.sucRoleList);
        } else {
  this.setState({
    roledata:roledata,
    constroledata:roledata,
    // defaultCheackRole:defaultdata.id,
    // defaultShowRole:defaultdata.showdata,
    
  })
}
}
  sucRoleList=(e) => {
        if (e.ret === 1) {
            // console.log("BindingRoledata", e.data)
            // let dimdata=transformSearchData(e.data,this.state.Classifyid)
            this.setState({
                roledata: e.data,
                constroledata:e.data,
                // dimdata:dimdata
            })
            window.sessionStorage.setItem("conf_sysroles", JSON.stringify(e.data)) //游戏列表

            this.Delay()
        } else {
            message.error(e.errmsg);
        }
    }
    // 角色的取消
    gameprev=()=>{
        this.prev();
    }
    render() {
        const { current, rolebtndisable} = this.state;
        const {userOpPermit}=this.props;
        const steps = [{
            title: '填写用户基本信息',
            content: (<div>
        <UserBaseMessageForm
            title="用户名及其他基本信息"
            isEditMode={this.state.current === 0 ? true : false}
            datavalue={this.state.datavalue}
            onHandleSubmit={this.onHandleSubmit}
            /></div>),
        }, {
            title: '选择与用户关联的角色',
            content: (<div>
                <p>选择关联的角色</p>
            <div style={{"display":this.state.current === 1 ? "block" : "none"}} >
            {!rolebtndisable&&<Multistage
            key={this.state.current}
            handleCancel={this.handleCancel}
            bindingRole={this.onokfrendRole}
            Cannel={this.handleCancel}
            roledata={this.state.roledata}
            constroledata={this.state.constroledata}
            defaultCheackRole={this.state.defaultCheackRole}
            defaultShowRole={this.state.defaultShowRole}
            showCannel={false}
            />}
            </div>
        {/*显示显示的数据*/}
        <div className="userRole">
        <ShowSelectRole
        relevancedata={this.state.relevancedata}
        />
        {rolebtndisable && this.state.current && this.state.current === 1&&
        <p className="blue" onClick={() => this.onceSetRole()}>重新配置角色</p>}
        </div>
        <div className="roleBtnNext" 
         style={{ "display": this.state.current === 1 ? "block" : "none","marginTop":"1%"}} >
        <Button type="primary" onClick={() => this.Rolenext()}>下一步</Button>
         <Button 
         className="pre bule" onClick={() => this.Roleprev()} >
         {this.state.relevancedata.length > 0 ?"保存并返回上一步":"上一步"}
         </Button>
         </div>
        </div>
       
            ),
        }, {
            title: '选择用户可访问的游戏数据',
            content: (<div className="addNewUser-wrapper" > <GameList
            
            isShow={this.state.current === 2 ? true : false}
            bindinggame={this.onBindinggame}
            selectSubsys={this.state.selectSubsys}
            onConfigurationRole={this.onConfigurationRole}
            UserRole={this.state.UserRole}
            prev={this.gameprev}
            /></div>),
        }, {
            title: '选择用户可访问渠道',
           content: (<div className="addNewUser-wrapper" >
            <GameChenneList
            gamedata={this.state.GameChannedata}
            onSetGameChane={this.onSetGameChane}
            isShow={this.state.current === 3 ? true : false}
            bindinggameChane={this.bindinggameChane}
            prev={this.Chaneprev}
            />
            </div>),
        }, {
            title: '完成',
            content: (<div>点击确按钮返回</div>),
        }];

        return (
      <div  className="AddNewUser-wrapper">
      <div className="path"><span >全部用户</span><span>/</span><span className="nowpath">新增用户</span>
      <span className="leadfile">
      {userOpPermit.op_user_advancedmgr&&<UploadFiles/>}</span>
      </div>
      <div className="name">
      <span>新增用户</span>
      <Button className="cancel" onClick={() => this.ok()}>取消</Button>
      </div>
        <Steps direction="vertical" current={current}>
          {steps.map((item, index) => <Step key={item.title} title={item.title}
                description={item.content} />)}
        </Steps>
        <div className="steps-action">
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => this.ok()}>确认</Button>
            }
          
        </div>
      </div>
        );
    }
}

export default AddNewUser;