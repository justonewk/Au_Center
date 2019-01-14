import React from 'react';
import { Modal, Row, Col,  Select, Button, Form, message, Icon } from 'antd';

import {getajax} from '../../public/ajax';

const Ajax=getajax.ajaxFun;
const FormItem = Form.Item;
const Option = Select.Option;
class Addbings extends React.Component {
    constructor(props) {
        super(props);
        this.props.location;
    }
    ;
    state=({
        visible: false,
        disable: true,
        title: '',
        ddhas: true,
        quanxhas: true,
        modal1Visible: false,
        errmsgbangding: [],
        game: '',
        tips: '',
        optiondata: [],
        dduserdata: [],
        quanxiandata: [],
        constquanxiandata: [],
        bandingdata: [{
            "quanx": "quanx0",
            "dd": "dd0",
            "focus": false
        }],
    // server:this.props.server//状态
    })

    componentWillMount() {
        // var timesign = Date.parse(new Date());
        //请求钉钉账号 ga
        Ajax('post','front/query','User_list',{},this.quanxianajaxsucees)
     //请求用户账号
       Ajax('post','front/query','DDUser_list',{},this.dingdingajaxsucees)
      }
    dingdingajaxsucees=(data) => {
        // console.log("defaultActiveFirstOption",data)
       
        if (data.ret === 1) {
            this.setState({
                dduserdata: data.data

            })
        }
    }
    quanxianajaxsucees=(data) => {
        //console.log("datadddd",data)
      
        if (data.ret === 1) {
            this.setState({
                constquanxiandata: data.data

            })
        }

    }
    componentDidMount() {}
    handleCancel=(e) => {
        console.log(e)
        this.setState({
            visible: false,
        });
        this.props.callbackParent();
    }
    handleChange=(value) => {
        this.setState({
            value
        });
        //根据输入值赛选合适和选项
        this.filterOptionFun(value, this.state.dduserdata, "dingding")
    }
    handleChangequanx=(value, index) => {
        //根据输入值赛选合适和选项

        this.setState({
            value
        });
        this.filterOptionFun(value, this.state.constquanxiandata, "quanx")
    }
    filterOptionFun=(inputValue, option, tag) => {
       // console.log("输入值的时候的显示是什么",inputValue, option,tag)
        let showdata = []
        if (inputValue !== "") {
            if (tag === "dingding") {
                for (let i = 0; i < option.length; i++) {
                    if (option[i]["name"].toString().indexOf(inputValue) > -1 || option[i]["mobile"].toString() === inputValue) {
                        showdata.push(option[i])
                    }
                }
                if (showdata.length === 0) {
                    //没有值
                } else {
                    this.setState({
                        optiondata: showdata
                    })
                }
            } else {
                for (let i = 0; i < option.length; i++) {
                    if (option[i]["uid"].toString() === inputValue || option[i]["nickname"].toString().indexOf(inputValue) > -1 || option[i]["username"].toString() === inputValue) {
                        showdata.push(option[i])
                    }
                }

                this.setState({
                    quanxiandata: showdata
                })
            }
        } else {
            if (tag === "dingding") {
                this.setState({
                    optiondata: []
                })
            } else {
                this.setState({
                    quanxiandata: []
                })
            }
        }
    }

