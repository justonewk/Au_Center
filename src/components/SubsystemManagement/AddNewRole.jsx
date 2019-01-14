
import React from 'react';
import SubsystemManagementHeader from './SubsystemManagementHeader'
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import AddNewRoleRightContent from './AddNewRoleRightContent';
import '../../style/SubsystemManagement.css';
class AddNewRole extends React.Component {

  state={
     local_permit:window.sessionStorage.getItem('userData')==null?[]:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
   
  }
  render() {
    return (
      <div className="SubsystemManagement"> 
        <SubsystemManagementHeader/>
         <div className="data-wrapper">  
          {/*子系统管理左边导航*/}
            <div className="left">
            <SubsystemManagementSiderLeft
              local_permit={this.state.local_permit} 
             lefttitle={this.props.lefttitle} LeftSlidedatalist={this.props.LeftSlidedatalist}/>
            {/*子系统管理右边具体内容*/}
            </div>
            <div className="right">
             <AddNewRoleRightContent {...this.props}/>
            </div>
          </div>
      </div>
    )
  }
}
export default AddNewRole;