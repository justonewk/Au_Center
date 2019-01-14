import React from 'react';
import { Modal,Row,Col,Input,Select,Button } from 'antd';

const Option = Select.Option;
class AddChannelModel extends React.Component{

    state=({
      visible: false,
      disable:true,
      title:'',
      name:'',//站点名
      id:'',//站点id
      states:'',//状态
      mark:''//备注
    })
    componentWillReceiveProps(nextProps) {
    	let a=   JSON.parse(nextProps.dataTable)
        console.log("weww",nextProps);
         this.setState({
            visible: nextProps.visible,
            title: nextProps.title,
            disable:nextProps.disable,
            name:a.name,
            id:a.id,
            mark:a.备注,
            states:a.状态,
          });
          setTimeout(() => {
             
            },0);
         
    }
	  componentWillMount() {
     
	  }
    componentDidMount(){
      
    }
    handleCancel=(e)=>{
      console.log(e)
       this.setState({
        visible: false,
      });
       this.props.callbackParent();
    }
  
    handleChangeStatus=(e)=>{}
    render() {
        return (
            <Modal
          title=""
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className='addChannel'
        >
          <div className='all'>
            <div className='title'>{this.state.title}站点信息</div>
            <div className='conent'>
              <Row>
               <Col span={4}>名称: </Col>
               <Col span={8}><Input className='addModelinput' value={this.state.name}/></Col>
               <Col span={4}>渠道Id: </Col>
               <Col span={8}><Input className='addModelinput' value={this.state.id} disabled={this.state.disable}/></Col>
              </Row>
              <Row>
               <Col span={4}>备注: </Col>
               <Col span={8}><Input className='addModelinput' value={this.state.mark}/></Col>
               <Col span={4}>状态: </Col>
               <Col span={8}>
                  <Select   className='addModelinput' default={this.state.states} value={this.state.states} onChange={this.handleChangeStatus}>
                   <Option value="正常">正常</Option>
                   <Option value="合作">合作</Option>
                   <Option value="中止">中止</Option>
                  </Select>
               </Col>
              </Row>
               <Row>
               <Col span={8}> </Col>
               <Col span={8}><Button className='addBtn show' type='primary'>添加</Button></Col>
               <Col span={8}></Col>
              </Row>
            </div>
          </div>
        </Modal>
        )

    }
}
export default AddChannelModel;