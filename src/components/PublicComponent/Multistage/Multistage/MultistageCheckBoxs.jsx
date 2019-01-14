/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Tabs } from 'antd';

import MultistageCheckItem from './MultistageCheckItem'
const TabPane = Tabs.TabPane;
class MultistageCheckBoxs extends React.Component {

    render() {
      const {roledata,defaultCheackRole,onChangeRole,tabDeafult}=this.props
      
        //设置默认的值
       
        return (
            <div className="MultistageCheckBoxs">
            <div style={{ overflowY:"auto", }}>
            <Tabs className="tab" defaultActiveKey={tabDeafult} onChange={this.MenuTab} type="card" >
               {roledata.map(function(item, index) {
                return (
                    <TabPane tab={item.name} key={item.id} >
                     <div className="panPar"> <MultistageCheckItem data={item.item} 
                      defaultCheackRole={defaultCheackRole}
                      onChangeRole={onChangeRole}
                      />
                      </div>
                    </TabPane>
                )
            })
          }
         </Tabs>
         </div>
          </div>
        )
    }
}
export default MultistageCheckBoxs;