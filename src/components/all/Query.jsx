/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import {
  Row
} from 'antd';


// 角色基本信息转换

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.props.location.query;
  };
  state = {
   
    }
    //大区选择
  render() {
console.log("在cshishsiAAAA组件中获取全局的变量", window.temp)
    return (
      <div >
          <Row gutter={16}>
          cshishsiAAAA
          </Row>
          </div>
    )
  }
}
export default Query;