import React from 'react';
import {Modal, Table, DatePicker, Input,Select,message,Button,Icon,Spin } from 'antd';
import {getajax} from '../../public/ajax';
import moment from 'moment';
import pertemp from '../../style/imgs/seartemp.png';
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;

const Ajax=getajax.ajaxFun;
class LogManagementContent extends React.Component {
    // constructor(props) {
    //     super(props);
    // };
    state = {
        columns:[{
          title: '时间',
          dataIndex: 'timestamp',
          key: 'timestamp',
          width:"20%",
          // render: text => <a href="javascript:;">{text}</a>,
        }, {
          title: '操作者',
          dataIndex: 'nickName',
          key: 'nickName',
           width:"20%",
        }, {
          title: '指令',
          dataIndex: 'cmd',
          key: 'cmd',
           width:"20%",
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
           width:"20%",
          render: text => 
          <div>
          {text=="正常"&&<p className="tablesuccuss">{text}</p>} 
           {text=="异常"&&<p className="tableyic">{text}</p>} 
           {text=="错误"&&<p className="tableerror">{text}</p>} 
          </div>,
        },
         {
          title: '操作',
          key: 'action',
          width:"20%",
          render: (text, record) => (
            <span>
              <a onClick={this.getDetail.bind(this, record)} href="javascript:void(0)">查看详情</a>
            </span>
          ),
        }],
        dataSource:[],
        show:false,
        startTime:getajax.getBeforeDate(0),
        nickName:'',
        cmd:'',
        type:"全部",
        loading:true,
    }
    disabledDate=(current)=> {
       return current && current > moment().endOf('day');
     }
    onChange=(e, str) => {
        this.setState({
          startTime:str
        })
    }
    handleChange=(e)=>{
       this.setState({
          type:e
        })
    }
    userChange=(e)=>{
      this.setState({
          nickName:e.target.value
        })
    }
    cmdChange=(e)=>{
      this.setState({
          cmd:e.target.value
        })
    }
    getDetail=(record)=>{
     
      let text=record.detail
      text = text.replace(/\r\n/g,"<br>")
          text = text.replace(/\n\t/g,"<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;")
          text = text.replace(/\n/g,"<br>");
          text = text.replace(/\s/g,"&nbsp;");
      Modal.info({
      title: '',
      width:740,
      content: (
      <div className="htlog" dangerouslySetInnerHTML={{__html: text}}>
      </div>
    ),
    onOk() {},
     });
    }
    getShow=(e)=>{
       this.setState({
          show:!this.state.show
       })
    }
    getDataFunc=()=>{//查询数据获取列表
      this.setState({
              loading:true,
            })
      let htData={
            "date":this.state.startTime,
            "type":this.state.type,
            "cmd":this.state.cmd,
            "nickName":this.state.nickName,
          }
     Ajax('post','front/query','getlog',htData,(e)=>{
           this.setState({
              loading:false,
            })
           if(e.ret==1){
            this.setState({
              dataSource:e.data,
             
            })
            message.success("数据查询成功")
           
           }
           else{
            
             message.error(e.errmsg)
           }
         }
           )
    }
    resetFunc=()=>{//重置数据
      this.setState({
        startTime:getajax.getBeforeDate(0),
        nickName:'',
        cmd:'',
        type:"全部",
      })
    }
    componentDidMount(){
      this.getDataFunc();
    }

    render() {
      const {columns,dataSource,show,startTime,nickName,type,cmd,loading}=this.state;
      const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
          <Spin indicator={antIcon} spinning={loading}>
            <div className="data-wrapper">  
         <div className="searchcontent">
           <div className="item">
           <span>日期   </span>
           <DatePicker
           allowClear={false}
             className="Input"
              value={moment(startTime, dateFormat)}
             disabledDate={this.disabledDate}
            onChange={this.onChange}/>
           </div>
           <div className="item">
           <span>操作者   </span><Input onPressEnter={this.getDataFunc} value={nickName} onChange={this.userChange} className="Input" placeholder="请输入"/>
           </div>
            {!show&& <div className="caozuo">
             <Button type="primary" onClick={this.getDataFunc}>查询</Button>
             <Button onClick={this.resetFunc}>重置</Button>
              <a href="javascript:" onClick={this.getShow}>展开<Icon type="down" /></a>
            </div>}
            {show&&<div><div className="item">
              <span>状态  </span> 
              <Select  className="Input"  value={type}  onChange={this.handleChange}>
                <Option value="全部">全部</Option>
                <Option value="正常">正常</Option>
                <Option value="异常">异常</Option>
                <Option value="错误">错误</Option>
              </Select>
           </div>
            <div className="item">
              <span>&nbsp; 指 令  &nbsp;</span><Input onPressEnter={this.getDataFunc} onChange={this.cmdChange} value={cmd} className="Input" placeholder="请输入"/>
            </div>
            <div className="caozuo">
             <Button type="primary" onClick={this.getDataFunc}>查询</Button>
             <Button onClick={this.resetFunc}>重置</Button>
              <a href="javascript:" onClick={this.getShow}>收起<Icon type="up" /></a>
            </div>
            </div>
          }
         </div>
         <div className="table">
         {dataSource.length==0?
          <img src={pertemp} className="tempimg"/>
           :<Table rowKey="index" dataSource={dataSource} columns={columns} />
         }
         </div>
       </div>
       </Spin>
        )
    }
}
export default LogManagementContent;