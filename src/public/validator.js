export const validatorCheck = (rule, value, callback) => {
  if (value == '' || value == undefined) {
    callback();
  } else {
    //正则验证
    switch (rule) {
      case 'number': //验证整数
        value.match(/^[0-9]*$/) ? callback() : callback("必须为数字")
        break;
      case 'pws': //允许1-32字节，允许字母数字
        value.match(/^[a-zA-Z0-9_\-]{6,32}$/) ? callback() : callback("密码不合法（允许6-32字节，允许字母数字）")
        break;
      case 'idcard': //身份证
        value.match(/^\d{15}(\d{2}[A-Za-z0-9])?$/) ? callback() : callback("身份证号码格式不正确")
        break;
      case 'phone': //座机
        value.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/) ? callback() : callback("格式不正确,请使用下面格式:020-88888888")
        break;
      case 'intOrFloat': //验证数字(包括小数)
        value.match(/^\d+(\.\d+)?$/) ? callback() : callback("请输入整数或小数")
        break;
      case 'mobile': //验证手机号
        value.match(/^(13|15|18|17|16|19)\d{9}$/) ? callback() : callback("请输入正确的手机号码")
        break;
      case 'qq': //验证QQ(5-10位)
        value.match(/^[1-9]\d{4,9}$/) ? callback() : callback("请输入正确的QQ号")
        break;
      case 'age': //验证年龄(0-120位)
        value.match(/^(?:[1-9][0-9]?|1[01][0-9]|120)$/) ? callback() : callback("年龄必须是0-120之间")
        break;
      case 'chinese': //验证中文)
        value.match(/^[\Α-\￥]+$/) ? callback() : callback("内容只能包含中文")
        break;
      case 'english': //验证英文
        value.match(/^[A-Za-z]+$/) ? callback() : callback("内容只能包含英文")
        break;
      case 'unnormal': //是否为空和空格
        value.match(/\S/) ? callback() : callback("内容不能为空和全部空格")
        break;
      case 'username': //之前用于验证用户账号格式的
        value.match(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/) ? callback() : callback("用户名由6-16位英文字母/数字组成,并且字母开头")
        break;
      case 'zip': //邮政编码
        value.match(/^[1-9]\d{5}$/) ? callback() : callback("邮政编码格式不正确")
        break;
      case 'ip': //ip
        value.match(/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/) ? callback() : callback("IP地址格式不正确")
        break;
      case 'name': //验证中文或英文
        (value.match(/^.{1,8}$/) || value.match(/^([\u4e00-\u9fa5]{1,8}|[a-zA-Z]{1,8}|([\u4e00-\u9fa5]|[a-zA-Z]+[a-zA-Z]|[\u4e00-\u9fa5]))$/) ) ? callback(): callback("只能是英文或中文，允许2-8位")
        break;
      case 'content': //验证内容不超过30位
        (value.match(/^.{0,30}$/) || value.match(/^\w+[\w\s]+\w+$/)) ? callback(): callback("内容长度只能为0-30位")
        break;
      case 'url': //验证内容不超过30位
        value.match(/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/) ? callback() : callback("请输入有效url地址")
        break;
      case 'email': //验证内容不超过30位
        value.match(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/) ? callback() : callback("邮箱格式不正确")
        break;
      case 'date': //日期格式(YY-MM-DD或YY-M-D)
        value.match(/^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/) ? callback() : callback("日期格式不正确(YYYY-MM-DD或YYYY-M-D)")
        break;
      default:;

    }
  }
}