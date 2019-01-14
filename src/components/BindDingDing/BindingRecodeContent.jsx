import React from 'react';
import { Row, Col, Table } from 'antd';
import { Link, } from 'react-router';

import FrontSeek from '../PublicComponent/FrontSeek';

import {getajax} from '../../public/ajax';
import { root } from '../../root';
const rootapp = root();
const Ajax=getajax.ajaxFun;

class BindingRecodeContent extends React.Component {
    constructor(props) {
        super(props);
       // this.props.location.query;
    }
    ;
    state = {
        
        data2: [],
        dataSource: [],
        biaotou1:[
        {
          title: '钉钉账号',
          dataIndex: 'dingdingAccount',
          key: 'dingdingAccount',
        },
        {
          title: '权限中心账号',
          dataIndex: 'centerAccount',
          key: 'centerAccount',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record, index) => (
               <span className={text == "绑定" ? "normal" : "recodeunbanding"}>{text}</span>
          )           
        }
        
       ],
        biaotou2:[{
          title: '编号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '钉钉账号',
          dataIndex: 'dingdingAccount',
          key: 'dingdingAccount',
        },
        {
          title: '权限中心账号',
          dataIndex: 'centerAccount',
          key: 'centerAccount',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record, index) => (
               <span className={text == "绑定" ? "normal" : "recodeunbanding"}>{text}</span>
          )
                   
        },
        {
          title: '操作人',
          dataIndex: 'operationpeople',
          key: 'operationpeople',
        },
        {
          title: '操作时间',
          dataIndex: 'bindingtime',
          key: 'bindingtime',
        },
       ]
         

    }

    datajson = (datas, key, tag) => {
        let that = this;
        let yigecontan = [];
        let flage = false;
        for (let i in datas) {
            let yihang = "";
            if (i != "remove" && i != "removeByValue") {
                if (key[i] == "operation") {
                    yihang = {
                        title: datas[i],
                        dataIndex: key[i],
                        key: key[i],

                        render: (text, record, index) => (
                            <span className={text == "绑定" ? "recodebanding" : "recodeunbanding"}>{text}</span>)
                    }
                } else {
                    yihang = {
                        title: datas[i],
                        dataIndex: key[i],
                        key: key[i],
                    }
                }

                yigecontan.push(yihang)

            } else {
                break;
            }
        }

        return yigecontan;
    }


    // ajax请求
    start = () => {
           Ajax('post','front/query','BindRecord',{},this.duiyingajaxsucees)
    }
    duiyingajaxsucees=(res) => {
        //请求成功之后的对应关系
        console.log("获取到的值", res)
        if (res.ret == 1) {
            let name = res.schemaname.split(",");
            let key = res.schemakey.split(",");
            console.log(name, key)
            this.setState({
                totalnum: res.size,
                dataSource: res.data,
                data: res.data,
                data2: res.data,
            });

        } else {
            this.setState({
                dataSource: [],
                columns: [],
                data: [],
                succeshow: false,
            });
            if (res.ret == 0 && res.err == 1111) {
                alert("登录超时，请重新登录！")
               // browserHistory.push(rootapp)
            } else if (res.ret == 0) {
                this.setState({
                    errorshow: res.errmsg
                })
            }

        }

    }

    componentDidMount() {
        this.start();
    }
    ;


    render() {
       const {biaotou2,biaotou1,data2}=this.state;
       const {type}=this.props
        return (
            <div  className="rignt_content UserBing BindingRecode">
     
       <Row gutter={16} className="data">
        <Col className="gutter-row"  span={24}>
        <div >
          <Row gutter={16} className="box recodebottom ">
           {type===1&& <div className="recodeall">
             
               <Link to={{
               pathname: rootapp+'app/BindDingDing',
              }}
              className="gobanging">返回绑定界面</Link>
            </div>
            }
          <div className="logding">
          <Table 
          pagination={type==0?false:true}
           style={{width:type==0?"100%":"90%"}} 
           rowKey={record => record.id}
            columns={type==0?biaotou1:biaotou2}
            dataSource={type==0?data2.slice(0,8):data2}
            onChange={this.handleChange}
             />
           </div>
        </Row>
        </div>
         </Col>
        </Row>
</div>
        )
    }
}
export default BindingRecodeContent;