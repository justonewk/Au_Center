/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm ,Icon,Button,Select,message} from 'antd';
const Option = Select.Option;
class EditableCellSite extends React.Component {

    state = {
    value: this.props.value,
    site:this.props.site,
    editable: this.props.copytag,
    copytag:this.props.copytag,
  }
  handleChange = (e) => {
    console.log("变化zhong",e.target.value)
    const value = e.target.value;
    this.setState({ 
      site:e.target.value
    });
  }
  check = () => {
    if(this.state.site==''||this.state.site==undefined){
      message.error('该输入框不能为空');
    }
    else if(isNaN(this.state.site)){
            message.error('只能为数字');
    }
    else{
      this.setState({ editable: false });
      let returndata=this.state.value+'-'+this.state.site;
      this.props.onChange(returndata);
      let value= this.props.postDatatag-1;
       this.props.onChangpost(value)
    }
   
       
  }
  edit = () => {
     if (this.props.addnow && !this.props.copytag) {
                message.warning('正在新增，不能修改');
            } else {
    this.setState({ editable: true });
    let value= this.props.postDatatag + 1
    //console.log( this.props.postDatatag + 1) 
    if (this.props.addnow) {
            this.props.onChangeeidt(value,false)
      }else{
        this.props.onChangeeidt(value,true)
      }
    }
  }
   // componentWillReceiveProps(nextProps){
   //  console.log("66666",nextProps.copytag,nextProps.value,nextProps)
   //  console.log("这个条件应该怎么写呢？",nextProps.record?JSON.parse(nextProps.record):false)
   //  // let copytag=nextProps.record?(JSON.parse(nextProps.record).copytag?JSON.parse(nextProps.record).copytag:false):false
   //  // if(copytag){
   //  //   this.setState({ editable: true });
   //  // }
   // }
  render() {
   
    const { value, editable,copytag ,site} = this.state;
  
    return (
      <div className="editable-cell">
        {

          editable ?
            <div className="editable-cell-input-wrapper">
             <p className="f_left idfirst">{value} -</p>
              <Input
                className="f_left idlast"
                width='100'
                value={site}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                className="f_left"
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value +"-"+ site || ' '}
              <Icon
                type="edit"
                 style={{"display":this.props.hasmofiyid&&this.props.copytag||this.props.hasmofiyid&&this.props.fuyongtag?"":"none"}}
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export default EditableCellSite;