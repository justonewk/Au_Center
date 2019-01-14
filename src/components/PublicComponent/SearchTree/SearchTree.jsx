import React from 'react';
import { Tree } from 'antd';
import getDataTree from './getDataTree';
import '../../../style/SearchTree.css';
const TreeNode = Tree.TreeNode;

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

    state = {
   
    expandedKeys:[],
   
    checkedKeys: [],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys,e) => {
    
    let temp=[]
    e.checkedNodes.forEach(function(item,index){
        temp.push(item.key)
    }) 
     this.setState({ checkedKeys:temp });
     this.props.getCheckData(temp)
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });

  }
  renderTreeNodes = (data,pkey) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode  disabled={this.props.current===2} title={item.name} key={pkey==null?item.key:(pkey+'.'+item.key)} dataRef={item}>
            {this.renderTreeNodes(item.children,pkey==null?item.key:(pkey+'.'+item.key))}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={item.name}   key={pkey==null?item.key:(pkey+'.'+item.key)} disabled={this.props.current===2}/>;
    });
  }
    render() {
        const {defaultTree,checkable} = this.props;
        // console.log("树种的值是=====",defaultTree,this.state.selectedKeys)
        return (
          <div className="tree">
            <Tree
                checkable={checkable }
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                defaultCheckedKeys={defaultTree}
                checkedKeys={defaultTree}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                 >
                {this.renderTreeNodes(this.props.TreeData,null)}
            </Tree>
          </div>
        )
    }
}
export default getDataTree(SearchTree);