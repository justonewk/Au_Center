import $ from 'jquery';
/**
 * 公共函数方法等
 */

// export const getmd5=(gmid,token,timesign)=>{
//     var obgj="";
//         obgj="gmid"+gmid+"token"+token+"time"+timesign;
//          var password= md5.hex(obgj);
//     return  password
//   }

//判断是否为，号分隔
export const CheckStr = (str) => {
    var SpecialCharacters = "@/'\"#$%&^*:;,";
    var i = 0;
    for (i = 0; i < SpecialCharacters.length - 1; i++) {
        if (str.IndexOf(SpecialCharacters.charIndex(i)) !== -1) {
            if (SpecialCharacters.charIndex(i) === ",") {
                return true;
            } else {
                return false;
            }

        }
    }
    return false;
}
export const Huanghan = (data) => {
    console.log("data", data)
    let divdata = "";
    for (let i = data.length - 1; i >= 0; i--) {
        // divdata+=data[i]+"\r\n"
        divdata += data[i] + "\r\n"
    }
    divdata += "";
    return divdata;
}
//是否输入正确的url
export const IsURL = (str_url) => {
    // var strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
    //     '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
    //     +
    //     '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    //     +
    //     '|' // 允许IP和DOMAIN（域名）
    //     +
    //     '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
    //     +
    //     '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
    //     +
    //     '[a-z]{2,6})' // first level domain- .com or .museum
    //     +
    //     '(:[0-9]{1,4})?' // 端口- :80
    //     +
    //     '((/?)|' // a slash isn't required if there is no file name
    //     +
    //     '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    //var re = new RegExp(strRegex);
    var re = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;

    //re.test()
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}


