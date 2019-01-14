import React from 'react';

import UserBing from './UserBing'
class BindDingDingContent extends React.Component {

  state = {
   
    }
  render() {
    return (
      <div className="data-wrapper" >  
          <UserBing {...this.props}/>
      </div>
    )
  }
}
export default BindDingDingContent;