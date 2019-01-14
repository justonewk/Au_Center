
import React from 'react';
import SystemSettingHeader from './SystemSettingHeader'
import SystemSettingContent from './SystemSettingContent'
import '../../style/SystemSetting.css';
import $ from 'jquery'
class SystemSetting extends React.Component {

    state = {
       local_permit:JSON.parse(window.sessionStorage.getItem('userData')).local_permit
    }
     screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        var t2 = this.refs.SystemSettingContent;
       $(t2).css("height",$(window).height()-150) 
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
      }
    //大区选择
    render() {
        return (
           <div className="SystemSetting"ref="SystemSettingContent">
            <SystemSettingHeader/>
             <div className="data-wrapper" >  
               <SystemSettingContent local_permit={this.state.local_permit}/>
            </div>
          </div>
        )
    }
}
export default SystemSetting;