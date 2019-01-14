import React from 'react';
import { Button,Tabs,message  } from 'antd';
import RoleDetailItemTop from './RoleDetailItemTop'
import RoleDetailItemBottom from './RoleDetailItemBottom'
import { getipconfig } from '../../getipconfig';
import {getajax} from '../../public/ajax';
const getip = getipconfig();
const Ajax=getajax.ajaxFun;
const Ajaxupload=getajax.ajaxUpload;
const TabPane = Tabs.TabPane;
 let dd=[];
class RoleDetailRightContent extends React.Component {

    state={
        tabList:[],
        tabDeafult:window.sessionStorage.getItem("rid"),
         datavalue:{
          rid:'',
          name:'',
          memo:'',
          time:'',
          sysname:this.props.location.query.sysname,
         },
         roleState:1,
         defaultTree:[],
         invariabilitydefaultTree:[],
          sysid:'',
          disablepermint:false,

        }
        // 外层的页签切换
    MenuTab=(e)=>{
        console.log(e,"morenrrrrrrrrrrrrrrrrrrrrr");
        this.setState({
          tabDeafult:e,
          disablepermint:!this.state.disablepermint,
        })
        window.sessionStorage.setItem("rid",e);
         setTimeout(() => {
            this.getTopData()
           },0);//通过延时处理
    }
    getTopData=()=>{//获取角色详情
     let data={
          "roleid":this.state.tabDeafult,
      }
      dd=[];
      Ajax('post','front/query','role_detail',data,(e)=>{ 
        if(e.ret==1){

           let datavalue={
                rid:e.data.roleid,
                name:e.data.rolename,
                memo:e.data.roleintroduct,
                time:e.data.rolenewtime,
                sysname:this.props.location.query.sysname
           }
           let permit=e.data.permits.children[0];
           
          let  defaultTree=[];
          console.log("e.data数据是什么呢?",permit.children)
           // if(permit.all){
           //      permit.children.forEach(function(item,index){
           //           defaultTree.push(item.key);
           //      })
           //      this.setState({
           //        defaultTree:defaultTree,
                
           //      })
           //    setTimeout(() => {
           //       this.setState({
           //        defaultTree:defaultTree,
           //        disablepermint:false,
           //      })
           //   },100);//通过延时处理
           // }
           // else{
           //  console.log("执行了吗")
           let alldata=[]
           let origpermit=this.props.permit
          this.GetKey(origpermit,permit.children,'',alldata) 
          // console.log("执行了吗=============",origpermit,permit.children)
          // console.log("this.props.permit=====================",origpermit)
           // }
          
           this.setState({
             datavalue:datavalue,
             roleState:e.data.rolestate,
             sysid:e.data.permits.children[0].key,
             defaultTree:alldata,
             invariabilitydefaultTree:alldata,
           })
          setTimeout(() => {
                this.refs.RoleDetailItemBottom.getRoleList();
                this.getRoleListSub()
           },100);//通过延时处理 
        }
        else{
           message.error(e.errmsg);
        }
     })
  }
       /*获取角色列表*/
    getRoleListSub=(e)=>{
      let data={
          "slid":this.props.location.query.syslid
      }
      Ajax('post','front/query','system_relate_roles',data,(e)=>{
      
         if(e.ret==1){
           let temp=[];
           let rolelistsession=[];
           e.data.forEach(function(item,index){
            let text='';
            let textde='';
            rolelistsession.push({name:item.rolename,rid:item.roleid})
          })
           window.sessionStorage.setItem("roleList",JSON.stringify(rolelistsession))
           this.setState({
               tabList:rolelistsession,
           })

         }
        else{
            message.error(e.errmsg)
        }
      })
    }
  GetKey=(origpermit,data,dkey,alldata)=>{
    
    // const {defaultTree}=this.state
    // console.log("获取默认data",origpermit,data)
   let that=this;
    // let showdata=[]
   data.forEach(function(item,index){
   let temp={}
  //  找到对应的值
    for(let i=0;i<origpermit.length;i++){
      // key相同
      if(origpermit[i].key===item.key){
        temp=origpermit[i];
      }
    }
    if(item.children){
      // 表示父节点是不是选中
    // console.log("循环origpermit[index].children.length==item.children.length====",temp.children==item)
       if(temp.children&&item.children&&temp.children.length==item.children.length){
        dd.push(dkey==''?item.key:(dkey+'.'+item.key)) 
        
        alldata.push(...dd) 
       }
        
          // that.setState({
          //   defaultTree:dd
          // })
       that.GetKey(temp,item.children,dkey==''?item.key:(dkey+'.'+item.key),alldata)
     }else{
        // showdata.push(...dd)
        dd.push(dkey==''?item.key:(dkey+'.'+item.key)) 
          // that.setState({
          //   defaultTree:dd
          // })
          alldata.push(...dd)
       }
       
    })
    return alldata
  //  console.log("alldata是什么",alldata)
  }
 
  SetName=(e)=>{//编辑角色名称
      let data = Object.assign({}, this.state.datavalue, { name: e })
      this.setState({
        datavalue: data
      })
  }
  SetMemo=(e)=>{//编辑简介
      let data = Object.assign({}, this.state.datavalue, { memo: e })
      this.setState({
        datavalue: data
      })
  }
  getCheckData=(e)=>{
    console.log("选择树就发生变化",e)
    this.setState({
            defaultTree:e
          })
  } 
  onCancelChange=()=>{
    const {invariabilitydefaultTree}=this.state
    this.setState({
      defaultTree: invariabilitydefaultTree
    })
    // console.log("取消变化",invariabilitydefaultTree)
  }
  componentWillMount(){
    this.getRoleListSub()
  }
  componentDidMount(){
   
    this.getTopData();

  }
    render() {
      const {permit,local_permit}=this.props
           const {tabDeafult,tabList,datavalue,defaultTree,roleState,sysid,disablepermint}=this.state;
           const {SetName,SetMemo,getTopData,getCheckData,onCancelChange}=this;
           
        return (
         <div className="userlist">
            <Tabs defaultActiveKey={tabDeafult} activeKey={tabDeafult} onChange={this.MenuTab}>
               {tabList.map(function(item, index) {
                return (
                  <TabPane tab={item.name} key={item.rid}>
                      <RoleDetailItemTop
                      local_permit={local_permit}
                        getTopData={getTopData}
                        datavalue={datavalue}
                        SetName={SetName}
                        SetMemo={SetMemo}
                        currentId={tabDeafult} 
                        roleState={roleState}
                        ref="RoleDetailItemTop"
                      />
                  <RoleDetailItemBottom 
                  keyshow={item.rid+"bottom"}
                   local_permit={local_permit}
                   defaultPermit={defaultTree} 
                   getCheckData={getCheckData}
                   currentId={tabDeafult}
                    roleState={roleState}
                    sysid={sysid}
                    subSyspermit={permit}
                    onCancelChange={onCancelChange}
                    disablepermint={disablepermint}
                    ref="RoleDetailItemBottom"/>
                    </TabPane>
                )
            })
          }
         </Tabs>
         </div>
        )
    }
}
export default RoleDetailRightContent;