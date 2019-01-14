
import React from 'react';
import { Button, Form, Select, Input, Row, Col, AutoComplete } from 'antd';
import { validatorCheck } from '../../public/validator'
import { getajax } from '../../public/ajax'
const Ajax = getajax.ajaxFun;
const FormItem = Form.Item;
const Option = Select.Option;
class UserBaseMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            autoCompleteResult: [],
        };
    }
    userName = (rule, value, callback) => {
        if (value.match(/^[a-zA-Z][a-zA-Z0-9_]{0,15}$/)) {
            if(this.props.isdetails){
                callback()
            }
            else{
               let data = {
                username: value
               }
            Ajax('post', 'front/query', 'user_name_verification', data, (e) => {
                if (e.ret === 1) {
                    callback();
                }
                else {
                    callback(e.errmsg)
                }
             })  
          }
        } else {
            callback("用户名由1-16位英文字母/数字组成,并且字母开头")
        }
        //validatorCheck("username", value,callback) 
    }
    nickname = (rule, value, callback) => {
        validatorCheck("chinese", value, callback)
    }
    mobile = (rule, value, callback) => {
        if(value===""){
            callback("电话号码不为空")
        }else{
           validatorCheck("mobile", value, callback)  
        }
       
    }
    email = (rule, value, callback) => {
        validatorCheck("email", value, callback)
    }
    partner=(rule, value, callback)=>{
        console.log("value==",value)
        if(value!=null&&value.length>16){
            callback("合作方长度不能超过16位")
        }
        else{
            callback()
        }
    }
    secpass = (rule, value, callback) => {
        validatorCheck("pws", value, callback)
    }
    handleEmailChange = (value) => {
        let data = this.props.datavalue.email;
        console.log("value", value, this.props.datavalue.email)
        let autoCompleteResult;
        if (!value || value.indexOf('@') > -1) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['@npcfuture.com', '@163.com', '@qq.com'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
        // return autoCompleteResult
    }
    handleSubmit = (e) => {
    //    console.log("编辑的时候有提交吗?handleSubmithut")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log("编辑的时候有提交吗",err, values)
            if (!err) {
                this.props.onHandleSubmit(values)
            }
        });
    }
    render() {
        const { email } = this.state
        const { isEditMode, datavalue, isdetails, fontbutton } = this.props;
        const { getFieldDecorator } = this.props.form;
      //  console.log("fontbutton", fontbutton)
        return (
            <div className="userbase-wrapper">
                <p className="title">{this.props.title}</p>
                <div className="from-wraper" >
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }} >
                                <FormItem label="用户登录名">
                                    {isEditMode && getFieldDecorator('username', {
                                        initialValue: datavalue.username,
                                        rules: [{
                                            required: true,
                                            validator: this.userName
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        <Input placeholder="用户登录名" />

                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.username}</p>
                                    }
                                </FormItem>
                            </Col>
                            <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }} >
                                <FormItem label="用户真实名称">
                                    {isEditMode && getFieldDecorator('nickname', {
                                        initialValue: datavalue.nickname,
                                        rules: [{
                                            required: true,
                                            message:"真实姓名必填"
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        <Input placeholder="用户真实名称" />

                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.nickname}</p>
                                    }
                                </FormItem>
                            </Col>
                            {isdetails && <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }} >
                                <FormItem label="状态">
                                    {isEditMode && getFieldDecorator('userstate', {
                                        initialValue: datavalue.userstate.toString(),
                                        rules: [{
                                            required: true,
                                            validator: this.userstate
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        <Select>
                                            <Option value="0">正常</Option>
                                            <Option value="1">禁用</Option>
                                        </Select>

                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.userstate === 0 ? "正常" : "禁用"}</p>
                                    }
                                </FormItem>

                            </Col>
                            }
                            <Col lg={{
                                span: 8
                            }} xxl={{
                                span: 5,
                                offset: 1
                            }} >
                                <FormItem label="电话号码">
                                    {isEditMode && getFieldDecorator('mobile', {
                                        initialValue: datavalue.mobile,
                                        rules: [{
                                            required: true,
                                            validator: this.mobile
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        <Input placeholder="电话号码" />

                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.mobile}</p>
                                    }
                                </FormItem>
                            </Col>

                            <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }}>
                                <FormItem label="邮箱">
                                    {isEditMode && getFieldDecorator('email', {
                                        initialValue: datavalue.email,
                                        //  getValueFromEvent: this.handleEmailChange,
                                        rules: [{
                                            required: true,
                                            validator: this.email
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        // <Input placeholder="邮箱" />
                                        <AutoComplete
                                            style={{ width: 200 }}
                                            placeholder="邮箱"
                                            dataSource={this.state.autoCompleteResult}
                                            onChange={this.handleEmailChange}
                                        />
                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.email}</p>
                                    }
                                </FormItem>
                            </Col>
                             <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }}>
                                <FormItem label="合作方标识">
                                    {isEditMode && getFieldDecorator('partner', {
                                        initialValue: datavalue.partner,
                                        //  getValueFromEvent: this.handleEmailChange,
                                        rules: [{
                                            validator: this.partner
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        // <Input placeholder="邮箱" />
                                        <Input placeholder="请输入合作方标识" />
                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.partner}</p>
                                    }
                                </FormItem>
                            </Col>

                            {!isdetails && <Col lg={8} xxl={{
                                span: 5,
                                offset: 1
                            }}>
                                <FormItem label="密码">
                                    {isEditMode && getFieldDecorator('secpass', {
                                        initialValue: datavalue.pass,
                                        rules: [{
                                            required: true,
                                            validator: this.secpass
                                        }],
                                        validateTrigger: "onBlur"
                                    })(
                                        <Input placeholder="密码" />
                                    )}
                                    {!isEditMode &&
                                        <p>{datavalue.pass}</p>
                                    }
                                </FormItem>
                            </Col>
                            }
                        </Row>
                        <Row className="nextshow"> {this.props.isEditMode && <Button type="primary" htmlType="submit" className="login-form-button">
                            {fontbutton ? fontbutton : "下一步"}
                        </Button>}</Row>
                    </Form>

                </div>
            </div>
        );
    }
}

const UserBaseMessageForm = Form.create()(UserBaseMessage);
export default UserBaseMessageForm;
