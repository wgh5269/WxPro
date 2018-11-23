var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        cartTips:"添加购物车",
        colletionUrl:'../../images/Collection.png'
    },

    onLoad: function(options) {
        var that = this
        // 商品详情
        wx.request({
          url: app.globalData.ip+'/goods/info?productId=' + options.id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                //console.log(res.data.data);
               that.data.shopppingDetails = res.data.result.list;
              // var goodsPicsInfo = [];
              // goodsPicsInfo = res.data.result.list;
               console.log(res.data.result.list.producetImage);
                that.setData({
                  shopppingDetails: res.data.result.list,
                })
            }
        })
        //商品是否收藏
        wx.request({
          url: app.globalData.ip + '/goods/selectColletion',
          method: 'POST',
          data: {
            userId: app.openid,
            productId: options.id,
          },
          header: {
            'Accept': 'application/json'
          },
          success: function (res) {
            if (res.data.status = "3"){
             
            }else{
              that.setData({
                colletionUrl: '../../images/Collectioned.png',
              })
            }
          }
        })

    },
    //添加购物车
    addCar:function(e){
      wx.request({
        url: app.globalData.ip + '/goods/select_user',  //判断用户是否已经存在
        method: 'POST',
        data: {
          userId: app.openid,
          userName: app.globalData.userInfo.nickName,
          productId: e.currentTarget.dataset.pid,
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
               var res = res.data;
               console.log(res);
              if (res.status == "1"){
                wx.request({
                  url: app.globalData.ip + '/goods/save_user', //用户不存在，就自动创建和保存
                  method: 'POST',
                  data: {
                    userId: app.openid,
                    userName: app.globalData.userInfo.nickName,
                    productId: e.currentTarget.dataset.pid,
                  },
                  header: {
                    'Accept': 'application/json'
                  },
                  success: function (res) {
                    var res = res.data;
                    if (res.status == "0"){
                              wx.request({
                                url: app.globalData.ip + '/goods/wxAddCart',//自动添加购物车
                                method: 'POST',
                                data: {
                                  userId: app.openid,
                                  userName: app.globalData.userInfo.nickName,
                                  productId: e.currentTarget.dataset.pid,
                                },
                                header: {
                                  'Accept': 'application/json'
                                },
                                success: function (res) {
                                  var that = this;
                                  var res = res.data;
                                  if (res.status == "0") {
                                    wx.showToast({
                                      title: '添加成功',
                                      image:'../../images/cart.png',
                                      duration: 2000
                                    })
                                  }
                                }
                              })
                            }
                          }
                        })
                }else{ 
                          //判断出用户已经存在 直接添加购物车
                      wx.request({
                        url: app.globalData.ip + '/goods/wxAddCart',//自动添加购物车
                        method: 'POST',
                        data: {
                          userId: app.openid,
                          userName: app.globalData.userInfo.nickName,
                          productId: e.currentTarget.dataset.pid,
                        },
                        header: {
                          'Accept': 'application/json'
                        },
                        success: function (res) {
                         
                          var that = this;
                          var res = res.data;
                          if (res.status == "0") {
                            wx.showToast({
                              title: '添加成功',
                              image: '../../images/cart.png',
                              duration: 2000
                            })
                          }
                        }
                      })
                }



        }

      })

    },
    Collction: function (e){
      var that = this
      if (app.openid != null && app.openid != " " && e.currentTarget.dataset.pid>0){
          wx.request({
            url: app.globalData.ip + '/goods/colletion',
            method: 'POST',
            data: {
              userId: app.openid,
              productId: e.currentTarget.dataset.pid,
            },
            header: {
              'Accept': 'application/json'
            },
            success: function (res) {
              var res = res.data;
              if (res.status == "0") {
                that.setData({
                  colletionUrl: '../../images/Collectioned.png'
                })
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  image: '../../images/sucess.png',
                  duration: 2000
                })
              } else if (res.status == "2"){
                that.setData({
                  colletionUrl: '../../images/Collection.png'
                })
                wx.showToast({
                  title: '取消收藏',
                  icon: 'success',
                  image: '../../images/sucess.png',
                  duration: 2000
                })
              }
              else{
                  
              }
            }
          })
         }else{
           wx.showToast({
             title: '操作失败',
             image:'../../images/fail.png',
             duration: 2000
           })
         }
    },

    toPay: function (e){
      console.log(app.openid);
      console.log(app.globalData.userInfo.nickName);
    }
})
