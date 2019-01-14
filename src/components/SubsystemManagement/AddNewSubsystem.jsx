
import React from 'react';
import SubsystemManagementHeader from './SubsystemManagementHeader'
import SubsystemManagementSiderLeft from './SubsystemManagementSiderLeft';
import AddNewSubsystemRightContent from './AddNewSubsystemRightContent';
import '../../style/SubsystemManagement.css';
import { Button, Modal } from 'antd';
import defaultimg from '../../style/imgs/subsys.png';
import addsub from '../../style/imgs/addsuccess.png';
import adderror from '../../style/imgs/adderror.png';
import { browserHistory } from 'react-router';
import { getipconfig } from '../../getipconfig';
import $ from 'jquery';
import { root } from '../../root';
const rootapp = root();
// import  commenFunc from '../../axios/commenFun'
const getip = getipconfig();

const imgurl = getip.serverip + 'temp/';
const confirm = Modal.confirm;
class AddNewSubsystem extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {
    visible: false,
    Type: 1,
    sysdata: {},
    errmsg: '',
    local_permit: window.sessionStorage.getItem('userData') == null ? [] : JSON.parse(window.sessionStorage.getItem('userData')).local_permit


  }
  CallbackData = (data) => {
    console.log("data:", data);
    if (data.ret === 1) {
      this.setState({
        visible: true,
        Type: 1,
        sysdata: data.data
      })
    }
    else {
      this.setState({
        visible: true,
        Type: 0,
        errmsg: data.errmsg
      })
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  ToDetail = () => {
    const {  sysdata } = this.state
    let obj = {
      sys_icon_name:"icon.png",
      sys_icon_path:sysdata.sys_icon_path == undefined ? defaultimg : imgurl + sysdata.sys_icon_path,
      sysdescript:"",
      syslid:sysdata.slid,
      sysname:sysdata.name,
      sysrolenum:0,
      sysstate:0
    }
    let SystemCard=JSON.parse(window.sessionStorage.getItem("SystemCard")) ;
    SystemCard.push(obj)
    window.sessionStorage.setItem("syslid", this.state.sysdata.slid);
    window.sessionStorage.setItem("SystemCard",JSON.stringify(SystemCard))
    // this.setTimeout(() => {
      browserHistory.push({
        pathname: rootapp + 'app/SubsystemDetail',
      })
    // }, 3000);
   
  }
  returnSub = () => {
    confirm({
      title: '是否确定取消新增子系统?',
      content: '如果取消则不会保存新增数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        browserHistory.push({
          pathname: '/app/SubsystemManagement',
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  screenChange = () => {
    window.addEventListener('resize', this.resize);
  }
  //完成渲染
  resize = () => {
    // 设置真实dom的高度
    // var t2 = this.refs.wrapper;
    var t = this.refs.userright;

    $(t).css("height", $(window).height() - 280)
  }
  componentDidMount() {
    this.resize();
    this.screenChange();
  }
  render() {
    const { Type, sysdata, visible, errmsg } = this.state
    return (

      <div className="SubsystemManagement">
        <SubsystemManagementHeader />
        <div className="data-wrapper">
          {/*子系统管理左边导航*/}
          <div className="left">
            <SubsystemManagementSiderLeft
              local_permit={this.state.local_permit}
              lefttitle={this.props.lefttitle} LeftSlidedatalist={this.props.LeftSlidedatalist} />
            {/*子系统管理右边具体内容*/}
          </div>
          <div className="right" ref="userright">
            <AddNewSubsystemRightContent onCancel={this.returnSub} CallbackData={this.CallbackData} />
          </div>
        </div>
        <Modal
          title={null}
          visible={visible}
          width={700}
          className="addsubModal"
          maskClosable={false}
          closable={false}
          footer={null}
        >
          {Type === 1 ?
            <img className="type" src={addsub} /> :
            <img className="type" src={adderror} />
          }
          <p className="tips">
            {Type == 1 ? <span className="success">新增子系统成功</span> :
              <span className='error'>新增子系统失败</span>}
          </p>
          {Type == 1 ?
            (<div className="detail">
              <div className="top">
                <img src={sysdata.sys_icon_path == undefined ? defaultimg : imgurl + sysdata.sys_icon_path} />
                <div className='text'>
                  <p className='title'>{sysdata.name}</p>
                  <p className='time'>{sysdata.time}</p></div>
              </div>
              <div className="desc">{sysdata.memo}</div>
              <p className="keyname">key</p>
              <p className="keytext">{sysdata.key}</p>
              <p className="keyname">slid</p>
              <p className="keytext">{sysdata.slid}</p>
              <div className='footer'>
                <Button type='primary' onClick={this.ToDetail}>详情</Button>
                <Button className="colse" onClick={this.handleCancel}>关闭</Button>
              </div>
          </div>) :
            (<div className="detail">
              <p className="errortext">{errmsg}</p>
              <div className='footer'>
                <Button type='primary' onClick={this.handleCancel}>重新编辑</Button>
                <Button className="colse" onClick={this.handleCancel}>取消</Button>
              </div>
            </div>)
          }

        </Modal>

      </div>
    )
  }
}
export default AddNewSubsystem;