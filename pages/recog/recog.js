// pages/recog/recog.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '',
    snum : '',
    msg :'',
    msgColor : 'red'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var snum = options.snum
    var name = options.name
    var index = options.index
    console.log(snum)
    this.setData({
      snum : snum,
      name : name,
      index : index
    })
  },
  takePhoto : function() {
    let that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath);
        var tempImagePath = res.tempImagePath;
        var serverUrl = app.serverUrl;
        that.setData({
          src: tempImagePath
        })
        wx.uploadFile({
          url: serverUrl + '/faceRecog?snum=' + that.data.snum + '&examId=' + app.examId,
          filePath: tempImagePath,
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            var data = JSON.parse(res.data)
            console.log(data)
            if(data.data){
              wx.showToast({
                title: '验证通过',
                icon:'success',
                duration:3000
              })
              app.btnVal[that.data.index] = '√'
              that.setData({
                msg:'验证通过',
                msgColor : 'green'
              })
              wx.navigateBack({
                delta: 1,
              })
            }else{
              wx.showToast({
                title: '验证失败',
                icon: 'none',
                duration: 3000
              })
              that.setData({
                msg: '验证失败'
              })
            }
          }
        })
      }
    })
  },
  navBack : function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  error(e) {
    console.log(e.detail)
  }
})