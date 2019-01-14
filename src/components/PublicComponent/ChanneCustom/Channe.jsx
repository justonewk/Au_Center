import React from 'react';

import { Button, Input, Tree, Icon } from 'antd';

import { getdataallkey, getdataallkeyparent, getGameChanelist } from '../../../public/CommonFuncs'

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
// let svalue = "";
class Channe extends React.Component {

    state = {
        loading: false,
        visible: false,
        treeDatas: [],
        multiple: false,
        value: '',
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: false,
        trees: {},
        onserchtreeDtats: [],
        panes: [],
        checkedList: [],
        cancelcke: false,
        SendAgain: false,
        defaultExpandedKeys: [],
        defaultExpandedKeysold: [],
        treeDatasnew: [], //新树的数据
        displayoriginal: true,
        displaynew: false,
        CheckedKeys: this.props.defaultValue,
        treeDatascheckeall: [],
        treeDatascheckeallparent: [],
        CheckInverse: false,
        RenderAgain: false,
        postdata: [], //提交到后台的数据
        showdata: this.props.datacontent, //显示的数据
        rendercomplete: false, //审核的时候的设置完默认的值，在判断能否点击
        propstag: ""
    }

    componentWillMount() {
        console.log("this.props.propstag==============", this.props.propstag)
        this.ajaxshow(this.props.propstag);
        this.setState({
            propstag: this.props.propstag
        })
    }


    onExpand = (expandedKeys) => {

        this.setState({
            defaultExpandedKeysold: expandedKeys,
            autoExpandParent: true,
        });
    }
    getParentKey = (name, tree) => {
        // let parentKey;
        let dataarr = {
            id: "",
            name: "",
            children: []
        };
        let allshow = [];
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            let childrennode = [];

            if (node.children.length > 0) {
                for (let j in node.children) {
                    if (node.children[j].name.indexOf(name) > -1) {
                        // parentKey = node.id;
                        childrennode.push(node.children[j]);
                    } else {
                        continue;
                    }
                }
                if (childrennode.length !== 0) {
                    dataarr = {
                        id: node.id,
                        name: node.name,
                        children: childrennode
                    }
                    allshow.push(dataarr)
                }
            } else if (node.name.indexOf(name) > -1) {
                dataarr = {
                    id: node.id,
                    name: node.name,
                    children: childrennode
                }
                allshow.push(dataarr)
            } else {
                continue;
            }


        }

