import React from 'react';
import { Row, Col,  Select, Modal, Table,message } from 'antd';
import { Link} from 'react-router';
import FrontSeek from '../PublicComponent/FrontSeek';
import Addbing from './Addbing';
import BindingRecodeContent from './BindingRecodeContent'
import {getajax} from '../../public/ajax';
import { root } from '../../root';
import { Record } from 'immutable';

const Ajax=getajax.ajaxFun;
const {Option,} = Select;
const rootapp = root();

class UserBing extends React.Component {

    state = {
        data: [], //对应关系的表格
        biaotou: [], //表头
        biaotou2: [],
        data2: [],
        bumen: [], //部门
        dataSource: [],
        active: 0,
        type: "binguser",
        biaoshi: -1,
        visible: false,
        clickrecord: [],
        seekdata: [],

    }

    datajson = (datas, key, tag) => {
        let yigecontan = [];
        for (let i in datas) {
            let yihang = "";
            if (i !== "remove" && i !== "removeByValue") {
                if (key[i] === "dingdingAccount" || key[i] === "centerAccount" || key[i] === "bingingtime") {
                    if (key[i] === "bingingtime" && tag === "right") {
                        yihang = {
                            title: datas[i],
                            dataIndex: key[i],
                            key: key[i],
                            width: "20%",

                        }
                    } else {
                        if (key[i] === "centerAccount") {
                            yihang = {
                                title: datas[i],
                                dataIndex: key[i],
                                key: key[i],
                                width: "20%",
                                render: (text, record) => (record.gmid == null ?
                                    <span className="unbing">未绑定</span> : text)
                            }
                        } else if (key[i] === "bingingtime") {
                            yihang = {
                                title: datas[i],
                                dataIndex: key[i],
                                key: key[i],
                                width: "20%",
                                render: (text) => (
                                    <span className="time">{text}</span>)
                            }
                        } else {
                            yihang = {
                                title: datas[i],
                                dataIndex: key[i],
                                key: key[i],
                                width: "20%",
                            }
                        }
                    }
                } else {
                    yihang = {
                        title: datas[i],
                        dataIndex: key[i],
                        key: key[i],
                        width: "8%",
                    }
                }

                yigecontan.push(yihang)
            // 
            } else {
                break;
            }
        }
        let action = {
            title: "操作",
            dataIndex: 'Detail',
            key: 'Detail',
            width: '14%',
            render: (text, record, index) => ( < a 
            onClick={this.showDetail.bind(this,text, record, index)} className="delbandinga">
      解除绑定</a>),
        }
        yigecontan.push(action)

        return yigecontan;
    }
    showDetail=(text, record, index) => {

        console.log(record)
        //解绑提交数据

        this.setState({
            visible: true,
            clickrecord: record
        })

    }

    clickrecordOK=() => {
        let record = this.state.clickrecord
        console.log(record)
        let data = {
            "id": record.key,
            "userid": record.userid,
            "gmid": parseInt(record.gmid,10)
        }
        this.jiebandata(data)
    }
    clickrecordCancel=() => {
        this.setState({
            visible: false
        })
    }
    jiebandata=(datas) => {
         let datavale = JSON.parse(window.sessionStorage.getItem("userData"))
        let jsonData = {
            "operationgmid": datavale.gmid,
            data: ""
        }
        jsonData.data = datas
        Ajax('post','front/query','UnBinding',jsonData,this.ajaxsucees)
    }

    ajaxsucees=(data) => {
        // console.log("绑定成功之后的数据",data)
       
        if (data.ret === 1) {
            this.start();
            this.setState({
                visible: false
            })
        } else {
            message.error(data.errmsg);
        }
    }

