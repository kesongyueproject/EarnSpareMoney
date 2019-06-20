//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    name: '',
    img_url:'',
    signature:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getData:function(){
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=test',
      method: 'GET',
      success: function (res) {
        console.log('Me part data check')
        console.log(res.data)
        that.setData({
          name: res.data.userInfo.nickname,
          img_url: res.data.userInfo.img_url,
          signature: res.data.userInfo.signature
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onShow: function () {
    this.getData()
  }
})
