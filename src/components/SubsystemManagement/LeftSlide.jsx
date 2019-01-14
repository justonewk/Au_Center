import React from 'react';
import {Menu,Dropdown,Icon} from 'antd'
import { browserHistory} from 'react-router';
import { root } from '../../root';
const rootapp = root();
class LeftSlide extends React.Component {
 
  state = {
      //defaultkey:window.sessionStorage.getItem("subid")==null?this.props.datalist[0].gid:window.sessionStorage.getItem("subid")
      defaultkey:window.sessionStorage.getItem("subid")==null?'-1':window.sessionStorage.getItem("subid"),
    }
    // handleClick=(id)=>{
    //  this.props.onLinkClick(id)
    // }
    handleClick=(e)=>{
      browserHistory.push({
       pathname:rootapp+'app/SubsystemManagement',
        // state:{uid:e.key},
      })
    }
    EditClick=(e)=>{//0删除//1编辑
      console.log("eee",e)
       // e.nativeEvent.stopImmediatePropagation();
        this.props.HandelDrop(e.key,window.sessionStorage.getItem("subid"))
    }

    menuClick=(e)=>{
      //console.log("eee",e)
       // e.preventDefault();    // 阻止默认事件  
       //  e.stopPropagation();  
       window.sessionStorage.setItem("subid", e.key);
       window.sessionStorage.setItem("subname", e.item.props.title);
      //  browserHistory.push({
      //  pathname:'/app/SubsystemManagement',
      //   // state:{uid:e.key},
      // })
    }
    componentWillMount(){
      //console.log(this.props.datalist[0].gid,window.sessionStorage.getItem("uid"))
    }
  render() {

    const menu = (
      <Menu onClick={this.EditClick.bind(this)}>
        <Menu.Item key="0" >
          <a  href="javascript:void(0)">删除</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
         <a href="javascript:void(0)">编辑</a>
         </Menu.Item>
       </Menu>
    );
    return (
      <div >
        <Menu
        onClick={this.menuClick}
        theme="light"
        defaultSelectedKeys={[this.state.defaultkey]}
        mode="inline"
        >
        {<Menu.Item key={-1}>
           <span  onClick={this.handleClick}  className="leftText">全部子系统({this.props.allmount})</span>
        </Menu.Item>}
        {this.props.datalist.map(function(item,index){
              return(
                <Menu.Item  key={item.gid} title={item.name}>
                    <span onClick={this.handleClick}  className="leftText">{item.name}({item.mount})</span>
                <div className='more'>
                <Dropdown  key={item.name}  className="leftdrop" 
                overlay={( <Menu  onClick={this.EditClick.bind(this)}>
                  {<Menu.Item
                   key="0" 
                   className={item.mount!=0?"htdisabled":""}
                   disabled={item.mount!=0}
                   data-id={item.name}
                    >
                    <a  href="javascript:void(0)">删除</a>
                  </Menu.Item>}
                  <Menu.Divider />
                  <Menu.Item key="1">
                   <a href="javascript:void(0)">编辑</a>
                   </Menu.Item>
                 </Menu>)}
        trigger={['click']}>
                  <a  className="ant-dropdown-link" href=" ">
                    <Icon type="ellipsis" />
                  </a>
                </Dropdown>
                </div>
                </Menu.Item>
                )
        }.bind(this))
        }
        
        </Menu>
        </div>


    )
  }
}
export default LeftSlide;