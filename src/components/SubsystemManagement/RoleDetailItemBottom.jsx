import React from 'react';
import { Tabs, Button, Icon, Pagination, message, Modal } from 'antd';
import { browserHistory } from 'react-router';
import SearchTree from '../PublicComponent/SearchTree/SearchTree'
import ContentList from '../PublicComponent/ContentList/ContentList';
import { getajax } from '../../public/ajax';
import UserList from '../PublicComponent/UserList'
// import CheackGroupC from '../PublicComponent/CheackGroupCustom/CheackGroupC'
import usertemp from '../../style/imgs/addtemp.png';
import pertemp from '../../style/imgs/seartemp.png';
import { root } from '../../root';

import {  searchIdToName } from '../../public/CommonFuncs'
const Ajax = getajax.ajaxFun;
const rootapp = root();
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
class RoleDetailItemBottom extends React.Component {
    constructor(props) {
        super(props);
        console.log("只有第一次才会走这里",props.disablepermint)
      
    }
    ;
    state={
        pageSize: 10,
        pagenum: 1,
        objlistdata: [],
        userModal: false,
        gamelistdata: [], //游戏数据
        constgamelistdata: [],
        checkedListGame: [], //
        showselectdata: [], //展示选择
        gameListOK: false,
        ajaxTree:[],
        disablepermint:false,
        isCheckTree:false,

    }
    // 页签切换

