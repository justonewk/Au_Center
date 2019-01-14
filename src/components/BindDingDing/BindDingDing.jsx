
import React from 'react';

import BindDingDingHeader from './BindDingDingHeader'
import BindDingDingContent from './BindDingDingContent'
import '../../style/BindDingDing.css';
import $ from 'jquery'
class BindDingDing extends React.Component {

    state = {


    }
    screenChange=() => {
        window.addEventListener('resize', this.resize);
    }
    //完成渲染
    resize=() => {
        // 设置真实dom的高度
        var t2 = this.refs.ht;
        var t = this.refs.hutao;
        
       $(t).css("height",$(window).height()-150)

       $(t2).css("height",$(window).height()-208)
    }
    componentDidMount() {
        this.resize();
        this.screenChange();
      }
    //大区选择
    render() {
        return (
          <div className="BindDingDing" ref="hutao" style={{"width": "calc(100% - 32px)"}}>
            <BindDingDingHeader ref='ht'/>
             <div className="data-wrapper" style={{overflowY: "auto",overflowX: "hidden",height: "calc(100% - 108px)"}}>  
               <BindDingDingContent {...this.props}/>
            </div>
          </div>
        )
    }
}
export default BindDingDing;