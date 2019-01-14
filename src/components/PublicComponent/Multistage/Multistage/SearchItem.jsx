/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Icon,Input,Select} from 'antd';
import '../../../../style/SearchItem.css';
const Option = Select.Option;
function findData(ordata,inputdata) {
  console.log("zheilideshi",ordata)
  let showdata=[]
  for(let j=0;j<ordata.length;j++){
      if(ordata[j].name.split("-")[0].indexOf(inputdata)>-1){
        showdata.push(ordata[j])
      }
  }
  return showdata
}
class SearchItem extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          userName:'',
          dimdata:this.props.dimdata,
          dimCheack:true,
        }
        };
 emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }
  // 名字发生改变时调用
  onChangeUserName = (e) => {
 
     let showdata=findData(this.props.dimdata ,e.target.value) 
      this.setState({ 
        userName: e.target.value ,
        dimdata:showdata,
        dimCheack:true,
      });
    console.log("搜索的值是",e.target.value,showdata,
      this.props.Classifyid)
  }
  // 键盘按下事件
  onKeyUp=(e)=>{
    console.log("有没有回车呢？")
    e.keyCode === 13 && this.handler()
  }

  search=(e)=>{

    console.log("搜索的值是",this.props.dimdata ,this.state.userName,this.props.Classifyid)
this.handler()
  }
  cheack=(name,id,e)=>{
    console.log("点击的值",e,id,name)
    
    this.setState({userName:name.split("-")[0],dimCheack:false})
     this.handler()
    // 延迟几秒要进行自动的搜索
  }
  // 确认搜索的值
  handler=()=>{
    // 关闭搜索的显示框
     this.setState({dimCheack:false})
    // 现在的值是多少？
console.log("最后确认的值", this.state.userName,this.props.Classifyid)
// 向后台收索
this.props.onSearch(this.state.userName,this.props.Classifyid)
  }

    render() {
    const selectBefore = (
  <Select defaultValue={this.props.Classifyid} 
  style={{ width: 90 }} 
  onChange={this.props.onChangeClassify}>
    <Option value="1">子系统</Option>
    <Option value="2">角色</Option>
  </Select>
);
    // const selectAfter = <Button type="primary" icon="search" />
   const selectAfter = <Icon type="search" onClick={this.search} />
     const { userName,dimdata,dimCheack} = this.state;
  // const { dimdata} = this.props;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
       console.log("ddd",dimdata)
        return (
            <div className="SearchItem">
            <Input addonBefore={selectBefore}  defaultValue="mysite"
             suffix={suffix}
            value={userName}
            onChange={this.onChangeUserName}
            ref={node => this.userNameInput = node}
            addonAfter={selectAfter}
            onKeyUp={this.onKeyUp}
             />
             <div className={userName&&dimCheack?"AutoComplete activeAutoComplete":"AutoComplete"}>
             {dimdata.map((item,index)=>{
              return(
                <div key={item.id} onClick={this.cheack.bind(this,item.name,item.id)}>{item.name}</div>
                )
             }) }
               
             </div>
          </div>
        )
    }
}
export default SearchItem;