//时间戳转换
export const getNowFormatDate = (str) => { //str为传入的时间戳
    var date = new Date(str);

    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var srthours = date.getHours();
    var strminute = date.getMinutes();
    var strsec = date.getSeconds()
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (srthours >= 0 && srthours <= 9) {
        srthours = "0" + srthours;
    }
    if (strminute >= 0 && strminute <= 9) {
        strminute = "0" + strminute;
    }
    if (strsec >= 0 && strsec <= 9) {
        strsec = "0" + strsec;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + srthours + seperator2 + strminute +
        seperator2 + strsec;
    return currentdate;
}


//解析SchemaKey, SchemaName
export const parseSchemaToMap = (schemaKeys, schemaNames) => { //str为传入的时间戳
    var schemaMap = new Map();


    for (var i = schemaKeys.length - 1; i >= 0; i--) {
        var key = schemaKeys[i];
        // var name = schemaNames[i];
        let array = key.split(".");


        for (var j = 0; j < array.length; j++) {
            console.log(array[j])
        }
    }

    //NOT FINISHED
    return schemaMap;
}
// 动态构造多级树结构dom
export const setSlide = (menus) => {
    // var name = "";
    for (var i = 0; i < menus.length; i++) {
        menus[i].label = menus[i].name;
        menus[i].value = menus[i].id;
        (function (data) {
            console.log('遍历')
            var m = arguments[0];
            for (var j = 0; j < m.length; j++) {
                console.log(m[i].name);
                m[i].label = m[i].name
                if (m[j].children != null && m[j].children.length > 0) {
                    arguments.callee(m[j].children); //递归匿名方法
                }
            }
        })(menus[i].children);
    }
}
export const zidianfangyi = (name) => {
    var obj = {
        url: "",
        name: ""
    }
    switch (name) {
        case "Home": //首页
            obj.url = "Home";
            obj.name = "首页";
            break;
        case "SubsystemManagement": //子系统管理
            obj.url = "SubsystemManagement";
            obj.name = "子系统管理";
            break;
        case "UserManagement": //用户管理界面
            obj.url = "UserManagement";
            obj.name = "用户管理";
            break;
        case "ChannelManagement": //渠道管理
            obj.url = "ChannelManagement";
            obj.name = "渠道管理";
            break;
        case "LogManagement": //日志管理
            obj.url = "LogManagement";
            obj.name = "日志管理";
            break;
        case "SystemSetting": //游戏管理
            obj.url = "SystemSetting";
            obj.name = "系统设置";
            break;
        case "CooperationManagement": //合作平台管理
            obj.url = "CooperationManagement";
            obj.name = "合作平台管理";
            break;
        case "Information": //消息管理
            obj.url = "Information";
            obj.name = "消息";
            break;
        case "BindDingDing": //钉钉绑定
            obj.url = "BindDingDing";
            obj.name = "用户绑定";
            break;
        default:;


    }
    return obj;

}
// 动态设置classname
export const setItemClassName = (statetepm) => {
    let tempclassname = ""
    switch (statetepm) {
        case 0: tempclassname = "hasok"; break;
        case 1: tempclassname = "hasforbid"; break;
        default: tempclassname = ""; break;
    }
    return tempclassname;
}
//在显示文本中设置点，并翻译状态
export const setItemDot = (item) => {
    let str = [];
    switch (item) {
        case 0: str = [".", "正常"]; break;
        case 1: str = [".", "禁用"]; break;
        default: str = [item]; break;
    }
    return str
}
// 设置分割线
export const setItemSegmentation = (item) => {
    let str = item ==='' ? [] : ["|", item];


    return str
}

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);

    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        }
    }
}
export const GetUserALLnum = (data) => {
    let alldata = 0
    for (var i = 0; i < data.length; i++) {
        alldata = alldata + data[i].memnum
    }
    return alldata
}
export const SetUserListData = (dataALL, tag, Permit) => {
    //  console.log("是不是Permit",dataALL, tag, Permit)
    //转为为可以使用过的数据
    let arry = [];
    let Adminarry = [];
    let dataall = { "Admin": "", "group": "" }
    // console.log("wk的数据222",dataALL)
    for (let i = 0; i < dataALL.length; i++) {
        //  console.log("wk的数据",dataALL[i])
        let objall = {
            "data": "", "optiondata": "",
            "iconurl": "",
            "checkboxcheack": false,
            "id": "1001"
        }
        let arry2 = [];
        let arry3 = [];
        let arry4 = [];
        let titlename = dataALL[i].nickname + "(" + dataALL[i].username+")"
        


        let obj1 = { "title": titlename, "data": [dataALL[i].rolename],"id":dataALL[i].uid }
        let obj2 = { "title": "状态", "data": [dataALL[i].userstate] }
        let optionfont = Permit.op_uesr_disable ? (dataALL[i].userstate === 0 ? "禁用" : "启用") : ""
        // 
        let deloption = dataALL[i].isAdmin ? "取消管理员权限" : "移除"
        let showzhi = Permit.op_usergroup_del ? ["详情", optionfont, deloption] : ["详情", optionfont]
        let dataoptiontemp = tag === "all" ? ["详情", optionfont] : showzhi;
        let obj3 = { "id": dataALL[i].uid, "data": dataoptiontemp }
        arry4.push(obj1)
        arry4.push(obj2)
        arry2.push(arry4)
        arry3.push(obj3)
        objall.data = arry2;
        objall.checkboxcheack = dataALL[i].checkboxcheack
        objall.optiondata = arry3;
        objall.id = dataALL[i].uid;
        if (dataALL[i].isAdmin) {
            Adminarry.push(objall)
        } else {
            arry.push(objall)
        }

    }
    dataall.Admin = Adminarry;
    dataall.group = arry
    // console.log("dataall============",dataall)
    return dataall

}
export const getsubSystem = (data, nextSubsystem, nextrole) => {
    let obj = { "data": "", "init": "", "initname": "" };
    let subsystemdata = [], initsubsystem = "", initsubsystemname = "";
    let allobj = { "subsystem": "", "role": "" };
    for (let j = 0; j < data.item.length; j++) {
        if (nextSubsystem === "") {
            initsubsystem = "";
            initsubsystemname = "";
            allobj.role = getroledata(data.item[0], "")
        } else {
            initsubsystem = nextSubsystem;
            initsubsystemname = data.item[j].name;
            if (data.item[j].id === nextSubsystem) {
                allobj.role = getroledata(data.item[j], nextrole)
            }
        }
        let objsub = { "name": data.item[j].name, "id": data.item[j].id }
        subsystemdata.push(objsub)

    }
    obj.data = subsystemdata;
    obj.init = initsubsystem;
    obj.initname = initsubsystemname;
    allobj.subsystem = obj;
    return allobj
}
export const getroledata = (data, nextrole) => {
    let obj = { "data": "", "init": "", "initname": "" }
    let roledata = [], initrole = [], initrolename = [];
    for (let k = 0; k < data.item.length; k++) {

        let objrole = { "name": "", "id": "" }
        if (nextrole === "") {
            // console.log("zhishi",data.item[0].id)
            initrole = []
            initrolename = []
        } else {
            initrole = nextrole;
            // console.log("$.inArry(data.item[k].id,nextrole)",$.inArray(data.item[k].id,nextrole))
            if ($.inArray(data.item[k].id, nextrole) > -1) {
                initrolename.push(data.item[k].name)
            }
        }
        objrole = { "name": data.item[k].name, "id": data.item[k].id }
        roledata.push(objrole);

    }
    obj.data = roledata;
    obj.init = initrole;
    obj.initname = initrolename;
    return obj
}
export const getdataallkey = (resdata) => {
    var allkey = [];
    for (var i in resdata.data) {
        if (i !== "removeByValue" && i !== "remove") {
            var parentkey = resdata.data[i].id.toString()
            allkey.push(parentkey);
            for (var j = 0; j < resdata.data[i].children.length; j++) {
                var checkedKey = resdata.data[i].children[j].id.toString();
                var checkedKeys = parentkey + "-" + checkedKey
                allkey.push(checkedKeys);
            }
        } else {
            continue;
        }
    }

    return allkey;
}
export const getdataallkeyparent = (resdata) => {
    var allkey = [];
    for (var i in resdata.data) {
        if (i !== "removeByValue" && i !== "remove") {
            var parentkey = resdata.data[i].id.toString()
            allkey.push(parentkey);
        } else {
            continue;
        }
    }
    return allkey;
}
// 去除下线游戏
export const getCheckgamelist = (data) => {
console.log("过滤没有?===========",data)
    let tempdata = []
    for (let i = 0; i < data.length; i++) {
        // console.log("找到下线的没有呢？",data[i].name.indexOf("已下线"))
        if (data[i].name.indexOf("已下线")===-1){   
        let obj = { label: data[i].name, value: data[i].gid }
        tempdata.push(obj)
    }
    }
    return tempdata
}
// 胡涛的下线
export const getCheckgamelistnew = (data) => {
    // console.log("过滤没有?===========",data)
        let tempdata = []
        for (let i = 0; i < data.length; i++) {
            // console.log("找到下线的没有呢？",data[i].name.indexOf("已下线"))
            if (data[i].name.indexOf("已下线")===-1){   
            let obj = { name: data[i].name, gid: data[i].gid }
            tempdata.push(obj)
        }
        }
        return tempdata
    }
