import React from 'react';
import {  Row,  Button } from 'antd';

import Ganged from './Ganged/Ganged';
import SelectRole from './Ganged/SelectRole';


class BindingRole extends React.Component {



    state = {
        relevancedata: this.props.relevancedata ? this.props.relevancedata : []
    }
    onRelevance=(relevancedata) => {
        console.log("关联的数据waimian", relevancedata)
        this.setState({
            relevancedata: relevancedata
        })
        this.props.onGetBingdingRole(relevancedata)
    }
    onCancelRelevance=(id) => {
        let olddata = this.state.relevancedata;
        let newdata = [];
        for (let i = 0; i < olddata.length; i++) {
            if (i !== id) {
                newdata.push(olddata[i])
            }
        }
        console.log("删除之后的id", newdata)
        this.setState({
            relevancedata: newdata
        })
        this.props.onGetBingdingRole(newdata)
    }
    bindingRole=() => {
        this.props.bindingRole(this.state.relevancedata)
    }


    render() {

        console.log("关联的数据是2", this.props.relevancedata)
        return (
            <div className="role-wrapper">
      <Row gutter={16} >{this.props.title && this.props.title}</Row>
       {this.props.isShow && <Row gutter={16} >
          <Ganged
            systemname={this.props.systemname}
            subsystemName={this.props.subsystemName}
            rolename={this.props.rolename}
            delone={this.props.delone}
            deltwo={this.props.deltwo}
            ajaxcmd={this.props.ajaxcmd}
            relevancedata={this.state.relevancedata}
            onRelevanceGanged={this.onRelevance}
            />
             </Row>
            }
           
            <SelectRole
            isEdit={this.props.isShow ? true : false}
            relevancedata={this.state.relevancedata}
            onCancelRelevance={this.onCancelRelevance}
            />
           
           
             <Row gutter={16} className="modeSave"  >
              {this.props.isShow && this.props.showNext &&
               <Button type="primary" onClick={this.bindingRole}>
           {this.props.save ? "确认" : "下一步"}
          </Button>}
          


            </Row>

      </div>

        )

    }
}
export default BindingRole;