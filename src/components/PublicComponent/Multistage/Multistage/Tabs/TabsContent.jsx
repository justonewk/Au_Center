/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Row, Checkbox} from 'antd';
function onChange(e) {
  console.log(`checked = ${e.target.checked}`,`value = ${e.target.value}`);
}
class TabsContent extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
 

    render() {
      
        //设置默认的值
        const that = this;
        return (
            <div className="TabsContent">
            <Checkbox  value="1" onChange={onChange} key="1">内容1</Checkbox>
          </div>
        )
    }
}
export default TabsContent;