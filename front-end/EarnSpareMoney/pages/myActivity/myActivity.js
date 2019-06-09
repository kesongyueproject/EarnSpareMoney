var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["我参加的", "我发布的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    activityJoinIng:[],
    activityJoinEnd:[],
    activityPubishIng:[],
    activityPublishEnd:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          icon20: "../image/chat.png"
        });
      }
    });

    wx.request({
      url: 'https://happyzhier.club/missions',
      method:'GET',
      dataType:'json',
      header:{'content-type':'application/json'},
      success:function(res){
        console.log(res.data.missions);
        that.setData({
          activityJoinIng: res.data.missions,
          activityJoinEnd: res.data.missions,
          activityPubishIng: res.data.missions,
          activityPublishEnd: res.data.missions
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id  
    });
  },
  publish_doing_more:function(){
    // this.setData({
    //   activeIndex:2
    // });
    wx.navigateTo({
      url:'allActivity'
    });
  }
});