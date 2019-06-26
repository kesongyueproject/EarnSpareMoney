var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    tabs: ["我参加的", "我发布的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    activityJoinIng:[],
    activityJoinEnd:[],
    activityPublishIng:[],
    activityPublishEnd:[],
    userID:""
  },
  onLoad: function () {
    var that = this;
    this.setData({
      userID:app.globalData.username
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          icon20: "../image/chat.png"
        });
      }
    });
  },
  onShow:function(){
    var that = this;
    var userID = that.data.userID;
    wx.request({
      url: 'http://happyzhier.club:3000/user?uid=' + userID,
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

                that.setData({
                  activityPublishIng: api,
                  activityPublishEnd: ape
                });
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
                //console.log(res.data);

                if (res.data.ing == true) {
                  aji.push(res.data);
                } else {
                  aje.push(res.data);
                }

                that.setData({
                  activityJoinIng: aji,
                  activityJoinEnd: aje
                });
              }
            });
          }
        }
      }
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id  
    });
  },
  onGoJoinIngDetail:function(event){
    var mid = event.currentTarget.dataset.mid;
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?mid=' + mid +'&uid='+this.data.userID + '&type=' + type
    });
  },
  onGoMoreAcitivity:function(event){
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/myActivity/allActivity?uid='+this.data.userID+'&type='+type
    });
  }
});