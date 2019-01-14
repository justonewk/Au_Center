import React from 'react';
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import SubsystemManagementRightContent from './SubsystemManagementRightContent';
class SubsystemManagementContent extends React.Component {

  state = {
   
    }

  render() {
    return (
      <div className="data-wrapper">  
      {/*子系统管理左边导航*/}
      <div className="left">
      <SubsystemManagementSiderLeft 
      lefttitle={this.props.lefttitle}
      local_permit={this.props.local_permit} 
      LeftSlidedatalist={this.props.LeftSlidedatalist}/>
      {/*子系统管理右边具体内容*/}
      </div>
      <div className="right">
      <SubsystemManagementRightContent {...this.props} />
      </div>
    </div>
    )
  }
}
export default SubsystemManagementContent;