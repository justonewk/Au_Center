import React from 'react';
import { Upload, } from 'antd';
class UploadFiles extends React.Component {
 
    render() {
    const props = {
  name: 'file',
  action: '/',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: (file) => {
    
        var reader = new FileReader();//新建一个FileReader
        reader.readAsText(file, "UTF-8");//读取文件 
        reader.onload = function(evt){ //读取完文件之后会回来这里
        //    let data=JSON.parse(evt.target.result)// 读取文件内容
         //    window.sessionStorage.setItem("ActivityUploadjson",evt.target.result)//游戏列表
     
         //     browserHistory.push({
         //        pathname: rootapp + 'app/table/ActivityDetails',
         //        query: {
         //            stateshow: true,
         //            edit: true,
         //            id:data.data.aid,
         //            isget:true,
         //            stateshow:true,
         //            showid:"leadfile",


         //        },
         //    })
         }
        return false;
  },
    }
        return (
           <Upload {...props} className="Uploadshow">
     批量导入
  </Upload>
        )
    }
}
export default UploadFiles;