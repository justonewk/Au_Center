import React from 'react';
import { Checkbox, Input, Button, Icon } from 'antd';
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
function getChecheAll(checkedValues) {
    let temp = []
    checkedValues.map((item) => {
        temp.push(item.value)
    })
    return temp;
}

class GameList extends React.Component {
    constructor(props) {
        super(props);
        console.log("props", this.props.data)
    }
    state={
        checkedList: [],
        indeterminate: false,
        checkAll: false,
    }
    onChange = (checkedList) => {
        // console.log("checkedList",checkedList)
        // let checkedListshow
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.props.data.length),
            checkAll: checkedList.length === this.props.data.length,
        });
        this.props.onSetCheckedList(checkedList)
    }
    onCheckAllChange = (e) => {
        // console.log("e.target.checked",e.target.checked)
        let optionsValue = getChecheAll(this.props.data)
        let checkedListshow = e.target.checked ? optionsValue : [];
        this.setState({
            checkedList: checkedListshow,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.onSetCheckedList(checkedListshow)
    }
    onChangeGame=(e) => {
        // this.props.constdata
        console.log("搜索的值", e.target.value)
        this.props.onChangeGame(e.target.value)
    }
    // 确认选择
    Ok=() => {
        this.props.onOK();
    }
    // 取消选择
    Cancel=() => {
        this.props.onCancel();
    }
    closeList=(id) => {
        console.log("要删除的id", id)
        this.props.oncloseList(id)
    }

    render() {

        console.log("this.props.isOk", this.props.isOk)
        return (
            <div className="wrapper-gamelsit">
          <div>选择相关的用户</div>
          {this.props.isShow && <div className="content">
            <div className="showGameList">
            
            <div className="selectgame">
            <div className="serch">
            <Search style={{
                width: 240
            }}

            placeholder="搜索用户"
            onChange={this.onChangeGame}
            // onSearch={this.onSearch2} 
            />
            </div>
            <div className="gamelsit">
            <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
            >
            全选
          </Checkbox>
              <CheckboxGroup options={this.props.data} value={this.props.checkedList} onChange={this.onChange} />
            </div>
            </div>
            <div className="showgame">
            <div className="hasSelect">{this.props.showselectdata.length > 0 ? "已经选择了" + this.props.showselectdata.length + "用户" : ""}</div>
              <div className="data-content">
               {this.props.showselectdata.map((item, index) => {
                return (
                    <div key={index}>
                  <span className="item">{item.label}</span>
                  <Icon type="close-circle" onClick={() => this.closeList(item.value)}/>
                  </div>
                )
            })}
              </div>
              <div className="btn">
              <Button type="primary" onClick={() => this.Ok()}>确定</Button>
              <Button onClick={() => this.Cancel()}>取消</Button>
              </div>
            </div>
            </div>
            </div>}
            <div className="showGameok">
              {this.props.isOk && this.props.showselectdata.map((item, index) => {
                return (
                    <div className="okshow" key={index}>
                  <span className="item">{item.label}</span>
        
                  </div>
                )
            })
            }
            </div>
            </div>

        )

    }
}
export default GameList;