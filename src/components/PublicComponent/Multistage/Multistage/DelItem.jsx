/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Icon} from 'antd';

class DelItem extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
 onDelRole=(id,name)=>{
  this.props.onDelRole(id,name)
 }

    render() {
       const {data}=this.props
        //设置默认的值
   
        return (
            <div className="DelItem">
               {data.map(function(item, index) {
                return (
                  <div key={item.id}>
                <span> {item.name}</span>
                <Icon type="close" onClick={this.onDelRole.bind(this,item.id,item.name)}/>


              </div>
                   )
            }.bind(this))
             }
          </div>
        )
    }
}
export default DelItem;