import React from 'react';
import {Row} from 'antd';
class LogManagementHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {
   
    }
  render() {
    return (
      <div className="LogManagementHeader contentHeader">

          <Row gutter={16}>
            日志管理
             
          </Row>
          </div>
    )
  }
}
export default LogManagementHeader;