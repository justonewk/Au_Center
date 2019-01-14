import React, { Component } from 'react';
const getDataRole = WrappedComponent => class extends Component {

    getDetail=(e) => {
        this.props.getDetail(e.target.getAttribute("data-id"))
    }
    Switch=(e) => {
        this.props.Switch(e.target.getAttribute("data-id"))
    }

    render() {
        const props = {
            ...this.props,
            getDetail: this.getDetail,
            Switch: this.Switch

        }
        return (
            <div className="RoleCard">
         <WrappedComponent {...props} />
         </div>);
    }
};
export default getDataRole;
