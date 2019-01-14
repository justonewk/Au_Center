import React from 'react';
import { Modal,  Button } from 'antd';
import GameSelectRole from './GameSelectRole'
import CheackGroupC from './CheackGroupCustom/CheackGroupC'
import { getCheckgamelist } from '../../public/CommonFuncs'
const confirm = Modal.confirm;
class GameList extends React.Component {
    state={
        configurationRoletag: false,
        showselectdata: [],
        isOk: false,
        gameRoleOk: true,
        defaultCheckedList: [],
        defaultshowselectdata: [],
        CheackGroupCdata: [],
    }
    // 游戏选择好了
    ongameSelectOk=(defaultCheckedList, defaultshowselectdata) => {
        this.setState({
            isOk: true,
            defaultCheckedList,
            defaultshowselectdata
        })
    }
    // 取消游戏选择
    ongameSelectCancel=() => {

        // 选中的不展示
        // 删除选中的list
        //删除右侧展示的选中列表
        console.log("取消选择游戏")
        this.setState({
            isOk: false,
            defaultCheckedList: [],
            defaultshowselectdata: []
        }
        )

    }

    // 显示游戏的角色配置
    onConfigurationRole=() => {
        this.setState({
            configurationRoletag: true,
            gameRoleOk: false
        })
    }
    //
    onReset=() => {
        this.setState({
            isOk: false
        })
    }
    onChangeGameRole=(data) => {
        this.setState({
            defaultshowselectdata: data,
            gameRoleOk: true
        })
    // this.props.bindinggame(data)
    }
    bindinggame=() => {
        console.log("提交游戏数据是",this.state.defaultshowselectdata)
         this.props.bindinggame(this.state.defaultshowselectdata)
    }
    prev=()=>{
        //是否是要保存，保存就提交并且上一步，不保存就直接上一步
        let that = this;
        if(this.state.ok){
            // 表示是选择时候的上一步
        confirm({
            title: "保存数据",
            content: '',
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                that.props.prev()
                that.props.bindinggame(that.state.defaultshowselectdata)
            },
            onCancel() {
                that.props.prev() 
            },
        });
        }else{

            //表示是没有选择上一步
            this.props.prev() 
        }
        
    }
    componentWillMount() {
        let ChanneStorage = window.sessionStorage;
        let data = JSON.parse(ChanneStorage.getItem("gameList"));
        let gamelistdatashow = getCheckgamelist(data)
        this.setState({
            CheackGroupCdata: gamelistdatashow
        })
    }
    //重新选择游戏
    render() {

        console.log("用户选择的角色", this.props.UserRole)
        const { UserRole } = this.props
        return (
            <div className="wrapper-gamelsit">
          <div><span>选择相关的游戏</span>
           {this.state.configurationRoletag && this.props.isShow&& <span className="onceBlue" onClick={() => this.onReset()}>重新选择游戏</span>}
          </div>
          {this.props.isShow && !this.state.isOk && <div>
            <CheackGroupC
            checkedList={this.state.defaultCheckedList}
            showselectdata={this.state.defaultshowselectdata}
            onOK={this.ongameSelectOk}
            titlename="游戏"
            onCancel={this.ongameSelectCancel}
            data={this.state.CheackGroupCdata}
            constdata={this.state.CheackGroupCdata}
            />
          </div>}
           <GameSelectRole
            configurationRoletag={this.state.configurationRoletag}
            showselectdata={this.state.defaultshowselectdata}
            isOk={this.state.isOk}
            isShow={this.props.isShow}
            selectSubsys={this.props.selectSubsys}
            onReset={this.onReset}
            UserRole={this.props.UserRole}
            onChangeGameRole={this.onChangeGameRole}
            />
           {this.props.isShow && <div className={this.state.isOk ? "footer" : "dim-footer"} >
            <div className="btn">
            <Button disabled={!this.state.isOk || !this.state.gameRoleOk} 
            type="primary" onClick={this.bindinggame}>
            下一步
          </Button>
            </div>
            {UserRole.length>0&&<Button disabled={!this.state.isOk} className="setgamerole bule"
            onClick={this.onConfigurationRole}>配置游戏角色
             </Button>
            }
          <Button 
        onClick={this.prev} className="pre bule">{this.state.isOk?"保存并上一步":"上一步"} </Button>
            </div>}
            </div>

        )

    }
}
export default GameList;