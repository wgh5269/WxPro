var app = getApp()
Page({
  data: {
    deleteModalHidden: true,
    wantToDeleteItem: '',
    address: null,
    cartItems: [],
    amount: 0,
    posi:0,
    toast:""
  },

  onLoad: function (params) {
    this.getList();
    this.changeCartAmount();
    

  },

  onShow: function (params) {

    this.getList();
    this.changeCartAmount();

  },
  getList:function(){
    var that = this
    wx.request({
      url: app.globalData.ip + '/goods/selectCartList?userId=' + app.openid,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        var res = res.data;
        that.setData({
          cartItems: res.list,
        })
        that.changeCartAmount();
      }
    })
  },
  bindChangeQuantity: function (e) {//更改商品数量
    var that = this
    if (e.detail.value && e.detail.value != 0 && e.detail.value != ""){
      if (e.detail.value>0){
          wx.request({
            url: app.globalData.ip + '/goods/changeNum',
            method: 'POST',
            data: {
              userId: app.openid,
              productId: e.currentTarget.dataset.id,
              productNumber: e.detail.value,
            },
            header: {
              'Accept': 'application/json'
            },
            success: function (res) {
              var res = res.data;
              if (res.status == "0") {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
          this.getList()
         }
    } else if (e.detail.value == 0 && e.detail.value != ""){
      if (e.detail.value == 0){
        that.catchTapOnItem(e)
        if (e.type === "confirm") {
          wx.request({
            url: app.globalData.ip + '/goods/deleGoods',
            method: 'POST',
            data: {
              userId: app.openid,
              productId: e.currentTarget.dataset.id,
            },
            header: {
              'Accept': 'application/json'
            },
            success: function (res) {
              var res = res.data;
              if (res.status == "0") {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
               
              }
            }
          })
          this.getList()
         }
      }
    }else{
        
    }
    
  },

  // 删除提示
  catchTapOnItem: function (e) {//弹窗
    this.setData({
      deleteModalHidden: false,
      wantToDeleteItem: e.currentTarget.dataset.id
    })
  },

  deleteModalChange: function (e) {//删除产品
    var that = this
    if (e.type === "confirm") {
      wx.request({
        url: app.globalData.ip + '/goods/deleGoods',
        method: 'POST',
        data: {
          userId:app.openid,
          productId: that.data.wantToDeleteItem,
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          var res = res.data;
          if (res.status == "0"){
          wx.showToast({
            title: '成功',
            image:'../../images/delete.png',
            duration: 2000
          })
        }
        }
      })
    }
    this.setData({
      deleteModalHidden: true
    })
    this.getList();
    this.changeCartAmount();
  },

  bindBilling: function () {//结账功能
   
  },

  changeCartAmount: function () {//总计商品价格
    var amount = 0
    for (var i = 0; i < this.data.cartItems.length;i++){
      amount += this.data.cartItems[i].cartList[0].productNumber * this.data.cartItems[i].cartList[0].salePrice;
    }
    this.setData({amount: amount})
  },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
