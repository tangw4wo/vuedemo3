import Mock from "mockjs"
const fs = require('fs')
let appData = require('../../db.json')
let orderList={}
Mock.mock(/getNewsList/,{
    'getNewsList':appData.getNewsList
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
    