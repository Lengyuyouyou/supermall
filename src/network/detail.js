import {request} from './request'
export function getDetail(iid){
  return request({
    url: '/detail',
    params:{
      iid 
    }
  })
}


export class Goods{
  /*constructor 是一种用于创建和初始化class创建的对象的特殊方法。*/
 constructor(itemInfo,columns,services){
     this.title=itemInfo.title
     this.desc=itemInfo.desc
     this.newPrice=itemInfo.price
     this.oldPrice=itemInfo.oldPrice
     this.discount=itemInfo.discountDesc
     this.columns=columns
     this.services=services
     this.realPrice=itemInfo.lowNowPrice
 }
}