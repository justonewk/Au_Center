import React, { Component } from 'react';
const datalist=[];

const getDataTree = WrappedComponent => class extends Component {

    state={
                 
    }
 
     render() {
        //  console.log("树的数据是什么===================",this.props)
    	const props={
    		...this.props,
    		 // TreeData:this.state.TreeData,
         Datalist:datalist,
    	}
        return (
         <div className="SearchTree">
         <WrappedComponent {...props} />
         </div>);
    }
};
export default getDataTree;
