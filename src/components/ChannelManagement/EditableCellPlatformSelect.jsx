/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Icon, Button, Select, message } from 'antd';
const Option = Select.Option;

class EditableCellPlatformSelect extends React.Component {
    state = {
        value: this.props.value.length == 0 ? "0" : this.props.value,
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
        // console.log("确认时候的状态",this.state.value)
        if (this.state.value == ''&&this.state.value!=0 || this.state.value == undefined) {
             // console.log("确认时候的状态444",this.state.value)
            message.error('该输入框内容不能为空');
        } else {
            this.setState({
                editable: false
            });
            if (this.props.onChange) {
                let returndata = this.state.value
                this.props.onChange(parseInt(returndata));
            }
            let value = this.props.postDatatag - 1;
            this.props.onChangpost(value)
        }
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
    statusfangyi=(value) => {
        let showvalue = "";


        switch (parseInt(value)) {
        case 0:
            showvalue = "安卓";
            break;
        case 1:
            showvalue = "ios";
            break;
        case -1:
            showvalue = "未知";
            break;
        }
        //console.log(showvalue);
        return showvalue;
    }

    render() {
        const {value, editable, addnow} = this.state;
        // console.log("valueddddddddddd",value)
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
      {this.state.Optiondata.map((item, index) => {
                    return (
                        <Option key={item.id} value={item.id}>{item.status}</Option>
                    )
                })
                }
                    </Select>          <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                />
            </div>
                :
                <div className="editable-cell-text-wrapper">
              {this.statusfangyi(value) || ' '}
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

export default EditableCellPlatformSelect;