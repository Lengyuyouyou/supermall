import {request} from './request'

export function getHomeMultidata(){
  return request({
    url:'/home/multidata',
    //method:'get',

  })
}
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}


let totalNums=[]
const num1=[1,2,3]
const num2=[4,5,6]
//...解析某个对象的所有内容，一个个取出来放入另一个变量中
totalNums.push(...num1)