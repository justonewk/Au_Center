import React from 'react';
import {Row} from 'antd';
class SubsystemManagementHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {
   
    }
  render() {
    return (
      <div className="SubsystemManagementHeader contentHeader">

          <Row gutter={16}>
            子系统管理
             
          </Row>
          </div>
    )
  }
}
export default SubsystemManagementHeader;