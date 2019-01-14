import React from 'react';
import LeftSlide from './LeftSlide';
import AddGroupModal from '../PublicComponent/AddGroupModal/AddGroupModal';
import {Button,Icon,message,Modal} from 'antd'
import {getajax} from '../../public/ajax'
const confirm = Modal.confirm;
const Ajax=getajax.ajaxFun;
class SubsystemManagementSiderLeft extends React.Component {
  constructor(props) {
    super(props);  
  };
  state = {
     visible:false,
     AddModalName:'',//模态框名字
     title:"子系统分组",
     LeftSlidedatalist: [],
      AllSubSysMount:0,
      defaultData:{//主要用于编辑
       title:"",
       type:0,//0新增1编辑
      },
    }

    //点击一个列表
    onLinkClick=(e)=>{
      console.log("e,id",e)
    }
    HandelDrop=(type,id)=>{//drop操作
      console.log("dropDown:",type,id);
      if(type==0){
        let that=this;
          confirm({
            title: '你确认是否删除该分组?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {  
              that.DelSubSys(id)
            },
            onCancel() {
    
            },
          });
      }
      else if(type==1){//编辑子系统
           this.setState({
            defaultData:{//编辑构造数据
              title:window.sessionStorage.getItem("subname"),
              type:1,
            },
            AddModalName:'编辑子系统分组'
          })
        setTimeout(() => {
           this.setState({
              visible:true
           })
          },0);//通过延时处理
      }
    }
    DelSubSys=(id)=>{//删除
      console.log(id)
      let data={
          sysgroupid:id,
      }
      Ajax('post','front/query','systemgroup_delete',data,(e)=>{
          if(e.ret==1){
             message.success("删除分组成功");
            window.sessionStorage.setItem("subid",'-1')
            this.GetSubSystemGroup();
            }
          else{
              message.error(e.errmsg);
            }
          })
    }
    addgroupFunc=()=>{//新增弹窗模态框
       this.setState({
           defaultData:{//编辑构造数据
              title:'',
              type:0,//新增1
            },
       })
       setTimeout(() => {
           this.setState({
            visible:true,
            AddModalName:'添加子系统分组',
           })
          },0);//通过延时处理
    }
    AddGroupSubFunc=(e,type)=>{//新增编辑提交数据
      if(type==0){//add
         let data={
          sysgroupname:e.title,
         }
      Ajax('post','front/query','systemgroup_add',data,this.AddSubCallback)
      }
      else{//编辑
          let data={
          sysgroupid: window.sessionStorage.getItem("subid"),
          sysgroupname:e.title,
         }
      Ajax('post','front/query','systemgroup_edit',data,this.AddSubCallback)
     

      }
     }
    AddSubCallback=(e)=>{//新增提交返回处理
      
      if(e.ret==1){
        this.setState({
          visible:false,
       })
        this.GetSubSystemGroup();
         message.success("数据提交成功");
        }
      else{
          message.error(e.errmsg);
        }
      
    }
    GetSubSystemGroup=(e)=>{//获取子系统列表
        let data={}
      Ajax('post','front/query','systemgroup_list',data,this.GetSubListCallback)
    }
    GetSubListCallback=(e)=>{
      
      if(e.ret==1){//构建列表数据
        let mount=0;
        let temp=[];
        e.data.forEach(function(val){
          mount=parseInt(val.sysgroupnum)+parseInt(mount)
          temp.push({
            name:val.sysgroupname,
            gid:val.sysgroupid,
            mount:val.sysgroupnum,
          })
        })
        window.sessionStorage.setItem('groupList',JSON.stringify(temp))
      this.setState({
          LeftSlidedatalist:temp,
          AllSubSysMount:mount
       }) 
      }
      else{
          message.error(e.errmsg);
        }
      
    }
    HideModal=(e)=>{
      console.log("点击取消关闭模态框",e);
      this.setState({
          visible:false,
       })
    }
    componentWillMount(){
      this.GetSubSystemGroup();
      // console.log(this.props.datalist[0].gid,window.sessionStorage.getItem("uid"))
    }
  render() {
     const {local_permit}=this.props;
   
    return (
      <div className="subsysLeft">
      <div className="subsysLeftTop"><p className="name">子系统分组</p>
     {local_permit["md_subsys_mgr.op_subsys_advancedmgr"]&& <Icon className="addsub" type="plus" onClick={this.addgroupFunc}/>}</div>
       <LeftSlide 
       HandelDrop={this.HandelDrop} 
       allmount={this.state.AllSubSysMount}  
       datalist={this.state.LeftSlidedatalist} 
       onLinkClick={this.onLinkClick}  />
        <AddGroupModal
         visible={this.state.visible}
         title={this.state.AddModalName} 
         defaultData={this.state.defaultData}
         onOk={this.AddGroupSubFunc}
         onCancel={this.HideModal}
         />
      </div>
    )
  }
}
export default SubsystemManagementSiderLeft;