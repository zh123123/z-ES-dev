const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mess:"test",
    stuList : [],
    btnVal: [],
    room:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("page ---onLoad---")
    app.btnVal = []
  },
  onShow:function(){
    console.log("page ---onShow---");
    var that = this
    var serverUrl = app.serverUrl
    console.log(app.room)
    this.setData({
      room: app.room
    })
    wx.request({
      url: serverUrl + "/getStuList?examId="+ app.examId + "&room=" + app.room,
      method: "post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var status = res.data.status
        console.log(res)
        if (status == 200) {
         
          var stuList = res.data.data
          for (var i = 0; i < stuList.length; i++) {
            if (!app.btnVal[i]) {
              // that.setData({
              //   ['btnVal[' + i + ']']: '验证'
              // })
              app.btnVal[i] = '验证'
            }
            //console.log(app.btnVal[i])
            that.setData({
              btnVal: app.btnVal
            })
          }
          that.setData({
            stuList: stuList
          })
        } else if (status == 500) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        }
      }
    })

  },
  recog:function(e){
    var name = e.currentTarget.dataset.name
    var snum = e.currentTarget.dataset.snum
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../recog/recog?snum=' + snum + '&name=' + name + '&index=' + index,
    })
  }
})