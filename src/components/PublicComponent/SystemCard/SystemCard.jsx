import React from 'react';
import { Card, Avatar } from 'antd';
import getDataSystem from './getDataSystem';
import '../../../style/SystemCard.css';
import { getipconfig } from '../../../getipconfig';
import subsys from '../../../style/imgs/subsys.png';
const getip = getipconfig();
const imgurl = getip.serverip + 'temp/';
// const testUrl = getip.serverip;
const { Meta } = Card;
class SystemCard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {

    }
    render() {
        const { getDetail, Switch, data, local_permit } = this.props;
        return (
            <Card
                actions={[
                    <a href="javascript:void(0)" data-data={JSON.stringify(data)} onClick={getDetail} >详情</a>,
                    <a href="javascript:void(0)" data-data={JSON.stringify(data)} onClick={Switch} disabled={!local_permit["md_subsys_mgr.op_subsys_disable"]}>{data.sysstate === 0 ? '禁用' : '启用'}</a>]}
            >
                <Meta
                    avatar={data.sys_icon_path === undefined ? <Avatar src={subsys} /> :
                    <Avatar src={imgurl + data.sys_icon_path} />}
                    title={data.sysname}
                    description={data.sysdescript === '' ? '  ' : data.sysdescript}
                />
                <div className="roleDes">
                    <p>状态</p>
                    <p>角色数量</p>
                </div>
                <div className="roleData">{
                    data.sysstate === 0 ?
                        <p className="normal">正常</p> :
                        <p className="unnormal">禁用</p>
                }
                    <p>{data.sysrolenum}个</p>
                </div>
            </Card>

        )
    }
}
export default getDataSystem(SystemCard);