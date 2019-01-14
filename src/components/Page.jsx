/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { getSwitch } from '../public/getSwitch';
import { root } from '../root';
// const Switch = getSwitch();
const rootapp = root();
class Page extends React.Component {
    state={
        // Switch: Switch,
        rootapp: rootapp,
        data: {},
    }
    componentWillMount() {

        this.setState({
            data: {
                "cmd": "009",
                "time": "3333",
                "gmid": "chenqiao"
            }
        })
    var rootappStorage=window.sessionStorage;
     rootappStorage.setItem("rootapp", rootapp);
    }

    render() {
        // console.log("是不是每一个页面都会执行这里", window.temp)
        return (
            <div style={{
                height: '100%'
            }} >
                {this.props.children}
            </div>
        )

    }
}


export default Page;