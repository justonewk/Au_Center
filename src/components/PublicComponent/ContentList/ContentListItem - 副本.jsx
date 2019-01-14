/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import {
  Row,Tooltip
} from 'antd';
import '../../../style/ContentListItem.css';
import {setItemClassName,setItemDot} from '../../../public/CommonFuncs';

// 角色基本信息转换

class ContentListItem extends React.Component {
  constructor(props) {
    super(props);
    
  };

    //大区选择
  render() {

    return (
      <div className="itemcol" style={{width:(100/this.props.len)+"%"}}>
      <div className={this.props.titletag?"showblock itemcoltitle":"showline"} key={this.props.data.title}>{this.props.data.title}</div>
      <div className={this.props.titletag?"showblock":"showline"} >
    {/*内容部分默认显示一个span，长度超出20，就会放在去提示出来*/}
      {this.props.data.data.join("").length>12? 
      <Tooltip title={this.props.data.data.join(",")}>
    <span>{this.props.data.data.map((item,index) =>{
      
        return (
          <span key={"item"+index} className={setItemClassName(item)}>{

           setItemDot(item).map((item,index)=>{
            return(<span key={"itemtepm"+index}>{item}</span>)
           })
         },</span>
          )

      })}</span>
  </Tooltip>:this.props.data.data.map((item,index) =>{ 
        return (
       <span key={"item"+index} className={setItemClassName(item)}>{
           setItemDot(item).map((item,index)=>{
            return(<span key={"itemtepm"+index}>{item}</span>)
           })
         }</span>
          )

      })
    }
    </div>
          
          </div>
    )
  }
}
export default ContentListItem;