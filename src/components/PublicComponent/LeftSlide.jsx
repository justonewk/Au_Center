/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon,  Dropdown } from 'antd';

import { zidianfangyi } from '../../public/CommonFuncs';
import { Dropdownoverlay, onVisibleChange } from './Dropdownoverlay';
import $ from 'jquery';
import '../../style/baseall.css';
const SubMenu = Menu.SubMenu;


// 递归设置下拉菜单
function setSubMenu(obj, item, index, parentkey, that) {
    console.log("递归菜单",that.props.selectedKeys,item.id)
    return (
    item.children ?
        <SubMenu
        // onClick={that.props.onCustomClick.bind(that,item.name,item)}
        key={item.id}
        className={(that.props.selectedKeys === item.id||(Array.isArray(that.props.selectedKeys) && that.props.selectedKeys[0] === item.id)) ? that.props.TitleSelect : ""}
        title={<span>
                    <Icon type={$.inArray(item.id, that.props.openKeys) > -1 ? "caret-down" : "caret-right"}
        onClick={that.props.onCustomClick.bind(that, item, parentkey)}/>
                    <span>{item.name}({item.memnum})</span>
                    {that.props.SubMenudata.length > 0 ? <Dropdown   className="leftdrop"
        overlay={Dropdownoverlay((item.children.length <= 0 ? that.props.SubMenudata : that.props.SubMenudatatemp), item.id, item.name, that.props.onClickOperation, "")}
        onClick={onVisibleChange}
        trigger={['click']}
        >
                          <a className="ant-dropdown-link" href="">
                            <Icon type="ellipsis" />
                          </a>
                    </Dropdown> : ""}
                    </span>
        }
        onTitleClick={that.props.onTitleClick.bind(that, item)}
        >
                       {item.children.map(function(items, index) {
            return (items.children ? setSubMenu(obj, items, index, item.id, that) :
                <Menu.Item key={items.id + "-" + item.id} >
                         <span className={'icon-tubiao tubiao' + items.name + "-" + index} ></span>
                         <span className="nav-text">{items.name}({items.memnum})</span>
                            {that.props.Menudata.length > 0 ? <Dropdown
                className="leftdrop"
                overlay={Dropdownoverlay(that.props.Menudata, items.id, items.name, that.props.onClickOperation, item.id)}
                onClick={onVisibleChange}
                trigger={['click']}
                >
                          <a className="ant-dropdown-link" href="">
                            <Icon type="ellipsis" />
                          </a>
                        </Dropdown> : ""}
                          </Menu.Item>
            )
        }
        )}
                    </SubMenu>
        : <Menu.Item key={item.id}  >
                         <span className={'icon-tubiao tubiao' + item.name} ></span>
                         
                         <span className="nav-text">{item.name}({item.memnum})</span>
                           {that.props.Menudata.length > 0 && item.name.indexOf("全部用户") <= -1 ? <Dropdown   className="leftdrop"
        overlay={Dropdownoverlay(that.props.Menudata, item.id, item.name, that.props.onClickOperation, "")}
        onClick={onVisibleChange}
        trigger={['click']}
        >
                          <a className="ant-dropdown-link" href="">
                            <Icon type="ellipsis" />
                          </a>
                        </Dropdown> : ""}
                         </Menu.Item>
    )
}
class LeftSlide extends Component {
    state={
        selectedKey: this.props.selectedKey,
        rootapp: "",
        datalist: this.props.datalist
    }
    render() {
        // console.log("默认打开的值是",this.props.openKeys)
        return (

            <Menu
            theme="light"
            onClick={this.props.onClickMenu.bind(this)}
            onSelect={this.props.onSelect.bind(this)}
            className="leftslider"
            mode="inline"
            selectedKeys={this.props.selectedKeys}
            openKeys={this.props.openKeys}
            defaultOpenKeys={this.props.openKeys}
            >
                     {this.props.datalist.map(function(item, index) {
                let obj = zidianfangyi(item);
                let that = this;
                // console.log("rootapp",that.state.rootapp)
                return (
                setSubMenu(obj, item, index, item.id, that)
                );
            }.bind(this))
            }
                
                </Menu>


        )
    }
}

export default LeftSlide;