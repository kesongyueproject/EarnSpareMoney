// pages/activityDetail/activityDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:"/pages/image/chat.png"
  },
  onClick:function(){
    wx.showModal({
      title: '消息提醒',
      content: '你正在取消一个任务，取消参加任务会影响你的信誉度',
      confirmText:'确定',
      cancelText:'取消',
      success:function(res){
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: 'cancel_success',
          })
        } else {
          console.log('用户点击取消操作')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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