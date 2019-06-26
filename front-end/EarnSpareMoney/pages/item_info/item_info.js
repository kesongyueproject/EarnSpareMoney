// pages/item_info/item_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: "0",
    uid: "xxx",
    title: "taskName",
    nickname: "",
    introduction: "introduction",
    img_url: "",
    description: "description",
    mtype: "",
    reward: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      mid: options.mid
    })

    wx.request({
      url: 'http://happyzhier.club:3000/mission',
      data: { mid: that.data.mid },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          uid: res.data.uid,
          title: res.data.title,
          description: res.data.description,
          mtype: res.data.mtype,
          reward: res.data.reward
        })

        wx.request({
          url: 'http://happyzhier.club:3000/user?uid=' + that.data.uid,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              nickname: res.data.userInfo.nickname,
              introduction: res.data.userInfo.signature,
              img_url: res.data.userInfo.img_url
            })
          }
        })
      }
    })
  },

  getAuthorInfo: function () {
    wx.navigateTo({
      url: '../author_info/author_info?name=' + this.data.uid,
    })
  },

  participate: function () {
    var that = this;
    wx.showModal({
      title: '消息提示',
      content: '你确定要参加该活动吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://happyzhier.club:3000/participate',
            data: {
              mid: that.data.mid,
              uid: app.globalData.username
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },

            success: function (res) {
              console.log('submit success');
            },

            fail: function () {
              console.log('submit fail');
            },

            complete: function () {
              console.log('submit comlete');
            }
          })

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