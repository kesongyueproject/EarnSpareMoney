// pages/search_tasks/search_tasks.js

var app = getApp();
var pageNum = 0;
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

    var list0 = [], list1 = [], list2 = [];

    wx.request({
      url: 'http://happyzhier.club:3000/missions',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var len = res.data.count;
        for (var i = 0; i < len; i++) {
          list0.push(res.data.data[i]);
          switch (res.data.data[i].mtype) {
            case "questionnaire":
              list1.push(res.data.data[i]);
              break;
            case "other":
              list2.push(res.data.data[i]);
              break;
            default:
              break;
          }
        }
        that.setData({
          taskList0: list0,
          taskList1: list1,
          taskList2: list2
        });
      }
    })
  },

  bindChange: function (e) {
    var that = this;
    //var list = that.data.taskList0;
    that.setData({
      currentTab: e.detail.current,
    })
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
  },

  getItemInfo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var mid = this.data.taskList0[index].mid;
    wx.navigateTo({
      url: '../item_info/item_info?mid=' + mid,
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