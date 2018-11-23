//app.js
App({
    data:{
      openid:null,
      failMsg:"",
      Login_status:""
    },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            js_code:res.code,
            grant_type: "authorization_code",
            appid:"wx30a2a97cdc233c17",
            secret:"633845f2021a51aa0ced8076ae95ed5b",
          },
          method:'GET',
          success:function(res){
            if (res.statusCode == "200"){
            getApp().openid = res.data.openid;
            getApp().Login_status = "200";
          }
          else{
              getApp().Login_status = "403";
              getApp().failMsg = res.errMsg;
          }
          }
        })
      }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ip:"http://localhost:3000"
    //ip: "http://192.168.23.1:3000"  //本机电脑开wifi的ip
    //ip:"http://192.168.43.215:3000" //本机电脑连接手机wifi的ip
   //ip: "http://192.168.43.63:3000" //本机电脑连接手机wifi的ip(习总)

  }, 
  
})