import React from 'react';
import {Button,message,Input,Upload, Icon,Modal} from 'antd'
import {Link,browserHistory } from 'react-router';
import SubsystemDetailItemTopForm from './SubsystemDetailItemTopForm'
import {getajax} from '../../public/ajax';
import defaultimg from  '../../style/imgs/subsys.png';
import { getipconfig } from '../../getipconfig';
import { root } from '../../root';
const rootapp = root();
const getip = getipconfig();
const confirm = Modal.confirm;
const imgurl = getip.serverip+'temp/';
const Ajax=getajax.ajaxFun;
const Ajaxupload=getajax.ajaxUpload;

class SubsystemDetailItemTop extends React.Component {
  constructor(props) {
    super(props);
  };
  state={
  	isEditMode:false,
     imgFile:[],
     sysstate:1,
    datavalue:{
      slid:'',
      name:'',
      memo:'',
      version:'',
      icon:defaultimg,
      loginlink:'',
      key:'',

      support_game:[],
      noticelink:'',
      contact:{key:-1,label:''},
      group:{key:'',label:''},
     },
     syskey:'',
     imgUpload:{},
     gamecheck:[],//被选中游戏列表
     hasSameSName:false,
     errmsg:'',
     errmemo:'',
  }
  GoEdit=()=>{
  	this.setState({
  		isEditMode:true,
  	})
  }
  testFunc=(e)=>{//点击保存
    //console.log("保存:",this.state.datavalue)
    this.refs.SubsystemDetailItemTopForm.onOk()
  }
  GetKey=(e)=>{//重置key值
  
  }
  CancelDeit=()=>{//取消按钮
    this.setState({
           isEditMode:false,
      })
            this.getTopData();
            this.props.getSystemCard()
  }
  getHasSameSys=(value)=>{
     this.setState({
         hasSameSName:false,
         errmsg:''
       })
  
  }
  CallbackData=(e)=>{//保存数据提交的回调
   const {datavalue,imgUpload}=this.state;
   let tempcontentket=[];
   e.contact.forEach(function(item,index){
     tempcontentket.push(item.key)
   })
   if(datavalue.name==''||datavalue.name==null){
      
      this.setState({
        hasSameSName:true,
        errmsg:"请输入子系统名称",
      })
      return
   }
   if(datavalue.name.length>8){
     this.setState({
        hasSameSName:true,
        errmsg:"子系统名称不超过8个字",
      })
       
      return
   }
  
   if(datavalue.memo.length>20){
        this.setState({
          errmemo:"子系统简介不超过20个字"
        })
         return 
   }
   if(datavalue.memo.length<=20){
     this.setState({
          errmemo:""
        })
     }
  if(!this.state.hasSameSName){
     let htData={
            slid:datavalue.slid,
            name:datavalue.name,
            group:e.group.key,
            loginlink:e.loginlink,
            memo:datavalue.memo,
            noticelink:e.noticelink,
            support_games:e.support_game.toString(),
            version:datavalue.version,
            contact_uid:tempcontentket.toString()
          }
     let formData = new FormData();
         if(!imgUpload.old){
           formData.append('icon', imgUpload);
         }
     Ajaxupload('post','front/querywithupload','system_edit',htData,formData,(e)=>{
           if(e.ret==1){
            message.success("保存成功")
            this.setState({
                isEditMode:false,
              })
            this.getTopData();
            console.log("新增这里数据")
            this.props.getSystemCard()
           }
           else{
             message.error(e.errmsg)
           }
         }
           )
  }
  

  }
  ColseFunc=()=>{//关闭
    //let that=this;
    const {isEditMode}=this.state
    confirm({
    title: isEditMode?"你当前还有内容没有保存,是否确定关闭":"是否确定关闭当前页面",
    content:'',
    okText:"确认",
    cancelText:"取消",
    okType: 'danger',
    onOk() {
     browserHistory.push({
         pathname:rootapp+'app/SubsystemManagement',
       })
    },
    onCancel() {
      console.log('Cancel');
    },
  });
      
  }
  getTopData=()=>{//获取子系统详情
    console.log("获取子系统详情=====================",this.props.currentId)
     let data={
          "slid":this.props.currentId
      }
      Ajax('post','front/query','system_detail',data,(e)=>{
        console.log("获取子系统?的数据是:",e)
        if(e.ret==1){
          let supportgame=e.data.support_games==''?'':e.data.support_games.split(',')
          let temp=[];
          if(supportgame.length>0){
            supportgame.forEach(function(item,index){
               temp.push(parseInt(item))     
             })
          }
      let game=window.sessionStorage.getItem("gameList");
      let gamelist=JSON.parse(game);
      let gamecheck=[];//处理选中游戏列表
       for(let j=0;j<temp.length;j++){
          for(let i=0;i<gamelist.length;i++){
                if( parseInt(temp[j])==parseInt(gamelist[i].gid)){
                  gamecheck.push({
                     key:temp[j],
                     name:gamelist[i].name
                   })
                } 
              }
          }
            let supportgperson=e.data.contact_uid.split(',')
          console.log(supportgperson)
           let htcontattemp=[];
         supportgperson.forEach(function(item,index){
              htcontattemp.push({key:parseInt(item),label:e.data.contact_name[index]})
          })
         
           let datavalue={
                slid:e.data.slid,
                name:e.data.name,
                memo:e.data.memo,
                time:e.data.creattime,
                version:e.data.version,
                icon:e.data.icon==undefined?defaultimg:imgurl+e.data.icon,
                loginlink:e.data.loginlink,
                support_game: temp, // [ab, c, de],
                noticelink:e.data.noticelink,
                contact:htcontattemp,
                group:{key:e.data.sysgroupid,label:e.data.sysgroupname},
           }
           console.log("datavalue",datavalue.contact[0].label)
           this.setState({
            sysstate:e.data.sysstate,
            datavalue:datavalue,
            gamecheck:gamecheck,
            imgUpload:{
            old:e.data.icon==undefined?defaultimg:imgurl+e.data.icon,
            }   
           })
           window.sessionStorage.setItem("systemName",e.data.name)
          /* 获取子系统的key*/
           Ajax('post','front/query','system_params',data,(y)=>{
            console.log("走这里请求没有?system_params")
              if(y.ret==1){
                this.setState({
                  syskey:y.data.key
               })
                  setTimeout(() => {
                   },0);//通过延时处理
              }
              else{
                message.error(y.errmsg);
                 }
           })
        
        }
        else{
           message.error(e.errmsg);
        }
     })

  }

