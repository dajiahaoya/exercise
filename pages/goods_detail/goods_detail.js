import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  // 商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPages=pages[pages.length-1];
    let options=currentPages.options;

    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj= await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    // 获得缓存中的商品数
    let collect=wx.getStorageSync("collect")||[];
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 部分苹果手机不兼容图片
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    // 接收传递过来的图片
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd(){
    // 获得缓存中的购物车 数组
    let cart=wx.getStorageSync("cart")||[];
    // 判断 商品对象是否存在购物车中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push( this.GoodsInfo);
    }else{
      // 已经存在购物车数据中 运行num++
      cart[index].num++;
    }
    // 把购物车重新添加进缓存中
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '加入成功',
      icon: 'succee',
      mask: true
    });
  },
  // 点击商品收藏图标
  bandleCollect(){
    let isCollect=false;
    let collect=wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})