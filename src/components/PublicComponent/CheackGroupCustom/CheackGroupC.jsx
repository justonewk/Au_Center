import React from 'react';
import { Checkbox, Input, Button, Icon } from 'antd';
import { searchIdToName } from '../../../public/CommonFuncs'
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
function getChecheAll(checkedValues) {
    let temp = []
    checkedValues.map(item => {
        temp.push(item.value)
    })
    return temp;
}

class CheackGroupC extends React.Component {
    state={
        checkedList: this.props.checkedList,
        indeterminate: false,
        checkAll: false,
        configurationRoletag: false,
        showselectdata: this.props.showselectdata,
        data: this.props.data,
        constdata: this.props.constdata,
    }
    onChange = (checkedList) => {

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.state.data.length),
            checkAll: checkedList.length === this.state.data.length,
        });
        // this.props.onSetCheckedList(checkedList)
        this.onSetCheckedList(checkedList)
    }
    onCheckAllChange = (e) => {
        // console.log("e.target.checked",e.target.checked)
        let optionsValue = getChecheAll(this.state.data)
        let checkedListshow = e.target.checked ? optionsValue : [];
        this.setState({
            checkedList: checkedListshow,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        // this.props.onSetCheckedList(checkedListshow)
        this.onSetCheckedList(checkedListshow)
    }
    onSetCheckedList=(CheckedList) => {
        console.log("这里的值", CheckedList)
        let showselectdata = searchIdToName(this.state.constdata, CheckedList)
        console.log("showselectdata", showselectdata)
        this.setState({
            showselectdata
        })
    }

    // 通过名字查找id
    onserchData=(e) => {
        // console.log("搜索出问题了？",e.target.value)
        let value = e.target.value;
        let datatemp = this.state.constdata;

        // console.log("搜索出问题了？",datatemp,value,e)
        let serchdata = []
        if (value !== "") {
            for (let i = 0; i < datatemp.length; i++) {
                if (datatemp[i].label.indexOf(value) > -1) {
                    serchdata.push(datatemp[i])
                }
            }
        } else {

            serchdata = this.state.constdata
        }
        this.setState({
            data: serchdata
        })
    }
    // 确认选择
    Ok=() => {
        // 向上提交数据
        console.log("选中的游戏", this.state.checkedList, this.state.showselectdata)
        // this.setState({gameListOK:true})
        this.props.onOK(this.state.checkedList, this.state.showselectdata)
    }
    // 取消选择
    Cancel=() => {
        // 取消数据
        // this.setState({
        //     checkedList: [],
        //     showselectdata: [],
        // })

        console.log("dianji")
        this.props.onCancel();
    }
    oncloseList=(id) => {
        let idlist = [];
        let objlist = [];
        let data1 = this.state.checkedList;
        let data2 = this.state.showselectdata
        for ( let j of data1 ) {

            if (id !== j) {
                idlist.push(j)
            }
        }
        for (let k = 0; k < data2.length; k++) {
            console.log(data2)
            if (id !== data2[k].value) {
                objlist.push(data2[k])
            }
        }
        console.log("删除数据的时候,", idlist, objlist)
        this.setState({
            checkedList: idlist,
            showselectdata: objlist,
        })
    }


    render() {
        console.log("options==",this.state.data)
        return (
            <div className="content">
            <div className="showGameList">
            
            <div className="selectgame">
            <div className="serch">
            <Search style={{
                width: 240
            }}

            placeholder="收索游戏"
            onChange={this.onserchData}
            // onSearch={this.onserchData} 
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
        

              <CheckboxGroup options={this.state.data} value={this.state.checkedList} onChange={this.onChange} />
            </div>
            </div>
            <div className="showgame" ref="showgame-wrapper">
                        <div className="hasSelect">{this.state.showselectdata.length > 0 ? "已经选择了" + this.state.showselectdata.length + this.props.titlename : ""}</div>
              <div className="data-content">
               {this.state.showselectdata.map((item, index) => {
                return (
                    <div key={index}>
                  <span className="item">{item.label}</span>
                  <Icon type="close-circle" onClick={() => this.oncloseList(item.value)}/>
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
            </div>

        )

    }
}
export default CheackGroupC;