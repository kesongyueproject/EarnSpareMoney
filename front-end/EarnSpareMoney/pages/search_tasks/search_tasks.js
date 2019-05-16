// pages/search_tasks/search_tasks.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    taskList0: [],
    taskList1: [],
    taskList2: [],
    taskList3: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },
    })

    var list0 = [
      { img: "https://ossweb-img.qq.com/images/lol/img/spell/YasuoQ1Wrapper.png", title: "斩钢闪", description: "向前出剑，造成20/45/70/95/120(+1)物理伤害。" },
      { img: "https://ossweb-img.qq.com/images/lol/img/spell/YasuoW.png", title: "风之障壁", description: "形成一个持续4秒的气流之墙，来阻挡敌方的飞行道具。" },
      { img: "https://ossweb-img.qq.com/images/lol/img/spell/YasuoE.png", title: "踏前斩", description: "向目标敌人突进，造成60/70/80/90/100魔法伤害。" }];

    that.setData({
      taskList0: list0
    });
  },

  bindChange: function (e) {
    var that = this;
    var list = that.data.taskList0;
    that.setData({
      currentTab: e.detail.current,
    })
    switch (e.detail.current) {
      case 1:
        if (that.data.taskList1.length == 0) {
          that.setData({
            taskList1: list,
          })
        }
        break;
      default:
        break;
    }
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    switch (e.target.dataset.current) {
      case 1:
        if (that.data.taskList1.length == 0) {
          that.setData({
            taskList1: list,
          })
        }
        break;
      default:
        break;
    }
  },

  getItemInfo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var title = this.data.taskList0[index].title;
    wx.navigateTo({
      url: '../item_info/item_info?title=' + title,
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