import React from 'react';
import {Row,Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ChannelManagementHeader extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {

    }
    onChange=(e)=>{
    	let gid=e.target.value
    	if(gid!=-1){
    		 this.props.getTablelist(e)
    	}
    }
     componentDidMount(){}
    //   let game=window.sessionStorage.getItem("gameList");
    //  let gamelist=game==undefined?[]:JSON.parse(game);
    //  let temp=[];
    //  console.log("fmae",gamelist)
    //   this.setState({
    //     gameList:gamelist,
    //   })
      
    // }

  render() {
    const {gameList,radioCheck,gameToname}=this.props;
    console.log("显示游戏列表",gameList)
    return (
      <div className="ChannelManagementHeader">

          <Row>

              <p className="title"> {gameToname}渠道管理</p>
              <div className="gameList">
		      <RadioGroup onChange={this.onChange} value={radioCheck}>
		        <RadioButton value={-1}>游戏列表</RadioButton>
		      {gameList.map(function(item,index){
                  return <RadioButton id={item.name} key={item.gid} value={parseInt(item.gid)}>{item.name}</RadioButton>
		      })
		      	
		      }
		       
		       
		      </RadioGroup>
		    </div>
          </Row>
          </div>
    )
  }
}
export default ChannelManagementHeader;