//过滤渠道用户
export const RemovingChannelUsers = (data) => {
    // console.log("过滤没有?===========",data)
        let tempdata = []
        for (let i = 0; i < data.length; i++) {
            //  console.log("找到下线的没有呢？",data[i].partner===null)
            if (data[i].partner===null||data[i].partner===""){   
          
            tempdata.push(data[i])
        }
        }
        return tempdata
    }
// 复选框通过id找name
export const searchIdToName = (data, idArray) => {
    let namearry = [];
    for (let i = 0; i < data.length; i++) {
        if ($.inArray(data[i].value, idArray) > -1) {
            namearry.push(data[i])
        }
    }
    return namearry
}
// 复选框通过name找id
export const searchNameToId = (data, NameArray) => {
    let idarry = [];
    for (let i = 0; i < data.length; i++) {
        if ($.inArray(data[i].labe, NameArray) > -1) {
            idarry.push(data[i])
        }
    }
    return idarry
}
export const getroleid = (data) => {
    let roleid = [];
    for (let i = 0; i < data.length; i++) {
        roleid.push(...data[i][2].id)
    }
    return roleid
}
export const getSystemData = (data) => {
    console.log("data============", data)
    let dataall = { "prentkey": [], "childrenkey": [] }
    for (let j = 0; j < data.length; j++) {
        dataall.prentkey.push(data[j][0].id)
        dataall.childrenkey.push(data[j][1].id)
    }
    return dataall
}
export const ConstructPostData = (data) => {
    console.log("这里的只是",data)
    //获取每个游戏提交的数组
    let tempdata = [];
    for (let i = 0; i < data.length; i++) {
        // 表明选择了渠道

        if (data[i].checkedList.length > 0) {
            // console.log("data[i].checkedList.length",data[i].checkedList.length)
            // 选择当前游戏的所有渠道
            let str = data[i].value
            if (data[i].showcheckedListname.length === 1 && data[i].showcheckedListname["0"].key === "-1") {
                str += ":all"
            } else {
                // 选择多个渠道，又没有全选
                str += ":"
                for (let j = 0; j < data[i].showcheckedListname.length; j++) {
                    if (j === data[i].showcheckedListname.length - 1) {
                        str += data[i].showcheckedListname[j].key
                    } else {
                        str += data[i].showcheckedListname[j].key + ","
                    }

                }
            }
            tempdata.push(str)
        }
    }
    // console.log("最后的渠道数据是",tempdata)
    return tempdata
}
export const getGameListData = (data) => {
    let datatemp = [];

    for (let i = 0; i < data.children.length; i++) {
        let obj = { "name": data.children[i].name, "gid": data.children[i].key }
        datatemp.push(obj)

    }
    return datatemp
}
export const getGameroleData = (data) => {
    let datatemp = [];

    for (let i = 0; i < data.children.length; i++) {
        let obj = { "label": data.children[i].name, "value": data.children[i].key, "data": data.children[i].role }
        datatemp.push(obj)

    }
    return datatemp
}
export const getGamelistid = (data) => {
    let tempdata = [];
    for (let i = 0; i < data.length; i++) {
        tempdata.push(data[i].value)
    }
    return tempdata
}

