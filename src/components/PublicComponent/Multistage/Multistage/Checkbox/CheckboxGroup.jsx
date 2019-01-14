/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Row, Checkbox } from 'antd';
import $ from 'jQuery';

class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
  onChange=(e)=> {
  console.log(`checked = ${e.target.checked}`,`value = ${e.target.value}`,);
  this.props.onChangeRole(e.target.value,e.target.checked,e.target.label)
}

    render() {
      const {defaultCheackRole,data}=this.props
        //设置默认的值
        const that = this;
        return (
            <div >
             {data.map(function(item, index) {
                return (
                      <Checkbox className="Checkbox" value={item.id} 
                      checked={$.inArray(item.id,defaultCheackRole)>-1} 
                      label={item.name}
                      onChange={this.onChange} key={item.id}>{item.name}</Checkbox>
                   )
            }.bind(this))
             }
          </div>
        )
    }
}
export default CheckboxGroup;