    // ajax请求
    start = (datashow) => {

        let datas = {};
        if (datashow === undefined) {
            datas = {
                type: this.state.type
            }
        } else {
            datas = datashow
        }

        //请求表格数据
        this.ajaxbiaoge(datas);
        //请求钉钉的不同部门
        this.ajaxdepartment(datas);
    }
    ajaxbiaoge=(data) => {
         Ajax('post','front/query','AllDD_User',data,this.duiyingajaxsucees)
    }
    ajaxdepartment=(data) => {
          Ajax('post','front/query','Department_list',data,this.dingdingajaxsucees)
       
    }
    duiyingajaxsucees=(res) => {
        //请求成功之后的对应关系
        let tag = this.state.biaoshi;
        if (res.ret === 1) {
            let name = res.schemaname.split(",");
            let key = res.schemakey.split(",");
            console.log(name, key)
            this.setState({
                totalnum: res.size,
                dataSource: res.data,
                biaotou: this.datajson(name, key),
            });
            // 总的数据  
            this.settabledata(res.data, tag)
        } else {
            this.setState({
                dataSource: [],
                columns: [],
                data: [],
                succeshow: false,
            });
            if (res.ret === 0 && res.err === 1111) {
                alert("登录超时，请重新登录！")
               // browserHistory.push(rootapp)
            } else if (res.ret === 0) {
                this.setState({
                    errorshow: res.errmsg
                })
            }

        }
    }
    //去除相同元素，升序排列出来
    dedupe=(array) => {
        var newArr = [];
        function _objIsInArray(obj, arr) {
            let tmpStatus = false;
            for (let j = 0; j < arr.length; j++) {
                // console.log("obj.key,arr[j].key", obj.key, arr[j].key)
                if (obj.key === arr[j].key) {
                    return j;
                    
                } else {
                    tmpStatus = false;
                }
            }
            if (!tmpStatus) {
                return -1;
            }
        }
        function compare(property) {
            return function(obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2; // 升序
            }
        }
        for (let i = 0; i < array.length; i++) {
            if (_objIsInArray(array[i], newArr) === -1) {
                newArr.push(array[i]);
            } else {
                continue;
            }
        }
        var comparesortnewArr = newArr.sort(compare("key"));
        // console.log(comparesortnewArr);
        return comparesortnewArr;

    }
    settabledata=(datas, tag) => {
        console.log("datas",datas,tag)
        if (tag === -1) {
            let tabledata = [];
            let lensize = 0
            for (let i = 0; i < datas.length; i++) {
                for (let key in datas[i]) {
                    tabledata.push(...datas[i][key])
                    lensize = lensize + datas[i][key].length;
                }
            }
            //  console.log("tabledata",tabledata.length)
            let tabledatanew = this.dedupe(tabledata)
            //  console.log("tabledatanew",[...tabledatanew].length)
            this.setState({
                totalnum: [...tabledatanew].length,
                data: [...tabledatanew],
                seekdata: [...tabledatanew]

            });
        } else {
            //不同部分的数据
            let tabledata = [];
            for (let i = 0; i < datas.length; i++) {
                for (let key in datas[i]) {
                    // console.log("obj.key,arr[j].key", tag, key)
                    
                    if (tag === parseInt(key,10) ){
                         let tabledatanew = this.dedupe(datas[i][key])
                        tabledata.push(...tabledatanew)
                    }

                }
            }
            this.setState({
                data: tabledata,
                seekdata: tabledata
            });
        }
    }
    dingdingajaxsucees=(data) => {
        //钉钉的数据
       
        if (data.ret === 1) {
            this.setState({
                bumen: data.data
            })
        }

    };
    componentDidMount() {
        this.start();
    }
    ;
    //切换部门
    handleClick=(e, keyshow) => {
       let alldata = this.state.dataSource;
        console.log("########", e, "%%%%%%%", keyshow,alldata)
        this.setState({
            active: e,
            biaoshi: keyshow
        })
        //切换部门请求数据。是请求本地
        this.settabledata(alldata, keyshow)
    };
    //本地数据切换部门
    showdepartment=() => {

    }
    //切换类型
    onChangeSelect=(value) => {
        console.log("切换数据", value)
        this.setState({
            type: value
        })
        let data = {
            type: value
        }
        this.start(data);

    }
    seek=(value) => {

        this.setState({
            data: value
        })
    }
    tabledatashow=() => {
        console.log("发送再次请求")
        this.start();
    }
    render() {

        return (
            <div  className="rignt_content UserBing ">
     
       <Row gutter={40} className="data">
      <Col className="gutter-row" md={13} xl={15} >
      <div className="box box-left">
       <Row gutter={48}>
        <Col className="gutter-row" span={17}> 
          <Select className="SelectType" defaultValue="binguser" style={{
                width: 160,height:36
            }} onChange={this.onChangeSelect}>
            <Option value="binguser">已绑定用户</Option>
            <Option value="alluser">全部钉钉用户</Option>
          </Select>
        </Col>
        <Col className="gutter-row" span={7}> 

        <div className="titleserch" >
                <FrontSeek dataall={this.state.seekdata} seek={this.seek} />
        </div>
        </Col>
        </Row>
        
     
        <Row gutter={40} >
          <div className="department">
          {this.state.bumen.map(function(item, index) {
                return (
                    <span className={index === this.state.active ? "item active" : "item"} key={item.index}
                    onClick={this.handleClick.bind(this, index, item.key)}>{item.name}</span>
                );
            }.bind(this))
            }
          </div>
        </Row>
        <Row gutter={0} >
          <Table className="table" 
          columns={this.state.biaotou} 
          dataSource={this.state.data}
          onChange={this.handleChange}/>
        </Row>
       
        </div>
        </Col>
        <Col className="gutter-row"   md={11} xl={9}>
        <div >
          <Row gutter={24} className="box jurisdiction">
          <div className="Optionbangdingtitle">绑定账号</div>
            <Addbing  startLog={this.startLog} tabledata={this.tabledatashow}></Addbing>
          </Row>
          <Row className="BindingRecodelink">
          
           <div className="userbinglog">
            <div className='logcontent'>
            <p className="title">操作记录</p>
               <Link to={{
                pathname: rootapp+'app/BindingRecode',
            }}
             className="active">查看更多</Link>
             <div className="logTable">
               <BindingRecodeContent type={0}/>
             </div>
            </div>
           </div>
          </Row>
        </div>
         </Col>
        </Row>
        <Row>
          <Modal
            title="解除绑定"
            className="reacodebing"
            visible={this.state.visible}
            onOk={this.clickrecordOK}
            onCancel={this.clickrecordCancel}
            okText="确认"
            cancelText="取消"
            >

          <p className="text">解除
          <span className="big">{this.state.clickrecord.centerAccount}</span>和
          <span className="big">{this.state.clickrecord.dingdingAccount}</span>
          的绑定将会影响该账号内部充值等功能的正常使用，确定进行解除绑定？
          </p>
          
        </Modal>
        </Row>
</div>
        )
    }
}
export default UserBing;