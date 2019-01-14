/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Row, Checkbox,Button} from 'antd';

class Tabstab extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
 

    render() {
      
        //设置默认的值
        const that = this;
        return (
            <div className="Tabstab">
             <Button> 按钮1</Button>
          </div>
        )
    }
}
export default Tabstab;