/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm ,Icon,Button,Select,Tooltip} from 'antd';

const Option = Select.Option;
class CopyAndAdd extends React.Component {
    state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    let value= this.props.postDatatag - 1;
       this.props.onChangpost(value)
  }

  edit = () => {
    this.setState({ editable: true });
    let value= this.props.postDatatag + 1
    //console.log( this.props.postDatatag + 1) 
    this.props.onChangeeidt(value)
  }
   componentWillReceiveProps(nextProps){
    this.setState({ value:nextProps.value });
   }
  render() {
    const { value, editable } = this.state;
    const children=typeof(JSON.parse(value).children);
 
    return (
      <div className="editable-cell">
       {
        children=="object"?
        <div className='f_left-1'>
          {/*<Tooltip placement="topLeft" title="新增站点">
          <Icon type="plus"  id={value} onClick={this.props.handleAdd}/>
          <a href="javascript:void(0)" onClick={this.props.handleAdd}></a>
          </Tooltip>*/}
           <a href="javascript:void(0)" id={value} onClick={this.props.handleAdd}>新增站点</a>
          {/*复用渠道的功能<Tooltip placement="topLeft" title="复用渠道">
          <Icon type="copy" id={value} onClick={this.props.copyAgent}/>
          </Tooltip>
        */}
        </div>:<div className='f_left-1' style={{"display":this.props.states==0?"none":"block"}}>
        <Tooltip placement="topLeft" title="复用站点">
         <Icon type="copy" id={value} onClick={this.props.copyChange} />
        </Tooltip>
        
        </div>
       }
        {/*<div className='f_left-1'>
           <Tooltip placement="topLeft" title="查看详情">
           <Icon type="message" id={value} onClick={this.props.Lookhistory} />
          </Tooltip>
        </div>*/}
      </div>
    );
  }
}

export default CopyAndAdd;