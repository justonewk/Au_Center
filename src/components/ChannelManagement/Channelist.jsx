/* eslint-disable no-sparse-arrays */
/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from "react";
import { Progress, Table, Input, Popconfirm, Icon, Button, Select, message, Modal, Upload, notification } from "antd";
import EditableCell from "./EditableCell";
import EditableCellSite from "./EditableCellSite";
import EditableCellSelect from "./EditableCellSelect"
import EditableCellTime from "./EditableCellTime"
import CopyAndAdd from "./CopyAndAdd"
import EditableCellSelectPerson from "./EditableCellSelectPerson"
import EditableCellServerSelect from "./EditableCellServerSelect"
import EditableCellPlatformSelect from "./EditableCellPlatformSelect"
import EditableCellRemark from "./EditableCellRemark"
import AddModel from "./AddModel";
import DeatailModel from "./DeatailModel";
import { ajaxcallback } from '../../public/ajaxcallback';
import { progresscallBack } from '../../public/progresscallBack';
import { getajax } from '../../public/ajax';
import { getipconfig } from '../../getipconfig';
import usertemp from '../../style/imgs/addtemp.png';
import webtemp from '../../style/imgs/webtemp.png';
const Ajax = getajax.ajaxFun;
//import { getmd5 } from '../../axios/getmd5';
//import $ from 'jquery';
//import {getajax} from '../../public/ajax';
//const Ajax=getajax.ajaxFun;

const getip = getipconfig();
const fwposturl = getip.serverip;

const Option = Select.Option;

function callbackExcel(argument) {
    console.log("ddd")
}

