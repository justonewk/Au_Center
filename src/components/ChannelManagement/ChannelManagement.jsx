
import React from 'react';
import ChannelManagementHeader from './ChannelManagementHeader'
import ChannelManagementContent from './ChannelManagementContent'
import '../../style/ChannelManagement.css';
import { getCheckgamelistnew } from '../../public/CommonFuncs'
import $ from 'jquery'
class ChannelManagement extends React.Component {

    state = {
        gameList:JSON.parse(window.sessionStorage.getItem("gameList")),
        radioCheck:parseInt(JSON.parse(window.sessionStorage.getItem("gameList"))[0].gid),
        ChannelName:'',
        type:"-1",
        loading:true,
        gameToname:JSON.parse(window.sessionStorage.getItem("gameList"))[0].name
    }
    getTablelist=(e)=>{
        console.log(e.target.id);
        this.setState({
          radioCheck:e.target.value,
          ChannelName:'',
          type:"-1",
          gameToname:e.target.id
        })
         setTimeout(() => {
            this.refs.getTable.handleChange(this.state.radioCheck);
            this.refs.getTable.resetForm()
        }, 1);
    }
    getTablelist1=(chanel,platform)=>{
        console.log(chanel,platform);
        this.setState({
          ChannelName:chanel,
          type:platform,
        })
        setTimeout(() => {
            this.refs.getTable.handleChange(this.state.radioCheck);
        }, 1);
    }
    loadingReturn=(e)=>{
      this.setState({
        loading:e,
      })
    }
  screenChange = () => {
    window.addEventListener('resize', this.resize);
  }
  //完成渲染
  resize = () => {
    // 设置真实dom的高度
    var t2 = this.refs.ht;

    // console.log("$(window).height()", $(window).height())
    $(t2).css("height", $(window).height() - 400)


  }
  componentDidMount() {
    this.resize();
    this.screenChange();
    this.setState({gameList:getCheckgamelistnew(this.state.gameList)})
  }
    //大区选择
    render() {
      const {gameList,radioCheck,ChannelName,type,loading,gameToname}=this.state
        return (
          <div className="ChannelManagement">
            <ChannelManagementHeader gameToname={gameToname} gameList={gameList} radioCheck={radioCheck} getTablelist={this.getTablelist}/>
            <div className="data-wrapper" ref="ht">  
               <ChannelManagementContent gameToname={gameToname} loading={loading} loadingReturn={this.loadingReturn} ref="getTable" ChannelName={ChannelName}  type={type} radioCheck={radioCheck} getTablelist1={this.getTablelist1}/>
            </div>
          </div>
        )
    }
}
export default ChannelManagement;