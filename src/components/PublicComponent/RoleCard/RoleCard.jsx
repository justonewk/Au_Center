import React from 'react';
import { Card,} from 'antd';
import getDataRole from './getDataRole';
import '../../../style/RoleCard.css';
const {Meta} = Card;
class RoleCard extends React.Component {
    constructor(props) {
        super(props);
        console.log("数据值:", props.data)
    }
    state = {
        imgUrl: ["https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
    }
    render() {
        const {getDetail, Switch} = this.props;
        return (
            <Card
            actions={[<a href="javascript:void(0)" data-id="1" onClick={getDetail}>详情</a>, 
            <a href="javascript:void(0)" data-id="1" onClick={Switch}>禁用</a>]}
            >
        <Meta
            title="管理员"
            description="ID:3442"
            />
    <div className="roleDes">
    <p className="name">包含角色</p>
    <div>
      {this.state.imgUrl.map(function(item, index) {
                return (
                    <img key={index} src={item}  alt=""/>
                )
            })
            }
      

    </div>
    </div>
  </Card>

        )
    }
}
export default getDataRole(RoleCard);