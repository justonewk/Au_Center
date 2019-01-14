/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal,  } from 'antd';

import Multistage from '../Multistage/Multistage/Multistage'

class LimitRoleModle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bindingRole: [],
            defaultCheackRole:["R5828180614"],
            defaultShowRole:[],
            roledata: [{
            "id": "SYS6289180524",
            "name": "简乐互动",
            "item": [{
              "id": "JLHDed3504d90bf00a649b4243f557cc89f41527128983",
              "name": "test胡涛12",
              "item": [{
                "id": "R4388180529",
                "name": "胡涛是王昆的爷爷"
              }, {
                "id": "R1406180510",
                "name": "鲁班7号"
              }, {
                "id": "R6699180519",
                "name": "胡涛"
              }, {
                "id": "R2084180530",
                "name": "安琪拉"
              }]
            }, {
              "id": "JLHDd43f1acd59ff32424ba251a86ed6afcd1527152958",
              "name": "龙纹三国子系统",
              "item": [{
                "id": "R6212180531",
                "name": "wangkun"
              }]
            }]
          },{
            "id":"SYS6289180529",
            "name":"测试四",
            "item":[{
              "id":"JLHDd458",
               "name": "尘缘6",
              "item": [{
                  "id": "R6212180599",
                "name": "wangkun3"
              }]
            }]
          }],
          "constroledata": [{
            "id": "SYS6289180524",
            "name": "简乐互动",
            "item": [{
              "id": "JLHDed3504d90bf00a649b4243f557cc89f41527128983",
              "name": "test胡涛12",
              "item": [{
                "id": "R4388180529",
                "name": "胡涛是王昆的爷爷"
              }, {
                "id": "R1406180510",
                "name": "鲁班7号"
              }, {
                "id": "R6699180519",
                "name": "胡涛"
              }, {
                "id": "R2084180530",
                "name": "安琪拉"
              }]
            }, {
              "id": "JLHDd43f1acd59ff32424ba251a86ed6afcd1527152958",
              "name": "龙纹三国子系统",
              "item": [{
                "id": "R6212180531",
                "name": "wangkun"
              }]
            }]
          },{
            "id":"SYS6289180529",
            "name":"测试四",
            "item":[{
              "id":"JLHDd458",
               "name": "尘缘6",
              "item": [{
                  "id": "R6212180599",
                "name": "wangkun3"
              }]
            }]
          }],
        };
    }
    componentDidMount() {
  //         let  roledata=JSON.parse(window.sessionStorage.getItem("conf_sysroles"))
  //       let defaultdata=getdefaultRoleData(this.props.userDetaildata.role)
  // if (roledata == null) {
  //           getRolelist("conf_sysroles", this.sucRoleList);
  //       } else {
  this.setState({
    roledata:this.props.roledata,
    constroledata:this.props.roledata,
    defaultCheackRole:this.props.defaultCheackRole,
    defaultShowRole:this.props.defaultShowRole,
    
  })
// }
    }
 


    bindingRole=(dataid,datashow) => {
      console.log("dataid,datashow",dataid,datashow)
       this.props.bindingRole(dataid,datashow)
    }


    gameSelectOk=(checkedListGame) => {

    }
    gameSelectCancel=() => {
        //取消选择
    }
    handleCancel=() => {
        this.props.onHandleCancel()
    }
    onBindingRole=(relevancedata) => {
        this.setState({
            relevancedata
        })
    }
    render() {
        console.log("roledata", this.state.roledata)
        return (
            <Modal
            maskClosable={false}
            title="关联新角色"
            visible={this.props.addRoletag}
            width={800}
            onCancel={this.handleCancel}
            className="addNewuserToRole addNewuserToUserlist right"
            footer={null}
            key={JSON.stringify(this.state.defaultCheackRole)}
            >
              <div className="addnewrole">
            
            <Multistage
            handleCancel={this.handleCancel}
            bindingRole={this.bindingRole}
            Cannel={this.handleCancel}
            roledata={this.state.roledata}
            constroledata={this.state.constroledata}
            defaultCheackRole={this.state.defaultCheackRole}
            defaultShowRole={this.state.defaultShowRole}
            showCannel={true}
            />
            </div>
            
        </Modal>
        )
    }
}
export default LimitRoleModle;