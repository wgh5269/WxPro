var app = getApp()
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
		    curIndex: 0
    },
    onLoad: function() {

        var that = this
        console.log(that.data.curIndex);
        wx.request({
          url: app.globalData.ip+'/goods/type',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                  navLeftItems: res.data.result.list,
                  navRightItems: res.data.result.list
                })
            }
        })
    },
    //事件处理函数
    switchRightTab: function(e) {
      console.log(e.target.dataset);
        let id = e.target.dataset.id,
			  index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
			curIndex: index
		})
    }

})