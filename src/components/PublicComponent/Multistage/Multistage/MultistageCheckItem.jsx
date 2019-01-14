/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';

import CheckboxGroup from './Checkbox/CheckboxGroup'
class MultistageCheckItem extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
        }
        };
onChangeRole=(rid,cheack,rname,sysid,sysname)=>{
this.props.onChangeRole(rid,cheack,rname,sysid,sysname)
}

    render() {
       const {defaultCheackRole,data,onChangeRole}=this.props
        //设置默认的值

        return (
            <div className="MultistageCheckItem">
               {data.map(function(item, index) {
                return (
                  <div key={item.id}>
                <h3> {item.name}</h3>
               <CheckboxGroup data={item.item} 
                defaultCheackRole={defaultCheackRole}
                onChangeRole={onChangeRole.bind(this,item.id,item.name)}
                />

              </div>
                   )
            }.bind(this))
             }
          </div>
        )
    }
}
export default MultistageCheckItem;