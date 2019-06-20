
//releaseTask.js
//获取应用实例
const app = getApp()

Page({
  data: {
    radioItems: [
      { name: '问卷', value: '0', checked: "true"},
      { name: '活动', value: '1'},
      { name: '跑腿', value: '2'},
    ],
    images: [],
    biaoti : '',
    faburen : '',
    baochou : '',
    miaoshu : '',
    tubiao : 0
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  removerImage:function(e){
    var that = this;
    var imgs = that.data.images;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          images: []
        });
      }
    })
  },
  confirm:function(){
    wx.showModal({
      title: '消息提示',
      content: '你确认要发布该任务吗？',
      confirmText: "继续",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/release_success/release_success',
          })
        } else {
          console.log('取消')
        }
      }
    });
  },
  input_biaoti: function(e){
    this.setData({
      biaoti : e.detail.value
    })
  },
  input_faburen: function (e) {
    this.setData({
      faburen : e.detail.value
    })
  },
  input_baochou: function (e) {
    this.setData({
      baochou : e.detail.value
    })
  },
  input_miaoshu: function (e) {
    this.setData({
      miaoshu : e.detail.value
    })
  },
  confirm: function(){
    var that = this;
    if (that.data.radioItems[0].checked){
      var myQuestionnaire = {
        title: that.data.biaoti,
        icon: that.data.tubiao,
        reward: 1,
        people_limit: 100,
        description: that.data.miaoshu
      }
      let myQuestionnaireStr = JSON.stringify(myQuestionnaire);
      wx.navigateTo({
        url: '../questionnaire/questionnaire?questionnaire=' + myQuestionnaireStr
      })
    }else{
      wx.request({
        url: 'https://happyzhier.club/mission',
        data: {
          publisher: that.data.faburen,
          title: that.data.biaoti,
          details: that.data.miaoshu,
          reward: that.data.baochou
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'PUT',
        success: function (res) {
          console.log("success");
        },
        fail: function (res) {
          console.log("fail");
        }
      })
    }
  }
})