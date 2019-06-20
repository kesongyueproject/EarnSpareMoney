// pages/withdraw/withdraw.js
// pages/topUp/topUp.js
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
    minusmoney: ''
  },

  getData: function () {
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=test',
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
      minusmoney: e.detail.value
    })
  },

  post: function () {
    var reg = /^(0|[1-9]\d*)$/;
    if (!reg.test(this.data.minusmoney)) {
      wx.showModal({
        content: '输入应为数字！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      var mm = parseInt(this.data.minusmoney)
      if (mm > parseInt(this.data.money)) {
        wx.showModal({
          content: '您的余额不支持此操作',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      } else {
        var m = parseInt(this.data.money)
        console.log(m-mm)
        wx.request({
          url: 'http://happyzhier.club:3000/user?uid=test',
          method: 'POST',
          data: {
            uid: this.data.uid,
            passwd: this.data.passwd,
            nickname: this.data.nickname,
            signature: this.data.signature,
            img_url: this.data.img_url,
            tel: this.data.tel,
            school: this.data.school,
            money: m-mm,
            credit: this.data.credit
          },
          success: function (res) {
            if (res.data.msg == 'success') {
              wx.showToast({
                title: '兑换成功',
                icon: 'success',
                duration: 1000
              });
            } else {
              wx.showToast({
                title: '兑换失败',
                icon: 'warn',
                duration: 1000
              });
            }
          },
          fail: function (err) {
            console.log(err)
            wx.showToast({
              title: '兑换失败',
              icon: 'warn',
              duration: 1000
            });
          }
        })
      }
    }
  }
})