import React from 'react';
import { IsURL,getCheckgamelistnew} from '../../public/CommonFuncs'
import { Button,Checkbox, Form, Select, Input, Row, Col,Popover,Icon, Modal } from 'antd';
import getDataSubsystemDetailItemTopForm from './getDataSubsystemDetailItemTopForm';
import EditableTable from './UpdateLoginUrlModal';
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
class SubsystemDetailItemTopForm extends React.Component {
    constructor(props) {
        super(props);
         //console.log("fff",props.datavalue)
    };
    state = {
        CheckData:[14],//多选框初始化
        gameList:[],
        checked:false,
        allCheck:[],//全选
        syskeyisClose:true,
        slidisClose:true,
        showModal: false,
        tepmLoginLink: Array.isArray(eval(this.props.datavalue.loginlink)) ? eval(this.props.datavalue.loginlink) : [],
     }
    checkUrl=(rule, value, callback) => {
       if(value===null){
          callback();
       }
       else if (value.length != 0) {
            if (IsURL(value)) {
                callback();
            } else {
                callback("请输入正确url地址");
            }
        }
         else {
            callback();
        }
    }
    test=() => {
        this.props.onOk();
    }
     allCheckFunc=(e)=>{
      let temp=[]
        this.setState({
          checked: e.target.checked,
        });
      if(e.target.checked){
         this.onChangeCheck(this.state.allCheck)
      }
      else{
         this.onChangeCheck(temp)
      }
       console.log("chek",e)
    }
    onChangeCheck=(e)=>{
　　  console.log("多选测试:",e);
      let allCheck =this.state.allCheck;
      if(e.sort().toString()== allCheck.sort().toString()){
        this.setState({
          checked: true,
        });
      }
      else{
        this.setState({
          checked: false,
        });

      }

      this.setState({
        CheckData:e,
      })
      let {form} =this.props;
      form.setFieldsValue({"support_game":e})
    }
    setFormData=()=>{
      let {form} =this.props;
     const datavalue=this.props.datavalue;
     form.setFieldsValue(
      {  
        support_game:datavalue.support_game,
        noticelink:datavalue.noticelink,
        loginlink:datavalue.loginlink,
        group:datavalue.group,
        contact:datavalue.contact,
      })
  }
    componentDidMount(){
      let game=window.sessionStorage.getItem("gameList");
      let gamelist=game==undefined?[]:JSON.parse(game);
      let temp=[];
      
      gamelist.forEach(function(item,index){
         temp.push(parseInt(item.gid))
      })
      this.setState({
        gameList:getCheckgamelistnew(gamelist),
        allCheck:temp
      }) 
    }
    onChangeIcon=(idkey,value)=>{
      console.log("idkey,value",idkey,value)
      if(idkey=="syskeyisClose"){
        this.setState({syskeyisClose:value})
      }else{
        this.setState({slidisClose:value})
      }
      
    }
    // 显示或关闭修改url的Modal
    showModal = () => {
      const { form } = this.props;
      if (!this.state.showModal) {
        form.validateFields((err, values) => {
          console.log('onOK:...............',values.loginlink);
          this.setState({
            tepmLoginLink: eval(values.loginlink)
          }, () => {
            this.setState((prevState, props) => {
              return {
                showModal: !prevState.showModal
              }
            });
          })
        });
      }
    }

    //关闭modal
    closeModal = () => {
      console.log('取消:',eval(this.props.datavalue.loginlink));
      this.setState({
        tepmLoginLink: [...eval(this.props.datavalue.loginlink)]
      }, () => {
        this.setState((prevState, props) => {
          return {
            showModal: false
          }
        });
      })
    }
    // 修改临时回调地址
    updateTempLoginUrl = (loginlink) => {
      console.log(loginlink, '修改临时回调地址');
      this.setState({
        tepmLoginLink: loginlink
      }, () => console.log(this.state.tepmLoginLink, '修改临时回调地址2'));
    }

