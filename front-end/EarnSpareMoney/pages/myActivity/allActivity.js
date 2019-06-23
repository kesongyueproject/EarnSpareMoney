// pages/myActivity/allActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [],
    activityType:"",
    userID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var activityType = options.type;
    var userID = options.uid; 
    this.setData({
      activityType:activityType,
      userID:userID
    }); 
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + that.data.userID,
      method: 'GET',
      dataType: 'json',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data);
        var api = [], ape = [];
        if (res.data.publish != null) {
          for (var i = 0, len = res.data.publish.length; i < len; i++) {
            wx.request({
              url: 'http://happyzhier.club:3000/mission?mid=' + res.data.publish[i].mid,
              method: 'GET',
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              success: function (res) {
                //console.log(res.data);

                if (res.data.ing == true) {
                  api.push(res.data);
                } else {
                  ape.push(res.data);
                }

                if (that.data.activityType == "publishIng") {
                  that.setData({ activitys: api });
                } else if (that.data.activityType == "publishEnd") {
                  that.setData({ activitys: ape });
                }
              }
            });
          }
        }

        var aji = [], aje = [];
        if (res.data.participate != null) {
          for (var i = 0, len = res.data.participate.length; i < len; i++) {
            wx.request({
              url: 'http://happyzhier.club:3000/mission?mid=' + res.data.participate[i].mid,
              method: 'GET',
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              success: function (res) {

                if (res.data.ing == true) {
                  aji.push(res.data);
                  //console.log(aji);
                } else {
                  aje.push(res.data);
                }

                if (that.data.activityType == "joinIng") {
                  that.setData({ activitys: aji });
                } else if (that.data.activityType == "joinEnd") {
                  that.setData({ activitys: aje });
                }
              }
            });
          }
        }
      }
    });
  },

  onGoJoinIngDetail: function (event) {
    var mid = event.currentTarget.dataset.mid;
    var type = this.data.activityType;
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?mid=' + mid + '&uid=' + this.data.userID + '&type=' + type
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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