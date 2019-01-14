import React from 'react';
import {  Modal, Form, Input } from 'antd';
import getDataModal from './getDataModal';
import '../../../style/AddGroupMoadal.css';
const FormItem = Form.Item;

class AddGroupModal extends React.Component {

    state = {
        title: '',
        description: "",
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: this.props.defaultData.title == undefined ? "" : this.props.defaultData.title,
        });
    }

    checkConfirm=(rule, value, callback) => {
        // console.log("rule, value,",rule, value,)
        if (value.length !== 0) {
            if (value.length > 10) {
                callback("输入的长度小于10");
            } else {
                callback();
            }
        } else {
            callback("输入内容不为空");
        }

    }
    
    render() {
        const {form, onOk, onCancel} = this.props;
        const {getFieldDecorator} = form;
        // console.log("aadd",this.state.title)
        return (
            <Modal
            className="AddGroupModal"
            title={this.props.title}
            visible={this.props.visible}
            okText="确认"
            width="500px"
            cancelText="取消"
            onOk={onOk}
            onCancel={onCancel}
            >
         <Form >
            <FormItem label="分组名称">
              {getFieldDecorator('title',
                {
                    initialValue: this.state.title,
                    rules: [{
                        required: true,
                        validator:this.checkConfirm
                    }],
                })(
                <Input  placeholder="请输入" />
            )}
            </FormItem>
           
          </Form> 
        </Modal>

        )
    }
}
export default getDataModal(Form.create()(AddGroupModal));