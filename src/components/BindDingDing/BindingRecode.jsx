
import React from 'react';
import BindingRecodeHeader from './BindingRecodeHeader'
import BindingRecodeContent from './BindingRecodeContent'
import '../../style/BindDingDing.css';
class BindingRecode extends React.Component {
  
    state = {

    }
    //大区选择
    render() {
        return (
          <div className="BindDingDing">
            <BindingRecodeHeader/>
             <div className="data-wrapper" >  
              <BindingRecodeContent type={1} {...this.props}/>
            </div>
          </div>
        )
    }
}
export default BindingRecode;