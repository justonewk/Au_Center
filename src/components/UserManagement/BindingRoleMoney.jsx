import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;


class BindingRoleMoney extends React.Component {


    state={
        lastdata: "",
        value: this.props.defaultvalue,
        curry: "",
        zhutai: true,
    }

    //获取货币的名字
    getmoneyname=(value) => {
        var nameandlimit = {
            "namenomey": "",
            "limit": ""
        }

        var data = this.props.data;
        for ( let values of data ) {
            console.log(value);
            if (value === values.id) {
                nameandlimit.namenomey = values.name;
                nameandlimit.limit = values.limit;
            } else {
                continue;
            }
        }
        return nameandlimit
    }
    handleChange=(value, key) => {
        this.setState({
            curry: value,
            zhutai: false
        })
        var reNameLimit = this.getmoneyname(value);
        var limit = reNameLimit.limit;
        var name = reNameLimit.namenomey;
        this.props.handleChangeMoney(value, name, limit)
        this.props.retuerchang();
    }
    onSelect=(value, key) => {
        console.log(key);
        console.log(value);
    }
    // 生成option道具工具
    setToolbar=(data) => {
        //  
        let tools = [];
        if (data === "") {
            return;
        } else {
            //渲染道具
            for (var j in data) {
                if (parseInt(j,10) < parseInt(data.length,10)) {
                    tools.push(<Option key={data[j].id}>{data[j].name}</Option>);
                } else {
                    break;
                }
            }
            return tools;
        }
    }
    filterOption=(input, option) => {
        console.log(input, option)
    }
    render() {

        return (
            <Select
            showSearch
            style={{
                width: "50%"
            }}
            onChange={this.handleChange}
            value={this.state.zhutai === true || this.props.listshow === true ? this.props.moneydefaultvalueid.toString() : this.state.curry}
            onSelect={this.onSelect}
            filterOption={(input, option) => option.props.children.indexOf(input) > -1}
            >
    {this.setToolbar(this.props.data)}
      </Select>

        )

    }
}
export default BindingRoleMoney;