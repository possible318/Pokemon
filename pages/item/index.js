//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        isFilter: '',
        filter: '',
        spriteList: [],
        pageNo: 0,
        pageSize: 50,
        maxPageNo: 19
    },
    onShareAppMessage: function (e) {
    },
    // 加载数据
    onLoad: function (options) {
        this.isLoading = true;
        wx.showLoading({
            mask: true,
            title: '数据加载中'
        });
        this.filterList = app.itemObject.itemList;
        let last = this.data.pageNo * this.data.pageSize + this.data.pageSize - 1;
        // 未筛选的列表
        this.setData({
            spriteList: this.filterList.slice(0, last),
            isFilter: '',
            filter: '',
            maxPageNo: Math.ceil(this.filterList.length / this.data.pageSize)
        });
    },
    onReady: function () {
        wx.hideLoading();
        this.isLoading = false;
        this.windowHeight = wx.getSystemInfoSync().windowHeight;
        this.scrollList = [];
    },
    //滚动事件
    onScroll: function (e) {
        if (this.data.pageNo >= this.data.maxPageNo) return;
        if (this.isLoading) return;
        let detail = e.detail;
        if (!this.scrollHeight) { // 首次
            this.scrollHeight = detail.scrollHeight;
        } else if (this.scrollHeight !== detail.scrollHeight) { // 加载了新的
            this.scrollHeight = detail.scrollHeight;
        } else { // 还在原来的里面滚
            if (this.scrollList.indexOf(detail.scrollHeight) === -1 && detail.scrollHeight - detail.scrollTop - this.windowHeight < 500) {
                this.scrollList.push(detail.scrollHeight);
                this.isLoading = true;
                wx.showLoading({
                    mask: true,
                    title: '数据加载中'
                });
                this.data.pageNo++;
                let last = this.data.pageNo * this.data.pageSize + this.data.pageSize - 1;
                this.setData({
                    itemList: this.filterList.slice(0, last)
                });
                let me = this;
                setTimeout(function () {
                    wx.hideLoading();
                    me.isLoading = false;
                }, 1000);
            }
        }
    },
    tapItemDetail: function (event) {
        let id = event.currentTarget.dataset.id;
        if (id) {
            wx.navigateTo({
                url: '/pages/item/index?id=' + id
            });
        }
    },
    tapFilter: function (event) {
        wx.navigateTo({
            url: '/pages/itemFilter/index?isFilter=' + this.data.isFilter + '&filter=' + this.data.filter
        });
    },
    onFocus: function (event) {
        wx.navigateTo({
            url: '/pages/itemSearch/index'
        });
    }
})