    handleFocus=(e) => {
    }
    handleBlur=(e) => {
    }
    handleChangeStatus=(e) => {
    }
    //表单数据提交
    ajaxsucees=(data) => {
        // 返回的数据已经是json对象了
        // let data = JSON.parse(datas)
        if (data.ret === 1) {
            this.props.tabledata();
            message.success('绑定成功');
        } else {
            let errmsgshow = data.errmsg;
            console.log("返回的值", errmsgshow)
            let showerrmsg = [];
            for (let i = 0; i < errmsgshow.length; i++) {
               // console.log("放回的值", errmsgshow[i]["data"])
                if (errmsgshow[i]["data"] !== undefined) {
                    let obj = {
                        "id": errmsgshow[i]["messsage"]["gmid"],
                        "ddingname": "",
                        "quanxname": "",
                        "messsage": errmsgshow[i]["messsage"]
                    }
                    obj.ddingname = this.getdingdingname(errmsgshow[i]["data"]["userid"])
                    obj.quanxname = this.getquanxname(errmsgshow[i]["data"]["gmid"])
                    showerrmsg.push(obj)
                }
            }
            this.setState({
                errmsgbangding: showerrmsg,
                modal1Visible: true,
            })

        }
        this.props.form.resetFields();
        this.props.startLog
        this.setState({
            bandingdata: [{
                "quanx": "quanx0",
                "dd": "dd0",
                "focus": false
            }],
        })

    }
    getdingdingname=(userid) => {
        let alldata = this.state.dduserdata;
        let showzhi = ""
        for (let i = 0; i < alldata.length; i++) {
            //选中数据
            if (userid === alldata[i]["userid"]) {
                showzhi = alldata[i]["mobile"] + "(" + alldata[i]["name"] + ")"
                break;
            } else {
                continue;
            }
        }
        return showzhi
    }
    getquanxname=(uid) => {
        let alldata = this.state.constquanxiandata;
        let showzhi = ""
        for (let i = 0; i < alldata.length; i++) {
            //选中数据
            if (uid === alldata[i]["uid"]) {
                showzhi = alldata[i]["username"] + "(" + alldata[i]["nickname"] + ")"
                break;
            } else {
                continue;
            }
        }
        return showzhi

    }
    //前端输入的钉钉账号判断是否手机
    idValidator=(rule, value, callback) => {

        let alldata = this.state.dduserdata;
        if (value === '' || value === undefined) {
            callback();
        } else {
            let flag = ""
            for (let i = 0; i < alldata.length; i++) {
                if (value.indexOf("-") > -1) {
                    let zhi = value.split("-");
                    //选中数据
                    if (zhi[0] === alldata[i]["name"] && zhi[1] == alldata[i]["mobile"]) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                } else {
                    //根本没有选中的时候
                    //console.log("value,zhi%%",alldata[i]["mobile"],alldata[i]["mobile"].indexOf(value),alldata[i]["name"],alldata[i]["name"].indexOf(value))
                    if (alldata[i]["mobile"].indexOf(value) > -1 || alldata[i]["name"].indexOf(value) > -1) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }

                }

            }
            if (flag) {
                callback();
            } else {
                callback("钉钉账号不");
            }
        }

    }
    //判断前端输入的权限中心账号
    quanxValidator=(rule, value, callback) => {

        let alldata = this.state.constquanxiandata;
        if (value === '' || value === undefined) {
            callback();
        } else {
            let flag = ""

            for (let i = 0; i < alldata.length; i++) {
                if (value.indexOf("-") > -1) {
                    let zhi = value.split("-");
                    //选中数据
                    if (zhi[0] === alldata[i]["nickname"] && zhi[1] === alldata[i]["username"]) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                } else {
                    //根本没有选中的时候
                    // console.log("value,zhi%%",alldata[i]["nickname"],alldata[i]["nickname"].indexOf(value),alldata[i]["name"],alldata[i]["name"].indexOf(value))
                    if (alldata[i]["nickname"].indexOf(value) > -1 || alldata[i]["username"].indexOf(value) > -1) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }

                }

            }
            if (flag) {
                callback();
            } else {
                callback("权限中心账号不存在");
            }

        }

    }


    handleSubmit = (e) => {
         e.preventDefault();
        this.props.form.validateFields((err, values) => {
            //验证成功的数据
            if (!err) {
                let datavale = JSON.parse(window.sessionStorage.getItem("userData"))
                let jsonData = {
                    "operationgmid": datavale.gmid, 
                    data: ""
                }
                jsonData.data = this.constructionPostData(values)
                console.log("绑定提交的值", values)
                //let timesign = (new Date()).valueOf();
                Ajax('post','front/query','Binding',jsonData,this.ajaxsucees)

            }
        }, {
            force: true
        })

    }
    //构造提交给后台的数据
    constructionPostData=(data) => {
        let datass = this.state.constquanxiandata;
        let datas = this.state.dduserdata;
        console.log("三个值，输入，钉钉，权限",data,datass,datas)
        
        let postdataall = [];
        for (let key in data) {
            //操作key       
            if (key.indexOf("dd") > -1) {

                let spstr = key.split("");
                let id = spstr[spstr.length - 1];
                let obj = {
                    "id": id,
                    "userid": "",
                    "gmid": ""
                }
                let quanxzhi = "quanx" + id;
                let useridserachdata = data[key].split("-")
                let gmidserchadata = data[quanxzhi].split("-")
                let useridtepm = this.getuserid(useridserachdata)
                let gmidtepm = this.getgmid(gmidserchadata)
                obj.userid = useridtepm;
                obj.gmid = gmidtepm;
                postdataall.push(obj);
                console.log("obj", obj)
            } else {
                continue;
            }
        }
        // console.log("$$$$$$$$$$$$$$",postdataall)
        return postdataall;
    }
    //获取userid
    getuserid=(datatemp) => {
        let data = this.state.dduserdata;
        let id = ""
        for (let i = 0; i < data.length; i++) {
            if (datatemp[0] === data[i]["name"] && datatemp[1] === data[i]["mobile"]) {

                id = data[i]["userid"];
                break;
            }
        }
        return id;
    }
    //获取gmid
    getgmid=(datatemp) => {
        let data = this.state.constquanxiandata;
        let id = ""
        for (let i = 0; i < data.length; i++) {
            if (datatemp[0] === data[i]["nickname"] && datatemp[1] === data[i]["username"]) {

                id = data[i]["uid"];
                break;
            }
        }
        return id;
    }
    onValuesChange=(props, values) => {
        console.log("props, values", props, values)
    }

    //请求后台之后验证没有对应账号错误调用
    settishi=(tag, str) => {
        if (tag === "ddhas") {
            this.setState({
                ddhas: false
            }, () => {
                this.props.form.validateFields([str], {
                    force: true
                })
            });
        } else {
            this.setState({
                quanxhas: false
            }, () => {
                this.props.form.validateFields([str], {
                    force: true
                })
            });
        }

    }
    //验证钉钉和权限账号的对应关系
    VerifyCorrespondence=() => {
        //直接请求后台

    }
    //对应关系验证成功之后，就把

    //添加绑定宽
    addClick=() => {
        console.log("添加数据")
        let origlength = this.state.bandingdata.length;
        let orig = this.state.bandingdata;
        let newlen = origlength
        let quanxval = "quanx" + newlen;
        let ddval = "dd" + newlen;
        let obj = {
            "quanx": quanxval,
            "dd": ddval,
            "focus": false
        };
        orig.push(obj);
        this.setState({
            bandingdata: orig
        })

    }
    //取消绑定
    delClick=(index) => {
        let clickindex = index;
        let orig = this.state.bandingdata;
        let newdata = [];
        for (let i = 0; i < orig.length; i++) {
            if (i !== clickindex) {
                newdata.push(orig[i])
            }
        }
        console.log("shuju", newdata)
        this.setState({
            bandingdata: newdata
        })

        console.log(index)
    }
    onSelectDelqx=(index, values) => {
        console.log("选中的那个行", values, index)
        let frompropsname = "dd" + index;
        let obj = {};
        //钉钉对应的数据
        let name = values.split("-");
        let valuesshow = "";
        let dduserdatatemp = this.state.dduserdata;
        for (let i = 0; i < dduserdatatemp.length; i++) {
            if (dduserdatatemp[i]["name"] === name[0]) {
                valuesshow = dduserdatatemp[i]["name"] + "-" + dduserdatatemp[i]["mobile"]
            }
        }


        obj[frompropsname] = valuesshow
        //获取option选项值
        this.handleChange(name[0])
        //设置默认值
        this.props.form.setFieldsValue(obj)
        console.log("this.props.form", this.props.form, obj)
        //查看钉钉里面有没有这个人。

        this.setState({
            quanxiandata: [],
            optiondata: []
        })
    }
    onSelectDeldd=() => {
        this.setState({
            optiondata: []
        })
    }
    onFocus=(index) => {
        console.log("获取焦点的标识", index)
        let modifydata = this.state.bandingdata
        for (let i = 0; i < modifydata.length; i++) {
            if (index === i) {
                modifydata[i].focus = true;
            } else {
                modifydata[i].focus = false;
            }
        }

    }
    setModal1Visible=(modal1Visible) => {
        this.props.tabledata();

        this.setState({
            modal1Visible: false
        });
    }
    render() {
        const options = this.state.optiondata.map(d => <Option key={d.name + "-" + d.mobile} className={d.id}>{d.name + "-" + d.mobile}</Option>);
        const quanxoptions = this.state.quanxiandata.map(d => <Option key={d.nickname + "-" + d.username} className={d.uid}>{d.nickname + "-" + d.username}</Option>);

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {

            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 24
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
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <div className='conent'>
            <Form onSubmit={this.handleSubmit}>
               {this.state.bandingdata.map((function(item, index) {
                return (
                <Row key={index}>
                 <Col span={10}>
                    <FormItem
                    {...formItemLayout}
                    hasFeedback
                    >
                      {getFieldDecorator(item.quanx, {

                        rules: [{
                            required: true,
                            message: '权限中心账号不为空',
                        }, {
                            validator: this.quanxValidator
                        }, {
                            initialValue: this.state.value
                        }],
                    })(
                        <Select
                        mode="combobox"
                        id={index}
                        defaultActiveFirstOption={false}
                        style={{height:36}}
                        // showArrow={false}
                        filterOption={false}
                        onChange={this.handleChangequanx}
                        onFocus={this.onFocus.bind(this, index)}
                        placeholder="权限中心账号"
                        onSelect={this.onSelectDelqx.bind(this, index)}
                        >
                            {quanxoptions}
                            </Select>
                    )}
                    </FormItem>
                    </Col>
                     <Col span={10}>
                    <FormItem
                    {...formItemLayout}
                    hasFeedback

                    >
                      {getFieldDecorator(item.dd, {
                        rules: [{
                            required: true,
                            message: '钉钉账号不为空!'
                        }, {
                            validator: this.idValidator
                        }, {
                            initialValue: this.state.value
                        }],

                    })(
                        <Select
                        mode="combobox"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                         style={{height:36}}
                        onChange={this.handleChange}
                        placeholder="钉钉账号"
                        onSelect={this.onSelectDeldd}
                        >
                            {options}
                            </Select>
                    )}
                    </FormItem>
                    </Col>
                    <Col span={4}> 
                    <Button id={index} className="canceldel" icon="close" onClick={this.delClick.bind(this,index)}>取消 </Button></Col>
                </Row>
                );
            }.bind(this))
            )
            }
                <Row>
                    <Col span={20} className="plus">
                    <FormItem >
                    <Button  type="dashed" icon="plus" onClick={this.addClick.bind(this)}>添加</Button>
                     </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="sunbtn">
                    <FormItem
            {...tailFormItemLayout}
            >
                    <Button type="primary" htmlType="submit" >绑定</Button>
                     </FormItem>
                    </Col>
                </Row>
            </Form>
             <Modal
            title="错误绑定"
            className="reacodebing errmodelbangding"
            style={{
                top: 20
            }}
            visible={this.state.modal1Visible}
            onCancel={() => this.setModal1Visible(false)}
            footer={[
                <a className="active" onClick={this.setModal1Visible}>返回绑定界面</a>
            ]}
            >
      <div className="postfrommesaag">
      {this.state.errmsgbangding.map(function(item, index) {
                return (
           <div className="item" key={item.id}> 
            <div className="wrapperpostfrommesaag">
            <div className="data">
            <p className="dingdingname">{item.ddingname}</p>
             <p className="quanxname">{item.quanxname}</p>
            </div>
            <div className="icon">
            <Icon type="close-circle" />
            <p>绑定错误</p>
            </div>
            </div>
            <p className="tishixiaox">{item.messsage}</p>
        </div>
                );
            }.bind(this))
            }
      </div>
        </Modal>
            </div>
        )

    }
}
const Addbing = Form.create()(Addbings);
export default Addbing;