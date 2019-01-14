import React from 'react';
import {Row} from 'antd';
class SystemSettingHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {
   
    }
  render() {
    return (
      <div className="SystemSettingHeader contentHeader">
          <Row gutter={16}>
            系统管理
          </Row>
      </div>
    )
  }
}
export default SystemSettingHeader;