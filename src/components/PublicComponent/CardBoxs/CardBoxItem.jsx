import React from 'react';
class CardBoxItem extends React.Component {
    // {name:"支撑部",number:12,creator:"王昆",time:"2018-09-03 12:32"}
    render() {
        const {data,onClickGetdata}=this.props;
        return (
            <div className="item" onClick={onClickGetdata}>
             <div className="top">
             <span className="department">{data.name}</span>
             <span className="number">({data.number}人)</span>
             </div>
             <div className="bottom">
             <span>{data.creator}</span>
             <span>创建于</span>
             <span>{data.time}</span>
             </div>
            </div>
        )
    }
}
export default CardBoxItem;