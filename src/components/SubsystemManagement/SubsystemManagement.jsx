
import React from 'react';
import SubsystemManagementHeader from './SubsystemManagementHeader'
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import SubsystemManagementRightContent from './SubsystemManagementRightContent';
import $ from 'jQuery';
import '../../style/SubsystemManagement.css';


class SubsystemManagement extends React.Component {

  state={
    local_permit:window.sessionStorage.getItem('userData')==null?[]:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
  }
  screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        var t2 = this.refs.wrapper;
        var t = this.refs.userright;
       
       $(t).css("height",$(window).height()-280)
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
      }
  render() {

    return (
      <div className="SubsystemManagement"> 
        <SubsystemManagementHeader />
         <div className="data-wrapper" >  
          {/*子系统管理左边导航*/}
            <div className="left">
            <SubsystemManagementSiderLeft 
             local_permit={this.state.local_permit} 
             lefttitle={this.props.lefttitle} LeftSlidedatalist={this.props.LeftSlidedatalist}/>
            {/*子系统管理右边具体内容*/}
            </div>
            <div className="right" ref="userright">
            <SubsystemManagementRightContent local_permit={this.state.local_permit}/>
            </div>
          </div>
      </div>
    )
  }
}
export default SubsystemManagement;