/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';

import MultistageCheckBoxs from './MultistageCheckBoxs'
import MultistageShowCheck from './MultistageShowCheck'
import SearchItem from './SearchItem'

// 显示选中的角色
function ShowCheackRoleData(datas,rid,rname,sysid,sysname,tag) {
  let data=datas
   //判断原来的有没有初始值不为空
   let hassys=false;
   if (data.length<=0) {
    //data第一次为空的状态,只能是添加
    hassys=true;
    data.push({"id":sysid,"name":sysname,"item":[{"id":rid,"name":rname}]})
   }else{
   for(let i=0;i<data.length;i++){
    if (data[i].id===sysid) {
      //原来有子系统,
      hassys=true;
        if(tag){
          //表示添加
          data[i]["item"].push({"name":rname,"id":rid})
        }else{
          //删除
          data[i]["item"].splice(data[i]["item"].findIndex(item => item.id === rid), 1)
          if(data[i]["item"].length===0){
             data.splice(data.findIndex(item => item.id === sysid), 1)
          }
        }
    }
   }
   if(!hassys){
    // 只有新增才会存在原来没有子系统
     data.push({"id":sysid,"name":sysname,"item":[{"id":rid,"name":rname}]})
   }

 }
 return data
}
// 原始数据装换为搜索所需数据
function transformSearchData(data,tag) {
  console.log("搜索的tag",tag)

  let dimdata=[];
  for(let i=0;i<data.length;i++){
    
     for(let j=0;j<data[i].item.length;j++){
        for(let k=0;k<data[i].item[j].item.length;k++){
          let obj={"id":"","name":""}
          if (tag==="2") {
            // 查询角色
             obj["id"]=data[i].item[j].item[k].id+"-"+data[i].item[j].id+"-"+data[i].id
          obj["name"]=data[i].item[j].item[k].name+"-"+data[i].item[j].name+"-"+data[i].name
          }else{
          obj["id"]=data[i].item[j].id+"-"+data[i].id
          obj["name"]=data[i].item[j].name+"-"+data[i].name
          }
         
        dimdata.push(obj)
        }
     }
  }
  // 去重
   let signdata= arrayUnique2(dimdata,"id")
 console.log("去重之后的数据",signdata)
  return signdata
}
// 数组对象去重
function arrayUnique2(arr, name) {
  var hash = {};
  return arr.reduce(function (item, next) {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
    // if (!hash[next[name]]){
    //   hash[next[name]] = true && item.push(next)
    // }else{
      
    // }
    return item;
  }, []);
}
// 搜索对应的值
function searchHasData(data,str,tag) {
  let showdata=[];
  if (str==="") {
   showdata=data;
  }else{
  for(let i=0;i<data.length;i++){
    let obj={"id":data[i].id,"name":data[i].name,"item":[]}
     for(let j=0;j<data[i].item.length;j++){

      if(tag===1){
        // 表示找子系统
        if(data[i].item[j].name.indexOf(str)>-1){
           let obj1={"id":data[i].item[j].id,"name":data[i].item[j].name,"item":data[i].item[j].item}
        obj.item.push(obj1)
        }
      }else{
        let obj1={"id":data[i].item[j].id,"name":data[i].item[j].name,"item":[]}
        let hasrolesys=false
        for(let k=0;k<data[i].item[j].item.length;k++){
          if(data[i].item[j].item[k].name.indexOf(str)>-1){
            hasrolesys=true
            let obj3={"id":data[i].item[j].item[k].id,"name":data[i].item[j].item[k].name}
          obj1.item.push(obj3)
          }

        }
         if(hasrolesys){
         obj.item.push(obj1) 
        }
      }
     }
     showdata.push(obj)
  }
}
  // console.log("搜索到用于显示下面选择框的值",showdata)
  return showdata
}
class Multistage extends React.Component {
    constructor(props) {
        super(props);
      
         this.state = {
          "tabDeafult":"SYS6289180524",
          "roledata": this.props.roledata,
          "constroledata":this.props.constroledata ,
          defaultCheackRole:this.props.defaultCheackRole,
          "showCheackRole":this.props.defaultShowRole,
          dimdata:[],
          Classifyid:"1"
        }
        };

 
      onChangeRole=(sysid,sysname,value,cheack,rname)=>{
        let arrCheackRole=this.state.defaultCheackRole
        let showCheackRole=[]
         // console.log(`waimianchecked = ${cheack}`,`value = ${value}`,sysid,sysname,rname);
         if(!cheack){
         arrCheackRole.splice(arrCheackRole.findIndex(item => item === value), 1)
          showCheackRole=ShowCheackRoleData(this.state.showCheackRole,value,rname,sysid,sysname,false)
         }else{
          arrCheackRole.push(value)
          showCheackRole=ShowCheackRoleData(this.state.showCheackRole,value,rname,sysid,sysname,true)
         }
            // console.log(`newvalue = ${value}`);
            this.setState({
              defaultCheackRole:arrCheackRole,
              showCheackRole:showCheackRole
            })
      }
      //根据角色id查找不同的子系统 （角色id的唯一性  ）
 onDelRole=(sysid,sysname,rid,rname)=>{
  //删除id
  // console.log("要删除的sysid,sysname,id",sysid,sysname,rid,rname)
    let arrCheackRole=this.state.defaultCheackRole
       let showCheackRole=[]
      arrCheackRole.splice(arrCheackRole.findIndex(item => item === rid), 1)
   showCheackRole=ShowCheackRoleData(this.state.showCheackRole,rid,rname,sysid,sysname,false)
    this.setState({
              defaultCheackRole:arrCheackRole,
              showCheackRole:showCheackRole
            })
 }
componentDidMount(){
 let dimdata=transformSearchData(this.props.roledata,this.state.Classifyid)
  this.setState({
    roledata:this.props.roledata,
    showCheackRole:this.props.defaultShowRole,
    dimdata:dimdata
  })

}


// 选中子系统还是角色分类
onChangeClassify=(value)=>{
  let dimdata=transformSearchData(this.state.roledata,value)
  this.setState({
    Classifyid:value,
      dimdata:dimdata
  })

}
// onSearch开始搜索
onSearch=(value,tag)=>{
  console.log("搜索的原始值=="+this.state.constroledata+
    "搜索得值=="+value+"搜索的对象=="+tag)
  let datashow= searchHasData(this.state.constroledata,value,tag)
  this.setState({
    roledata:datashow
  })
}
// 确认选择
ok=()=>{
  this.props.bindingRole(this.state.defaultCheackRole,this.state.showCheackRole)
}
//取消选择
Cannel=()=>{
  this.setState({
    defaultCheackRole:[],
  })
  this.props.Cannel()
}


    render() {
     
       const {roledata,defaultCheackRole,tabDeafult,showCheackRole,dimdata,Classifyid}=this.state
      console.log("showCheackRole", showCheackRole) 
       //设置默认的值
      

        return (
          <div>
          {roledata.length>0&&<div className="Multistagewrapper">
            <div className="wrapper-right">
            <SearchItem
             originaldata={roledata}
             dimdata={dimdata}
             Classifyid={Classifyid}
             onChangeClassify={this.onChangeClassify}
             onSearch={this.onSearch}
            />
            <MultistageCheckBoxs
            roledata={roledata} 
             defaultCheackRole={defaultCheackRole}
             onChangeRole={this.onChangeRole}
             tabDeafult={tabDeafult}
             show={true}
            />
           </div> 
           <div className="wrapper-left">
           <MultistageShowCheck
            data={showCheackRole}
            len={defaultCheackRole.length}
            onDelRole={this.onDelRole}
            OK={this.ok}
            showCannel={this.props.showCannel}
            Cannel={this.Cannel}
           />
             
           </div>
          </div>}
            {roledata.length===0&&<p className="norole-wrapper">没有角色列表可选</p>}
          </div>
        )
    }
}
export default Multistage;