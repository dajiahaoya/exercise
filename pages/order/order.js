import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:"0",
      value:"综合",
      isActive:true,
    },
    {
      id:"1",
      value:"代付款",
      isActive:false,
    },
    {
      id:"2",
      value:"代发货",
      isActive:false,
    },
    {
      id:"3",
      value:"退款/退货",
      isActive:false,
    }
  ],
  },
  onShow(options){
    let pages =  getCurrentPages(); 

    let currentPages=pages[pages.length-1];

    console.log(pages);
    const {type}=currentPages.options;

    this.getOrders(type);
  },
  async getOrders(type){
    const res= await({url:"/my/orders/all",data:{type}});
    console.log(res);
  },
  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})