//register.js
//获取应用实例
const app = getApp()

Page({
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  regis:function(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})