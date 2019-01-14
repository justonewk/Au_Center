import React from 'react';
import getDataAddNewSubsystemRightContent from './getDataAddNewSubsystemRightContent';
import { IsURL,getCheckgamelistnew ,RemovingChannelUsers} from '../../public/CommonFuncs'
import {message,Checkbox,Icon,Upload,Button, Form, Select, Input, Row, Col,Modal } from 'antd';
import {getajax} from '../../public/ajax'
import EditableTable from './UpdateLoginUrlModal';
const Ajax=getajax.ajaxFun;
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
class AddNewSubsystemRightContent extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
      imageUrl:'',
      loading:false,
      imgFile:[],
      xmlFile:[],
      description:'',
      CheckData:[],//多选框初始化
      gameList:[],
      checked:false,
      readyImg:false,
      readyFile:false,
      Filename:'',
      imgname:'',//图片名
      allCheck:[],//全选
      tepmLoginLink:[]
    }
    sysTemName=(rule, value, callback)=>{
       if(value&&value.length<10&&value&&value.length>0){
         let data={
          systemname:value
        }
          Ajax('post','front/query','system_name_verification',data,(e)=>{
              if(e.ret===1){
                callback();
              }
              else{
               callback(e.errmsg)
              }
           })
        }else{
          callback("子系统长度为0-10位")
        }
    }
    checkUrl=(rule, value, callback) => {
        if (value.length != 0) {
            if (IsURL(value)) {
                callback();
            } else {
                callback("请输入正确url地址");
            }
        } else {
            callback();
        }
    }

    normImg = (e) => {//图片上传
        
        this.props.setImg(false,'')
       if (e.file.type != 'image/jpeg'&&e.file.type !='image/png') {
            message.error('请选择png或者jpg格式的图片');
            return ''
        }
        const isLt2M = e.file.size / 1024  < 200;
          if (!isLt2M) {
            message.error('图片不能大于200k!');
            return ''
      }
       this.props.setImg(true,e.file.name)

      console.log('图片上传:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e ;
    }
    normFile = (e) => {
       this.props.setFile(false,'')
      console.log('XML上传:', e);
      if (e.file.type != 'text/xml') {
            message.error('请选择xml文件');
            return ''
     } 
      this.props.setFile(true,e.file.name)
      //form.setFieldsValue({"support_games":e})
      if (Array.isArray(e)) {
        return e;
      }
      return e;
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
　　    //console.log("多选测试:",e);
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
      form.setFieldsValue({"support_games":e})
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
      // RemovingChannelUsers(this.props.userList)

      
    }
     // 管理员过滤
//      peoplefilterOption=(input, option)=>{
//       console.log("输入值之后的bug",input, option.props.children)
//       // if(isArray)
//       // (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// // (input, option) => option.props.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
//   }
 // 显示或关闭修改url的Modal
 showModal = () => {

  this.setState((prevState, props) => {
    
    return {
      showModal: !prevState.showModal
    }
  });
}
 // 修改临时回调地址
 updateTempLoginUrl = (loginlink) => {
  console.log(loginlink, '修改临时回调地址');
  this.setState({
    tepmLoginLink: loginlink
  });
}

// 修改登录回调地址
updateLoginUrl= () => {
  const {form} =this.props;
  this.setState({
    showModal: false
  });
  console.log("确认之后的值",this.state.tepmLoginLink)
  form.setFieldsValue(
    {  
      loginlink: JSON.stringify(this.state.tepmLoginLink),
    })
    form.validateFields((err, values) => {
      if (err) {
        return ;
      }
       console.log("确认之后的值",values)
      })
}
    render() {
        const {userList,form, onOk, onCancel,GroupList,defaultGroupId,readyImg,imgname,Filename,readyFile} = this.props;
        const {imageUrl} = this.state
        const {getFieldDecorator} = form;
        console.log("form======",form)
      
       
        const uploadButton = (
          <div>
            <Icon type={readyImg ? 'loading' : 'plus'} />
            <div className="ant-upload-text">{readyImg?"点击保存上传图片":"上传图片"}</div>
            <p className="ant-upload-hint">{readyImg?imgname:"建议60*60"}</p>
          </div>
        );
  const upImg = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file)=> {
        this.setState(({ imgFile }) => {
          const index = imgFile.indexOf(file);
          const newFileList = imgFile.slice();
          newFileList.splice(index, 1);
          return {
            imgFile: newFileList,
          };
        });
        this.props.setImg(false,file.name)
      },
      beforeUpload: (file) => {
        // console.log("图片上传之前的地址是",file,file.url)
        // this.setState(({ imgFile }) => ({
        //   imgFile: [file],
        // }));
          return false
      },
      fileList: this.state.imgFile,
    };
     const upFile = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ xmlFile }) => {
          const index = xmlFile.indexOf(file);
          const newFileList = xmlFile.slice();
          newFileList.splice(index, 1);
          return {
            xmlFile: newFileList,
          };
        });
        this.props.setFile(false,file.name)
      },
      beforeUpload: (file) => {
        this.setState(({ xmlFile }) => ({
          xmlFile: [file],
        }));
          return false
      },
      fileList: this.state.xmlFile,
    };
    return (
    <div className="userlist addSubSysytem">
     <div className="top">
       <span>{window.sessionStorage.getItem("subname")}</span>/<span className="newsubTip">新建子系统</span>
     </div>
      <Form className="addsubForm">
      <Row gutter={32}>
        <Col lg={13} xxl={13}>
        <FormItem label="子系统名称">
        {getFieldDecorator('name',
          {
          initialValue: this.state.title,
          rules: [{required: true,
                   validator: this.sysTemName
                }],
          validateTrigger: "onBlur"
          })(
          <Input  onPressEnter={onOk} placeholder="请输入子系统名称" />
          )
        }
        </FormItem>
        </Col>
         <Col lg={24} xxl={24}>
        <FormItem label="子系统图标">
        <p className="tips">点击图片上传.jpg.png格式图标（小于200kb）</p>
        {getFieldDecorator('icon', {
             getValueFromEvent: this.normImg,
             rules: [{required: false,
                   message: '请上传子系统图标'
                }],
                  validateTrigger: "onBlur"
          })(
            <Upload
            {...upImg}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            >
            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
          </Upload>
          )}
         </FormItem>
        </Col>
        <Col lg={13} xxl={13}>
        <FormItem label="版本号">
        {getFieldDecorator('version',
          {
          initialValue: this.state.title,
          rules: [{required: false,
                   message: '版本号必填'
                }],
            validateTrigger: "onBlur"
          })(
            <Input onPressEnter={onOk} placeholder="请输入版本号"/>
          )
        }
        </FormItem>
        </Col>
        <Col lg={24} xxl={24}>
        <FormItem label="子系统简介">
        {getFieldDecorator('memo',
          {
          initialValue: this.state.title,
          rules: [{required: false,
                   message: '子系统简介必填'
                }],
            validateTrigger: "onBlur"
          })(
            <Input onPressEnter={onOk} placeholder="请输入子系统简介"  />
          )
        }
        </FormItem>
        </Col>
        
        <Col lg={13} xxl={13}>
        <FormItem label="所属分组">
        {getFieldDecorator('group',
          {
          initialValue: defaultGroupId,
          rules: [{required: true,
                   message: '所属分组必填'
                }],
            validateTrigger: "onBlur"
          })(
           <Select >{
            GroupList.map(function(item,index){
              return(
                <Option key={index} value={item.gid}>{item.name}</Option>
                )
    
             })
           }
           </Select>
          )
        }
        </FormItem>
        </Col>
         <Col lg={13} xxl={13}>
        <FormItem label="管理员">
        {getFieldDecorator('contact_uid',
          {
          initialValue: this.state.title,
          rules: [{required: true,
                   message: '联系人必填'
                }],
            validateTrigger: "onBlur"
          })(
            <Select mode="multiple"
            filterOption={(input, option) => option.props.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >{
            userList.map(function(item,index){
              return(
                <Option key={index} value={item.uid}>{item.nickname}({item.username})</Option>
                )
    
             })
           }
           </Select>
          )
        }
        </FormItem>
        </Col>
         <Col lg={24} xxl={24}>
            <FormItem className="CheckGroup" label="子系统包含的游戏数据">
              <Checkbox checked={this.state.checked} onChange={this.allCheckFunc} value={-1}>全部</Checkbox>
               {getFieldDecorator('support_games', {
                 initialValue:this.state.CheckData,
                // getValueFromEvent: this.onChangeCheck,
                 //setFieldsValue:this.state.CheckData,
                 rules: [{required: false,
                   message: '子系统包含的游戏数据必填'
                }],
                  validateTrigger: "onChange"
             })(
               <Checkbox.Group  onChange={this.onChangeCheck}>
              {this.state.gameList.map(function(item,index){
                  return(
                     <Checkbox key={item.gid} value={parseInt(item.gid)}>{item.name}</Checkbox>
                    )
              })}  
              </Checkbox.Group>
             )}
            </FormItem>
            </Col>
        <Col lg={16} xxl={16}>
            <FormItem label="通知回调地址">
              {getFieldDecorator('noticelink', {
                initialValue: this.state.description,
                rules: [{required: false,
                   message: '通知回调地址必填'
                },{
                    validator: this.checkUrl
                }],
                  validateTrigger: "onBlur"
              })(
                  <Input onPressEnter={onOk} placeholder="请输入正确url地址" />
                  
                 
              )}
              
            </FormItem>
            </Col>
             <Col lg={16} xxl={16}>
              <FormItem label="登录回调地址">
              {getFieldDecorator('loginlink', {
                initialValue: this.state.description,
                rules: [{required: false,
                   message: '登录回调地址必填'
                }],
                  validateTrigger: "onBlur"
              })(
                  // <Input onPressEnter={onOk} placeholder="请输入正确url地址" />
                  <Button onClick={this.showModal} type="primary">添加登录回调地址</Button>
              )}

            </FormItem>
            </Col>
            
            <Col lg={12} xxl={12}>
        <FormItem label="上传权限文件">
        {getFieldDecorator('permitDef', {
            getValueFromEvent: this.normFile,
            rules: [{required: true,
                   message: '请上传权限文件'
                }],
                 validateTrigger: "onBlur"
          })(
            <Upload.Dragger
              name="files"
              {...upFile}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type={readyFile ? 'loading' : 'inbox'} />
                </p>
                <p className="ant-upload-text">{readyFile ?"点击保存上传文件":"点击或将文件拖拽到这里上传"}</p>
                <p className="ant-upload-hint">{readyFile ?Filename:"权限文件类型:.xml"}</p>
            </Upload.Dragger>
          )}
         </FormItem>
        </Col>
      </Row>
      </Form>
      <div  className="addSubBtnGroup"> <Button type="primary" onClick={onOk}>保存</Button>
      <Button  onClick={onCancel}>取消</Button></div> 
      <Modal width={700} title={'登录地址'} onCancel={this.showModal} onOk={this.updateLoginUrl} visible={this.state.showModal}>
    <EditableTable tepmLoginLink={this.state.tepmLoginLink} updateTempLoginUrl={this.updateTempLoginUrl}/>
</Modal>  
   </div>
  
        )
    }
}
export default getDataAddNewSubsystemRightContent(Form.create()(AddNewSubsystemRightContent));