        return allshow;
    }
    //名字模糊查询

    getNewTreedata = (id, tree) => {
        // let parentKey;
        let newdata;
        for (let i in tree) {
            if (id === i) {
                newdata.push(tree[i]);
                return false;
            }
        }
        this.setState({
            treeDatas: newdata
        })
        console.log("这里设置的树的数据吗？2")
    }
 

    countChildOnTree = (key, tree) => {
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.id === key) {
                return node.children.length;
            }
        }
        return 0;
    }


    countChildOnSelected = (key, checkedKeys) => {
        let count = 0;
        for (let i = 0; i < checkedKeys.length; i++) {
            const oldkey = checkedKeys[i];
            if (oldkey !== key && oldkey.indexOf(key) >= -1) {
                count++;
            }
        }
        return count;
    }

    onchange = (e) => {

        // const dataList = this.state.treeDatas;
        const alltreeData = this.state.onserchtreeDtats;

        if (e.target.value === "") {
            console.log("这里设置的树的数据吗？1")
            this.setState({
                treeDatas: alltreeData,
                autoExpandParent: true,
                displayoriginal: true,
                treeDatasnew: [],
                displaynew: false,
                treeDatasnewcheck: [],
            })
            return;
        } else {
            let showdataall = this.getParentKey(e.target.value, alltreeData);

            //设置默认的id 
            let defaultExpandedKeys = [];
            for (let i = 0; i < showdataall.length; i++) {

                defaultExpandedKeys.push(showdataall[i].id.toString());
            }

            if (showdataall.length === 0)
                return;

            this.setState({
                displayoriginal: false,
                displaynew: true
            })

            if (showdataall.length === 0) {
                this.setState({
                    searchValue: "没有数据",
                    treeDatasnew: "没有数据",
                    autoExpandParent: false,
                    treeDatasnewcheck: [],

                })
            } else {
                let treeDatasnewcheck = getdataallkey(showdataall);
                this.setState({
                    treeDatasnew: showdataall,
                    defaultExpandedKeys: defaultExpandedKeys,
                    autoExpandParent: true,
                    treeDatasnewcheck: treeDatasnewcheck,
                })
            }

        }
    }
    //引用统一的ajax请求成功时候调用

    ajaxshow = (str) => {
        // let timesign = Date.parse(new Date());

        //修改渠道重复请求服务器的问题
        let ChanneStorage = window.sessionStorage;
        // console.log("propstag",this.props.propstag)

        let tempdata = JSON.parse(ChanneStorage.getItem("channelsList"));
        console.log("tempdata", tempdata, str)
        let tempchanne = getGameChanelist(str, tempdata)
        console.log("请求回来的渠道列表", tempchanne)
 
        let res = {
            "ret": 1,
            "v": 1,
            "data": tempchanne
        }
        // let res={"ret":1,"v":1,"data":[{"children":[{"name":"简乐官方（500-1）","id":1},{"name":"500-3","id":3},{"name":"500-4","id":4},{"name":"500-5","id":5},{"name":"今日头条1","id":10},{"name":"今日头条2","id":11},{"name":"今日头条3","id":12},{"name":"今日头条4","id":13},{"name":"段子信息流1","id":14},{"name":"段子信息流2","id":15},{"name":"段子信息流3","id":16},{"name":"段子信息流4","id":17},{"name":"UC信息流1","id":18},{"name":"UC信息流2","id":19},{"name":"UC信息流3","id":20},{"name":"UC信息流4","id":21},{"name":"百度信息流1","id":22},{"name":"百度信息流2","id":23},{"name":"百度信息流3","id":24},{"name":"百度信息流4","id":25},{"name":"爱奇艺1","id":26},{"name":"爱奇艺2","id":27},{"name":"爱奇艺3","id":28},{"name":"爱奇艺4","id":29},{"name":"今日头条5","id":30},{"name":"今日头条6","id":31},{"name":"今日头条7","id":32},{"name":"今日头条8","id":33},{"name":"段子信息流5","id":34},{"name":"段子信息流6","id":35},{"name":"段子信息流7","id":36},{"name":"段子信息流8","id":37},{"name":"UC信息流5","id":38},{"name":"UC信息流6","id":39},{"name":"UC信息流7","id":40},{"name":"UC信息流8","id":41},{"name":"百度信息流5","id":42},{"name":"百度信息流6","id":43},{"name":"百度信息流7","id":44},{"name":"百度信息流8","id":45},{"name":"爱奇艺5","id":46},{"name":"爱奇艺6","id":47},{"name":"爱奇艺7","id":48},{"name":"爱奇艺8","id":49},{"name":"追书神器1","id":50},{"name":"追书神器2","id":51},{"name":"斗鱼banner1","id":52},{"name":"斗鱼banner2","id":53},{"name":"备用包1","id":54},{"name":"备用包2","id":55},{"name":"简乐官方（安卓）","id":2},{"name":"尘缘内部人员","id":9},{"name":"尘缘老玩家回归","id":8},{"name":"尘缘朋友圈","id":7}],"name":"简乐官方","id":500},{"children":[{"name":"龙门测试","id":999}],"name":"龙门测试","id":9999}],"schemakey":null,"schemaname":null}
        // let res={"ret":1,"v":1,"data":[{"name":"简乐官方（500-1）","id":1},{"name":"500-3","id":3},{"name":"500-4","id":4},{"name":"500-5","id":5}]}
        let treeDatascheckeall = getdataallkey(res);
        let treeDatascheckeallparent = getdataallkeyparent(res);
        console.log("这里设置的树的数据吗？4", res.data)
        if (res.ret === 1) {
            if (tempchanne.length>0){
            this.setState({
                treeDatas: res.data,
                onserchtreeDtats: res.data,
                treeDatascheckeall: treeDatascheckeall,
                treeDatascheckeallparent: treeDatascheckeallparent,
                visible: true,
                rendercomplete: true,
            })
            setTimeout(() => {
                this.showcheckedList(this.state.CheckedKeys);
            }, 1);
            }else{
                this.props.onhasChanne(str)  
            }

        } 


    }
    //复选框的时候才用的
    onCheck = (checkedKeys, info) => {
        console.log("点击没有呢?", checkedKeys)

        this.showcheckedList(checkedKeys);
        this.setState({
            CheckedKeys: checkedKeys
        });

    }

    onChecknews = (checkedKeys, info) => {

        let newCheckedKeys = [];
        for (let i = 0; i < this.state.CheckedKeys.length; i++) {
            newCheckedKeys.push(this.state.CheckedKeys[i]);
        }

        if (info.checked === false) {
            //取消一个节点
            let key = info.node.props.eventKey;
            for (let j = 0; j < this.state.CheckedKeys.length; j += 1) {
                let oldkey = this.state.CheckedKeys[j];
                if (oldkey.indexOf(key) > -1) { //取消父节点时也会把其他的子节点同时取消
                    newCheckedKeys.remove(oldkey);
                }
            }
        } else {
            //添加选中节点

            for (let i = 0; i < info.checkedNodes.length; i++) {
                //新树种点击选择的
                let key = info.checkedNodes[i].key;
                let found = false;
                for (let j = 0; j < this.state.CheckedKeys.length; j++) {
                    let oldkey = this.state.CheckedKeys[j];
                    if (oldkey === key)
                        found = true;
                }

                if (!found) {
                    newCheckedKeys.push(key);
                }

            }
        }

        //如果新选中的父节点在完整树中没选中完全，则移除
        const alltreeData = this.state.onserchtreeDtats;

        for (let i = (newCheckedKeys.length - 1); i >= 0; i--) {
            let key = newCheckedKeys[i];
            if (key.indexOf("-") > -1) {
                continue;
            } else {
                let total = this.countChildOnTree(key, alltreeData);
                let selected = this.countChildOnSelected(key, newCheckedKeys);
                if (total > selected) {
                    newCheckedKeys.remove(key);
                }
            }
        }

        this.setState({
            CheckedKeys: newCheckedKeys
        });
        this.showcheckedList(newCheckedKeys);
    }
    shoudaongexpand = (info) => {
        let selectedtag = info.selected;
        let childrenhas = info.node.props.children;
        let expandedKeys = [];
        let key = info.node.props.eventKey

        expandedKeys.push(key)

        if (childrenhas !== undefined) {
            if (!selectedtag) {
                this.setState({
                    defaultExpandedKeysold: expandedKeys,
                    autoExpandParent: true,
                });
            } else {
                this.setState({
                    defaultExpandedKeysold: [],
                    autoExpandParent: true,
                });
            }
        }
    }

    onSelect = (selectedKeys, info) => {

        console.log('selected', selectedKeys, info);
        this.shoudaongexpand(info);
        this.showcheckedList(selectedKeys);
        this.setState({
            CheckedKeys: selectedKeys
        });
    }
    onSelectnewtree = (selectedKeys, info) => {
        // console.log("this.state.CheckedKeysne",this.state.CheckedKeys)
        console.log('selectednewtree', selectedKeys, info);
        this.shoudaongexpand(info);
        this.showcheckedList(selectedKeys);
        this.setState({
            CheckedKeys: selectedKeys
        });
    }


    onChangecheckall = (zhi) => {

        let showdiv = "";
        let xianshi = "";
        if (zhi.length === 0) {
            showdiv = "none";
            xianshi = true;
        } else {
            showdiv = "block"
            xianshi = false;
        }
        console.log("全选的值", zhi)
        this.showcheckedList(zhi);
        //将选中的值保存在选择列表中
        this.setState({
            CheckedKeys: zhi,
            RenderAgain: true,
            multiple: !xianshi,
            display: showdiv,
            cancelcke: xianshi,

        })
    }
    onCheckInverse = (zhi) => {
        this.showcheckedList(zhi);
        this.setState({
            CheckedKeys: zhi,
            CheckInverse: true,
        })
    }
    componentWillReceiveProps(nextProps) {
        // console.log("值穿过来了没有呢",nextProps.datacontent)
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                CheckedKeys: nextProps.defaultValue,
                showdata: nextProps.datacontent
            })
        }
    }
    showcheckedList = (checkedList) => {

        let showcheckedListname = []; //选中数据的渲染的name
        let postchecklist = [];
        let selectkey = [];
        let datas = this.state.treeDatas; //树子的所有数据
        // console.log("数据有修改吗？",this.state.treeDatas)
        let presentcheckedList = [];
        // let flag = false; //表示是否选择父节点,默认为flase
        //选中的值要用赋值引用，不能为地址引用
        for (let i = 0; i < checkedList.length; i++) {
            presentcheckedList.push(checkedList[i]);
        }
        console.log("checkedListcheckedListcheckedList=====", checkedList)
        for (let key in checkedList) {
            //找到全选父节点，删除父节点下的字节点
          
            if (key !== "remove" && key !== "removeByValue") {
                console.log("这里的数据结构有问题,", checkedList[key].indexOf("-"), checkedList[key].indexOf("-") === -1, checkedList[key].indexOf("-") === -1)
                if (checkedList[key].indexOf("-") === -1) {

                    //找到全选的
                    let nowid = "";
                    let nowname = "";
                    let foundkey = checkedList[key]
                    
                    //找到全选的父节点
                    for (let m in datas) {
                        // console.log("KKKdatas[m]",datas,datas[m])
                        if (datas[m] === "remove" && datas[m] === "removeByValue") {
                            continue;
                        } else {
                            // console.log("KKK1datas[m].id", foundkey, datas[m].id)
                            //当==变为===的时候，就会出现数字和字符串不相等的情况，parseInt
                            if (datas[m].id === foundkey) {
                                // console.log("KKK2",foundkey,datas[m].id)
                                selectkey.push(datas[m].id.toString())
                                nowname = datas[m].name + "全部";
                                nowid = datas[m].id;
                                // postchecklist.push(nowid.toString());
                                let boj = {
                                    "key": nowid,
                                    "value": nowname
                                }
                                showcheckedListname.push(boj);
                                // console.log("走的这里重置2")
                                //删除选中父节点下的子节点
                                for (let j = presentcheckedList.length - 1; j >= 0; j--) {
                                    let key = ""
                                    if (presentcheckedList[j].indexOf("-") > -1) {
                                        let array2zhi = presentcheckedList[j].split("-");
                                        key = array2zhi[0];
                                    }
                                    if (presentcheckedList[j] === foundkey || key === foundkey) {
                                        presentcheckedList.removeByValue(presentcheckedList[j]);

                                    }
                                }

                                break;
                            }
                        }
                    }
                }

            }
        }
        console.log("这里显示的值是:", showcheckedListname)
        for (let childrenkey = presentcheckedList.length - 1; childrenkey >= 0; childrenkey--) {

            let idarry = presentcheckedList[childrenkey].split("-"); //选择当个的
            for (let allkey in datas) {
                if (datas[allkey] === "remove" && datas[allkey] === "removeByValue") {
                    continue;
                } else {
                    if (datas[allkey].id === idarry[0]) {
                        for (let chk = 0; chk < datas[allkey].children.length; chk++) {

                            if (idarry[1] === datas[allkey].children[chk].id) {
                                console.log("走的这里重置1")
                                let boj = {
                                    "key": presentcheckedList[childrenkey],
                                    "value": datas[allkey].children[chk].name
                                }
                                postchecklist.push(presentcheckedList[childrenkey]);
                                showcheckedListname.push(boj);
                            }
                        }
                    } else {
                        continue;
                    }
                }
            }
        }

        //父节点没有选中，子节点的名字
        console.log("重新提交和发送走了这里没有？掉重复的", checkedList.length, this.state.treeDatascheckeall.length, this.state.treeDatascheckeallparent.length)
        if (checkedList.length === this.state.treeDatascheckeall.length) {
            let alldata = "";
            if (checkedList.length === this.state.treeDatascheckeall.length && checkedList.length === 0) {
                alldata = [{
                    "key": "-1",
                    "value": []
                }];
            } else {
                // alldata=["全部站点渠道"];
                alldata = [{
                    "key": "-1",
                    "value": ["全部站点渠道"]
                }];
                // this.setState({CheckedKeys:selectkey})
            }
            console.log("checkedListselectkey============", checkedList, this.state.CheckedKeys, selectkey)
            this.setState({
                postdata: checkedList,
                showdata: alldata,
            })
        } else {
            this.setState({
                postdata: checkedList,
                showdata: showcheckedListname
            })
        }


    }
    // 确认选择
    Ok = () => {
        // 向上提交数据
        console.log("选中的渠道", this.state.postdata, this.state.showdata)
        // this.setState({gameListOK:true})
        this.props.onOK(this.state.postdata, this.state.showdata)
    }
    // 取消选择
    Cancel = () => {
        // 取消数据
        // this.setState({
        //   checkedList: [],
        //   showselectdata:[],
        // })

        // console.log("dianji")
        this.props.onCancel();
    }
    // 右边删除
    oncloseList = (data) => {
        let temp = this.state.postdata;
        let temp2 = this.state.showdata;
        let temp3 = [];
        let temp4 = [];
        // console.log("删除的data",data,this.state.postdata,this.state.showdata)

        if (data !== "-1") {
            // console.log("删除的值",data,data.indexOf("-"))
            if (data.indexOf("-") === -1) {

                for (let i = 0; i < temp.length; i++) {
                    // console.log("删除的值22",temp[i].indexOf(data.toString()))
                    if (temp[i].indexOf(data.toString()) === -1) {
                        temp4.push(temp[i])
                    }
                }
                    temp = temp4;
            } else {
                temp.remove(data)
            }
            for (let i = 0; i < temp2.length; i++) {
                if (temp2[i].key !== data) {
                    temp3.push(temp2[i])
                }
            }
        } else {
            temp = [];
            temp3 = []
        }
        this.setState({
            postdata: temp,
            CheckedKeys: temp,
            showdata: temp3
        })
    }
    render() {
        // const SHOW_PARENT = TreeSelect.SHOW_PARENT;
        const { visible } = this.state;
        const { autoExpandParent } = this.state;
        // console.log("显示选择的数据",this.state.CheckedKeys)
        return (
            <div>
                {this.props.isShow && visible && <div className="Channemodel" >
                    <div className="wrapper">
                        <div className="showcontent">
                            <Search style={{
                                width: 240
                            }}
                                disabled={this.state.rendercomplete ? !(this.props.stateshow) : false}
                                placeholder="选择渠道站点"
                                onChange={this.onchange}
                            // onSearch={this.onSearch2} 
                            />
                            <div className="showtree">
                                { /*原始树*/}
                                <div className="Treeobj" style={{
                                    display: this.state.displayoriginal ? "block" : "none"
                                }}>
                                    { /*原始树和新树都在显示前后重新构造,全选，反选，清空功能后重新*/}
                                    {
                                        (this.state.displayoriginal)
                                            ?
                                            <Tree
                                                checkable
                                                multiple={this.state.multiple}
                                                className="treeoriginal"
                                                disableCheckbox={false}
                                                expandedKeys={this.state.defaultExpandedKeysold}
                                                // onSelect={this.onSelect}
                                                onCheck={this.onCheck}
                                                onExpand={this.onExpand}
                                                selectedKeys={this.state.CheckedKeys.length > 0 ? this.state.CheckedKeys : []}
                                                checkedKeys={this.state.CheckedKeys}
                                                defaultSelectedKeys={this.state.CheckedKeys}
                                                defaultCheckedKeys={this.props.defaultValue.length > 0 ? this.props.defaultValue : []}

                                                autoExpandParent={autoExpandParent}
                                            >

                                                {this.state.treeDatas.map(function (item, index) {

                                                    let parentkey = item.id;

                                                    return (
                                                        <TreeNode title={item.name + "[" + item.id + "]"} key={item.id.toString()} disabled={this.state.rendercomplete ? !(this.props.stateshow) : false}>

                                                            {item.children.map(function (item, index) {
                                                                return (
                                                                    <TreeNode title={item.name + "[" + parentkey + "-" + item.id + "]"} key={`${parentkey}-${item.id}`} />
                                                                )
                                                            })

                                                            }
                                                        </TreeNode>
                                                    )
                                                }.bind(this))

                                                }

                                            </Tree>
                                            : null
                                    }


                                </div>
                                { /*新树*/}
                                <div id="newtreediv" className="Treeobj" style={{
                                    display: this.state.displayoriginal ? "none" : "block"
                                }}>
                                    {(this.state.treeDatasnew.length > 0)
                                        ?
                                        <Tree
                                            checkable
                                            className="treeoriginal"
                                            expandedKeys={this.state.defaultExpandedKeys}
                                            // onSelect={this.onSelectnewtree}
                                            onCheck={this.onChecknews}
                                            onExpand={this.onExpand}
                                            autoExpandParent={autoExpandParent}
                                            defaultSelectedKeys={this.state.CheckedKeys}
                                        >
                                            {this.state.treeDatasnew.map(function (item, index) {
                                                let parentkey = item.id;
                                                return (
                                                    <TreeNode title={item.name + "[" + item.id + "]"} key={item.id}>

                                                        {item.children.map(function (item, index) {
                                                            return (
                                                                <TreeNode title={item.name + "[" + parentkey + "-" + item.id + "]"} key={`${parentkey}-${item.id}`} />
                                                            )
                                                        })

                                                        }
                                                    </TreeNode>
                                                )
                                            })

                                            }

                                        </Tree>
                                        : null
                                    }

                                </div>
                            </div>
                            <div style={{
                                opacity: this.state.displayoriginal ? 1 : 0
                            }}>
                            </div>
                        </div>
                        <div className="showSelect" key="showSelect">
                            { /*选择的渠道*/}
                            <div className="agents" key="agents">
                                <p>已经选择的渠道站点</p>
                                <div className="agentsCotnent">
                                    {this.state.showdata.map(function (item, index) {

                                        return (
                                            <div key={index} className="showagengt">{item.value}
                                                <Icon type="close-circle" onClick={() => this.oncloseList(item.key)} /></div>
                                        );
                                    }.bind(this))
                                    }

                                </div>
                                
                            </div>
                            <div className="footer">
                                <Button type="primary" onClick={() => this.Ok()}>确定</Button>
                                <Button onClick={() => this.Cancel()}>取消</Button>


                            </div>
                        </div>
                    </div>
                </div>
                }
                {!visible&&<p className="noChannel-wrapper">没有渠道可以选择</p>}
              
            </div>
        );
    }
}
export default Channe;
