import React from 'react';
import { Button,Tabs,message  } from 'antd';
import SubsystemDetailItemTop from './SubsystemDetailItemTop'
import SubsystemDetailItemBottom from './SubsystemDetailItemBottom'
import {getajax} from '../../public/ajax'
const Ajax=getajax.ajaxFun;
const TabPane = Tabs.TabPane;
class SubsystemDetailRightContent extends React.Component {

    state={
        tabList: JSON.parse(window.sessionStorage.getItem("SystemCard")),
        tabDeafult:window.sessionStorage.getItem("syslid"),//进入页面之后的子系统id
        gameList:JSON.parse(window.sessionStorage.getItem("gameList")),
        currentName:'',//当前页面系统名
    }
    MenuTab=(e)=>{
       // console.log("hutao:",e,this.state.tabList);
        window.sessionStorage.setItem("syslid",e)
        let tabList=this.state.tabList;
        for(let i=0;i<tabList.length;i++){
          if(tabList[i].syslid==e){
            this.setState({
              tabDeafult:e,
              currentName:tabList[i].sysname,
            })
          }
        }
        setTimeout(() => {    
            this.refs.SubsystemDetailItemTop.getTopData()
            this.refs.SubsystemDetailItemBottom.getPermitsFunc()
            this.refs.SubsystemDetailItemBottom.getRoleList()
           },0);//通过延时处理  
    }
    getSystemCard=()=>{//获取子系统列表
      let subid=window.sessionStorage.getItem("subid")==null?'-1':window.sessionStorage.getItem("subid")
       let data={
          sysgroupid:subid,
      }
      Ajax('post','front/query','systemgroup_details',data,(e)=>{
        console.log("走这里请求没有1")
        if(e.ret==1){
          window.sessionStorage.setItem("SystemCard",JSON.stringify(e.data))
          this.setState({
            tabList:e.data
          })
        }
        else{
           message.error(e.errmsg);
        }
     })
    }
    componentDidMount(){
      let e=this.state.tabDeafult;
      let tabList=this.state.tabList;
      console.log("查看详情的数据2",e,tabList)
        for(let i=0;i<tabList.length;i++){
          if(tabList[i].syslid==e){
            this.setState({
              currentName:tabList[i].sysname,
            })
          }
        }
    }
    render() {
   console.log("走这里没有")
   console.log("this.state.tabList===",this.state.tabList)
        const {local_permit}=this.props
        return (
         <div className="userlist">
            <Tabs className="tab" defaultActiveKey={this.state.tabDeafult} onChange={this.MenuTab}>
               {this.state.tabList.map(function(item, index) {
                return (
                    <TabPane tab={item.sysname} key={item.syslid}>
                      <SubsystemDetailItemTop local_permit={local_permit} getSystemCard={this.getSystemCard}  ref="SubsystemDetailItemTop"  currentName={this.state.currentName} currentId={this.state.tabDeafult}/>
                      <SubsystemDetailItemBottom  local_permit={local_permit} ref="SubsystemDetailItemBottom"   currentName={this.state.currentName} currentId={this.state.tabDeafult}/>
                    </TabPane>
                )
            }.bind(this))
          }
         </Tabs>
         </div>
        )
    }
}
export default SubsystemDetailRightContent;