import React from 'react';
import {  Icon } from 'antd';


class GameSelectChanne extends React.Component {
    state={

        showselectdata: [],
        isOk: false,
        activeid: "-1",
        gameRoleOk: true,
        defaultCheckedList: [],
        defaultshowselectdata: [],
        Channe: [],
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

    //
    onReset=() => {
        this.setState({
            isOk: false
        })
    }
    // onChangeGameRole=(data)=>{
    //   this.setState({defaultshowselectdata:data,gameRoleOk:true})
    //    // this.props.bindinggame(data)
    // }
    // bindinggame=()=>{
    //   this.props.bindinggame(this.state.defaultshowselectdata)
    // }
    handleChanne=(data, key) => {
        console.log("ddd", data, key)
    }
    onConfigurationRole=(id) => {
        this.setState({
            activeid: id
        })
    }
    render() {

        // console.log("选择的游戏是：",this.props.showselectdata)
        return (
            <div className="wrapper-gamelsit">
       
         <div className="content-data">
           {this.props.isShow && this.props.showselectdata.map((item, index) => {
                return (
                    <div className="showGameok okshow" key={index}>
                  <span className="item">{item.value !== "" ? item.value : "没有选择渠道"}
                  </span>
                  {this.props.onceEditShow && 
                  <Icon type="close-circle" onClick={() => this.oncloseList(item.key)}/>}
                  
              </div>
                )
            })

            } 
          </div>
        
            </div>

        )

    }
}
export default GameSelectChanne;