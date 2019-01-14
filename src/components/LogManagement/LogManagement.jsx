
import React from 'react';
import LogManagementHeader from './LogManagementHeader'
import LogManagementContent from './LogManagementContent'
import '../../style/LogManagement.css';
import $ from 'jquery'
class LogManagement extends React.Component {

    state = {


    }
      screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        var t2 = this.refs.ht;
       
        
       $(t2).css("height",$(window).height()-150)

      
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
      }
    //大区选择
    render() {
        return (
          <div className="LogManagement" ref="ht">
            <LogManagementHeader/>
             <div className="data-wrapper" style={{height:" calc(100% - 108px)",overflowY: "auto",overflowX: "hidden"}}>  
               <LogManagementContent/>
            </div>
          </div>
        )
    }
}
export default LogManagement;