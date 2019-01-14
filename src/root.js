import $ from 'jquery';
export const root = () => {
    let  rootURL=window.sessionStorage.getItem("rootURL")
    let swurl = ""
    if(rootURL){
        swurl=rootURL
    }else{
    $.ajax({
        method: 'get',
        url: '/root.json?timestamp=' + new Date().getTime(),
        async: false,
        success: function(data) {
            let datas = data.aucenternew;
            swurl = datas;
            console.log("zhi", swurl)
            window.sessionStorage.setItem("rootURL",swurl)
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}
    return swurl
}