export const getChannelData = (data, id) => {
    let tempdata = { "checkedList": [], "showcheckedListname": [] }
    for (let i = 0; i < data.length; i++) {
        console.log("传入进来的值是=====", data, id);
    
        if (data[i].key === id) {
            console.log(data[i].children)
            // if (data[i].children.children) {
            //表示部分渠道
            for (let j = 0; j < data[i].children.length; j++) {
                if (data[i].children[j].children) {
                    // console.log(data[i].children[j].children)
                    for (let k = 0; k < data[i].children[j].children.length; k++) {
                        // console.log("这里的值1",data[i].children[j].children[k].key,data[i].children[j].key)
                        if (data[i].children[j].children[k].key === "-1") {
                            let tempobj = { "value": data[i].children[j].name + "全部", "key": data[i].children[j].key }
                            tempdata.checkedList.push(data[i].children[j].key)
                            tempdata.showcheckedListname.push(tempobj)
                        } else {
                            let showkey = data[i].children[j].key + "-" + data[i].children[j].children[k].key

                            let tempobj = { "value": data[i].children[j].children[k].name, "key": showkey }
                            tempdata.checkedList.push(showkey)
                            tempdata.showcheckedListname.push(tempobj)
                        }
                    }


                } else {
                    //表示全部渠道
                    let tempobj = { "value": data[i].name + "全部渠道", "key": "-1" }
                    let ChanneStorage = window.sessionStorage;
                    let tempdatachannel = JSON.parse(ChanneStorage.getItem("channelsList"));
                    let tempchanne = getGameChanelist(id, tempdatachannel)
                    // console.log("tempchanne==========", tempchanne)
                    for (let j = 0; j < tempchanne.length ; j++){
                        for(let k=0;k<tempchanne[j].children.length;k++){
                            let idtemp = tempchanne[j].id + "-" + tempchanne[j].children[k].id;
                            tempdata.checkedList.push(idtemp)
                        }
                        tempdata.checkedList.push(tempchanne[j].id)
                    }
                   
                    tempdata.showcheckedListname.push(tempobj)
                }
            }
        }
    }
    return tempdata
}
export const getGameChanelist = (id, data) => {
    let showdata = [];
    // console.log("data",data)
    for (let i = 0; i < data.length; i++) {

        if (data[i].gid === id) {
            // console.log("data[i].gid",data[i].gid,id)
            showdata = data[i].channels
            // console.log("data[i].gid",data[i].channels,showdata)
        }
    }
    // console.log("请求的数据为什么不对",showdata)
    return showdata
}
export const getOriginalChanel = (data) => {
    console.log("data=",data)
    let tempdata = []
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].children)
        // if (data[i].children.children) {
        //表示部分渠道
        let strdata = data[i].key + ":";
        for (let j = 0; j < data[i].children.length; j++) {

            if (data[i].children[j].children) {

                for (let k = 0; k < data[i].children[j].children.length; k++) {
                    if (data[i].children[j].children[k].key === "-1") {
                        // let tempobj={"name":data[i].children[j].name+"全部","key":data[i].children[j].key}
                        let showkey = data[i].children[j].key;
                        console.log("j", j, data[i].children.length, )
                        if (j === data[i].children.length - 1) {
                            strdata = strdata + showkey
                        } else {
                            strdata = strdata + showkey + ",";
                        }
                    } else {
                        let showkey = data[i].children[j].key + "-" + data[i].children[j].children[k].key
                        if (k === data[i].children[j].children.length - 1) {
                            strdata = strdata + showkey
                        } else {
                            strdata = strdata + showkey + ",";
                        }


                    }
                }
                // console.log("这里的值1", strdata)
                // tempdata.push(strdata)

            } else {
                //表示全部渠道
                strdata = data[i].key + ":all";

            }

        }
        console.log("strdata", strdata)
        tempdata.push(strdata)
    }
    return tempdata
}

