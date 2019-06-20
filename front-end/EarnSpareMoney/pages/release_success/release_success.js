//release_success.js
//获取应用实例
const app = getApp()

Page({
  myTasks: function(){
    wx.switchTab({
      url: '/pages/myActivity/myActivity',
    })
  },
  backRegis:function(){
    wx.switchTab({
      url: '/pages/releaseTask/releaseTask',
    })
  }
})