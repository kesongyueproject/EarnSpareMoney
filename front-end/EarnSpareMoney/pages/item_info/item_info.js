// pages/item_info/item_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "taskName",
    name: "yasuo",
    digest: "死亡如风，常伴吾身。",
    img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557235922&di=e2544265b24e43ffda7b6cdb60d8ef31&src=http://img.weixinyidu.com/160318/c0375fe2.jpg",
    description: "向前出剑，造成20/45/70/95/120(+1),如果在突进的过程中施放斩钢闪，那么斩钢闪就会呈环状出剑。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },

  getAuthorInfo: function () {
    wx.navigateTo({
      url: '../author_info/author_info?name=' + this.data.name,
    })
  },

  participate: function () {
    wx.showModal({
      title: '消息提示',
      content: '你确定要参加该活动吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        //console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '../msg_success/msg_success'
          })
        } else {
        }
      }
    });
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