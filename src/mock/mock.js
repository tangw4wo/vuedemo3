import Mock from "mockjs"
let appData = require('../../db.json')
let orderList={}
Mock.mock(/getNewsList/,{
    'getNewsList':appData.getNewsList
})
Mock.mock(/phonelist/,{
    'phoneList':appData.phoneList
})
Mock.mock(/user\/reg/,'post',()=>{
    let test={err:false}
    return test
})
Mock.mock(/user\/login/,'post',()=>{
    let test={status:true,username:'18876675560'}
    return test
})
Mock.mock(/user\/Status/,'post',()=>{
    let test={loginStatus:false}
    return test
})
Mock.mock(/user\/logOut/,"post",()=>{
    return true
})
Mock.mock(/user\/reg\/check/,()=>{
       return 'ok'
})    
Mock.mock(/orderList/,'post',(option)=>{
    let data = JSON.parse(option.body)
    let name = data.name
    for(let i in orderList){
        if(orderList[i].pho == data.pho){
            return "该手机号码已经预定，请使用别的号码！"
        }
    }
    orderList[name] = data;
    return "恭喜您预订成功!"
})
    