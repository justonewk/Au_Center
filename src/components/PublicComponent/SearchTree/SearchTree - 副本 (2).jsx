import React from 'react';
import { TreeSelect } from 'antd';
import getDataTree from './getDataTree';
import '../../../style/SearchTree.css';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class SearchTree extends React.Component {
    constructor(props) {
        super(props);
        console.log("数据值:", this.props.treeData)
    }
      state = {
           value: ['0-0-0'],
       }
      onChange = (value) => {
        console.log('onChange ', value, arguments);
        this.setState({ value });
      }
    render() {
       const tProps = {
          treeData:this.props.TreeData,
          value: this.state.value,
          disabled:this.props.current==2,
          onChange: this.onChange,
          treeCheckable: true,
          showCheckedStrategy: SHOW_PARENT,
          searchPlaceholder: 'Please select',
          style: {
            width: 550,
          },
      };
        return (
          <div className="tree">
            <TreeSelect {...tProps} />
          </div>
        )
    }
}
export default getDataTree(SearchTree);