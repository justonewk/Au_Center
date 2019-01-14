/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal, message} from 'antd';
// import BindingRole from '../../PublicComponent/BindingRole'
import { setGameRole } from '../../../public/CommonFuncs'
import { ajaxGame } from '../../../public/ajax'
import Multistage from '../../PublicComponent/Multistage/Multistage/Multistage'


class NewGameRoleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bindingRole: [],
            gamename: "超能"
        };
    }
    componentDidMount() {
       
        this.setState({
            roledata: this.props.roledata,
            constroledata: this.props.roledata,
            defaultCheackRole: this.props.defaultCheackRole,
            defaultShowRole: this.props.defaultShowRole,

        })
    }
    // omponentWillReceiveProps(nextProps) {
    //     console.log("测试执行的时机=====%%%%%%%%%", this.state.roledata, nextProps.roledata)
    //     }


    bindingRole = (datatemp) => {


        console.log("所有游戏的角色权限", datatemp, this.props.gamerolelist, this.props.gid)
        let pritment = setGameRole(datatemp, this.props.gamerolelist, this.props.gid)
        console.log("这里有错吗？", pritment)
        let data = {
            "uid": parseInt(this.props.uid,10),
            "game_permits": pritment,
        }

        ajaxGame(data, this.sucess, this.error)

    }
    sucess = () => {
        this.props.onOkGameRolelSucess(parseInt(this.props.uid,10))
        this.props.onHandleCancel()
    }
    error = (errmsg) => {
        message.error(errmsg);
    }


    gameSelectOk = (checkedListGame) => {

    }
    gameSelectCancel = () => {
        //取消选择
    }
    handleCancel = () => {
        this.props.onHandleCancel()
    }
    onBindingRole = (relevancedata) => {
        this.props.onBindingRole(relevancedata)
    }
    render() {

        const { gamename,roledata } = this.props
        // const { roledata } = this.state
        console.log("默认用户的选择的子系统roledata=======", roledata)
        return (
            <Modal
                maskClosable={false}
                title={"修改" + gamename + "角色"}
                visible={this.props.addRoletag}
                width={800}
                onCancel={this.handleCancel}
                className="addNewuserToRole addNewuserToUserlist right"
                footer={null}
            >
                <div className="addnewrole">

                    {roledata !== "undefined" && <Multistage
                        handleCancel={this.handleCancel}
                        bindingRole={this.bindingRole}
                        Cannel={this.handleCancel}
                        roledata={roledata}
                        constroledata={roledata}
                        defaultCheackRole={this.state.defaultCheackRole}
                        defaultShowRole={this.state.defaultShowRole}
                        showCannel={true}
                    />
                    }{
                        roledata === "undefined" && <p>角色列表为空</p>
                    }
                </div>

                <div className="modeCancel">
                    {/* <Button   onClick={this.handleCancel}>
              取消
          </Button> */}
                </div>
            </Modal>
        )
    }
}
export default NewGameRoleModal;