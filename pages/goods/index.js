//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
    
    },
	

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },

    onLoad: function() {
      var that = this
        //sliderList
        wx.request({
          url: app.globalData.ip+'/goods?priceLevel=all',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                  images: res.data.result.list
                })
            }
        })

        //venuesList
        wx.request({
          url: app.globalData.ip+'/goods/type',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                  venuesItems: res.data.result.list
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })

        //choiceList
        wx.request({
          url: app.globalData.ip+'/goods?priceLevel=all',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              
                that.setData({
                    choiceItems: res.data.result.list
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })

    }
})
