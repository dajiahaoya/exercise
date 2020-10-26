// pages/cart/cart.js

import{ getSetting,chooseAddress,openSetting,showModal,showToast }from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address=wx.getStorageSync("address");

    const cart=wx.getStorageSync("cart")||[];

    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({address});
    this.setCart(cart);
  },
  // 点击收货地址
  async handleChooseAddress(){
    // wx.chooseAddress({
    //   success: (result)=>{
    //     console.log(result);
    //   }
    // });
    // wx.getSetting({
    //   success: (result)=>{
    //     const scopeAddress=result.authSetting["scope.address"];
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           console.log(result1);
    //         }
    //       });
    //     }else{
    //       wx.openSetting({
    //         success: (resul2)=>{
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //               console.log(result3);
    //             }
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
    try {
      const res1=await getSetting();
      const scopeAddress=res1.authSetting["scope.address"];
      if(scopeAddress===false){
        await openSetting();
      }else{

    }
      let address=await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;

      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
    
  },
  // 商品选中
  async handleItemChange(e){
    // 获得被修改商品id
    const goods_id=e.currentTarget.dataset.id;
    // 获得购物车数组
    let {cart}=this.data;
    // 找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;

    this.setCart(cart);
    
  },
  // 设置购物车的数据，同时重新计算底部工具栏的数据
  setCart(cart){
    
    let allChecked=true;

    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })

    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品全选功能
  handleItemAllCheck(){
    // 获得data中的数据
    let {cart,allChecked}=this.data;

    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  async handleItemNumEdit(e){
    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      const res=await showModal({content:"您是否要删除？"});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      } 
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
    
  },
  // 点击结算
  async handlePay(){
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址！"});
      return;
    }
    if(totalNum===0){
      await showToast({title:"您还没有选购商品！"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  }
})

