// pages/author_info/author_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    name: "name",
    wechat: "wechatID",
    school: "中山大学",
    phone: "12345678910",
    credit: "99"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      name: options.name
    })

    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + that.data.name,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          img: res.data.userInfo.img_url,
          name: res.data.userInfo.nickname,
          wechat: res.data.userInfo.uid,
          school: res.data.userInfo.school,
          phone: res.data.userInfo.tel,
          credit: res.data.userInfo.credit
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})