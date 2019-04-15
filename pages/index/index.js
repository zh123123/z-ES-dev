// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array : [],
    index : 0,
    examIds : [0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var serverUrl = app.serverUrl;
    var that = this;
    wx.request({
      url: serverUrl + "/getExamList",
      method: "post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200){
          var exams = data.data;
          var array = [];
          var examIds = [];
          array.push("请选择")
          examIds.push("0")
          for (var i = 0; i < exams.length ; i++){
            var item = exams[i].ename + "(" + exams[i].id + ")" 
            array.push(item)
            examIds.push(exams[i].id)
          }
          that.setData({
            array : array,
            examIds: examIds
          })
        }else{
          wx.showToast({
            title: '请求出错',
            icon : 'none'
          })
        }
        
      }
    })
  },
  bindPickerChange:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    //console.log(this.data.examIds[this.data.index])
  },
  doLogin:function(e){
    var examId = this.data.examIds[this.data.index]
    if (examId == 0) {
      wx.showToast({
        title: '请选择考试项目',
        icon : 'none'
      })
    }else{
      app.examId = examId
        wx.navigateTo({
          url: '../login/login',
        })
    }
    
  }
})