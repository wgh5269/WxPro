const app = getApp()
Page( {
  data: {
    userInfo: {},
    projectSource: '',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 1,
      url: "../cart/cart"
    }, {
        icon: '../../images/iconfont-card.png',
        text: '我的代金券',
        isunread: false,
        unreadNum: 2
      }, {
        icon: '../../images/iconfont-icontuan.png',
        text: '我的拼团',
        isunread: true,
        unreadNum: 1
      }, {
        icon: '../../images/iconfont-shouhuodizhi.png',
        text: '收货地址管理',
        url:"../address/address"
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服'
      }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题'
      }]
  },

  onLoad: function() {
    var that = this
    //获取全局数据
    that.setData({
      userInfo: app.userInfo
    }) 
  


  }
})