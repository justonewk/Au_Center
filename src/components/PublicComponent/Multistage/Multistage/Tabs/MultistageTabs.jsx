/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Row, Checkbox, } from 'antd';
import Tabstab from './Tabstab'
import TabsContent from './TabsContent'
class MultistageTabs extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
 

    render() {
      
        //设置默认的值
        const that = this;
        return (
            <div className="wrapper">
          
                <Tabstab data={this.props.roledata} />
            <TabsContent data={this.props.roledata} />
           
            
          </div>
        )
    }
}
export default MultistageTabs;