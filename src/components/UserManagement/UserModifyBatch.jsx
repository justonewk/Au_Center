import React from 'react';
import { Modal, Button,Input ,message} from 'antd';
import { getajax,getUserList } from '../../public/ajax'
import { validatorCheck } from '../../public/validator'
import {  searchIdToName } from '../../public/CommonFuncs'
import UserList from '../PublicComponent/UserList'
const Ajax = getajax.ajaxFun;
class UserModifyBatch extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    value:"",
    erromsg:"",
    gamelistdata:[],
    constgamelistdata:[],
    checkedListGame: [], //
    showselectdata: [], //展示选择
    gameListOK: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
    let userlist=JSON.parse(window.sessionStorage.getItem("userList"));
      let temptt=[];

    userlist.forEach(function(item,index){
          if(item.partner===null){
            temptt.push({value:item.uid,label:item.nickname+'('+item.username+')'})  
          }
            
      })
      this.setState({
        gamelistdata:temptt,
        constgamelistdata:temptt,
     
      })
  }


  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
      checkedListGame: [], 
      showselectdata: [],
      value:""
    });
   
    // this.props.onSelectRightKey([-1],"")
  }
  onChange=(e)=>{
    console.log("value",e.target.value)
        this.setState({value:e.target.value,erromsg:""})
    
  }
 
  password=(e)=>{
    console.log("value",e.target.value)
  // this.setState({value:value})
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
    console.log("checkedListGame",this.state.checkedListGame)
    console.log("value标识",this.state.value)
    if(this.state.value===""){
        this.setState({message:"标识不为空"})
    }else if(this.state.checkedListGame.length==0){
        this.setState({message:"标识用户不为空"})
    }else{
     let data = {
          "uids": this.state.checkedListGame.join(","),
           "partner": this.state.value,
          //"users": checkedListGame,
      }
      Ajax('post', 'front/query', 'user_partner_bulk', data, (e) => {
         if(e.ret==1){
             message.success("修改标识成功");
             getUserList({}, this.getUserListSuccess)
           
         }else{
          message.error(e.errmsg)
         }
      })
    
      this.setState({
          gameListOK: false
      })
    }
  }
  getUserListSuccess=()=>{
      console.log("从新请求没有呢?")
    this.setState({
        userModal:false,
        checkedListGame:[],
       })
       let userlist=JSON.parse(window.sessionStorage.getItem("userList"));
    //    let datas = JSON.parse(userlist)
    //    console.log("datas====",userlist,this.props.userOpPermit)
       this.props.onSetUserList([],userlist, "all", this.props.userOpPermit)
       this.handleCancel();

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
  render() {
    const { visible,  value,erromsg } = this.state;
    return (
      <div className="user_adminresetpwd">
        <Button type="default" onClick={this.showModal}>
         批量修改合作标识
        </Button>
        <Modal title="修改合作标识"
          visible={visible}
          className="addNewuserToRole  addUserModifyBatch"
        //   onOk={this.handleOk}
        //   confirmLoading={confirmLoading}
         onCancel={this.handleCancel}
          footer={null}
        >
         <div className="data"><span>合作标识:</span>
          <Input value={value} onChange={this.onChange} onBlur={this.password}/></div>
        <p>{erromsg}</p>
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
            onCancel={this.handleCancel}
            />}
            
        </Modal>
      </div>
    );
  }
}
export default UserModifyBatch;
