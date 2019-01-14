import React from 'react';
import { Modal,Row,Col,Input,Select,Button,Form,message} from 'antd';

class DeatailModel extends React.Component{
	 constructor(props) {
	    super(props); 
	     this.props.location;
	  };
    state=({
      visible: false,
      // server:this.props.server//状态
    })
    componentWillReceiveProps(nextProps) {
       console.log(nextProps)
         
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
       this.props.callbackParentDeail();
    }
   
    //表单数据提交
   
    render() {
        return (
            <Modal
          title=""
          visible={this.props.visible}
          onCancel={this.handleCancel}
          footer={null}
          className='addChannel'
        >
            <div className='all'>
            <div className='title' style={{'fontSize':'12'}}>操作历史记录查看</div>
            <div className='conent'>
            </div>
          </div>
        </Modal>
        )

    }
}

export default DeatailModel;