export const getnewpostdata = (data, org) => {
     console.log("data,org", data, org)
    let datashow = data[0].split(":")
        // console.log("datashow===", datashow)
    let newdata = [];
    for (let i = 0; i < org.length; i++) {
        let temp = org[i].split(":")
        // console.log("datashow0===,temp", datashow[0],temp)
        if (datashow[0] !== temp[0]) {
            newdata.push(org[i])
        }
    }
    newdata.push(data[0])
    console.log("zuihoudezhi", newdata)
    return newdata
}
// 设置修改游戏上传的
export const setGameListPost = (datas, org) => {
    let data = datas;
    // 把原来的值拿出来
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < org.length; j++) {
            // console.log("data[i].value==org[j].value：",data[i].value,org[j].value)
            if (data[i].value === org[j].value) {
                let tempshow = { "id": [], "showdata": [] };
                // let temp2 = [];
                // 原来的数据就没有配置数据值
                if (org[j].data) {

                    // 存在的这个部分特殊角色部分有问题
                    // for(let m=0;m<org[j].data.length;m++){
                    // for(let k=0;k<org[j].data[m].length;k++){
                    //   let obj="";
                    //   if(k==2){
                    //     obj={"name":[org[j].data[m][k].name],"id":[org[j].data[m][k].id]}
                    //   }else{
                    //     obj={"name":org[j].data[m][k].name,"id":org[j].data[m][k].id}
                    //   }

                    //  temp2.push(obj)
                    // } 
                    // tempshow.push(temp2)
                    // }
                    let datapostori = getDefalutRoleid(org[j].data)
                    data[i]["data"] = { "id": datapostori };
                } else {
                    console.log("tempshow", tempshow)
                    data[i]["data"] = tempshow;
                }
            }
        }
    }
    // 新选的data为空数组
    for (let i = 0; i < data.length; i++) {
        if (data[i]["data"] === undefined) {
            data[i]["data"] = { "id": [], "showdata": [] }
        }
    }
    console.log("最后的值是：", data)
    return data
}
export const getshowRole = (id, data) => {
    let tempdata = []
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].value) {
            if (data[i]["data"].length > 0) {
                tempdata.push(data[i]["data"][0])
            } else {
                tempdata.push([])
            }
        }
    }
    console.log("当前游戏下的角色", tempdata)
    return tempdata;
}
// 重构
export const getshowRoleonce = (id, data) => {
    let tempdata = []
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].value) {
            tempdata = data[i].data
        }
    }
    console.log("当前游戏下的角色", tempdata)
    return tempdata;
}

