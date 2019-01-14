import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;
class FrontSeek extends React.Component {
  seek=(inputvalue)=>{
    let olddata= Object.assign([], this.props.dataall);
    let olddatalist = Object.assign([], this.props.serchGroup); 
    console.log("搜索的全部值",olddata)
    let str=this.props.tag;
    switch(str){
      case "list": this.SearchList(inputvalue, olddatalist);break;
      case "role": this.SearchOne(inputvalue, olddatalist,str); break;
      default :this.SearchOne(inputvalue, olddata);break;
    }
    
  }
  //数据结构1搜索 [{key:value}]
  SearchOne = (inputvalue, olddata,str)=>{
    let nowdata = []
    if (inputvalue !== "") {
      olddata.map((value, ) => {
        if(str==="role"){
          if (value["sysname"].toString().indexOf(inputvalue) > -1) {
            nowdata.push(value)
          }
        }else{
        for (var i in value) {
          if (value[i] != null) {
            if (value[i].toString().indexOf(inputvalue) > -1) {
              nowdata.push(value)
              break;
            }
          }
        }
        }
      })
      this.props.seek(nowdata)

    } else {
      this.props.seek(olddata)

    }
  }
  SearchList = (inputvalue, olddata)=>{
    console.log("olddata", olddata)
    let nowdata = []
    if (inputvalue !== "") {
      olddata.map((item ) => {
        console.log("(item.data[0].title",item.data["0"]["0"].title)
        if (item.data["0"]["0"].title.indexOf(inputvalue) > -1) {
          console.log("item", item)
          nowdata.push(item)
          console.log("nowdata2", nowdata)  
            }
      })
      console.log("nowdata1", nowdata)
      this.props.seek(nowdata)

    } else {
      this.props.seek(olddata)

    }
  }

  render() {
    
    return (
      <div className="seek-wraper">
        <Search
    placeholder={this.props.placeholder}
    onSearch={this.seek}
  />
        </div>
      
    );
  }
}

export default FrontSeek;