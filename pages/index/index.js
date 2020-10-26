//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function (options) {
    // 1.发送异步请求得到轮播图数据 优化手段通过es6的 promise来达到这个目的
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', 
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })        
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  // 获得轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获得分类导航数据
  getCatesList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
});