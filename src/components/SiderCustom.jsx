/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link,  } from 'react-router';
import sildelogo from '../style/imgs/sildelogo.png';
import { zidianfangyi } from '../public/CommonFuncs';
import '../style/baseall.css';
const {Sider} = Layout;
const SubMenu = Menu.SubMenu;
// 递归设置下拉菜单
function setSubMenu(obj, item, index, that) {
    return (
    item.children ?
        <SubMenu key={obj.url} title={<span><i className="anticon anticon-mail"></i>
                        <span>{item.name}</span></span>}>
                       {item.children.map(function(item, index) {
            let obj = zidianfangyi(item);
            return (item.children ? setSubMenu(obj, item, index, that) :
                <Menu.Item key={obj.url}  >
                         <span className={'icon-tubiao tubiao' + item} ></span>
                         <Link to={{
                    pathname: that + 'app/' + obj.url
                }} >
                         <span className="nav-text">{obj.name}</span>
                         </Link> </Menu.Item>
            )
        }
        )}
                    </SubMenu>
        : <Menu.Item key={obj.url}  >
                         <span className={'icon-tubiao tubiao' + item} ></span>
                         <Link to={{
            pathname: that + 'app/' + obj.url
        }} >
                         <span className="nav-text">{obj.name}</span>
                         </Link> </Menu.Item>

    )
}
class SiderCustom extends Component {
    state={
        selectedKey: this.props.path,
        rootapp: "",
        datalist: this.props.datalist
    }

    componentWillMount() {
        const _path = this.props.path;
        this.setState({
            openKey: _path.substr(0, _path.lastIndexOf('/')),
            selectedKey: _path
        });
        let rootappStorage = window.sessionStorage;
        let showapp = rootappStorage.getItem("rootapp")
        // console.log("showappshowapp",showapp)
        this.setState({
            rootapp: showapp
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedKey: nextProps.path
        })
    }
    render() {
        // console.log("[this.state.selectedKey]",this.props.path)
        return (
            <Sider
          
            collapsedWidth="0"
            className="zdy"
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            >
                <div className="logo" >
                    <img src={sildelogo} alt="log"/>
                </div>
      
                <Menu
            defaultSelectedKeys={[this.state.selectedKey]}
            onClick={this.onClick}
            className="leftslider"
            mode="inline"
            selectedKeys={[this.state.selectedKey]}
            >
                     {this.props.datalist.map(function(item, index) {
                let obj = zidianfangyi(item);
                let that = this.state.rootapp;
                //console.log("obj",obj)
                return (
                setSubMenu(obj, item, index, that)
                );
            }.bind(this))
            }
                
                </Menu>
               
            </Sider>
        )
    }
}

export default SiderCustom;