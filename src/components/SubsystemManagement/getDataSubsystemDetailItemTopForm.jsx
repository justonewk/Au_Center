import React, { Component } from 'react';
const getDataSubsystemDetailItemTopForm = WrappedComponent => class extends Component {
constructor(props) {
        super(props);
        //console.log("fff",props.datavalue)
    }
    state={
      datavalue:this.props.datavalue,
    }
   onOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return ;
      }
       console.log(values)
      // this.setState({
      //   datavalue:this.props.datavalue
      // })
      // return values;
     // form.resetFields();
    this.props.CallbackData(values)
    });
  }
  
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
    render() {
    	const props={
    		...this.props,
    		onOk:this.onOk,
        //datavalue:this.state.datavalue,
    		defaultData:this.props.defaultData==undefined?{}:this.props.defaultData,
    		wrappedComponentRef:this.saveFormRef,
    		onCancel:this.props.onCancel,
        GroupList: JSON.parse(window.sessionStorage.getItem('groupList')),
         userList:JSON.parse(window.sessionStorage.getItem("userList")),
        defaultGroupId:window.sessionStorage.getItem("subid"),//默认选择分组
        }
        return (
         <div className="">
         <WrappedComponent {...props} />
        </div>);
    }
};
export default getDataSubsystemDetailItemTopForm;