  componentDidMount(){
    console.log("这里请求componentDidMount,this.getTopData%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    this.getTopData()
  }
  componentWillReceiveProps(nextProps){
    // console.log("属性发生变化请求,this.getTopData&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",nextProps)
    //  this.getTopData()
  }
  SetName=(e)=>{//编辑子系统名称
    let val=e.target.value;
      let data = Object.assign({}, this.state.datavalue, { name: val })
      this.setState({
        datavalue: data
      })
    // return this.getValuelen(val)
     
  }
  ChangegetValuelen=(e)=>{
    console.log("e.e.target.value:",e.target)
     let val=e.target.value===undefined?'':e.target.value;
     this.getValuelen(val)
  }
  getValuelen=(val)=>{
     if(val.length>8){
      
      this.setState({
        hasSameSName:true,
        errmsg:"子系统不超过8个字符"
      })
      return false
     }
     else if(val==null||val==''){
      this.setState({
        hasSameSName:true,
        errmsg:"请输入子系统名称"
      })
      
       return false
     }
     else{
       this.getHasSameSys(val)
     }
  }
  getMemoLen=(val)=>{
     if(val.length>20){
           this.setState({
          errmemo:"子系统简介不超过20个字"
           })
          return false
         }
         else{
            this.setState({
             errmemo:""
            })
         }
  }
  SetMemo=(e)=>{//编辑简介
      let val=e.target.value;
      let data = Object.assign({}, this.state.datavalue, { memo: val })
      this.setState({
        datavalue: data
      })
      return this.getMemoLen(val)
  }
  exportXml=()=>{//下载公钥文件
    let data={
          "slid":this.props.currentId
      }
    Ajax('post','front/query','system_pem_file',data,(y)=>{
                console.log('下载数据:',y)
              if(y.ret==1){
               window.location.href=imgurl+y.data.filePath
              }
              else{
                message.error(y.errmsg);
                 }
           })
  }
   GetKey=(e)=>{
      let data={
          "slid":this.props.currentId
      }
     Ajax('post','front/query','system_resetkey',data,(y)=>{
               
              if(y.ret==1){
                 message.success("重置成功");
                 this.setState({
                  syskey:y.data.key
                 })
              
              }
              else{
                 message.error(y.errmsg);
                 }
           })
   }

  render() {
    const {local_permit}=this.props
    const {errmemo,errmsg,isEditMode,datavalue,imgUpload,sysstate,hasSameSName}=this.state;
    console.log("渲染的时候的datavalue+++++++++++++++===========",datavalue)
    const uploadButton = (
      <div>
            <Icon type={imgUpload.name?'loading' : 'plus'} />
            <div className="ant-upload-text">{imgUpload.name?"等待上传":"上传图片"}</div>
            <p className="ant-upload-hint">{imgUpload.name?imgUpload.name:"建议60*60"}</p>
          </div>
    );
    const upImg = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file)=> {
        this.setState(({ imgFile }) => {
          const index = imgFile.indexOf(file);
          const newFileList = imgFile.slice();
          newFileList.splice(index, 1);
          return {
            imgFile: newFileList,
          };
        });
      }, 
     onChange:(e)=>{
        if (e.file.type != 'image/jpeg'&&e.file.type !='image/png') {
            message.error('请选择png或者jpg格式的图片');
            return false
        }
        const isLt2M =e.file.size / 1024  < 200;
          if (!isLt2M) {
            message.error('图片不能大于200k!');
            return false
          }
        this.setState({
           imgUpload:e.file
        })
        
     },
      beforeUpload: (file) => {
        
          return false;
      },
      fileList: this.state.imgFile,
    };
    return (
      
      <div className="SubsystemDetailItemTop"> 
       <div className='top'>

        {!isEditMode?
        <img src={datavalue.icon}/>:
         <Upload
         {...upImg}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
         >
        {imgUpload.old?<img src={datavalue.icon}/>:uploadButton}
         </Upload>
       }
         <div className="title">
         {!isEditMode?<h2>{datavalue.name}</h2>:
          <div className='myname'><Input onPressEnter={this.testFunc} className={hasSameSName?"setName hasSameSName":"setName"} value={datavalue.name} onChange={this.SetName} onBlur={this.ChangegetValuelen} placeholder="请输入子系统名称"/>
          {hasSameSName&&<span className='errtips'>{errmsg}</span>}
          </div>
         }
           <span>创建于{datavalue.time}</span>
         </div>
         {!isEditMode&&<div><span>状态:</span> <span className={sysstate==1?"unnormal":"normal"}>{sysstate==1?"禁用":"正常"}</span></div>}
         {!isEditMode?<Button onClick={this.ColseFunc}  className="Btn closeBtn">关闭</Button>
          :<Button onClick={this.CancelDeit}  className="Btn closeBtn">取消</Button>}
          {isEditMode&&<Button onClick={this.testFunc} className="Btn" type="primary">保存</Button>
          }
          {!isEditMode&&sysstate==0&&local_permit["md_subsys_mgr.op_subsys_edit"]&&
         <Button onClick={this.GoEdit}  className="edit Btn">编辑</Button>
          }
         </div>
        {!isEditMode?
         <p className='desc'>{datavalue.memo}</p>:
         <div className="mymemo"><Input className={errmemo==''?"setdesc":"setdesc hasSameSName"} onPressEnter={this.testFunc}  onChange={this.SetMemo} onBlur={this.SetMemo} value={datavalue.memo}  placeholder="请输入简介"/>
            <span className="errtips">&nbsp; {errmemo}</span>
          </div>
        }
        <div className='form'>
        <SubsystemDetailItemTopForm
          local_permit={local_permit}
          ref="SubsystemDetailItemTopForm"
          onOk={this.testFunc}
          syskey={this.state.syskey}
          datavalue={datavalue}
          exportXml={this.exportXml}
          isEditMode={this.state.isEditMode}
          CallbackData={this.CallbackData}
          gamecheck={this.state.gamecheck}
           GetKey={this.GetKey}
           sysstate={sysstate}
        />
        </div>
      </div>
    )
  }
}
export default SubsystemDetailItemTop;