import React from 'react';
import { Tabs,Button,Icon,Checkbox,Upload,Modal,message,Pagination,Input } from 'antd';
import { Link,browserHistory } from 'react-router';
import {getajax} from '../../public/ajax';
import SearchTree from '../PublicComponent/SearchTree/SearchTree'
import ContentList from '../PublicComponent/ContentList/ContentList';
import { getipconfig } from '../../getipconfig';
import roletemp from '../../style/imgs/addtemp.png';
import { root } from '../../root';
import $ from 'jquery'
const {TextArea} = Input;
const getip = getipconfig();
const testUrl = getip.serverip;
const rootapp = root();
const confirm = Modal.confirm;
const Ajax=getajax.ajaxFun;
const AjaxUpload=getajax.ajaxUpload;
const TabPane = Tabs.TabPane;
const Dragger = Upload.Dragger;
class SubsystemDetailItemBottom extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  };
  state={
    permit:[],
    objlistdata:[],
    sysstate:1,
    isEdit:false,
    fileList: [],//文件列表
    checkBtnBool:true,//禁用按钮
    pagenum:1,
    pageSize:10,
    Textdata:"",
    visibleper:false,
    perName:'',
    readyFile:false,
  }
  Changecallback=(e)=>{
  
  }
  addNewrole=()=>{
     browserHistory.push({
       pathname: rootapp+'app/AddNewRole',
       state:{uname:this.props.currentName,uid:this.props.currentId},
      })
  }
   optionClick=(data, id) => {
    console.log("操作点击的id和内容", data, id)
    if(data==="详情"){
       window.sessionStorage.setItem("rid",id);
      browserHistory.push({
        pathname: rootapp +'app/RoleDetail',
       query:{syslid:this.props.currentId,sysname:this.props.currentName}
      })
    }
    else{
     let stats=data=="禁用"?1:0;
      let that=this;
      confirm({
        title:data+"该角色?",
        content: '',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
        let  da={
                   "roleid":id,
                   "rolestate":stats
              }
      Ajax('post','front/query','role_changestate',da,(e)=>{
        if(e.ret==1){
          message.success(data+'成功');
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
    }
    CheckboxonChange=(data, id) => {
        console.log("选中一行数据", data, id)
    }
    getPermitsFunc=()=>{//获取权限列表
      this.setState({//子系统所有权限列表 
              isEdit:false,
            })
      let data={
          "slid":this.props.currentId
      }
      Ajax('post','front/query','system_detailpermits',data,(e)=>{
        console.log("走这里请求没有?system_detailpermits")
         if(e.ret==1){
          let perName=e.data.permitName
          let permit=[e.data.permitDef][0].children;
          let tempper=[];
            this.setState({//子系统所有权限列表
              permit:permit,
              perName:perName
            })    
            window.sessionStorage.setItem("permit",JSON.stringify(permit));//子系统所有权限列表
        }
        else{
            message.error(e.errmsg)
        }
      })
    }

     /*获取角色列表*/
    getRoleList=(e)=>{
     const local_permit=this.props.local_permit
      let data={
          "slid":this.props.currentId
      }
      Ajax('post','front/query','system_relate_roles',data,(e)=>{
       
         if(e.ret==1){
           let temp=[];
           let rolelistsession=[];
           e.data.forEach(function(item,index){
            let text='';
            let textde='';
            rolelistsession.push({name:item.rolename,rid:item.roleid})
            if(e.sysstate==0&&local_permit["md_subsys_mgr.op_subsys_disablerole"]){
                text=item.rolestate==0?"禁用":"启用";
                textde='详情'
               }
              let roleList={
               data:[[{"title":item.rolename,"data":[item.roleintroduct],id:item.roleid},
                        {"title":"状态","data":[item.rolestate]}]
                      ],
               optiondata:[{id:item.roleid,data:[textde,text]}],
               iconurl:"",
               checkboxcheack:false,
               id:item.roleid
            }
           temp.push(roleList)
           })
           window.sessionStorage.setItem("roleList",JSON.stringify(rolelistsession))
           this.setState({
               objlistdata:temp,
               sysstate:parseInt(e.sysstate)
           })
         }
        else{
            message.error(e.errmsg)
        }
      })
    }
    editpermitFunc=(e)=>{
          this.setState({
            isEdit:true,
          })
    }
 /*   更新权限列表,上传xml文件*/
    setPermitFunc=(e)=>{
       console.log("eeeeeeeeee",this.state.fileList)
      if(this.state.fileList.length==0){
         this.setState({
            isEdit:false,
          })
          message.success("取消编辑")
        }
        else{
          let htData={
            slid:this.props.currentId,
          }
         let formData = new FormData();
          formData.append('permitDef ',this.state.fileList[0]);
          AjaxUpload('post','front/querywithupload','system_editpemfile',htData,formData,(e)=>{
           if(e.ret==1){
             message.success("上传成功")
             this.setState({
              isEdit:false
             })
              this.getPermitsFunc();
           }
           else{
                 message.error("上传失败:"+e.errmsg)
           } 
          })
        }  
    }
    changeNum=(e)=>{
      this.setState({
        pagenum:e,
      })
    }
    changePageSize=(e,size)=>{
      this.setState({
        pageSize:size,
        pagenum:1,
      })
    }
   /* 查看权限文件*/
   LookpermitFunc=(e)=>{
    window.open(testUrl+'temp/'+this.props.currentId+'/'+this.state.perName)
    /*let that=this;
       $.ajax({  
          url: testUrl+'temp/'+this.props.currentId+'/'+this.state.perName,
          type: 'GET',
          dataType: 'xml',
          success: function(xml) {
           
             var str1 = "<xmp>"+xml+"</xmp>";
              console.log("xml",str1)
              that.setState({
                Textdata:str1
              })
          }

      });*/
   }
       /* 显示模态框*/
   visibleModalper=(e)=>{
    this.LookpermitFunc();
          this.setState({
            visibleper:true,
          })
   }
   hidePerModal=(e)=>{
    this.setState({
            visibleper:false,
          })
   }
   /*更改权限文件数据*/
   TextChange=(e)=>{
        console.log(e.target.value)
   }

    componentDidMount(){
         this.getPermitsFunc();
         this.getRoleList();
    }
  render() {
    const ModalTitle=(<div className="LookpermitTop">
               <Button type="primary" className="btn">下载权限文件</Button>
               <Button className="btn btncopy">复制文件</Button>
            </div>
      )
    const { local_permit}=this.props
    const {visibleper,Textdata,objlistdata,sysstate,isEdit,permit,checkBtnBool,pageSize,pagenum,readyFile,fileList}=this.state;
     const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
            readyFile:false,
          };
        });
      },
      beforeUpload: (file) => {
        if (file.type != 'text/xml') {
                message.error('请选择xml文件');
                return false
         }
        this.setState(({ fileList }) => ({
          fileList: [file],
          readyFile:true,
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    return (
      <div className="SubsystemDetailItemBottom"> 
        <Tabs defaultActiveKey="1" onChange={this.Changecallback}>
		    <TabPane tab="角色列表" key={"1"}>
		      {local_permit["md_subsys_mgr.op_subsys_addrole"]&&sysstate==0&&<div className="topGroup">
          <Button onClick={this.addNewrole} type="primary" icon="plus">新增角色</Button>
          </div> }
         {objlistdata.length!=0&&objlistdata.slice((pagenum-1)*pageSize,(pagenum-1)*pageSize+pageSize).map((item,index)=>{
            return(
               <ContentList data={item.data} 
               key={item.id}
               id={item.id}
               hasicon={item.iconurl==""?false:true} 
               optiondata={item.optiondata} 
               iconurl={item.iconurl}
               checkboxcheack={item.checkboxcheack}
               optionClick={this.optionClick}
               CheckboxonChange={this.CheckboxonChange}/>
              )
          })
          }
           {objlistdata.length!=0&&<Pagination 
             size="small"
             current={pagenum}
             pageSize={pageSize}
             defaultPageSize={pageSize}
             total={objlistdata.length}
             pageSizeOptions={["10","20","30","40"]}
             onChange={this.changeNum}
             onShowSizeChange={this.changePageSize}
             showSizeChanger
             showTotal={(e)=>{return "共 "+e+" 条"}}
            />}
            {objlistdata.length==0&&
              <img className="tempimg" src={roletemp}/>
            }
        </TabPane>
		    <TabPane tab="权限列表" key={"2"}>
         {local_permit["md_subsys_mgr.op_subsys_editssyspermit"]&&<div>
           {!isEdit?<Button type="primary" onClick={this.editpermitFunc}>更改子系统权限</Button>
            :
            <Button type="primary" onClick={this.setPermitFunc}>保存</Button>
           }
            &nbsp; &nbsp; &nbsp;<Button type="primary" onClick={this.LookpermitFunc}>查看权限文件</Button>
         </div>}
         <div  className={isEdit?"editpermit":"lookperimit"}>
            {!isEdit?
              <div>{
             permit.length==0?
              <img className="tempimg" src={roletemp}/>
              :<SearchTree 
              checkable={false} 
              TreeData={permit}  
              defaultTree={[]}  
              ></SearchTree>
            }
              </div>
             :<Dragger   {...props}>
             <p className="ant-upload-drag-icon">
                  <Icon type={readyFile ? 'loading' : 'inbox'} />
                </p>
                <p className="ant-upload-text">{readyFile ?"点击保存上传":"点击或将文件拖拽到这里上传"}</p>
                <p className="ant-upload-hint">{readyFile ?fileList.name:"权限文件类型:.xml"}</p>
          </Dragger>
            }

         </div>
        </TabPane>
		   </Tabs>
       <Modal
       footer={null}
       visible={visibleper}
       width={800}
       onCancel={this.hidePerModal}
       maskClosable={false}
       className="Lookpermit"
       title={ModalTitle}
       >
        <div className="text">
       <div dangerouslySetInnerHTML={{__html: Textdata}} ></div>
          <TextArea style={{"resize":"none"}}  className="ContentText"
                  onChange={this.TextChange} value={Textdata} 
            ></TextArea>
         </div>  
       </Modal>
      </div>
    )
  }
}
export default SubsystemDetailItemBottom;