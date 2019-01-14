/**
 * .
 */
import React, { Component } from 'react';
import { validatorCheck } from '../../public/validator'

const formCreate = WrappedComponent => class extends Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errid: "",
            errmsg: {},
        }
    }
    componentWillMount() {
        this.setState({
            fields: this.props.fields
        })
    }

    validatorcallback=key => data => {
        const {errmsg} = this.state;
        errmsg[key] = data
        this.setState({
            errmsg,
        })
    }
    //两个参数
    onChange = key => e => {
        const {fields} = this.state;
        fields[key] = e.target.value;
        this.setState({
            fields,
        })
    }
    onBlur = key => e => {
        validatorCheck(key, e.target.value, this.validatorcallback(key))
    }
    handleSubmit = () => {
        this.props.handleSubmit(this.state.fields)
    }
    getField = fieldName => {
        return {
            onChange: this.onChange(fieldName),
        }
    }
    validator=fieldName => {
        return {
            onBlur: this.onBlur(fieldName)
        }

    }
    render() {
        const props = {
            ...this.props,
            errid: this.state.errid,
            errmsg: this.state.errmsg,
            handleSubmit: this.handleSubmit,
            getField: this.getField,
            validator: this.validator,
            fields: this.state.fields,
        }
        return (<WrappedComponent
            {...props}
            />);
    }
};
export default formCreate;