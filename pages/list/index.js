var app = getApp()
Page({
    data: {
        
    },
    onLoad: function(options) {

        var that = this
        
        wx.request({
          url: app.globalData.ip+'/goods/getTypeList?typeId='+ options.typeid,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                  list: res.data.result.list.typeGoodsList,
                  typeid: options.typeid
                });

            }
        })
        
    }

})