const constdataSource = [];
class Channelist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: '1',
            dataSource: [],
            allDataSource: [],
            count: 3,
            postDatatag: 0,
            hasmodify: false,
            selectGame: "兵器少女",
            selectGameList: ["兵器少女", "尘缘"],
            visible: false,
            title: "",
            disable: false,
            postDefultname: "", //默认游戏,
            copytag: false, //复用可以编辑的标识
            addtag: false, //新增可以编辑的标识
            Optiondata: [], //原始的名字
            originalserver: [], //原始的大区
            statusdata: [{
                "id": 0,
                "status": "正常"
            }, {
                "id": 1,
                "status": "中止"
            }],
            platformdata: [{
                "id": 0,
                "status": "安卓"
            }, {
                "id": 1,
                "status": "ios"
            }, {
                "id": -1,
                "status": "未知"
            }],
            edittage: false, //默认编辑状态为编辑
            addnow: false, //新增的状态
            modifynow: false,
            copynow: false,
            addaagentdata: [], //新增提交的数据
            errormasegedata: [],
            errormasege: false,
            errorkey: [],
            errordetailkey: ["name", "id"],
            modifypostdata: [], //修改提交的数据
            copypostdata: [], //复用提交的数据
            allgamearea: [],
            fileList: [],
            uploading: false,
            expandedRowKeys: [],
            constdataSource:[],
            percent: 0,
            setIntervalTime: 1000,
            proActive: '',
            progressshow: 'none',
            proStaus: '',
            gamecout: 0,
            hasmofiyid: false,
        };
        this.columns = [{
            title: "名字",
            dataIndex: "name",
            key: "name",
            render: (text, record, index) => (
                <EditableCell
                    onDoubleClick={this.ondblclick}
                    value={text}
                    tagid="name"
                    copytag={record.alledit ? record.alledit : (record.copytage ? record.copytage : false)}
                    alledit={record.alledit ? record.alledit : false}
                    postDatatag={this.state.postDatatag}
                    addnow={this.state.addnow}
                    onChangeeidt={this.onChangeeidt}

                    onChangpost={this.onChangpost}
                    vaildator='Must'
                    onChange={this.onCellChange(record.key, "name", text)}
                />
            ),
        }, {
            title: "ID",
            dataIndex: "id",
            key: "id",

            render: (text, record) => (
                <div>
                    {record.id.indexOf("-") > -1 ?
                        <EditableCellSite
                            hasmofiyid={this.state.hasmofiyid}
                            value={text.split("-")[0]}
                            site={text.split("-")[1]}
                            postDatatag={this.state.postDatatag}
                            copytag={record.alledit ? record.alledit : false}//新增站点
                            fuyongtag={record.copytage ? record.copytage : false}//复用站点
                            onChangpost={this.onChangpost}
                            onChangeeidt={this.onChangeeidt}
                            addnow={this.state.addnow}
                            onChange={this.onCellChange(record.key, "id", text)}
                        />
                        :
                        <EditableCell
                            value={text}
                            tagid="id"
                            hasmofiyid={this.state.hasmofiyid}
                            onDoubleClick={this.ondblclick}
                            postDatatag={this.state.postDatatag}
                            copytag={record.agentedit ? record.agentedit : false}
                            onChangpost={this.onChangpost}
                            onChangeeidt={this.onChangeeidt}
                            addnow={this.state.addnow}
                            vaildator='MustID'
                            onChange={this.onCellChange(record.key, "id", text)}
                        /* idVisible={this.idVisible()}*/
                        />
                    }
                </div>
            ),
        }, {
            title: "负责人",
            dataIndex: "manager",
            key: "manager",

            render: (text, record) => (
                <EditableCellSelectPerson
                    value={text}
                    waibu={false}
                    onDoubleClick={this.ondblclick}
                    postDatatag={this.state.postDatatag}
                    Optiondata={this.state.Optiondata}
                    addnow={this.state.addnow}
                    copytag={record.alledit ? record.alledit : false}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "manager", text)}
                />
            ),
        }, {
            title: "联系人",
            dataIndex: "contact",
            key: "contact",

            render: (text, record) => (
                <EditableCellSelectPerson
                    value={text}
                    onDoubleClick={this.ondblclick}
                    addnow={this.state.addnow}
                    waibu={true}
                    Optiondata={this.state.Optiondata}
                    postDatatag={this.state.postDatatag}
                    copytag={record.alledit ? record.alledit : false}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "contact", text)}
                />
            ),
        }, {
            title: "创建时间",
            dataIndex: "time",
            key: "time",

            render: (text, record) => (
                <EditableCellTime
                    value={text}
                    onDoubleClick={this.ondblclick}
                    addnow={this.state.addnow}
                    copytag={record.alledit ? record.alledit : false}
                    postDatatag={this.state.postDatatag}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "time", text)}
                />
            ),
        }, {
            title: "状态",
            dataIndex: "status",
            key: "status",

            render: (text, record) => (

                <EditableCellSelect
                    onDoubleClick={this.ondblclick}
                    value={text}
                    addnow={this.state.addnow}
                    Optiondata={this.state.statusdata}
                    postDatatag={this.state.postDatatag}
                    copytag={record.alledit ? record.alledit : false}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "status", text)}
                />
            ),
        }, {
            // title: "备注",
            // dataIndex: "remark",
            // key: "remark",
            // render: (text, record) => (
            //     <EditableCellRemark
            //     onDoubleClick={this.ondblclick}
            //     value={text}
            //     copytag={record.alledit ? record.alledit : (record.copytag ? record.copytag : false)}
            //     alledit={record.alledit ? record.alledit : false}
            //     postDatatag={this.state.postDatatag}
            //     onChangpost={this.onChangpost}
            //     onChangeeidt={this.onChangeeidt}
            //     addnow={this.state.addnow}
            //     onChange={this.onCellChange(record.key, "remark", text)}
            //     vaildator='NotMust'
            //     />
            // ),

        }, {
            title: "大区",
            dataIndex: "serverId",
            key: "serverId",
            width: 200,
            render: (text, record) => (
                <EditableCellServerSelect
                    value={text}
                    addnow={this.state.addnow}
                    copytag={record.alledit ? record.alledit : (record.copytag ? record.copytag : false)}
                    alledit={record.alledit ? record.alledit : false}
                    notshow={this.state.originalserver.length == 0 || this.state.originalserver == null ? false : true}
                    Optiondata={this.state.originalserver}
                    postDatatag={this.state.postDatatag}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "serverId", text)}
                />
            ),
        }, , {
            title: "平台",
            dataIndex: "platform",
            key: "platform",

            render: (text, record) => (
                <EditableCellPlatformSelect
                    onDoubleClick={this.ondblclick}
                    value={text}
                    addnow={this.state.addnow}
                    Optiondata={this.state.platformdata}
                    postDatatag={this.state.postDatatag}
                    copytag={record.alledit ? record.alledit : false}
                    onChangpost={this.onChangpost}
                    onChangeeidt={this.onChangeeidt}
                    onChange={this.onCellChange(record.key, "platform", text)}
                />
            ),
        }, {
            title: "操作",
            dataIndex: "opp",
            key: "opp",

            render: (text, record) => (
                <CopyAndAdd
                    states={record.status}
                    value={JSON.stringify(record)}
                    handleAdd={this.handleAdd}
                    copyAgent={this.copyAgent}
                    copyChange={this.copyChange}
                    Lookhistory={this.Lookhistory}
                />
            ),
        }
        ];

    }
    //查看操作历史记录
    Lookhistory = (e) => {
        this.setState({
            /*visibledeatial:true,*/
        })
    }
    /* 数据查询*/
    searchTableFunc = (data, platform) => {
        const { dataSource, allDataSource } = this.state;
        console.log("搜索的值是什么======1",data, )
        console.log("搜索的值是什么======2",platform,)
        console.log("搜索的值是什么======3",allDataSource)
        let temp = [];
        for (var i = 0, len = allDataSource.length; i < len; i++) {
            let searchdata = allDataSource[i].id + "" + allDataSource[i].name + "";
            if (platform == -1) {
                if (searchdata.indexOf(data) > -1) {
                    temp.push(allDataSource[i])
                }
            }else {
                console.log("平台allDataSource[i].platform",allDataSource[i].platform)
                console.log("平台platform",platform)
                console.log("平台条件是否相等",allDataSource[i].platform == platform)
                console.log("平台searchdata",searchdata,data)
                console.log("平台searchdata.indexOf(data)",searchdata.indexOf(data))
                //表示渠道的平台和搜索的平台相同,searchdata只能是搜索渠道,不包括站点
                if (searchdata.indexOf(data) > -1 && allDataSource[i].platform == platform) {
                    console.log("添加的值是",allDataSource[i])
                    temp.push(allDataSource[i])
                }else{
                    // 表示有站点,找到站点在这个平台下,渠道不在?
                   if(allDataSource[i].children.length>0) {
                       let serchChildren=[];
                    //    找到渠道不在平台下,但站点在查询平台下的渠道
                        for(let j=0;j<allDataSource[i].children.length;j++){
                            if(allDataSource[i].children[j].platform==platform){
                                serchChildren.push(allDataSource[i].children[j])
                            }
                        }
                        if(serchChildren.length>0){
                            allDataSource[i].children=serchChildren;
                            temp.push(allDataSource[i])
                        }
                   }
                }
            }
        }
        this.setState({
            dataSource: temp,
        })
    }
    //改变输入框
    onCellChange = (key, dataIndex, value) => {
        return (value) => {
            let fenggekey = key.toString().indexOf("-") > -1 ? key.split("-") : "";
            const dataSource = [...this.state.dataSource];
            console.log(fenggekey[0])
            //const target =fenggekey.length>0?findchlide(dataSource,fenggekey):dataSource.find(item => item.key === key)
            const target = dataSource.find(item => item.key == key) //只能找到父元素
            const target2 = dataSource.find(item => item.key == fenggekey[0]) //找子元素下面的父元素
            console.log(target2, target)
            // let hasmodify="";
            if (target) {
                //修改渠道let
                console.log("渠道修改")
                target[dataIndex] = value;
                target["modifytage"] = true;
                let hasmodify = dataIndex + "color";
                target[hasmodify] = true;
                this.setState({
                    dataSource
                });
            } else if (target2) {
                //修改站点
                target2["modifytage"] = target2["modifytage"] ? true : false;
                let indexid = "";
                console.log("target2", target2)
                for (let j = 0; j < target2.children.length; j++) {
                    console.log("target2.children[j].key==key", target2.children[j].key == key, target2.children[j].key, key)
                    if (target2.children[j].key == key) {
                        indexid = j
                    }
                }
                console.log("target2.children[fenggekey[1] - 1][dataIndex]", target2, fenggekey, "dataIndex=", dataIndex, indexid, target2.children[indexid])

                target2.children[indexid][dataIndex] = value;
                target2.children[indexid]["modifytage"] = true;
                let hasmodify = dataIndex + "color";
                target2[hasmodify] = target2[hasmodify] ? true : false;
                target2.children[indexid][hasmodify] = true,
                    this.setState({
                        dataSource
                    });
            }
        };

    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        });
    }
    //新增站点
    handleAdd = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            modifynow: false,
            addnow: true,
            copynow: false,
        })
        console.log("this.state.copynow||this.state.modifynow", this.state.copynow, this.state.modifynow)
        if (this.state.copynow || this.state.modifynow) {
            if (this.state.copynow) {
                message.warning("必须复用完成才能新增")
                this.setState({
                    modifynow: false,
                    addnow: false,
                    copynow: true,
                })
            } else {
                message.warning("必须修改完成才能新增")
                this.setState({
                    modifynow: true,
                    addnow: false,
                    copynow: false,
                })
            }
            return false;
        }
        const { count, dataSource } = this.state;
        let adddataweizhi = JSON.parse(e.target.id);
        console.log("adddataweizhi", adddataweizhi)
        let countChange = "";
        //if(!this.state.hasmodify){//当不为修改的时候，才可以新增
        let time = this.timechangge();
        let expandedRowKeysnow = this.state.expandedRowKeys;
        expandedRowKeysnow.push(adddataweizhi.key)
        console.log("新增自动打开的key", expandedRowKeysnow)
        this.setState({
            expandedRowKeys: expandedRowKeysnow
        })


        for (let j = 0; j < dataSource.length; j++) {
            if (dataSource[j].key == adddataweizhi.key) {
                adddataweizhi.key.toString();
                let zhi = parseInt(dataSource[j].children.length) + 1
                let objtemp = {};
                for (let key in adddataweizhi) {
                    if (key != "remove" && key != "remove") {

                        switch (key) {
                            case "key":
                                objtemp.key = adddataweizhi.key + "-" + zhi;
                                break;
                            case "time":
                                objtemp.time = time;
                                break;
                            case "id":
                                objtemp.id = dataSource[j].id + "-" + ""
                                break;
                            case "remark":
                                objtemp.remark = "---"
                                break;
                            case "children":
                                continue;
                                break;
                            case "serverId":
                                objtemp.serverId = ""
                                break;
                            default:
                                objtemp[key] = adddataweizhi[key];
                        }
                    }
                }
                objtemp["alledit"] = true;
                dataSource[j].children.push(objtemp);
                dataSource[j]["agentedit"] = true //表示有新增站点
            } else {

                dataSource[j]["addnow"] = true; //用于不显示编辑样式
                for (let k = 0; k < dataSource[j].children.length; k++) {
                    dataSource[j].children[k]["addnow"] = true;
                }
            }

        }


        let postDatatagnow = this.state.postDatatag + 2;


        console.log("所有的数据和所有的check个数dataSource,allchek,present", dataSource, postDatatagnow)
        this.setState({
            dataSource: [...dataSource],
            postDatatag: postDatatagnow,
            hasmofiyid: true,
        });

    }
    //获取当前的时间
    timechangge = () => {
        let myDate = new Date();
        this.year = myDate.getFullYear();
        this.month = myDate.getMonth() + 1 < 9 ? "0" + myDate.getMonth() + 1 : myDate.getMonth() + 1;
        this.date = myDate.getDate() < 9 ? "0" + myDate.getDate() : myDate.getDate();
        let showzhi = this.year + "-" + this.month + "-" + this.date;
        return showzhi;
    }
    //新增渠道
    addChanel = (e) => {
        this.setState({
            visible: true,
            title: "新增",
            disable: false,

        })
    }
    //复用渠道(新增一个相同的数据，只是有些状态为修改状态)
    copyAgent = (e) => {

        const { count, dataSource } = this.state;
        let copydata = JSON.parse(e.target.id);
        let allcount = dataSource.length + 1

        for (let j = 0; j < copydata.children.length; j++) {
            let zhi = parseInt(j) + 1;
            copydata.children[j].key = allcount + "-" + zhi;
        }
        copydata.key = "" + allcount + "";
        this.setState({
            dataSource: [...dataSource, copydata],
            count: count + 1,
        });
    }
    //复用站点
    copyChange = (e) => {
        let copydata = JSON.parse(e.target.id);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        console.log("复用站点", copydata, copydata["status"])
        if (copydata["status"] == 0) {
            message.warning(`${copydata["name"]}站点状态正常，不可复用`)
            console.log("到了这里")
            return false;
        }
        if (this.state.addnow || this.state.modifynow) {
            if (this.state.addnow) {
                message.warning("必须新增完成才能复用")

            } else {
                message.warning("必须修改完成才能复用")
            }
            return false;
        }
        this.setState({
            modifynow: false,
            addnow: false,
            copynow: true,

        })
        const { count, dataSource } = this.state;

        let postDatatag = this.state.postDatatag;
        let parentkey = copydata.key.split("-")[0];
        let countChange = "";
        let time = this.timechangge();

        for (let j = 0; j < dataSource.length; j++) {
            console.log(dataSource[j].key, parentkey, copydata.key)
            if (dataSource[j].key == parentkey) {
                let zhi = parseInt(dataSource[j].children.length) + 1
                copydata.key = parentkey + "-" + zhi;
                copydata.time = time;
                copydata.status = 0; //状态为正常
                copydata["copytage"] = true;
                dataSource[j].children.push(copydata);
                dataSource[j]["copytage"] = true;
                break;
            }
        }
        this.setState({
            dataSource: [...dataSource],
            postDatatag: postDatatag + 1,
            hasmofiyid: true,
        });
    }
    //编辑框打开或关闭时候调用
    onChangpost = (postDatatag) => {
        console.log("到这里来了没有呢？编辑框个数查看", postDatatag)
        let hasmodify = this.state.postDatatag == 0 ? true : false //表示是否为编辑的状态
        this.setState({
            postDatatag,
            edittage: true,
            hasmodify: hasmodify,
        })
        setTimeout(() => {
            this.modifydata()
        }, 1);
    }
    onChangeeidt = (postDatatag, modifynow) => {
        if (this.state.copynow) {
            this.setState({
                postDatatag,
                modifynow: !modifynow,
                addnow: !modifynow,
                copynow: modifynow,
            })
        } else {
            this.setState({
                postDatatag,
                modifynow: modifynow,
                addnow: !modifynow,
                copynow: !modifynow,
            })
        }

    }
    //渠道添加成功
    ajaxSucessChannelAdd = (data) => {
        console.log("新增成功")
        let datas = JSON.parse(data);
        this.hideModal();
        if (datas.ret == 1) {
            //关闭模态框重新请求
            // this.addsucces();
            this.setState({
                dataSource: [],
                count: 0,
                addnow: false,
                errormasegedata: [],
                hasmofiyid: false,
            })
            message.success("新增成功")
        } else {
            let data = JSON.parse(datas.data)
            console.log("错误信息出来了没有", data)
            let errorkey = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].children.length; j++)
                // if (record.key==data[i].children[j].key) {
                {
                    errorkey.push(data[i].children[j].key)
                }
                // }
            }
            console.log("errorkey", errorkey)
            this.setState({
                errormasegedata: data,
                errormasege: true,
                errorkey: errorkey,
                hasmofiyid: false,
            })
            notification.error({
                message: '新增数据错误数据',
                description: datas.errmsg,
                style: {
                    width: 600,
                    marginLeft: 335 - 600,
                },
                duration: 0,
            });
        }
    }
    ajaxSucessmodify = (data) => {
        console.log("修改成功，请求2")
        let datas = JSON.parse(data);
        this.hideModal();
        if (datas.ret == 1) {
            //关闭模态框重新请求
            // this.addsucces();
            this.setState({
                dataSource: [],
                count: 0,
                modifynow: false,
                errormasegedata: [],
                errorkey: [],
            })
            message.success("修改成功")
        } else {
            console.log("错误信息出来了没有c-1", datas)
            console.log("errorkey", datas.errmsg)
            this.setState({
                // errormasegedata: datas,
                errormasege: true,
                errorkey: datas.errmsg
            })
            notification.error({
                message: '修改数据错误数据',
                description: datas.errmsg,
                style: {
                    width: 600,
                    marginLeft: 335 - 600,
                },
                duration: 0,
            });
        }
    }
    ajaxSucesscopy = (data) => {
        console.log("复用成功")
        let datas = JSON.parse(data);
        this.hideModal();
        if (datas.ret == 1) {
            //关闭模态框重新请求
            // this.addsucces();
            this.setState({
                dataSource: [],
                count: 0,
                copynow: false,
                hasmofiyid: false,
            })

            message.success("复用成功")
        } else {
            let data = JSON.parse(datas.data)
            console.log("错误信息出来了没有")
            console.log("错误信息出来了没有", data)
            let errorkey = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].children.length; j++)
                    // if (record.key==data[i].children[j].key) {
                    errorkey.push(data[i].children[j].key)
                // }
            }
            console.log("errorkey", errorkey)
            this.setState({
                errormasegedata: data,
                errormasege: true,
                errorkey: errorkey,
                hasmofiyid: false,
            })
            // message.error(datas.errmsg)
            notification.error({
                message: '复用数据错误数据',
                description: datas.errmsg,
                style: {
                    width: 600,
                    marginLeft: 335 - 600,
                },
                duration: 0,
            });
        }
    }
    //新增错误信息的提示



    //新增
    confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            content: '是否确认新增',
            okText: '确认',
            cancelText: '取消',
            onOk: this.addagentok,
            onCancel: this.hideModal,
        });
    }
    //修改
    confirmmodify = () => {
        Modal.confirm({
            title: 'Confirm',
            content: '是否确认修改',
            okText: '确认',
            cancelText: '取消',
            onOk: this.modifytok,
            onCancel: this.hideModal,
        });
    }
    //复用
    confirmcopy = () => {
        Modal.confirm({
            title: 'Confirm',
            content: '是否确认复用',
            okText: '确认',
            cancelText: '取消',
            onOk: this.copyok,
            onCancel: this.hideModal,
        });
    }
    hideModal = () => {
        this.addsucces();
        this.setState({
            visible: false,
            addnow: false,
            copynow: false,
            modifynow: false,
            hasmofiyid: false,
        });

    }
    //发生点击并且修改完成，就提交后台
    modifydata = () => {
        console.log("提交没有呢？", this.state.edittage, this.state.postDatatag)
        if (this.state.addnow) {
            //新增站点
            this.addnewagent();
        } else if (this.state.modifynow) {
            //修改渠道，站点
            this.modifyagent();
        } else if (this.state.copynow) {
            //复用站点
            this.copyagent();
        }



    }
    //新增站点函数
    addnewagent = () => {
        if (this.state.edittage && this.state.postDatatag === 0) {
            this.confirm();
            let postdata = {
                "gameId": parseInt(this.state.gameId),
                data: []
            }
            const dataSource = [...this.state.dataSource];
            const constdataSource=[...this.state.constdataSource]

            let alldata = [];
            console.log("dataSource333:", this.state.dataSource, this.state.constdataSource)
            if (dataSource.length == constdataSource.length) {
                for (let i = 0; i < dataSource.length; i++) {
                    alldata.push(dataSource[i])
                }
            } else {
                for (let i = 0; i < constdataSource.length; i++) {
                    alldata.push(constdataSource[i])
                }
            }



            if (!this.state.hasmodify) { //新增数据
                let newdata = []; //提交的数据
                console.log("所有的值是空吗?",alldata);
                for (let j = 0; j < alldata.length; j++) {
                    let obj = {
                        "children": []
                    };
                    if (alldata[j]["agentedit"]) {
                        for (let key in alldata[j]) {
                            if (key != "children") {
                                obj[key] = alldata[j][key]
                            }
                        }
                        for (let m = 0; m < alldata[j]["children"].length; m++) {
                            if (alldata[j]["children"][m]["alledit"]) {
                                obj.children.push(alldata[j]["children"][m])
                            }
                        }
                    }
                    newdata.push(obj)
                }
                let qukongdata = [];
                for (let key = 0; key < newdata.length; key++) {
                    if (newdata[key].children.length != 0) {
                        qukongdata.push(newdata[key]);
                    }
                }
                console.log("最后提交的数据", qukongdata)
                this.setState({
                    addaagentdata: qukongdata,
                })
            }




        }
    }
    //修改渠道和站点
    modifyagent = () => {

        let alldata = [];
        console.log("修改模态框显示没有", this.state.edittage, this.state.postDatatag)
        if (this.state.edittage && this.state.postDatatag === 0) {
            this.confirmmodify();
            const dataSource = [...this.state.dataSource]
            for (let i = 0; i < dataSource.length; i++) {
                if (dataSource[i].hasOwnProperty("modifytage")) {
                    let flag = false;
                    let newdata = {
                        "children": []
                    };

                    for (let key in dataSource[i]) {
                        newdata[key] = dataSource[i][key]
                        if (key == "children") {
                            newdata[key] = [];
                        }
                    }
                    for (let j = 0; j < dataSource[i].children.length; j++) {
                        if (dataSource[i].children[j].hasOwnProperty("modifytage")) {

                            newdata["children"].push(dataSource[i].children[j]);

                        }
                    }

                    alldata.push(newdata)
                }


            }
            console.log("alldata", alldata)
            // postdata.data=alldata;
            console.log("提交的数据修改的数据", alldata['key']);

            this.setState({
                modifypostdata: alldata,
            })
        }
    }
    //复用数据
    copyagent = () => {

        let alldata = [];
        if (this.state.edittage && this.state.postDatatag === 0) {
            this.confirmcopy();
            const dataSource = [...this.state.dataSource]
            for (let i = 0; i < dataSource.length; i++) {
                if (dataSource[i].hasOwnProperty("copytage")) {
                    let flag = false;
                    let newdata = {
                        "children": []
                    };

                    for (let key in dataSource[i]) {
                        newdata[key] = dataSource[i][key]
                        if (key == "children") {
                            newdata[key] = [];
                        }
                    }
                    for (let j = 0; j < dataSource[i].children.length; j++) {
                        if (dataSource[i].children[j].hasOwnProperty("copytage")) {

                            newdata["children"].push(dataSource[i].children[j])
                        }
                    }

                    alldata.push(newdata)
                }


            }
            console.log("alldata", alldata)
            // postdata.data=alldata;
            console.log("提交的数据fuyong的数据", alldata);

            this.setState({
                copypostdata: alldata,
            })
        }
    }
    addagentok = () => {
        console.log("新增数据", this.state.addaagentdata)
        this.ajaxpostdata(this.state.addaagentdata, "channel_add", this.ajaxSucessChannelAdd)
    }
    modifytok = () => {
        this.ajaxpostdata(this.state.modifypostdata, "agentorchannel_edit", this.ajaxSucessmodify)
    }

    copyok = () => {
        this.ajaxpostdata(this.state.copypostdata, "channel_add", this.ajaxSucesscopy)
    }
    ajaxpostdata = (datates, cmd, callback) => {
        let datas = {
            "gameId": parseInt(this.state.gameId),
            "data": datates,
        }
        let timesign = (new Date()).valueOf();

        console.log(typeof parseInt(this.state.gameId))
        ajaxcallback(fwposturl + '/front/query', timesign.toString(), datas, cmd, callback);
    }

    callbackParent = (e) => {
        this.setState({
            visible: false,
            title: "",
            disable: true,
        })
    }
    callbackParentDeail = (e) => {
        this.setState({
            visibledeatial: false,

        })
    }
    allgame = (data, id) => {
        console.log("服务器的数据", data, id)
        if (!data) {
            message.error("大区服务器请求不正确")

        }
        let obj = {
            "id": -1,
            name: "全部"
        }
        let serversdata = [];
        if (data.ret == 1) {
            let datas = data.data;
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].gameid == id) {


                    for (let j = 0; j < datas[i].data.length; j++) {
                        serversdata.push(datas[i].data[j])
                        // console.log("datas[i].data1", datas[i].data)
                    }
                    serversdata.push(obj);

                }

            }


            // for(let j=0;j<serversdata.length;j++){
            //     if (serversdata[j].id==-1) {}
            // }
            // if($.inArray(obj,serversdata)>-1){
            //     this.setState({
            //     originalserver: serversdata,
            // }) 
            // }else{
            // serversdata.push(obj);
            // console.log("fwq渲染的数据", serversdata)
            this.setState({
                originalserver: serversdata,
            })
            // }
        }
    }
    //请求大区
    componentDidMount() {

    }
    componentWillMount() {
        let gamedata = JSON.parse(window.sessionStorage.getItem("gameList"));
        console.log("游戏列表", gamedata)
        let postDefultid = gamedata[0].gid;
        let postDefultname = gamedata[0].name
        //获取所有的用户
        let user_list = JSON.parse(window.sessionStorage.getItem("userList"));
        let Optiondata = [];
        // for (let i = 0; i < user_list.length; i++) {
        //     console.log(user_list[i])
        //     for (let j = 0; j < user_list[i]["members"].length; j++) {
        //         Optiondata.push(user_list[i]["members"][j])
        //     }
        // }
        let htData = {
            "cmd": "game_area",
        }
        let allgamearea = [];
        Ajax('post', 'front/query', 'game_area', htData, (e) => {
            if (e.ret == 1) {
                // window.sessionStorage.setItem("gameArea",e);
                window.sessionStorage.setItem("game_area", JSON.stringify(e))
                allgamearea = e;
                this.addsucces();
                console.log("请求1")
                this.allgame(e, postDefultid);
                this.setState({
                    allgamearea: e,
                })


            }
            else {
                message.error(e.errmsg)
            }
        }
        )

        this.setState({
            selectGameList: gamedata,
            postDefultname: postDefultname,
            Optiondata: user_list,
            gameId: postDefultid,
            selectGame: postDefultname,
        })

        // this.ajaxgameArea(postDefultid);


    }

    handleChange = (value) => {
        console.log('aaaa', value, this.props.radioCheck)
        this.state.selectGameList.map((item, index) => {
            if (value == item.gid) {
                this.setState({
                    selectGame: item.name,
                    gameId: value,
                    postDatatag: 0,
                })
            }
        })
        setTimeout(() => {
            this.addsucces();
        }, 1);
        this.allgame(this.state.allgamearea, value)
    }
    setdatakey = (data) => {
        //只写了两节结构的key
        let newdata = data;
        // for (let i = 0; i < newdata.length; i++) {
        //     newdata[i]["key"] = newdata[i]["ID"].toString();
        //     if (newdata[i].children) {
        //         for (let j = 0; j < newdata[i].children.length; j++) {
        //             let laxt = j + 1
        //             newdata[i].children[j]["key"] =  newdata[i]["ID"].toString()+"-"+newdata[i].children[j]["ID"].toString()+"-"+laxt ;
        //         }
        //     }
        // }
        for (let i = 0; i < newdata.length; i++) {
            newdata[i]["key"] = i.toString();
            if (newdata[i].children) {
                for (let j = 0; j < newdata[i].children.length; j++) {
                    let laxt = j + 1
                    newdata[i].children[j]["key"] = i.toString() + "-" + laxt.toString();
                }
            }
        }
        console.log("newdata44444", newdata)
        return newdata
    }
    ajaxSucessChannellist = (data) => {
        this.props.loadingReturn(false)
        // console.log("请求的渠道数据是否成功", data)
        let channelList = JSON.parse(data)
        this.setState({
            dataSource: [],
            allDataSource: [],
        })

        if (channelList.ret == 1) {
            //console.log("有中止的数据",channelList.data )
            if (channelList.data == 0) return false
            let haskeydata = this.setdatakey(channelList.data) //拼接数据的key
            // console.log("最后渲染的数据haskeydata", haskeydata)
            // const dataSource = haskeydata
            let count = this.state.gamecout
            count = count - 1


            this.setState({
                dataSource: haskeydata,
                allDataSource: haskeydata,
                constdataSource: haskeydata,
                count: channelList.data.length,
                gamecout: count,
            })

        }
    }
    //请求渠道
    addsucces = () => {
        this.props.loadingReturn(true)
        let count = this.state.gamecout;
        count = count + 1;
        let timesign = (new Date()).valueOf();
        this.setState({
            addnow: false,
            modifynow: false,
            copynow: false,
            dataSource: [],
            present: 0,
            postDatatag: 0,
            gamecout: count,
        })
        let data = {
            "gameId": parseInt(this.state.gameId),
            "frontParameter": {
                count: count,
            },
            //"idorname":this.props.ChannelName,
            "idorname": '',
            //"platform":parseInt(this.props.type),
            "platform": -1,
        }
        console.log(this.state.present, "present")
        ajaxcallback(fwposturl + '/front/query', timesign.toString(), data, "channel_list", this.ajaxSucessChannellist);
    }


    /* doubleClick=(e) => {
            
     }*/
    //双击
    ondblclick = (text, record, index) => {
        console.log("双击", text, record, index)
        this.setState({
            visibledeatial: true,
        })
    }
    ajaxSucessConfSystems = (data) => {

    }
    postdatago = (data) => {
        let timesign = (new Date()).valueOf();
        ajaxcallback(fwposturl + '/front/query', timesign.toString(), "", "conf_systems", this.ajaxSucessConfSystems);
    }
    //标红
    rowClassName = (record, index) => {
        /*console.log("每次渲染都来了", record, index)*/
        let data = this.state.errormasegedata.length != 0 ? this.state.errormasegedata : []
        let dataerrokey = this.state.errorkey
        // console.log(data,data)
        if (this.state.addnow) {
            if (this.state.errormasege) {
                console.log("有错误吗", record, index)
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].children.length; j++)
                        if (record.key == data[i].children[j].key) {
                            return "haserror"
                        }
                }

            } else {

            }
        } else {
            if (this.state.errorkey.indexOf(',') > -1) {
                let remp = this.state.errorkey.split(',')
                //console.log("修改错误提示:",this.state.errorkey)
                for (let i = 0; i < remp.length - 1; i++) {
                    /* console.log("但是", remp);*/
                    if (record.key == remp[i]) {
                        /*console.log("this for you", remp[i])*/
                        return "haserror"
                    }
                }
            }

        }

    }

    onExpand = (expanded, record) => {

        if (expanded) {
            let expandedRowKeys = this.state.expandedRowKeys;
            expandedRowKeys.push(record.key)

            if (record.children.length == 0) {
                message.warning("没有站点")
            } else {
                this.setState({
                    expandedRowKeys: expandedRowKeys
                })
            }
        } else {
            let expandedRowKeys = this.state.expandedRowKeys;
            for (let j in expandedRowKeys) {
                if (expandedRowKeys[j] == record.key) {
                    expandedRowKeys.splice(j, 1)
                }
            }
            this.setState({
                expandedRowKeys: expandedRowKeys
            })
        }

    }
    //模板下载
    docmentdown = () => {
        let timesign = (new Date()).valueOf();
        let postdata = {
            "tag": "agent"
        }
        ajaxcallback(fwposturl + '/front/query', timesign.toString(), postdata, "download_templatefile", this.ajaxSucessdocmentdown);

    }
    ajaxSucessdocmentdown = (datas) => {
        //下载返回的数据
        let data = JSON.parse(datas)
        if (data.ret == 1) {
            window.location.href = fwposturl + data.path
        }
        console.log(fwposturl + data.path)

    }
    render() {
        const { dataSource, allDataSource } = this.state;
        const columns = this.columns;
        console.log("this.props================：", this.props)

        return (
            <div className="rignt_content rignt_content_Channelist" >
                <div className="Channelist-wraper">
                    {allDataSource.length == 0 ?
                        <img src={usertemp} className="tempimg" /> :
                        <div>{dataSource == 0 ?
                            <img src={webtemp} className="tempimg" /> :
                            <Table dataSource={dataSource}
                                columns={columns}
                                expandedRowKeys={this.state.expandedRowKeys}
                                rowClassName={this.rowClassName}
                                onExpand={this.onExpand}
                            />
                        }
                        </div>
                    }


                </div>
                <DeatailModel
                    addsuccus={this.addsucces}
                    visible={this.state.visibledeatial} title={this.state.title}
                    people={this.state.Optiondata}
                    callbackParentDeail={this.callbackParentDeail} server={this.state.originalserver} selectGame={this.state.gameId} />

                <AddModel
                    gameToname={this.props.gameToname}
                    addsuccus={this.addsucces}
                    visible={this.state.visible} title={this.state.title}
                    people={this.state.Optiondata}
                    callbackParent={this.callbackParent}
                    server={this.state.originalserver} selectGame={this.state.gameId} />
            </div>
        );
    }
}

export default Channelist;