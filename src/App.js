import React, { Component } from 'react';
import { Layout, } from 'antd';
import './style/variables.less';
import './style/login.css';
import './style/index.css';
import 'antd/dist/antd.css';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const {Content, Footer, } = Layout;
class App extends Component {

    // constructor(props) {
    //   super(props);
    //   // this.props.location;
    // }
    state = {
        local_permit: window.sessionStorage.getItem('userData') == null ? [] : JSON.parse(window.sessionStorage.getItem('userData')).local_permit,
        collapsed: false,
        pathname: "/App/Recharge",
        urlpath: "Recharge",
        siderdatalist: [],
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentWillReceiveProps(nextProps) {
        if (this.state.pathname !== nextProps.location.pathname) {
            console.log(nextProps.location.pathname);
            let urlall = nextProps.location.pathname.split("/");
            let len = urlall.length;
            this.setState({
                pathname: nextProps.location.pathname,
                urlpath: urlall[len - 1],
            });
            return false
        }
    }
    componentDidMount() {
        const {local_permit} = this.state
        let temp = ["Home"];
        if (local_permit["md_user_mgr.op_user_mgr"]) {
            temp.push("UserManagement")
        }
        if (local_permit["md_subsys_mgr.op_subsys_mgr"]) {
            temp.push("SubsystemManagement")
        }
        if (local_permit["md_channel_mgr"]) {
            temp.push("ChannelManagement")
        }
        if (local_permit["md_logfile_mgr"]) {
            temp.push("LogManagement")
        }
        if (local_permit["md_dingding_binding"]) {
            temp.push("BindDingDing")
        }
        if (local_permit["md_system_setting"]) {
            temp.push("SystemSetting")
        }
        //temp.push("CooperationManagement", "Information")
        console.log("temp", temp)
        this.setState({
            siderdatalist: temp
        })
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize)
    }
    onWindowResize = () => {
        this.setState({
            whei: document.body.clientHeight - 150
        })
    }
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
            <Layout className="ant-layout-has-sider">
    <SiderCustom datalist={this.state.siderdatalist}
            path={this.state.urlpath} collapsed={this.state.collapsed} />
              <Layout >
                <HeaderCustom className="Top" toggle={this.toggle}  pathname={this.state.urlpath}/>
                <Content className="Content" style={{
                margin: '0 16px',
                overflow: 'initial',
                width: '100%',
                boxSizing: 'border-box'
            }}>
              {this.props.children}
                </Content>
                <Footer className="Foot" style={{
                textAlign: 'left'
            }}>
                  © 2018 成都简乐互动有限公司
                </Footer>
              </Layout>
            </Layout>
            </LocaleProvider>
        );
    }
}

export default App;