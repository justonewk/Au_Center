import React from 'react';

class ShowSelectRole extends React.Component {
    render() {

        // console.log("this.props.relevancedata", this.props.relevancedata[0])
        return (

            <div className={this.props.isEdit ? "showSelectRole" : "showSelectRoleComplete"}>
            {this.props.relevancedata.map((i, index) => {

                return (
                <div className="item-col" key={index}>
                  <div className="itemlist" key={i.syslid}>
                  {i.sysname}
                  </div>
                  <div className="itemlist" key={i.roleid}>
                  {i.rolename}
                  </div>
                  </div>
                )
            })}
            </div>

        )

    }
}
export default ShowSelectRole;