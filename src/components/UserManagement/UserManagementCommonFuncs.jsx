
import { getDepartmentUserList } from '../../public/ajax';
export const groupdifferentRequest = (usergroupid, Permit, onSetUserList, onDepartmentSuccess) => {
    console.log("数据不是吗？", usergroupid)
    if (usergroupid[0] === "-1") {
        // 查看全部用户
        let userlist = window.sessionStorage.getItem("userList")
        let datas = JSON.parse(userlist)
        onSetUserList(datas, "all", Permit)
    } else {
        let useriddata = usergroupid[0].indexOf("-") > -1 ? usergroupid[0].split("-") : usergroupid
        let parentid = useriddata[1] ? useriddata[1] : ""
        let data = {
            "usergroupid": useriddata[0],
            "parentgroupid": parentid
        }
        console.log("上传的数据", data)
        getDepartmentUserList(data, onDepartmentSuccess)
    }
}
export const getUserRoleList = (data, Permit,Permitsubsys) => {
 // console.log("getUserRoleList数据来了没有", data)
    let alldata = [];
    for (let i = 0; i < data.length; i++) {
        let obj = {
            "data": [],
            "optiondata": [],
            "iconurl": "",
            "checkboxcheack": false,
            id: ""
        }
        let obj1 = [{
            "title": data[i].rolename,
            "data": [data[i].roleintroduct],
            "id":data[i].roleid
        }]
        // let detaildata=Permitsubsys.md_subsys_mgr?"详情":"";
        let detaildata="详情";
        let showdome = Permit.op_user_calrelaterole ? [detaildata, "取消关联"] : [detaildata];
        let obj2 = {
            id: data[i].roleid,
            data: showdome
        }
        obj.data.push(obj1)
        obj.optiondata.push(obj2)
        obj.id = data[i].roleid
        alldata.push(obj)
    }
    console.log("dd", alldata)
    return alldata
}