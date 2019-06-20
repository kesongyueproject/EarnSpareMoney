// pages/register/register.js
Page({
  data:{
    username:'',
    password:'',
    nickname:'',
    signature:'',
    tel:'',
    school:'',
    money:0,
    credit:80,
    img_url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1794684000,4038363876&fm=11&gp=0.jpg',
    passwd_conf:''
  },
  userName: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passWord: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  passWord_confirm: function (e) {
    this.setData({
      passwd_conf: e.detail.value
    })
  },
  nickName: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  signature_: function (e) {
    this.setData({
      signature: e.detail.value
    })
  },
  phone_num: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  school_: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  zhuce:function(){
    var that = this;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/; 
    if (!myreg.test(that.data.tel) || that.data.username == '' || that.data.password == '' || that.data.nickname == '' || that.data.passwd_conf == '' || that.data.password != that.data.passwd_conf){
      console.log("信息输入有误！");
      wx.showModal({
        content: '输入信息不正确，请重新输入！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('重新输入')
          }
        }
      });
    }
    else{
      console.log("信息格式正确");
      wx.request({
        url: 'http://happyzhier.club:3000/register',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: that.data.username,
          passwd: that.data.password,
          nickname: that.data.nickname,
          signature: that.data.signature,
          img_url: that.data.img_url,
          tel: that.data.tel,
          school: that.data.school,
          money: that.data.money,
          credit: that.data.credit,
        },
        success: function (res) {
          console.log(res.data.msg);
          if (res.data.msg == "success") {
            wx.showModal({
              title: '注册成功！',
              content: '',
              confirmText: "前往登录",
              cancelText: "继续注册",
              success: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                } else {
                  console.log('继续注册')
                }
              }
            });
          }
          else {
            wx.showModal({
              content: '该用户已存在，请重新注册！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('重新注册')
                }
              }
            });
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  }
})