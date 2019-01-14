/**
 * Created by chenqiao on 2017/5/23.
 */
import React from 'react';
import { Modal,  } from 'antd';
import {  ConstructPostData, getnewpostdata } from '../../../public/CommonFuncs'
import { ajaxGameChannel } from '../../../public/ajax'
import Channe from '../../PublicComponent/ChanneCustom/Channe'
import Item from 'antd/lib/list/Item';

class NewGameChannelModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bindingRole: [],
            gamename: "超能"
        };
    }

    onOk=(checkedList, showcheckedListname) => {
        // console.log(`key=,${this.props.gid},checkedList=${checkedList},showcheckedListname=${showcheckedListname}`)

        
        let data = [
            {
                "checkedList": checkedList,
                "showcheckedListname": showcheckedListname,
                "value": this.props.gid
            }];
            //构造的提交的渠道函数
        let postdata = ConstructPostData(data)
        let newpostdata = getnewpostdata(postdata, this.props.channeldata)
        console.log("修改渠道提交的数据=====", postdata, newpostdata)
        // 只要数组的值含义all就key:all,其余的全部不要
        let nocepostdata=[]
        newpostdata.forEach((Item)=>{
            if(Item.indexOf("all")>-1){
                let zhi=Item.split(":")[0]+":all"
                nocepostdata.push(zhi)
            }else{
                nocepostdata.push(Item)
            }
        })
        console.log("最后的值是================",nocepostdata)

        let datas = {
            "uid": parseInt(this.props.uid,10),
            "channels": nocepostdata
        }
        let that = this;
        ajaxGameChannel(datas, that.Channelscusse, that.Channelerror)
    }
    onCancel=() => {
        this.handleCancel()
    }
    handleChanne=(data, key) => {
        console.log("ddd", data, key)
    }
    Channelscusse=() => {
        console.log("绑定成功之后走这里")
        //修改成功之后，关闭模态框，重新请求数据
        this.props.onOkChanelSucess()
    }
    Channelerror=(message) => {
        //弹出错误，关闭模态宽
        message.error(message)
        this.props.onHandleCancel()
    }
    handleCancel=() => {
        this.props.onOkChanelSucess()
    }

    render() {

        const {gamename, checkedList, showcheckedListname, gid} = this.props
        console.log("gid====", gid)
        return (
            <Modal
            maskClosable={false}
            title={"修改" + gamename + "渠道"}
            visible={this.props.addRoletag}
            width={800}
            onCancel={this.handleCancel}
            className="addNewuserToRole addNewuserToUserlist right"
            footer={null}
            >
              <div className="modifyChane">
              <Channe
            key={gid}
            isShow={true}
            handleChanne={this.handleChanne}
            defaultValue={checkedList}
            stateshow={true}
            datacontent={showcheckedListname}
            onOK={this.onOk}
            onCancel={this.onCancel}
            propstag={gid}
            disabled={false}
            onhasChanne={this.props.onhasChanne}
            />
            </div>
           
        </Modal>
        )
    }
}
export default NewGameChannelModal;