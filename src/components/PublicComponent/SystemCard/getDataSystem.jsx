import React, { Component } from 'react';
const getDataSystem = WrappedComponent => class extends Component {

    getDetail=(e)=>{
       this.props.getDetail(JSON.parse(e.target.getAttribute("data-data")))
    }
    Switch=(e)=>{
      this.props.Switch(JSON.parse(e.target.getAttribute("data-data")))
    }

    render() {
    	const props={
    		...this.props,
        getDetail:this.getDetail,
        Switch:this.Switch
    		
    	}
        return (
         <div className="SystemCard">
         <WrappedComponent {...props} />
         </div>);
    }
};
export default getDataSystem;
