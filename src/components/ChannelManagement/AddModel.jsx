import React from 'react';
import { Modal, Row, Col, Input, Select, Button, Form, message } from 'antd';

import { ajaxcallback } from '../../public/ajaxcallback';
import { getipconfig } from '../../getipconfig';
const getip = getipconfig();
const fwposturl = getip.serverip;
const FormItem = Form.Item;
const Option = Select.Option;
function isArray(obj) {
    return typeof obj == 'object' && obj.constructor == Array
}
class AddModelS extends React.Component {
    constructor(props) {
        super(props);
        this.props.location;
    }
    ;
    state=({
        visible: false,
        disable: true,
        title: '',
        name: '', //名称
        id: '', //渠道id
        responperson: '', //负责人
        linkman: '', //外部联系人
        remark: '', //备注
        states: [{
            'key': 0,
            "value": "正常"
        }, {
            'key': 1,
            "value": "中止"
        }],
        platform: [{
            'key': 0,
            "value": "安卓"
        }, {
            'key': -1,
            "value": "ios"
        }],
        game: '',
        tips: '',
    // server:this.props.server//状态
    })
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            game: nextProps.selectGame,
        });
        setTimeout(() => {

        }, 0);
    }
    componentWillMount() {}
    componentDidMount() {}
    handleCancel=(e) => {
        console.log(e)
        this.setState({
            visible: false,
        });
        this.props.callbackParent();
    }
    handleChange=(e) => {
    }
    handleFocus=(e) => {
    }
    handleBlur=(e) => {
    }
    handleChangeStatus=(e) => {
    }
    //表单数据提交
    ajaxsucees=(rede) => {
        let resa = JSON.parse(rede)
        if (resa.ret == 1) {
            message.success('提交成功');
            this.setState({
                visible: false,
            })
            this.props.addsuccus();
            this.props.callbackParent();
        } else {
            this.setState({
                tips: resa.errmsg,
            })
        }
    }
    //id判断是否数字
    idValidator=(rule, value, callback) => {
        console.log(value)
        if (value == '' || value == undefined) {
            callback();
        } else {
            if (value.match(/^[0-9]*$/)) {
                callback();
            } else {
                callback("ID必须为数字");
            }
        }


    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let serid = '';
            if (values.serverId == undefined) {
                serid == '';
            } else {
                if (values.serverId.length != 0) {
                    serid = values.serverId.toString();

                } else {
                    serid = values.serverId.join()
                }
            }


            console.log(serid);
            if (!err) {

                let mesdata = {
                    'name': values.name,
                    'id': values.id.toString(),
                    'manager': values.manager.toString(),
                    'contact': values.contact.toString(),
                    'status': values.status,
                    'remark': values.remark,
                    'serverId': serid,
                    'platform': values.platform
                }
                let jsonData = {
                    'gameid': parseInt(this.state.game),
                    'data': mesdata,
                }
                let timesign = (new Date()).valueOf();
                ajaxcallback(fwposturl + '/front/query', timesign.toString(), jsonData, "agent_add", this.ajaxsucees);

            }
        })
    }
   
    render() {
         const {gameToname}=this.props
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span:24
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 20
                },
            },
        };
        const formItemLayoutsing = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 2
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 21
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 0,
                },
            },
        };

        return (

            <Modal
             maskClosable={false}
            title=""
            visible={this.props.visible}
            onCancel={this.handleCancel}
            footer={null}
            width={984}
            className='addChannel'
            >
          <div className='all'>
            <div className='title'>新增{gameToname}渠道</div>
            <div className='conent'>
      <Form onSubmit={this.handleSubmit}>
             <Row>
             <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="名称"

            >
          {getFieldDecorator('name', {

                rules: [{
                    required: true,
                    message: '请输入名称',
                }],
            })(
                <Input  placeholder="请输入名称"/>
            )}
        </FormItem>
        </Col>
         <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="ID"
            >
          {getFieldDecorator('id', {
                rules: [{
                    required: true,
                    message: '请输入ID!'
                }, {
                    validator: this.idValidator
                }],
            })(
                <Input  placeholder="请输入ID"/>
            )}
        </FormItem>
        </Col>
       
      { /*联系人*/ }
       
             <Col span={6}>
      
        <FormItem
            {...formItemLayout}
            label="负责人"

            >
          {getFieldDecorator('manager', {

                rules: [{
                    required: true,
                    message: '请选择负责人',
                }],
            })(
                <Select
                showSearch

                placeholder="请选择负责人"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                   {this.props.people.map((item, index) => {
                    return (
                        <Option key={index} value={item.uid}>{item.nickname}({item.username})</Option>
                    )
                })
                }
                  </Select>
            )}
        </FormItem>
        </Col>
         <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="外部联系人"
            >
          {getFieldDecorator('contact', {

                rules: [{
                    required: true,
                    message: '请选择外部联系人',
                }],
            })(
                <Select
                showSearch

                placeholder="外部联系人"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {/* <Option  value={-1}>无</Option> */}
             {this.props.people.map((item, index) => {
                    return (
                        <Option key={index} value={item.uid}>{item.nickname}({item.username})</Option>
                    )
                })
                }
                  </Select>
            )}
        </FormItem>
        </Col>

             <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="状态"

            >
          {getFieldDecorator('status', {

                rules: [{
                    required: true,
                    message: '请选择状态',
                }],
            })(
                <Select
                showSearch

                placeholder="请选择状态"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                   {this.state.states.map((item, index) => {
                    return (
                        <Option key={item.key}value={item.key}>{item.value}</Option>
                    )
                })
                }
                  </Select>
            )}
        </FormItem>
        </Col>
         {/*<Col span={11}>
        <FormItem
            {...formItemLayout}
            label="备注"

            >
          {getFieldDecorator('remark', {

                rules: [{
                    message: '备注',
                }],
            })(
                <Input/>
            )}
        </FormItem>
        </Col>*/
    }
        <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="大区"
            >
          {getFieldDecorator('serverId', {

                rules: [{
                    required: false,
                    message: '请选择大区',
                }],
                initialValue: -1,
            })(
                <Select
                showSearch
                mode="multiple"
                placeholder="请选择大区"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                   {this.props.server.map((item, index) => {
                    return (
                        <Option key={item.id}value={item.id}>{item.name}</Option>
                    )
                })
                }
                  </Select>
            )}
        </FormItem>
        </Col>
           <Col span={6}>
        <FormItem
            {...formItemLayout}
            label="平台"

            >
          {getFieldDecorator('platform', {

                rules: [{
                    required: true,
                    message: '平台',
                }],
            })(
                <Select
                showSearch

                placeholder="请选择平台"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                   {this.state.platform.map((item, index) => {
                    return (
                        <Option key={item.key}value={item.key}>{item.value}</Option>
                    )
                })
                }
                  </Select>
            )}
        </FormItem>
        </Col>
         
        </Row>
        <Row>
           <Col span={11}>
           <div className="ant-form-explain-tips">{this.state.tips}</div>
        </Col>
        </Row>
        <Row>
             <Col span={22}>
             <FormItem
            {...tailFormItemLayout}


            >
            <Button className="btn" onClick={this.handleCancel} >取消</Button>
            <Button className="btn" type="primary" htmlType="submit">添加</Button>
             </FormItem>
             </Col>
        </Row>
        </Form>
            </div>
          </div>
        </Modal>
        )

    }
}
const AddModel = Form.create()(AddModelS);
export default AddModel;