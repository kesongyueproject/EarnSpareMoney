// pages/self_info/self_info.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_url:'',
    uid:'',
    nickname:'',
    signature:'',
    school:'',
    tel:'',
    credit:''
  },
  getData: function(){
    var that = this
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=test',
      method: 'GET',
      success: function (res) {
        console.log('self_info data check')
        console.log(res.data)
        that.setData({
          img_url: res.data.userInfo.img_url,
          uid: res.data.userInfo.uid,
          nickname: res.data.userInfo.nickname,
          signature: res.data.userInfo.signature,
          school: res.data.userInfo.school,
          tel: res.data.userInfo.tel,
          credit: res.data.userInfo.credit
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getData()
  }
})