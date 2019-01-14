import React from 'react';
import BindingRole from './BindingRole'
class GameSelectRole extends React.Component {
    render() {


        return (
            <div className="content-data">
            <div className="showGameok">
              {this.props.isOk && !this.props.configurationRoletag && this.props.showselectdata.map((item, index) => {
                return (
                    <div className="okshow" key={index}>
                  <span className="item">{item.label}</span>
        
                  </div>
                )
            })
            }
            </div>
            {this.props.isOk && !this.props.configurationRoletag && <div className="reload-writer blue">重新配置游戏</div>}
              
               {this.props.configurationRoletag && this.props.showselectdata.map((item, index) => {
                return (
                    <div className="box" key={index}>
                  <div className="okshow" >
                  <span className="item">{item.label}</span>
                  </div>
                  <div className="option">配置角色</div>
                  
                  </div>
                )
            })
            }

            <div>
             <BindingRole
            systemname="子系统组"
            subsystemName="子系统"
            rolename="角色"
            isShow={true}
            system={this.state.defaultsystem}
            subsystem={this.state.defaultsubsystem}
            role={this.state.defaultrole}
            systemdata={this.state.systemdata}
            subsystemdata={this.state.subsystemdata}
            roledata={this.state.roledata}
            onChange={this.SetBindingRoledata}
            onChangeRole={this.onChangeRole}
            onRelevance={this.onRelevance}
            relevancedata={this.state.relevancedata}
            onCancelRelevance={this.onCancelRelevance}
            bindingRole={this.bindingRole}
            /> 
            </div>
            </div>
        )

    }
}
export default GameSelectRole;