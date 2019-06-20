// pages/topUp/topUp.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    uid: '',
    passwd: '',
    signature: '',
    img_url: '',
    tel: '',
    school: '',
    money: '',
    credit: '',
    addmoney:''
  },

  getData: function () {
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + app.globalData.username,
      method: 'GET',
      success: function (res) {
        console.log('money check')
        console.log(res.data.userInfo.money)
        that.setData({
          nickname: res.data.userInfo.nickname,
          uid: res.data.userInfo.uid,
          passwd: res.data.userInfo.passwd,
          signature: res.data.userInfo.signature,
          img_url: res.data.userInfo.img_url,
          tel: res.data.userInfo.tel,
          school: res.data.userInfo.school,
          money: res.data.userInfo.money,
          credit: res.data.userInfo.credit
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  inputvalue: function (e) {
    this.setData({
      addmoney: e.detail.value
    })
  },

  post: function () {
    var reg = /^(0|[1-9]\d*)$/;
    if(!reg.test(this.data.addmoney)){
      wx.showModal({
        content: '输入应为数字！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      var addm = parseInt(this.data.addmoney)
      if(addm > 10000){
        wx.showModal({
          content: '输入应为不大于10,000的非负整数',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }else{
        var m = parseInt(this.data.money)
        console.log(m+addm)
        wx.request({
          url: 'http://happyzhier.club:3000/user?uid=' + app.globalData.username,
          method: 'POST',
          data: {
            uid: this.data.uid,
            passwd: this.data.passwd,
            nickname: this.data.nickname,
            signature: this.data.signature,
            img_url: this.data.img_url,
            tel: this.data.tel,
            school: this.data.school,
            money: m+addm,
            credit: this.data.credit
          },
          success: function (res) {
            if (res.data.msg == 'success') {
              wx.showToast({
                title: '充值成功',
                icon: 'success',
                duration: 1000
              });
            } else {
              wx.showToast({
                title: '充值失败',
                icon: 'warn',
                duration: 1000
              });
            }
          },
          fail: function (err) {
            console.log(err)
            wx.showToast({
              title: '充值失败',
              icon: 'warn',
              duration: 1000
            });
          }
        })
      }
    }
  }
})