export const setGameRole = (data, org, id) => {

    let child = org
    if (child.length > 0) {
        // 有游戏角色存在
        for (let i = 0; i < child.length; i++) {
            if (child[i].value === id) {
                child[i].data = { "id": data }
            } else {
                child[i].data = { "id": getDefalutRoleid(child[i].data) }
            }
        }
        return child
    }
}
// 活动默认的角色id的值
export const getdefaultRoleData = (data) => {
    let dataobj = { "id": [], "showdata": [] }
    for (let i = 0; i < data.length; i++) {
        let obj = { "id": data[i].syslid, "name": data[i].sysname, "item": [{ "id": data[i].roleid, "name": data[i].rolename }] }
        dataobj.showdata.push(obj)
        dataobj.id.push(data[i].roleid)
    }
    return dataobj
}
export const getsysid = (data, idarry) => {
    let showdata = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].item.length; j++) {
            for (let k = 0; k < data[i].item[j].item.length; k++) {
                if ($.inArray(data[i].item[j].item[k].id, idarry) > -1) {
                    let obj = { "syslid": data[i].item[j].id, "sysname": data[i].item[j].name, "roleid": data[i].item[j].item[k].id, "rolename": data[i].item[j].item[k].name }
                    showdata.push(obj)
                }
            }
        }
    }
    return showdata
}
// 筛选用户选择子系统
export const getuUserRole = (data, idarry) => {
    let showdata = []

    for (let i = 0; i < data.length; i++) {
        let hasrole = false;
        let groupid = data[i].id;
        let groupname = data[i].name;
        let objrow = { "id": groupid, "name": groupname, item: [] }
        for (let j = 0; j < data[i].item.length; j++) {
            let sysid = data[i].item[j].id;
            let sysname = data[i].item[j].name;
            let obj1 = { "id": sysid, "name": sysname, item: [] }
            for (let k = 0; k < data[i].item[j].item.length; k++) {
                if ($.inArray(data[i].item[j].item[k].id, idarry) > -1) {
                    // let rid=data[i].item[j].item[k].id;
                    // let rname=data[i].item[j].item[k].name
                    // let obj={"id":rid,"name":rname}
                    obj1.item = data[i].item[j].item
                    hasrole = true;
                }
            }
            objrow.item.push(obj1)
        }
        if (hasrole) {
            showdata.push(objrow)
        }
    }
    console.log("选中的值是", showdata, idarry)
    return showdata
}
// 获取默认选中角色id
export const getDefalutRoleid = (data) => {
    let id = []
    for (let i = 0; i < data.length; i++) {
        id.push(data[i].roleid)
    }
    return id
}