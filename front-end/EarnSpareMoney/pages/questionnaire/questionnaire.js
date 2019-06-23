// pages/questionnaire/questionnaire.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singleSelectQuestions: [{
      type: "单选", subject: "周杰伦",
      options: [{ name: "七里香" }, { name: "一路向北" }, { name: "半岛铁盒" }]
    }],

    multipleSelectQuestions: [{
      type: "多选", subject: "林俊杰",
      options: [{ name: "修炼爱情" }, { name: "江南" }, { name: "背对背拥抱" }, { name: "一千年以后" }]
    }],

    hiddenSelectQuestion: true,
    questionType: 2,
    newSelectSubject: "",
    numOfNewOptions: 2,
    newOptions: [{ name: "" }, { name: "" }],
    detailOfQuestion: {}
  },

  //获取新添加的选择题的题目
  newSelectSubject: function (e) {
    this.setData({
      newSelectSubject: e.detail.value
    })
  },

  //获取新添加的选择题的选项
  newSelectOptions: function (e) {
    var newOptions_ = this.data.newOptions;
    var index = parseInt(e.currentTarget.dataset.index);
    newOptions_[index].name = e.detail.value;
    this.setData({
      newOptions: newOptions_
    })
  },

  //添加新建选择题的选项
  addOption: function () {
    var num = this.data.numOfNewOptions + 1;
    var options = this.data.newOptions;
    options.push({ name: "" });
    this.setData({
      numOfNewOptions: num,
      newOptions: options
    })
  },

  //添加问题
  addQuestion: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['单选题', '多选题'],
      success: function (res) {
        if (res.tapIndex == 0) {
          //添加单选题
          that.setData({
            hiddenSelectQuestion: false,
            questionType: 0
          })
        } else if (res.tapIndex == 1) {
          //添加多选题
          that.setData({
            hiddenSelectQuestion: false,
            questionType: 1
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //取消添加问题
  cancel: function () {
    this.setData({
      hiddenSelectQuestion: true,
      questionType: 2,
      newSelectSubject: "",
      numOfNewOptions: 2,
      newOptions: [{ name: "" }, { name: "" }]
    });
  },

  //确定添加问题
  confirm: function () {
    var that = this;
    if (this.data.questionType == 0) {
      var newSubject = that.data.newSelectSubject;
      var newQuestions = that.data.singleSelectQuestions;
      var newOptions = that.data.newOptions;
      var newQuestion = { type: "单选", subject: newSubject, options: newOptions };
      newQuestions.push(newQuestion);
      that.setData({
        singleSelectQuestions: newQuestions
      })

    } else if (this.data.questionType == 1) {
      var newSubject = that.data.newSelectSubject;
      var newQuestions = that.data.multipleSelectQuestions;
      var newOptions = that.data.newOptions;
      var newQuestion = { type: "多选", subject: newSubject, options: newOptions };
      newQuestions.push(newQuestion);
      that.setData({
        multipleSelectQuestions: newQuestions
      })
    }

    that.setData({
      hiddenSelectQuestion: true,
      questionType: 2,
      newSelectSubject: "",
      numOfNewOptions: 2,
      newOptions: [{ name: "" }, { name: "" }]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newQuestionnaire = JSON.parse(options.questionnaire);
    this.setData({
      detailOfQuestion: newQuestionnaire
    })
  },

  //完成编辑，将JSON数据传到服务端
  complete: function () {
    var that = this;
    wx.request({
      url: 'http://happyzhier.club:3000/mission',
      data: {
        title: that.data.detailOfQuestion.title,
        uid: app.globalData.username,
        reward: that.data.detailOfQuestion.reward,
        mtype: "questionnaire",
        description: that.data.detailOfQuestion.description,
        imgs_url: that.data.detailOfQuestion.icon,
        ing: true,
        people: 0,
        people_limit: that.data.detailOfQuestion.people_limit,
        singleSelectQuestions: that.data.singleSelectQuestions,
        multipleSelectQuestions: that.data.multipleSelectQuestions
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log('submit success');
      },

      fail: function () {
        console.log('submit fail');
      },

      complete: function () {
        console.log('submit comlete');
      }
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