// pages/post/post-detail/post-detail.js
var postDate=require('../../../data/post-data.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },
  // //监听
  setMusicMonitor:function(){
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true; 
      app.globalData.g_currentMusicPostId=that.data.currentPostId; 
    }),
      wx.onBackgroundAudioPause(function () {
        that.setData({
          isPlayingMusic: false
        })
      app.globalData.g_isPlayingMusic = false; 
      app.globalData.g_currentMusicPostId = null; 
      })
  },
  //音乐播放
  onMusicTap(event){
    var currentPostId = this.data.postId;
   
    var postData = postDate.postList[currentPostId]
    // console.log(postData)
    var isPlayingMusic=this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }
    
  },
  //分享
  onShareTap(event){
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#405f80",
      success(res){
        //res.cancel 用户是不是点击取消按钮
        //res.tapIndex 数据元素的序号，0开始
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content: '用户是否选择取消'+res.cancel+"现在无法实现分享功能",
        })
      }
    })
  },
  //收藏
  onColletionTap(event){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected=postsCollected[this.data.postId];
   
    //收藏变成未收藏，未收藏变成收藏  
    postCollected=!postCollected;
    postsCollected[this.data.postId] = postCollected;
    //更新文章是否缓存值
    wx.setStorageSync('posts_collected',postsCollected)
    //更新数据绑定变量，从而 实现切换图片
    this.setData({
      collected:postCollected
    })
    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
      duration:1000,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      postId,
    })
    var postData = postDate.postList[postId];

    this.data.ppp=postData;
    this.setData({
      postData
    })
    /////
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected){
      var postCollected=postsCollected[postId]
      this.setData({
        collected: postCollected
      })
     
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    //
    if(app.globalData.g_isPlayingMusic && app.g_currentMusicPostId===postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    //监听  
    this.setMusicMonitor();

 },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})