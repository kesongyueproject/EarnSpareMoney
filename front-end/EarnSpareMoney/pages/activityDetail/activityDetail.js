// pages/activityDetail/activityDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:"/pages/image/chat.png",
    activity:{},
    cancel:"",
    mtype:"",
    userID:"",
    atype:"other",
    singleSelectQuestions:[]
  },
  onClick:function(){
    var that = this;
    console.log([that.data.activity.mid]);
    wx.showModal({
      title: '消息提醒',
      content: '你正在取消一个任务，取消参加任务会影响你的信誉度',
      confirmText:'确定',
      cancelText:'取消',
      success:function(res){
        
        if (res.confirm) {
          if(that.data.mtype == "publishIng"){
            wx.request({
              url: 'http://happyzhier.club:3000/mission',
              method: 'DELETE',
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              data: {
                "mid": that.data.activity.mid
              },
              success: function (res) {
                console.log(res.data);
              }
            })
          } else if (that.data.mtype == "joinIng"){
            wx.request({
              url: 'http://happyzhier.club:3000/participate',
              method: 'DELETE',
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              data:{
                "mid": that.data.activity.mid,
                "uid": that.data.userID
              },
              success: function (res) {
                console.log(res.data);    
              }
            });
          }
          wx.redirectTo({
            url: 'cancel_success',
          });
        } else {
          console.log('用户点击取消操作');
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var mid = options.mid;
    var mtype = options.type;
    this.setData({
      mtype: mtype,
      userID:options.uid
    });
    
    switch(mtype){
      case "joinIng":
        that.setData({cancel:"取消参加"});
        break;
      case "joinEnd":
      case "publishEnd":
        that.setData({ cancel: "任务已结束" });
        break;
      case "publishIng":
        that.setData({ cancel: "取消发布" });
        break;
      default:break;   
    }
    wx.request({
      url: 'http://happyzhier.club:3000/mission?mid='+mid,
      method: 'GET',
      dataType: 'json',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          activity:res.data
        });
        if(res.data.mtype == "questionnaire"){
          wx.request({
            url: 'http://happyzhier.club:3000/questionnaire?mid=' + mid,
            method:'GET',
            dataType:'json',
            header: { 'content-type': 'application/json' },
            success:function(res){
              that.setData({
                singleSelectQuestions:res.data.singleSelectQuestions
              });
            }
          })
        }
      }
    });

  },

  finishMission:function(){
    var that = this;
    wx.request({
      url: 'http://happyzhier.club:3000/finish',
      method: 'PUT',
      dataType: 'json',
      header: { 'content-type': 'application/json' },
      data:{
        "mid":this.data.activity.mid,
        "uid":this.data.userID
      },
      success: function (res) {
        wx.showModal({
          content: '恭喜完成任务',
          showCancel:false,
          success:function(){
            wx.navigateBack({
              
            });
          }
        })
      },
      fail:function(res){
        wx.showModal({
          content: '连接服务器失败',
          showCancel: false,
        })
      }
    });
  },
  GoAuthorInfo:function(){
    wx.navigateTo({
      url: '/pages/author_info/author_info?name=' + this.data.userID,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})