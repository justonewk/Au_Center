
import React from 'react';
import SubsystemManagementHeader from './SubsystemManagementHeader'
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import SubsystemDetailRightContent from './SubsystemDetailRightContent';
import $ from 'jquery'
import '../../style/SubsystemManagement.css';


class SubsystemDetail extends React.Component {

 state={
    local_permit:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
  }
   screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
       
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
        <SubsystemManagementHeader/>
         <div className="data-wrapper">  
          {/*子系统管理左边导航*/}
            <div className="left">
            <SubsystemManagementSiderLeft 
            lefttitle={this.props.lefttitle}
            local_permit={this.state.local_permit}
            LeftSlidedatalist={this.props.LeftSlidedatalist}/>
            {/*子系统管理右边具体内容*/}
            </div>
            <div className="right" ref="userright">
            <SubsystemDetailRightContent local_permit={this.state.local_permit} {...this.props}/>
            </div>
          </div>
      </div>
    )
  }
}
export default SubsystemDetail;