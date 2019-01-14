/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Icon, Button, Select, message } from 'antd';
const Option = Select.Option;
function translateUidToName(uid, data) {
    let showname = "";
    if(uid==-1){
        showname="无"
    }
    else{
        for (let i = 0; i < data.length; i++) {
        if (data[i]["uid"] == uid) {
            showname = data[i]["nickname"];
        }
       }
    }
    
    return showname
}
class EditableCellSelectPerson extends React.Component {
    state = {
        value: this.props.value.length == 0 ? "22" : this.props.value,
        editable: false,
        Optiondata: this.props.Optiondata,
        addnow: this.props.addnow
    }
    handleChange = (value) => {
        // const value = value;
        this.setState({
            value
        });
    }
    check = () => {
        this.setState({
            editable: false
        });
        if (this.props.onChange) {
            let returndata = this.state.value
            this.props.onChange(returndata.toString());
        }
        let value = this.props.postDatatag - 1;
        this.props.onChangpost(value)
    }

    edit = () => {
        if (this.props.copytag) {
            this.setState({
                editable: true
            });
            let value = this.props.postDatatag + 1
            if (this.props.addnow) {
                this.props.onChangeeidt(value, false)
            } else {
                this.props.onChangeeidt(value, true)
            }
        } else {
            if (this.props.addnow && !this.props.copytag) {
                message.warning('正在新增，不能修改');
            } else {
                this.setState({
                    editable: true
                });
                let value = this.props.postDatatag + 1
                if (this.props.addnow) {
                    this.props.onChangeeidt(value, false)
                } else {
                    this.props.onChangeeidt(value, true)
                }
            }
        }
    }

    render() {
        const {value, editable, addnow} = this.state;
        const {waibu}=this.props

        return (
            <div className="editable-cell">
        {
            editable ?
                <div className="editable-cell-input-wrapper">
             <Select
                onChange={this.handleChange}
                onPressEnter={this.check}
                // value={parseInt(value)}
                defaultValue={parseInt(value)}
                >
                 {waibu&&<Option  value={-1}>无</Option>}
             {this.state.Optiondata.map((item, index) => {
                console.log("item",item)
                    return (
                        <Option key={item.uid} value={item.uid}>{item.nickname}({item.username})</Option>
                    )
                })
                }
                    </Select>
                <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                />
            </div>
                :
                <div className="editable-cell-text-wrapper">
              {translateUidToName(value, this.state.Optiondata) || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}

                />
            </div>
            }
      </div>
        );
    }
}

export default EditableCellSelectPerson;