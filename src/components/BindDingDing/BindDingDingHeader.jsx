import React from 'react';
import {Row} from 'antd';
class BindDingDingHeader extends React.Component {

  state = {
   
    }
  render() {
    return (
      <div className="BindDingDingHeader contentHeader">
          <Row gutter={16}>
            用户绑定    
          </Row>
      </div>
    )
  }
}
export default BindDingDingHeader;