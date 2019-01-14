var int=self.setInterval("clock()",1000);
let starthref=""
function clock(){
let userDataall= JSON.parse(window.sessionStorage.getItem("sso_user_data"))
        console.log(userDataall,"userDataall") 
        
        // console.log("window.location.host2222======",window.location.href)
        
        if(userDataall!==null){
            // window.location.reload(); 
            loadJs()
            // console.log("window.location.host======",window.location.host)
            console.log(userDataall,"userDataall333",starthref) 
        //      userDataall["href"]=encodeURIComponent(starthref)
        //   window.sessionStorage.setItem("sso_user_data",JSON.stringify(userDataall))
            window.clearInterval(int)
    
        }
        // else{
        //     starthref=window.location.href
        // }
}
function loadJs(){
        //得到html的头部dom
        var theHead = document.getElementsByTagName('head').item(0);
        //创建脚本的dom对象实例
        var myScript = document.createElement('script');
        myScript.src = 'http://192.168.10.17/toolbar/toolbar.js';           //指定脚本路径
        myScript.type = 'text/javascript';  //指定脚本类型
        myScript.defer = true;              //程序下载完后再解析和执行
        theHead.appendChild(myScript);      //把dom挂载到头部
    }
