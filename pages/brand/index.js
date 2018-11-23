var app = getApp()
Page({
    data: {
        
    },
    onLoad: function(options) {
        var that = this
        wx.request({
          url: app.globalData.ip+'/goods/type',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              var res = res.data;
                that.setData({
                  infoList: res.result.list,
                  posi:0
                });
                
            }
        })
    }

})