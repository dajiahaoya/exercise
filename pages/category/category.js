import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 被点击的左侧菜单
    currentIndex:0,
    // 右侧商品的滚动条距离顶部的距离
    scrollTop:0
  },
  // 返回接口数据
  Cates:[],

  onLoad: function (options) {
    this.getCates();
    // 获得本地存储中的数据
    const Cates=wx.getStorageSync("cates");
    // 判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧的数据
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
          // 重新设着右侧内容距离顶部的距离
          scrollTop:0
      })
      }
    }
  },
  // 获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;
    //   // 把接口数据存入本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

    //   // 构造了左侧菜单的数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res=await request({url:"/categories"});
      this.Cates=res;
      // 把接口数据存入本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      // 构造了左侧菜单的数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
  
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
    })
  }
})