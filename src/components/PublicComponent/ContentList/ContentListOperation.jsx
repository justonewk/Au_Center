/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';

import '../../../style/ContentListOperation.css';
import { setItemSegmentation } from '../../../public/CommonFuncs';

// 角色基本信息转换

class ContentListOperation extends React.Component {


    //大区选择
    render() {

        return (
            <div className="Operation-wrapper">
          {this.props.data.map((items, indexs) => {
                let that = this;
                return (
                    <span key={"option" + indexs}
                    onClick={this.props.optionClick.bind(this, items, that.props.objid)}>
              {indexs === 0 ? items : setItemSegmentation(items).map((item, index) => {
                        return (<span key={"xiexian" + index}>{item}</span>)
                    })}</span>
                )
            })}
          </div>
        )
    }
}
export default ContentListOperation;