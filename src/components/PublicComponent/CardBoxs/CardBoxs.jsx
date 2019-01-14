import React from 'react';
import CardBoxItem from './CardBoxItem';
import { Row, Col } from 'antd';
class CardBoxs extends React.Component {
    constructor(props) {
        super(props);
        console.log("props", this.props.data)
    }
    // 设置默认属性
    static defaultProps= {
        data:[
            {usergroupid:"USER1616180907",parentgroupid:"",name:"支撑部",number:12,creator:"王昆",time:"2018-09-03 12:32"},
            {usergroupid:"USER3744180907",parentgroupid:"USER1616180907",name:"综合部",number:12,creator:"陈巧",time:"2018-09-03 12:32"},
            {usergroupid:"3",parentgroupid:"3",name:"运营部",number:13,creator:"王刚",time:"2018-09-03 12:32"},
            {usergroupid:"4",parentgroupid:"",name:"市场部",number:16,creator:"陈巧",time:"2018-09-03 12:32"}
    ]
    }
    render() {
        const {data,onClickGetdata}=this.props;
        return (
            <div className="department-wraper-box">
            <Row type="flex" justify="space-between">
            {data.map((item,index)=>{return (
            <Col span={5} className="colshow">
            <CardBoxItem data={item} onClickGetdata={onClickGetdata.bind(this,item.usergroupid,item.parentgroupid)} key={index}></CardBoxItem>
            </Col>
            )})}
            </Row>
            </div>
        )
    }
}
export default CardBoxs;