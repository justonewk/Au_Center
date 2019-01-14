/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Button} from 'antd';
import DelItem from './DelItem'
class MultistageShowCheck extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
 onDelRole=(sysid,sysname,rid,rname)=>{
this.props.onDelRole(sysid,sysname,rid,rname)
 }

    render() {
       const {data}=this.props
        //设置默认的值
       
      console.log("删除这里的data", data)
        return (
            <div className="MultistageCheckItem">
            <p className="number">已选择了{this.props.len}个角色</p>
               <div className="contentPar">
               <div className="content">
               {data.map(function(item, index) {
               
                return (
                  
               <div key={item.id +"-"+item.name}>
                <h3> {item.name}</h3>
              <DelItem data={item.item}
              onDelRole={this.onDelRole.bind(this,item.id,item.name)}
              />
              
              </div>
              )
            }.bind(this))
             }
             </div>
             </div>
             <div className="footer">
             <Button type="primary" onClick={this.props.OK}>确认</Button>
             {this.props.showCannel&&<Button  onClick={this.props.Cannel}>取消</Button>}
             </div>
          </div>
        )
    }
}
export default MultistageShowCheck;