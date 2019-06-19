// pages/login/login.js
Page({
  data:{
    userName:'',
    userPas:''
  },
  username:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      userPas: e.detail.value
    })
  },
  denglu:function(){
    var that = this;
    wx.request({
      url: 'http://happyzhier.club:3000/login',
      method:'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        uid: that.data.userName,
        passwd: that.data.userPas
      },
      success: function (res) {
        console.log(res.data.msg);
        if(res.data.msg == "success") {
          wx.switchTab({
            url: '/pages/search_tasks/search_tasks',
          })
        }
        else {
          wx.showModal({
            title: '登录有误！',
            content: '用户名或密码有误！',
            confirmText: "前往注册",
            cancelText: "重新登录",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              } else {
                console.log('再登录')
              }
            }
          });
        }
      },
      fail: function (res) {
        console.log(res.data.msg);
      }
    })
  }
})