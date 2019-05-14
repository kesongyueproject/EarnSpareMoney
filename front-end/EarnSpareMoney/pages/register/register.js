//register.js
//获取应用实例
const app = getApp()

Page({
  openConfirm: function () {
    wx.showModal({
      title: '消息提示',
      content: '请核对个人信息准确无误！',
      confirmText: "继续",
      cancelText: "修改",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/operator_success/operator_success',
          })
        } else {
          console.log('修改')
        }
      }
    });
  },
})