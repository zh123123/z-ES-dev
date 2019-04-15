// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad: function (options) {

  },
  onShow: function () {
    app.room = ''
    app.btnVal = ''
  },
  takePhoto: function () {
    let that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath);
        var tempImagePath = res.tempImagePath;
        var serverUrl = app.serverUrl;
        wx.uploadFile({
          url: serverUrl + '/teaLogin?examId=' + app.examId,
          filePath: tempImagePath,
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            var data = JSON.parse(res.data)
            console.log(data)
            if (data.status == 200) {
              app.room = data.data;
              wx.showToast({
                title: '验证成功',
                icon: 'success',
                duration: 3000
              })
              
              wx.navigateTo({
                url: '../stuList/stuList',
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    })
  }
})