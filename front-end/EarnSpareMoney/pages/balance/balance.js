// pages/balance/balance.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:'error'
  },
  getData: function () {
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=test',
      method: 'GET',
      success: function (res) {
        console.log('balance data check')
        console.log(res.data)
        that.setData({
          balance: res.data.userInfo.money
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getData()
  }
})