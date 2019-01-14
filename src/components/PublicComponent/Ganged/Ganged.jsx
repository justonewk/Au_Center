import React from 'react';
import { Select, Row, Col, Button, message } from 'antd';
import SelectCustom from '../SelectCustom';
import { getsubSystem } from '../../../public/CommonFuncs'
import { getRolelist } from '../../../public/ajax'


const Option = Select.Option;
class Ganged extends React.Component {
 
    state = {
        data: [],
        BindingRoledata: [],
        defaultsystem: "",
        defaultsubsystemname: "",
        defaultsystemname: "",
        defaultrolename: "",
        defaultsubsystem: "",
        defaultrole: ["1", "2"],
        systemdata: [],
        subsystemdata: [],
        roledata: [],
      
    }
    SetBindingRoledata=(system = "", nextSubsystem = "", nextrole = "") => {
        let data = this.state.BindingRoledata
        let initrole = "";
        let initrolename = "";
        let initsystem = "";
        let initsystemname = "";
        let initsubsystem = "";
        let initsubsystemname = ""
        let systemdata = [];
        let subsystemdata = [];
        let roledata = [];
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if (system === "") {
                initsystem = "";
                initsystemname = "";
                temp = getsubSystem(data[0], "", "")
            } else {
                initsystem = system;
                initsystemname = data[i].name;
                if (data[i].id === system) {
                    temp = getsubSystem(data[i], nextSubsystem, nextrole)
                }
            }
            let obj = {
                "name": data[i].name,
                "id": data[i].id
            }
            systemdata.push(obj)

        }
        subsystemdata = temp.subsystem.data;
        roledata = temp.role.data;
        initsubsystem = temp.subsystem.init;
        initrole = temp.role.init
        initsubsystemname = temp.subsystem.initname;
        initrolename = temp.role.initname

        this.setState({
            defaultsystem: initsystem,
            defaultsubsystem: initsubsystem,
            defaultrole: initrole,
            defaultsystemname: initsystemname,
            defaultsubsystemname: initsubsystemname,
            defaultrolename: initrolename,
            systemdata: systemdata,
            subsystemdata: subsystemdata,
            roledata: roledata
        })

    }

    onRelevance=() => {
        if (this.state.defaultsystemname === "" ||
                this.state.defaultsubsystemname === "" ||
                this.state.defaultrolename === "" ||
                this.state.defaultsystem === "" ||
                this.state.defaultsubsystem === "" ||
                this.state.defaultrole === "") {
            message.error("选择完角色进行关联");
            return false;
        }
        let temshow = [
            {
                "name": this.state.defaultsystemname,
                "id": this.state.defaultsystem
            },
            {
                "name": this.state.defaultsubsystemname,
                "id": this.state.defaultsubsystem
            },
            {
                "name": this.state.defaultrolename,
                "id": this.state.defaultrole
            }
        ]
        // let tempshowdata = {
        //     "defaultsystemname": this.state.defaultsystemname,
        //     "defaultsubsystemname": this.state.defaultsubsystemname,
        //     "defaultrolename": this.state.defaultrolename
        // }
        let oldtemp = this.props.relevancedata
        // console.log("this.state.defaultsystem",this.state.defaultsystem,tempshowdata,oldtemp)
        oldtemp.push(temshow)
        // console.log("关联的数据是",oldtemp)
        // this.setState({relevancedata:oldtemp})
        this.SetBindingRoledata(this.props.system, this.props.subsystem, "")
        this.props.onRelevanceGanged(oldtemp)
    }
    setToolbar=(data) => {
        // console.log(data[i].id)
        let tools = [];
        if (data === "") {
            return;
        } else {
            for (var i in data) {
                if (parseInt(i, 10) < parseInt(data.length, 10)) {
                    tools.push(<Option key={data[i].id}>{data[i].name}</Option>);
                } else {
                    break;
                }
            }
        }
        ;
        console.log(tools);
        return tools;
    }
    系统改变
    handleChangeSystem=(value) => {
        console.log("value", value)
        this.SetBindingRoledata(value, "", "")
    }
    // onSelectSystem=(value)=>{
    //   console.log("选中的时候",value)
    //    this.SetBindingRoledata(value,"","")
    // }
    // 子系统改变
    handleChangeSubsystem=(value) => {

        this.SetBindingRoledata(this.state.defaultsystem, value, "")
    }
    // 角色改变
    handleChangeRole=(value) => {
        //只用改变最后的角色就可以； 
        this.SetBindingRoledata(this.state.defaultsystem, this.state.defaultsubsystem, value)
    }

    sucRoleList=(e) => {
        if (e.ret === 1) {
            console.log("BindingRoledata", e.data)
            this.setState({
                BindingRoledata: e.data
            })
            window.sessionStorage.setItem(this.props.ajaxcmd, JSON.stringify(e.data)) //游戏列表

            this.Delay()
        } else {
            message.error(e.errmsg);
        }
    }
    componentWillMount() {
        let RoleStorage = window.sessionStorage;
        let datalist = JSON.parse(RoleStorage.getItem(this.props.ajaxcmd));
        // console.log("获取到了存在本地的数据",datalist)
        if (datalist == null) {
            getRolelist(this.props.ajaxcmd, this.sucRoleList);
        } else {
            this.setState({
                BindingRoledata: datalist
            })
            this.Delay()
        }

    }
    Delay=() => {
        let _this = this;
        setTimeout(() => {
            _this.SetBindingRoledata("", "", "")
        }, 0); //通过延时处理
    }
    render() {

        console.log("每次渲染的数据", this.state.defaultsystem)
        return (
            <div className="role-wrapper">
    <Row gutter={16} >
      <Col xxl={{
                span: 3,
                offset: 1
            }}>
     <Col  span={24} className="labe">{this.props.systemname}</Col>
     <Col  span={24}>
    <SelectCustom
            multiple={false}
            onChange={this.handleChangeSystem}
            value={this.state.defaultsystem}
            delarr={this.props.delone}
            onSelect={this.onSelectSystem}
            data={this.state.systemdata}
            />
      </Col>
      </Col>
        <Col xxl={{
                span: 3,
                offset: 1
            }}>
       <Col  span={24} className="labe">{this.props.subsystemName}</Col>
        <Col  span={24}>

      <SelectCustom
            multiple={false}
            onChange={this.handleChangeSubsystem}
            delarr={this.props.deltwo}
            value={this.state.defaultsubsystem}
            onSelect={this.onSelectSubsystem}
            data={this.state.subsystemdata}
            />
        </Col>
     </Col>
     <Col xxl={{
                span: 4,
                offset: 1
            }}>
     <Col  span={24} className="labe">{this.props.rolename}</Col>
     <Col  span={24} className="roleselect">
        <Select
            mode="multiple"
            style={{
                width: "100%"
            }}
            value={this.state.defaultrole}
            onChange={this.handleChangeRole}
            >
         {this.setToolbar(this.state.roledata)}
      </Select>
        </Col>
     </Col>
     <Col xxl={{
                span: 3,
                offset: 1
            }}>
     <Button className="userlist-top-item"
            type="primary"
            onClick={this.onRelevance}>关联</Button>
     </Col>
             </Row>

         

      </div>

        )

    }
}
export default Ganged;