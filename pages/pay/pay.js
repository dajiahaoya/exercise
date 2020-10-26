// pages/cart/cart.js

import{ getSetting,chooseAddress,openSetting,showModal,showToast }from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address=wx.getStorageSync("address");

    let cart=wx.getStorageSync("cart")||[];

    cart=cart.filter(v=>v.checked);

    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({address});
    
    let allChecked=true;

    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 点击支付
  handleOrderPay(){
    const token=wx.getStorageSync("token");
    if(token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    }
    console.log("已经存在token");
  }
})

