// pages/modify_img/modify_img.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()


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

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          img_url: res.tempFilePaths
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.img_url // 需要预览的图片http链接列表
    })
  },
  getData: function () {
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid='+ app.globalData.username,
      method: 'GET',
      success: function (res) {
        console.log('img data check')
        console.log(res.data)
        that.setData({
          img_url: res.data.userInfo.img_url
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
})