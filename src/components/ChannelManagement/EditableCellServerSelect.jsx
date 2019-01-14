/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import $ from 'jquery';
import { Table, Input, Popconfirm, Icon, Button, Select, message } from 'antd';
const Option = Select.Option;
function translateServer(value, data) {
   console.log("不是编辑状态显示的数据",value,data)
    value instanceof Array ? value = value.toString() : "";
    let newdata = [];
    let temptag = false;
    if (value.toString().indexOf(",") > -1) {
        temptag = true
        newdata = value.split(",");
    } else {
        newdata.push(value);
    }
    let showname = [];
    
        for (let j = 0; j < newdata.length; j++) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == newdata[j]) {
                showname.push(data[i]["name"])
                // showname+=data[i]["name"]+","
            }
        }
    }
 let stringshowname =showname.join()
    return stringshowname
}

function translateServerdefaultValue(value, data) {
    console.log("编辑状态显示的数据是",value)
   
    value instanceof Array ? value = value.toString() : "";
    let newdata = [];
    let temptag = false;
    if (value.toString().indexOf(",") > -1) {
        temptag = true
        newdata = value.split(",");
    } else {
        newdata.push(value);
    }
    let showid = [];
    
        for (let j = 0; j < newdata.length; j++) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == newdata[j]) {
                showid.push(data[i]["id"])
            }
        }
    }
 console.log("返回的数据",showid)
return showid
}
function changgestingtoarry(string){
    console.log("5555555555",string)
    let arrydata="";
 if(string.indexOf(",")>-1){
    let arrydatazhi= string.split(",")
    //数组里面只能是数组，
    arrydata=arrydatazhi.map((value,index)=>{
        return parseInt(value)
    })
}else{

   arrydata=string==""?[]:[parseInt(string)]
}
console.log("hhhhhhhhhhhhhhh",arrydata)
return arrydata
}
class EditableCellServerSelect extends React.Component {
    state = {
        value: typeof this.props.value=="string"?changgestingtoarry(this.props.value):this.props.value,
        editable: false,
        Optiondata: this.props.Optiondata,
        addnow: this.props.addnow
    }
    handleChange = (value) => {
        // const value = value;

        console.log("删除之前",value,this.state.value)
     if (value.length>=2&&$.inArray(-1,this.state.value)>-1) {
        //原始数据有，修改为当个数据
        let index=$.inArray(-1,value);
         let postdata=value.splice(index,1)
        console.log("删除之后的",value)
        this.setState({
            value: value
        });

     }else if($.inArray(-1,value)>-1){
        //手动选全部,默认不是-1
      
        let postdata=[-1]
       this.setState({
            value: postdata
        }); 
     }else{
        //单个当个个选
        this.setState({
            value: value
        });
     }
       
        
    }
    check = () => {
        if (this.state.value == '' || this.state.value == undefined) {
            message.error('该输入框内容不能为空');
        } else {


            this.setState({
                editable: false
            });
            if (this.props.onChange) {
                let returndata = this.state.value
                console.log("returndata", returndata)
                console.log("returndata2", returndata.toString())
                this.props.onChange(returndata.toString());
            }
            let value = this.props.postDatatag - 1;
            this.props.onChangpost(value) //控制钩钩状态的数量
        }
    }

    edit = () => {
        if (this.props.copytag) {
            this.setState({
                editable: true
            });
            let value = this.props.postDatatag + 1
            if (this.props.addnow) {
                this.props.onChangeeidt(value, false)
            } else {
                this.props.onChangeeidt(value, true)
            }
        } else {
            if (this.props.addnow && !this.props.copytag) {
                message.warning('正在新增，不能修改');
            } else {
                this.setState({
                    editable: true
                });
                let value = this.props.postDatatag + 1
                if (this.props.addnow) {
                    this.props.onChangeeidt(value, false)
                } else {
                    this.props.onChangeeidt(value, true)
                }
            }
        }
    }

    render() {
        let {value, editable, addnow} = this.state;
        // value= value.indexOf(",")>-1?[...value]:parseInt(value);
        //let selectvalue=value.toString().indexof(",")>-1?value.split(","):[value];
        console.log("this.props.value",this.props.value)
        // console.log("服务器组件中的原始服务器是什么呢？",value)
        return (
            <div className="editable-cell">
        {
            editable ?
                <div className="editable-cell-input-wrapper">
             <Select
                mode="multiple"
                onChange={this.handleChange}
                onPressEnter={this.check}
                 value={value}
                 style={{ width: '100%' }}
                placeholder={"请选择区服"}
                
                //defaultValue={translateServerdefaultValue(value ,this.state.Optiondata)}
                >
       {this.state.Optiondata.map((item, index) => {
                    return (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                })
                }
                    </Select>
                    <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                />
            </div>
                :
                <div className="editable-cell-text-wrapper">
              {translateServer(value, this.props.Optiondata)|| ' '}
              <Icon
                type="edit"
                 style={{"display":this.props.notshow?"":"none"}}
                className="editable-cell-icon"
                onClick={this.edit}

                />
            </div>
            }
      </div>
        );
    }
}

export default EditableCellServerSelect;