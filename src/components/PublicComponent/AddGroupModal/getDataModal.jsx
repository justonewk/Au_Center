import React, { Component } from 'react';
const getDataModal = WrappedComponent => class extends Component {
    constructor(props) {
        super(props);
        console.log("fff", props)
    }
    onOk = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {

                return;
            }
            //form.resetFields();
            this.props.onOk(values, this.props.defaultData.type,
                this.props.defaultData.parentid, this.props.defaultData.currentid)
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    onCancel=(e) => {
        const form = this.formRef.props.form;
        form.resetFields();
        this.props.onCancel(false)
    }
    render() {
        const props = {
            ...this.props,
            onOk: this.onOk,
            defaultData: this.props.defaultData == undefined ? {} : this.props.defaultData,
            wrappedComponentRef: this.saveFormRef,
            onCancel: this.onCancel,
        }
        return (
            <div >
         <WrappedComponent {...props} />
        </div>);
    }
};
export default getDataModal;
