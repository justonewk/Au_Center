/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Row, Checkbox } from 'antd';
import ContentListItem from './ContentListItem';
import ContentListOperation from './ContentListOperation';
import '../../../style/ContentList.css';
class ContentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    ;
    onChange=(e) => {
        console.log('checked = ' + e.target.checked);
    }

    render() {

        //设置默认的值
        const that = this;
        return (
            <div className="itemrow">
      <div className="select-wrapper">
         {this.props.hascheckbox && <Checkbox defaultChecked={this.props.checkboxcheack} onChange={this.props.CheckboxonChange.bind(this, that.props.id)} />}
      </div>
         { /*显示icon*/ }
      {this.props.hasicon ? <div className={"icon"}>
      <img src={this.props.iconurl} alt="icon"/>
      </div> : ""
            }
      { /*中间内容的加载部分*/ }
      <div className="data-wrapper" >
      {this.props.data.map((items, indexs) => {

                return ( <Row key={indexs} >
           {items.map((item, index) => {
                        return (<ContentListItem
                            titletag={index === 0 ? true : false}
                            len={items.length}
                            key={indexs + "-" + index}
                            data={item}
                           
                            optionClick={this.props.optionClick}
                            />)
                    })
                    }
          </Row>
                )

            })}

      </div>
    { /*数据的操作部分*/ }
      <div className="option-wrapper" >
      {this.props.optiondata.map((items, indexs) => {

                return (
                    <Row key={indexs} >
      <ContentListOperation
                    data={items.data}
                    objid={items.id}
                    optionClick={this.props.optionClick}/>
      </Row>
                )
            })
            }
      </div>
     
          
          </div>
        )
    }
}
export default ContentList;