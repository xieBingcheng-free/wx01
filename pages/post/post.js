// pages/post/post.js
var postsData=require('../../data/post-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_key: postsData.postList,
   
  },
  /*事件*/
  //跳转页面并且传数据
  onPostTap(event) {
    var postId=event.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
    //记录文章阅读次数
    var postcounts = wx.getStorageSync("conunt")
    postcounts[postId] = parseInt(postcounts[postId])+1;
    wx.setStorageSync("conunt", postcounts)
    postsData.postList[postId].view_num = postcounts[postId]
    this.setData({
      post_key: postsData.postList,
    })
  
  },
  onSwiperTap(event){
    var postId = event.target.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取阅读次数
    var postcounts=wx.getStorageSync("conunt")
   
    if (postcounts){
      for (var i = 0; i < postsData.postList.length;i++){
        
        postsData.postList[i].view_num = postcounts[i]
      }
      
      this.setData({
        post_key: postsData.postList,
      })
      console.log(this.data.post_key);
    }else{
      var postcounts = {};
      for (var i = 0; i < postsData.postList.length;i++){
        postcounts[i] = postsData.postList[i].view_num
        console.log(postsData.postList[i].view_num);
      }
      wx.setStorageSync('conunt', postcounts )
      console.log(postsData.postList.length);
    }


  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})