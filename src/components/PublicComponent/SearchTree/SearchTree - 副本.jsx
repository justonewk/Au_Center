import React from 'react';
import { Tree,Input } from 'antd';
import getDataTree from './getDataTree';
import '../../../style/SearchTree.css';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
 const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
class SearchTree extends React.Component {
    constructor(props) {
        super(props);
        console.log("数据值:", props.data)
    }
      state = {
    // expandedKeys: ['0-0'],
    //autoExpandParent: true,
    // checkedKeys: [],
    // selectedKeys: [],
     searchValue:'',
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,

      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

   onChange = (e) => {
    const value = e.target.value;
    
    const expandedKeys = this.props.Datalist.map((item) => {
      if (item.key.indexOf(value) > -1) {
        console.log("item:",this.props.TreeData)
        return getParentKey(item.key,this.props.TreeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
     this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
    render() {
        const {getDetail, Switch} = this.props;
        return (
          <div className="tree">
          {
            this.props.current==1&&
             <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
          }
            <Tree
                checkable={this.props.current==1}
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                 >
                {this.renderTreeNodes(this.props.TreeData)}
            </Tree>
          </div>
        )
    }
}
export default getDataTree(SearchTree);