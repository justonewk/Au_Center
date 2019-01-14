import React from 'react';
import { Icon } from 'antd';
class SelectRole extends React.Component {
    render() {

        console.log("this.props.relevancedata", this.props.relevancedata[0])
        return (

            <div className={this.props.isEdit ? "showSelectRole" : "showSelectRoleComplete"}>
            {this.props.relevancedata.map((i, index) => {

                return (
                    <div>
                  {i.length > 0 &&
                    <div className="item-col" key={index}>
                  
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
               {i.length > 0 && <span className="itemlist"> 
              <Icon type="close"  onClick={this.props.onCancelRelevance.bind(this, index)}/>
              </span>}
                </div>
                    }
                </div>
                )
            })}
            </div>

        )

    }
}
export default SelectRole;