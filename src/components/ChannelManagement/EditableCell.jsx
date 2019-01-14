/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm ,Icon,Button,Select,message,Modal} from 'antd';
import $ from 'jquery';
const Option = Select.Option;
const confirm = Modal.confirm;
class EditableCell extends React.Component {
    state = {
    value: this.props.value,
    editable: this.props.copytag,
    copytag:this.props.copytag,
    addnow:this.props.addnow,
    idVisible:false,
    visible:false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  showConfirm=()=> {
    let that=this;
  confirm({
    title: '确认',
    content: '修改渠道ID之后站点ID也会相应变化',
    onOk() {
     that.setState({ editable: false });
        if (that.props.onChange) {
          let returndata=that.state.value;
          that.props.onChange($.trim(returndata.toString()));
        }
        let value= that.props.postDatatag - 1;
           that.props.onChangpost(value)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
  check = (e) => {
     e.nativeEvent.stopImmediatePropagation();
    if(this.props.vaildator =='NotMust'){
      this.setState({ editable: false });
      if (this.props.onChange) {
        let returndata=this.state.value;
        this.props.onChange(returndata);
      }
      let value= this.props.postDatatag - 1;
         this.props.onChangpost(value)
    }
    else{

        if(this.state.value==''||this.state.value==undefined){
         message.error('该输入框内容不能为空');
       }
       else if(this.props.vaildator =='MustID'){
               this.showConfirm();
       }
      else{
         this.setState({ editable: false });
        if (this.props.onChange) {
          let returndata=this.state.value;
          this.props.onChange($.trim(returndata));
        }
        let value= this.props.postDatatag - 1;
           this.props.onChangpost(value)
       }
    }  
       // console.log('输入框内容:',this.state.value); 
  }


  edit = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    if (this.props.addnow&&!this.props.copytag) {
       message.warning('正在新增，不能修改');
    }else{
      this.setState({ editable: true });
      let value= this.props.postDatatag + 1
      if (this.props.addnow) {
            this.props.onChangeeidt(value,false)
      }else{
        this.props.onChangeeidt(value,true)
      }

    }
    
  }
 
  render() {
     console.log("this.props.tagid",this.props.hasmofiyid&&this.props.copytag)
    const { value, editable,copytag ,addnow,recordkey,errorkey,} = this.state;
    const qudao=value.indexOf("-")>-1?value.split("-")[0]:value;//渠道
    const zhangdian=value.indexOf("-")>-1?value.split("-")[1]:value;//站点

    return (
     
      <div className="editable-cell"  >
        {  
          editable ?
            <div className="editable-cell-input-wrapper">
            {/*value.indexOf("-")>-1?<span>{qudao}-</span>:""*/}
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            : 
            <div className="editable-cell-text-wrapper" > 
              {value || ' '}
              <Icon
                type="edit"
               style={{"display":this.props.tagid=="id"?"none":""}}
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
     
    );
  }
}

export default EditableCell;