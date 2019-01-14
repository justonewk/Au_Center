/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Icon, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class EditableCellTime extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    //时间转换为时间戳

    timechangge=(dateString) => {
        let date = dateString;
        let myDate = new Date(date);
        this.year = myDate.getFullYear();
        this.month = myDate.getMonth() + 1 < 9 ? "0" + myDate.getMonth() + 1 : myDate.getMonth() + 1;
        this.date = myDate.getDate() < 9 ? "0" + myDate.getDate() : myDate.getDate();
        let showzhi = this.year + "-" + this.month + "-" + this.date;
        console.log(showzhi);
        return showzhi;
    }
    handleChange = (values) => {
        let valueshow = this.timechangge(values)

        this.setState({
            value: valueshow
        });
    }
    check = () => {

        this.setState({
            editable: false
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
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
                let value = this.props.postDatatag + 1;
                if (this.props.addnow) {
                    this.props.onChangeeidt(value, false)
                } else {
                    this.props.onChangeeidt(value, true)
                }

            }
        }
    }
    render() {
        const {value, editable} = this.state;
        const dateFormat = 'YYYY-MM-DD';
        return (
            <div className="editable-cell">
        {
            editable ?
                <div className="editable-cell-input-wrapper">
                        <DatePicker
                onChange={this.handleChange}
                onPressEnter={this.check}
                defaultValue={moment(value, dateFormat)}
                // value={value}
                />
                      <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                />
            </div>
                :
                <div className="editable-cell-text-wrapper">
              {value || ' '}
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

export default EditableCellTime;