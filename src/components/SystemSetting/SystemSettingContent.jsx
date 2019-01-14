import React from 'react';
import { Modal, message, Card } from 'antd';
import { getajax } from '../../public/ajax';
import JsonModal from './JsonModal'
import sgame from '../../style/imgs/sgame.png';
import sding from '../../style/imgs/sding.png';
const {Meta} = Card;
const Ajax = getajax.ajaxFun;
class SystemSettingContent extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
    	visible:false,
    	loading:false,
    	data:[],
    	title:'',
    	errmsg:'',
    	type:0,//0游戏1钉钉
    	goGame:false,
    }

    showModal=(title,cmd) => {
      let data={}
      let cmds=cmd==0?"gamesdetail":"dingsenderdetail"
       Ajax('post','front/query',cmds,data,(e)=>{
          if(e.ret==1){
            if(e.data.length==0){
             message.warning(title+"暂无数据");
            }
            else{
            	this.fomatJson(JSON.stringify(e.data),false)
            }
          }
          else{
          	 message.error(e.errmsg)
          }
       })
       this.setState({
       	visible:true,
       	title:title,
       	type:cmd,
       })
    }
    hideModal=(e)=>{//关闭模态框
     
      this.setState({
       	visible:false,
       	data:[],
       })

    }
    DataChange=(e)=>{//实时改变输入框数据	
       this.setState({
       	data:e
       })
    }
    Submit=()=>{//提交数据
      this.fomatJson(this.state.data,false)
      setTimeout(() => {
      	if(this.state.goGame){
           	let data={
	        	data:JSON.parse(this.state.data)
	        }
	        this.setState({
	        	loading:true,
	        })
	      let cmds=this.state.type==0?"editgames":"editdingsender"
	       Ajax('post','front/query',cmds,data,(e)=>{
	       	this.setState({
	        	loading:false,
	        })
	         if(e.ret==1){
	             message.success("提交成功");
	            this.hideModal()
	          }
	          else{
	          	 message.error(e.errmsg)
	          }
	       })
      	}
      })
        
    }
    fomatJson=(txt,compress)=>{//数据json格式化
     console.log('数据进入! ');  
          var indentChar = '    ';   
        if(/^\s*$/.test(txt)){   
            console.log('数据为空,无法格式化! ');  
               this.setState({
                 errmsg:"数据为空,无法格式化!",
                  goGame:false,
             }) 
            return;   
        }   
        try{
          var data=eval('('+txt+')');
             this.setState({
                 errmsg:"",
                 goGame:true,
             }) 
      }   
        catch(e){   
              this.setState({
                 errmsg:"数据格式错误,请仔细检查!",
                  goGame:false,
             }) 
            console.log('数据源语法错误,格式化失败! 错误信息: '+e.description,'err');   
            return;   
        }; 
       
        var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;   
           
        var notify=function(name,value,isLast,indent/*缩进*/,formObj){   
            nodeCount++;/*节点计数*/  
            for (var i=0,tab='';i<indent;i++ )tab+=indentChar;/* 缩进HTML */  
            tab=compress?'':tab;/*压缩模式忽略缩进*/  
            maxDepth=++indent;/*缩进递增并记录*/  
            if(value&&value.constructor==Array){/*处理数组*/  
                draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);/*缩进'[' 然后换行*/  
                for (var i=0;i<value.length;i++)   
                    notify(i,value[i],i==value.length-1,indent,false);   
                draw.push(tab+']'+(isLast?line:(','+line)));/*缩进']'换行,若非尾元素则添加逗号*/  
            }else   if(value&&typeof value=='object'){/*处理对象*/  
                    draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);/*缩进'{' 然后换行*/  
                    var len=0,i=0;   
                    for(var key in value)len++;   
                    for(var key in value)notify(key,value[key],++i==len,indent,true);   
                    draw.push(tab+'}'+(isLast?line:(','+line)));/*缩进'}'换行,若非尾元素则添加逗号*/  
                }else{   
                        if(typeof value=='string')value='"'+value+'"';   
                        draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
                };   
        };   
        var isLast=true,indent=0;   
        notify('',data,isLast,indent,false); 
       // console.log("显示的文字",draw,draw.join(''))  
          this.setState({
          data:draw.join(''),
         })
      
  }
    componentDidMount() {}

    render() {
         const {title,visible,loading,data,errmsg}=this.state;
         const {local_permit}=this.props
        return (
            <div className="data-wrapper"> 
              <div className="settingGroup">
	              {local_permit["md_system_setting.op_games_edit"]&&<div onClick={this.showModal.bind(this,"游戏管理",0)}><Card
	            hoverable
	            bordered={false}
	            className="settingItem"
	            cover={<img alt="example" src={sgame} />}
	            >
					    <Meta
	            title="游戏管理"
	            />
				</Card></div>}
	            {local_permit["md_system_setting.op_dingding_edit"]&&<div onClick={this.showModal.bind(this,"钉钉管理",1)}><Card
	            hoverable
	            bordered={false}
	            className="settingItem"
	            cover={<img alt="example" src={sding} />}
	            >
					    <Meta
	            title="钉钉管理"
	            />
				</Card>
				</div>}
              </div> 
              <JsonModal
               visible={visible}
               hideModal={this.hideModal}
               title={title}
               data={data}
               errmsg={errmsg}
               loading={loading}
               Submit={this.Submit}
               DataChange={this.DataChange}
              />
           </div>
        )
    }
}
export default SystemSettingContent;