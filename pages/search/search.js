import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods: [],
    isFocus: false,
    inpValue:""
  },
  TimeId: -1,
  // 输入框的值改变 就会出发事件
  handleInput(e) {
    // 获取输入框的值
    const {
      value
    } = e.detail;
    // 检测合法性
    if (!value.trim()) {
      // 值不合法
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    // 准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(res);
    this.setData({
      goods: res
    })
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})