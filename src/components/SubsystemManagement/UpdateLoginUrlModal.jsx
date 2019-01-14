import React, { Component } from 'react';

import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { IsURL } from '../../public/CommonFuncs'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    console.log(this.props, 'cell');
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      console.log(...record, 'record', values);
      handleSave({ ...record, ...values });
    });
  }

  checkUrl=(rule, value, callback) => {
    if(value===null){
       callback();
    }
    else if (value.length != 0) {
         if (IsURL(value)) {
             callback();
         } else {
             callback("请输入正确url地址");
         }
     }
      else {
         callback();
     }
 }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: dataIndex === 'ip' ? `请输入正确的url地址` : `${title}是必须的.`,
                        validator: dataIndex === 'ip' ? this.checkUrl : (rule, value, cb) => (cb()),
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    }, {
      title: 'url地址',
      dataIndex: 'ip',
      editable: true,
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

  }

  state = {
    dataSource: this.props.tepmLoginLink,
    count: this.props.tepmLoginLink.length
  }

  componentDidMount() {
    this.setState({
      dataSource: this.props.tepmLoginLink.map((item, index) => ({key: index+1, name: item.name, ip: item.ip})),
      count: this.props.tepmLoginLink.length
    }, () => console.log(this.state));
  }

  componentWillReceiveProps(nexprops) {
    console.log(nexprops);
    this.setState({
      dataSource: nexprops.tepmLoginLink.map((item, index) => ({key: index+1, name: item.name, ip: item.ip})),
      count: nexprops.tepmLoginLink.length
    }, () => console.log(this.state));
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    this.props.updateTempLoginUrl(dataSource.filter(item => item.key !== key));
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count+1,
      name: `新的系统`,
      ip: `www.example.com`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    console.log('newData:', newData);
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    console.log(newData);
    this.props.updateTempLoginUrl(newData);
  }

  render() {
   
    const { dataSource } = this.state;
    console.log("dataSource===",dataSource)
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增地址
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{defaultPageSize: 5}}
        />
      </div>
    );
  }
}
