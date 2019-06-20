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
      url: 'http://happyzhier.club:3000/missions',
      method:'GET',
      dataType:'json', 
      header:{'content-type':'application/json'},
      success:function(res){
        //console.log(res.data);
        that.setData({
          activityJoinIng: res.data.data,
          activityJoinEnd: res.data.data,
          activityPubishIng: res.data.data,
          activityPublishEnd: res.data.data
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
  },
  onGoJoinIngDetail:function(event){
    //console.log(event.currentTarget.dataset.mid);
    var mid = event.currentTarget.dataset.mid;
    //url = '/pages/activityDetail/activityDetail?mid='+mid;
    var obj = {
      url: '/pages/activityDetail/activityDetail?mid=' + mid
    };
    wx.navigateTo(obj);
  }

});