    // 修改登录回调地址
    updateLoginUrl= () => {
      const {form} =this.props;
      
      this.setState({
        showModal: false
      });
      console.log(this.state.tepmLoginLink.map((item, index) => ({name: item.name, ip: item.ip})));
      form.setFieldsValue(
        {  
          loginlink: JSON.stringify(this.state.tepmLoginLink.map((item, index) => ({name: item.name, ip: item.ip}))),
        });
       form.validateFields((err, values) => {
          console.log('form values:', values);
          console.log('datavalues:', this.props.datavalue);
        });
    }
    render() {
      const content = (
      <div>
        { this.props.datavalue.contact.length>1&&
        this.props.datavalue.contact.map(function(item,index){
           return  <p key={index}>{item.label}</p>
         })
       }
      </div>
    );
       const {userList,gamecheck,syskey,form,sysstate, onOk, onCancel,datavalue,GroupList,defaultGroupId,isEditMode,local_permit} = this.props;
        const {getFieldDecorator} = form;
        const {syskeyisClose,slidisClose}=this.state;
       
        return (
            <div
            title={this.props.title}
            >
         <Form >

           <Row gutter={32}>
           <Col lg={8} xxl={4}  className="colSubsystemDetailItemTopForm">
            <FormItem label="分组名称">

             {isEditMode&&
                getFieldDecorator('group',
                {
                    initialValue:datavalue.group,
                    rules: [{required: true,
                   message: '分组名称必填'
                }],
                })(
                  <Select labelInValue={true}>{
                    GroupList.map(function(item,index){
                    return(
                     <Option key={index} value={item.gid}>{item.name}</Option>
                   )
             })
           }
           </Select>
                )
              }
              {!isEditMode&&
                 <p>{datavalue.group.label}</p>
                }
            </FormItem>
            </Col>
            <Col lg={8} xxl={4} className="colSubsystemDetailItemTopForm">
            <FormItem label="管理员">
              {isEditMode&&
                getFieldDecorator('contact',
                {
                    initialValue: datavalue.contact,
                    rules: [{required: true,message: '管理员必填'
                }],
                })(
                 <Select mode="multiple" labelInValue={true}>{
                   userList.map(function(item,index){
                  return(
                <Option key={item.uid} value={item.uid}>{item.nickname}({item.username})</Option>
                )
    
             })
           }
           </Select>
                )
              }
              {!isEditMode&&datavalue.contact.length>1&&
                <Popover content={content} title={null} trigger="hover">
                <div className="contactname">{
                       datavalue.contact.map(function(item,index){
                     return  <span key={index}>{item.label}</span>
                   })
                 }</div>
              </Popover>
                
                 
                }
                {!isEditMode&&datavalue.contact.length==1&&
                
                <div className="contactname">
                     <p>{ datavalue.contact[0].label}</p>
                </div>
         
                
                 
                }
              
            </FormItem>
            </Col>
            <Col lg={8} xxl={4}  className="colSubsystemDetailItemTopForm">
            <FormItem label="版本号">
                 <p>{datavalue.version}</p>
            </FormItem>
            </Col>
             <Col lg={8} xxl={6}  className="colSubsystemDetailItemTopForm">
            <FormItem label="通知回调地址">
              {isEditMode&&getFieldDecorator('noticelink', {
                initialValue: datavalue.noticelink,
                rules: [{
                    validator: this.checkUrl
                }],
              })(
                  <Input onPressEnter={onOk} placeholder="请输入正确url地址" />
                 
              )}
              {!isEditMode&&datavalue.noticelink!==""&&
                 <a href={datavalue.noticelink} target="_blank"><p>{datavalue.noticelink}</p></a>
              }
            </FormItem>
            </Col>
             <Col lg={8} xxl={6}  className="colSubsystemDetailItemTopForm">
              <FormItem label="登录回调地址">
              {isEditMode&&getFieldDecorator('loginlink', {
                initialValue: datavalue.loginlink,
                // rules: [{
                //     validator: this.checkUrl
                // }],
              })(
                  // <Input onPressEnter={onOk} placeholder="请输入正确url地址" />
                  <Button onClick={this.showModal} type="primary">修改地址</Button>
              )}
              {!isEditMode&&datavalue.loginlink!==""&& eval(datavalue.loginlink)&&
                  // <a href={datavalue.loginlink} target="_blank"><p>{datavalue.loginlink}</p></a>
                  <Popover title={'登录回调地址'} content={eval(datavalue.loginlink).length === 0 ? null : <div>{eval(datavalue.loginlink).map((item, index) => <p key={index}>{item.name}:{item.ip}</p>)}</div>}>
                    <Button>共{eval(datavalue.loginlink).length}个回调地址</Button>
                  </Popover>
                }
            </FormItem>
            </Col>
             {!isEditMode&&<Col lg={12} xxl={12}  className="colSubsystemDetailItemTopForm">
              <FormItem label="key">
                 <p className="text" >
                 {syskeyisClose&&"点击展开"}
                 <span>
                 {!syskeyisClose&&syskey}
                   {syskeyisClose?<Icon type="down" theme="outlined" onClick={this.onChangeIcon.bind(this,"syskeyisClose",false)}/>:
                   <Icon type="up"  theme="outlined" onClick={this.onChangeIcon.bind(this,"syskeyisClose",true)}/>}
                 </span>
                
                 </p>
                 {!syskeyisClose&&sysstate==0&&local_permit["md_subsys_mgr.op_subsys_reset"]&&<Button className="exportBtn" onClick={this.props.GetKey}>重置</Button>
                    }
            </FormItem>
            </Col>
            }
            {!isEditMode&&<Col lg={12} xxl={12}  className="colSubsystemDetailItemTopForm">
              <FormItem label="slid">
                 <p className="text">
                 {slidisClose&&"点击展开"}
                 <span>
                 {!slidisClose&&datavalue.slid}
                   {slidisClose?<Icon type="down" theme="outlined"  onClick={this.onChangeIcon.bind(this,"slidisClose",false)}/>:
                   <Icon type="up" theme="outlined" onClick={this.onChangeIcon.bind(this,"slidisClose",true)}/>}
                 </span>
               
                 </p>
                {!slidisClose&&sysstate==0&&local_permit["md_subsys_mgr.op_subsys_download"]&&<Button className="exportBtn" onClick={this.props.exportXml}>下载公钥pem文件</Button>
               }
            </FormItem>
            </Col>
            }
            <Col lg={24} xxl={24}  className="colSubsystemDetailItemTopForm">
            <FormItem className='CheckGroup' label="子系统包含的游戏数据">
             {isEditMode&&<Checkbox checked={this.state.checked} onChange={this.allCheckFunc} value={-1}>全部</Checkbox>
              }
              {isEditMode&&getFieldDecorator('support_game', {
                 // initialValue:{datavalue.support_game},
                  initialValue: datavalue.support_game,
                 rules: [{required: false,
                   message: '子系统包含的游戏数据必填'
                }],
              })(
               <Checkbox.Group  onChange={this.onChangeCheck}>
               {this.state.gameList.map(function(item,index){
                  return(
                     <Checkbox key={item.gid} value={parseInt(item.gid)}>{item.name}</Checkbox>
                  )
              })}  
              </Checkbox.Group>
             )}
             {!isEditMode&&
                 <p className="p_group">
                  {gamecheck.map(function(item,index){
                      return(
                        <span key={index}>{item.name}</span>
                        )
                  })
                  }  
                 </p>
                }
            </FormItem>
            </Col>
            </Row>
          </Form>
          <Modal width={700} title={'登录地址'} onCancel={this.closeModal} onOk={this.updateLoginUrl} visible={this.state.showModal}>
              <EditableTable tepmLoginLink={this.state.tepmLoginLink} updateTempLoginUrl={this.updateTempLoginUrl}/>
          </Modal>
        </div>

        )
    }
}
export default getDataSubsystemDetailItemTopForm(Form.create()(SubsystemDetailItemTopForm));