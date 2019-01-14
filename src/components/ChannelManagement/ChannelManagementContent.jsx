import React from 'react';
import { Row,Modal, Table, DatePicker, Input,Select,message,Button,Icon,Spin } from 'antd';
import {getajax} from '../../public/ajax';
import Channelist from './Channelist'
import ExportModal from './ExportModal'
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const Ajax=getajax.ajaxFun;
class ChannelManagementContent extends React.Component {
    constructor(props) {
        super(props);
    };
    state = {
        ChannelName:'',
        type:"-1",
        loading:false,
        exportshow:false,
        loadingModal: false,
    }


    handleChangeInput=(e)=>{
       this.setState({
          type:e
        })
    } 
    resetForm=()=>{
      this.setState({
        ChannelName:'',
        type:"-1",
      })
    }
    handleChange=(e)=>{
        this.refs.getTable.handleChange(e)
    }
    ChannelNameChange=(e)=>{
      this.setState({
          ChannelName:e.target.value
        })
    }
    resetFunc=()=>{//重置数据
      this.setState({
        ChannelName:'',
        type:"-1",
      })
       setTimeout(() => {
            this.getDataFunc();
        }, 0);
      
    }
    getDataFunc=(e)=>{
      this.refs.getTable.searchTableFunc(this.state.ChannelName,this.state.type)
      //this.props.getTablelist1(this.state.ChannelName,this.state.type)
    }
    getNewDataFunc=()=>{
      this.props.getTablelist1(this.state.ChannelName,this.state.type)
    }
    addChanel=(e)=>{//添加渠道
           this.refs.getTable.addChanel()
    }
    docmentdown=(e)=>{//模板下载
         this.refs.getTable.docmentdown()
    }
    ExportModalFunc=()=>{//显示导入框
        this.setState({
          exportshow:true
        })
        this.refs.exportModal.resetFileList()
    }
    hideExportFunc=()=>{//关闭导入框
        this.setState({
          exportshow:false
        })
    }
    componentDidMount(){
     
    }

    render() {
      const {columns,dataSource,show,type,ChannelName,exportshow,loadingModal}=this.state;
      const {loading,gameToname,radioCheck}=this.props
      const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
          <Spin indicator={antIcon} spinning={loading}>
            <div className="data-wrapper1">  
         <div className="searchcontent">
          
           <div>
            <div className="item">
              <span>&nbsp; 渠 道  &nbsp;</span><Input onPressEnter={this.getDataFunc} onChange={this.ChannelNameChange} value={ChannelName} className="Input" placeholder="请输入渠道名称/Id"/>
            </div>
           <div className="item">
              <span>平台  </span> 
              <Select  className="Input"  value={type}  onChange={this.handleChangeInput}>
                 <Option value="-1">全部</Option>
                <Option value="0">安卓</Option>
                <Option value="1">IOS</Option>
                <Option value="2">未知</Option>
              </Select>
           </div>
            <div className="caozuo">
             <Button type="primary" onClick={this.getDataFunc}>查询</Button>
             <Button onClick={this.resetFunc}>重置</Button>
              <Button  onClick={this.getNewDataFunc}>刷新</Button>
            </div>
            <div className="czbtn">
              <Button className="addBtn show typetext" onClick={this.docmentdown} >下载模块</Button>
               <Button className="addBtn show typetext" onClick={this.ExportModalFunc} >导入数据</Button>
                <Button className="addBtn show typetext" onClick={this.addChanel} >新增渠道</Button>
            </div>
            </div>
         </div>
         <div className="table">
           <Channelist  gameToname={gameToname} ref="getTable" {...this.props}  />
           {
           //<Table rowKey="index" dataSource={dataSource} columns={columns} />
         }
         <ExportModal
               ref="exportModal"
               upLoadSuccess={this.getDataFunc}
               radioCheck={radioCheck}
               gameToname={gameToname}
               hideExportFunc={this.hideExportFunc}
               visible={exportshow}
               loading={loadingModal}/>
         </div>
       </div>
       </Spin>
        )
    }
}
export default ChannelManagementContent;