    Changecallback=(e) => {
        console.log(e)
        this.setState({
              disablepermint:true,
        })
        this.props.onCancelChange()
    }
    getCheckData=(e) => { //获取tree选中值
       console.log("获取tree选中值",e)
        this.setState({
         ajaxTree:e,
         isCheckTree:true,
        })
        this.props.getCheckData(e)
    }
    showpermintFunc =(e)=>{
        this.setState({
            disablepermint:false
        })
    }
    editpermitsFunc=(e)=>{//保存角色权限更改
       
        let data ={
            "roleid": this.props.currentId,
             "syslid":this.props.sysid,
            permitlist:this.state.isCheckTree?this.state.ajaxTree.toString():this.props.defaultPermit.toString()
         }
        Ajax('post', 'front/query', 'role_editpermits', data, (e) => { 
           if(e.ret==1){
              message.success("更改角色权限成功")
               this.setState({
                disablepermint:true
             })
           } 
           else{
            message.error(e.errmsg)
           }
        })  
    }
    editpermitsFuncCancel=()=>{//不保存角色权限更改
        this.setState({
            disablepermint:true
         })
        //  取消选择
        this.props.onCancelChange()
    }
    changeNum=(e)=>{//分页
    
      this.setState({
        pagenum:e,
      })
    }
    changePageSize=(e,size)=>{//分页
        console.log("页码",e)
      this.setState({
        pageSize:size,
        pagenum:1,
      })
    }
    /*获取用户列表*/
    getRoleList=(e) => {
        console.log("走这里没有,请求获取用户列表")
        const {roleState,local_permit} = this.props
        let data = {
            "roleid": this.props.currentId
        }
        Ajax('post', 'front/query', 'role_relateusers', data, (e) => {
          
            if (e.ret == 1) {
                let temp = [];
                let rolelistsession = [];
                let checkuser=[];
                e.data.forEach(function(item, index) {
                    let text = '';
                    let textde = '';
                    rolelistsession.push({
                        name: item.nickname + "(" + item.username + ")",
                        rid: item.uid
                    })
                    if (roleState == 0&&local_permit["md_subsys_mgr.op_subsys_calrelateuser"]) {
                        text = "取消关联";
                        textde = '详情'
                    }
                    checkuser.push(item.uid);
                    let roleList = {
                        data: [[{
                            "title": item.nickname + "(" + item.username + ")",
                            "data": [item.rolename],
                            "id": item.uid,
                        },
                            {
                                "title": "",
                                "data": ['']
                            }]
                        ],
                        optiondata: [{
                            id: item.uid,
                            data: [textde, text]
                        }],
                        iconurl: "",
                        checkboxcheack: false,
                        id: item.uid
                    }
                    temp.push(roleList)
                })
                console.log("用户列表===",temp)
                //window.sessionStorage.setItem("roleList",JSON.stringify(rolelistsession))
                this.setState({
                    objlistdata: temp,
 
                // sysstate:parseInt(e.sysstate)
                })
               // this.onSetCheckedList(checkuser);
                let userlist=JSON.parse(window.sessionStorage.getItem("userList"));
                let userTodata=JSON.parse(window.sessionStorage.getItem("userList"));
                  let temptt=[];
                  
                  let temps = []; //临时数组1  
                  let temparray = [];//临时数组2 
                   for (let i = 0; i < checkuser.length; i++) { 
                     temps[checkuser[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真 
                    }; 
                  for (let i = 0; i < userlist.length; i++) { 
                    if (!temps[userlist[i].uid]&&userlist[i].userstate==0) { 
                     temparray.push(userlist[i]);//巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组 
                    } ;   
                  }; 
                 
                  temparray.forEach(function(item,index){
                        temptt.push({value:item.uid,label:item.nickname+'('+item.username+')'})
                  })
                  this.setState({
                    gamelistdata:temptt,
                    constgamelistdata:temptt,
                    pagenum:1,
                  })
            
            } else {
                message.error(e.errmsg)
            }
        })
    }
    optionClick=(data, id) => {//点击取消和详情界面
        console.log(data, id)
        if(data=="取消关联"){
          let that=this;
         confirm({
        title:"是否确定取消关联该用户?",
        content: '',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
        let  data={
                   "roleid":that.props.currentId,
                   "userid":id
              }
      Ajax('post','front/query','role_delrelateusers',data,(e)=>{
        if(e.ret==1){
          message.success("取消关联成功");
          that.getRoleList();
        }
        else{
           message.error(e.errmsg);
        }
     })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
        }
        else{
          browserHistory.push({
              pathname: rootapp+'app/UserManagementDetail',
              query:{uid:id,selectedKeys:-1}
           })
        }
    }
    CheckboxonChange=(data, id) => {
        console.log("选中一行数据", data, id)
    }
    addNewUser=() => { //关联新用户打开模态框
        this.setState({
            userModal: true,
            checkedListGame:[],
            showselectdata:[],
        })
    }
 
    // 通过名字查找id
    onserchData=(value) => {
        let data = this.state.constgamelistdata;
        let serchdata = []
        if (value != "") {
            for (let i = 0; i < data.length; i++) {
                if (data[i].label.indexOf(value) > -1) {
                    serchdata.push(data[i])
                }
            }
        } else {
            serchdata = this.state.constgamelistdata
        }
        this.setState({
            gamelistdata: serchdata
        })
    }
    onSetCheckedList=(CheckedList) => {
     
        this.setState({
            checkedListGame: CheckedList
        })
        let showselectdata = searchIdToName(this.state.constgamelistdata, CheckedList)
        this.setState({
            showselectdata
        })
    }
    oncloseList=(id) => {
        let idlist = [];
        let objlist = [];
        let data1 = this.state.checkedListGame;
        let data2 = this.state.showselectdata
        for ( let j of data1 ) {

            if (id !== j) {
                idlist.push(j)
            }
        }
        for (let k = 0; k < data2.length; k++) {
            console.log(data2)
            if (id !== data2[k].value) {
                objlist.push(data2[k])
            }
        }
        console.log("删除数据的时候,", idlist, objlist)
        this.setState({
            checkedListGame: idlist,
            showselectdata: objlist,
        })
    }
    // 游戏选择好了
    gameSelectOk=(checkedListGame) => {
      console.log("checkedListGame",checkedListGame)
       let data = {
            "roleid": this.props.currentId,
             "users": this.state.checkedListGame,
            //"users": checkedListGame,
        }
        Ajax('post', 'front/query', 'role_setrelateusers', data, (e) => {
           if(e.ret==1){
               message.success("添加用户成功");
               this.getRoleList();
               this.setState({
                userModal:false,
                checkedListGame:[],
               })
           }else{
            message.error(e.errmsg)
           }
        })
       // this.next();
        // this.setState({
        //     gameListOK: false
        // })
    }
    // 取消游戏选择
    gameSelectCancel=() => {

        // 选中的不展示
        // 删除选中的list
        //删除右侧展示的选中列表
        this.setState({
            gameListOK: false,
            userModal:false,
            checkedListGame: [],
            // showselectdata: [],
        })

    }
    componentWillMount() {
         console.log("%%%%%%%%%%%%%这里来没有?===========这里来没有?===========这里来没有?===========")
        // this.getRoleList();
    }
    componentWillReceiveProps=(nextprops)=>{
        console.log("这里来没有componentWillReceiveProps?===========",this.props.disablepermint,nextprops.disablepermint)
        if(this.props.disablepermint!==nextprops.disablepermint){
            // 只要发生切换就设置为不可以点击
                this.setState({
            disablepermint: true
        }) 
        }
   
    }
    render() {
        const {objlistdata, pagenum, pageSize, userModal,disablepermint} = this.state;
        const {defaultPermit,roleState,subSyspermit,local_permit} = this.props;
        console.log("objlistdata==========",objlistdata)
        return (
            <div className="SubsystemDetailItemBottom" > 
        <Tabs defaultActiveKey="1" onChange={this.Changecallback}>
        <TabPane tab="关联用户" key="1">
         {roleState==0&&local_permit["md_subsys_mgr.op_subsys_relateuser"]&&<Button onClick={this.addNewUser} type="primary" icon="plus">关联新用户</Button>
          }
        <div>     
          {objlistdata.slice((pagenum - 1) * pageSize, (pagenum - 1) * pageSize + pageSize).map((item, index) => {
               console.log("objlistdata,item.data==========",item.data)
               return (
                    
                    <ContentList data={item.data}
                    key={item.id}
                    id={item.id}
                    hasicon={item.iconurl == "" ? false : true}
                    optiondata={item.optiondata}
                    iconurl={item.iconurl}
                    checkboxcheack={item.checkboxcheack}
                    optionClick={this.optionClick}
                    CheckboxonChange={this.CheckboxonChange}/>
                )
            })
            }      </div>
          {objlistdata.length!=0&& <Pagination
            size="small"
            current={pagenum}
            pageSize={pageSize}
            defaultPageSize={pageSize}
            total={objlistdata.length}
            pageSizeOptions={["10", "20", "30", "40"]}
            onChange={this.changeNum}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showTotal={(e) => {
                return "共 " + e + " 条"
            }}
            />}
            {objlistdata.length==0&&
              <img className="tempimg" src={usertemp}/>
            }
        </TabPane>
        <TabPane tab="关联权限" key="2">
        {roleState==0&&subSyspermit.length!=0&&local_permit["md_subsys_mgr.op_subsys_editsysrolepermit"]&&
         <div >
         {disablepermint?<Button type="primary" onClick={this.showpermintFunc}>更改角色权限</Button>
         :<div><Button type="primary" onClick={this.editpermitsFunc}>保存</Button>
         <Button type="primary" style={{"marginLeft":"20px"}} onClick={this.editpermitsFuncCancel}>取消</Button>
         </div>}
         </div>
        }
            <SearchTree 
            current={disablepermint?2:0}
             checkable={true}  
             TreeData={subSyspermit} 
             defaultTree={defaultPermit}
             getCheckData={this.getCheckData}  ></SearchTree>
        {subSyspermit.length==0&&
              <img className="tempimg" src={pertemp}/>
            }
        </TabPane>
       </Tabs>
        <Modal
            maskClosable={false}
            title="关联新用户"
            visible={userModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}
            className="addNewuserToRole"
            footer={null}
            >
          { <UserList
            isShow={true}
            data={this.state.gamelistdata}
            onChangeGame={this.onserchData}
            constdata={this.state.constgamelistdata}
            checkedList={this.state.checkedListGame}
            onSetCheckedList={this.onSetCheckedList}
            showselectdata={this.state.showselectdata}
            oncloseList={this.oncloseList}
            isOk={this.state.gameListOK}
            onOK={this.gameSelectOk}
            onCancel={this.gameSelectCancel}
            />}
            
        </Modal>
      </div>
        )
    }
}
export default RoleDetailItemBottom;