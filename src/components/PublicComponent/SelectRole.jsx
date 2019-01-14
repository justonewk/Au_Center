import React from 'react';
import {  Icon } from 'antd';
class SelectRole extends React.Component {
    render() {


        return (

            <div className={this.props.isEdit ? "showSelectRole" : "showSelectRoleComplete"}>
            {this.props.relevancedata.map((i, index) => {

                return (
                    <div className="item" key={index}>
               {i.map((item, indexs) => {
                        return (

                            <div className="itemlist" key={indexs}>
                  {indexs !== 2 && item.name}
               
                   {indexs === 2 && item.name.map((items, index) => {
                                return (<span key={items}>{items},</span>)
                            })
                            } 
                </div>


                        )
                    })}
               <div class="itemlist"> 
              <Icon type="close"  onClick={this.props.onCancelRelevance.bind(this, index)}/></div>
                </div>
                )
            })}
            </div>

        )

    }
}
export default SelectRole;