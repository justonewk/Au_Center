import React from 'react';
import { Select, } from 'antd';
import $ from 'jquery';
const Option = Select.Option;
class SelectCustom extends React.Component {

    setToolbar=(data, delarr) => {
        // console.log(data[i].id)
        let tools = [];
        if (data === "") {
            return;
        } else {
            for (var i in data) {
                if (parseInt(i,10) < parseInt(data.length,10)) {
                    tools.push(<Option disabled={delarr.length > 0 ? $.inArray(data[i].id, delarr) <= -1 : false} key={data[i].id}>{data[i].name}</Option>);
                } else {
                    break;
                }
            }
        }
        ;
        console.log(tools);
        return tools;
    }

    render() {

        return (

            <Select
            showSearch
            style={{
                width: "100%"
            }}
            optionFilterProp="children"
            onChange={this.props.onChange}
            value={this.props.value}
            onSelect={this.props.onSelect}
            filterOption={(input, option) => option.props.children.indexOf(input) > -1}
            >
        {this.setToolbar(this.props.data, this.props.delarr)}
      </Select>


        )

    }
}
export default SelectCustom;