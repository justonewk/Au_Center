/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';



// 角色基本信息转换

class UserManagementHeader extends React.Component {

    state = {

    }
    onClick=(id) => {
        // this.setState({
        //   activeid:id
        // })
        this.props.onClickHeaderTab(id)
    }
    //大区选择
    render() {

        return (
            <div className="UserManagementHeader-wraper">
         
           <div className="title">用户管理</div>
           <div className="list">
           <ul>
             <li className={this.props.activeid === 1 ? "active item" : "item"} onClick={this.onClick.bind(this, 1)}>组织结构</li>
             <li className={this.props.activeid === 2 ? "active item" : "item"}  onClick={this.onClick.bind(this, 2)}>工作项目</li>
           </ul>
           </div>
         
          </div>
        )
    }
}
export default UserManagementHeader;