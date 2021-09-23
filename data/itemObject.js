import itemList from './item/itemList.js';

let itemObject = {
    // 道具列表
    itemList: itemList,
    // id查询精灵
    getItemById: function (id) {
        for (let i = 0, size = this.itemList.length; i < size; i++) {
            let item = this.itemList[i];
            if (id === item.id) {
                return item;
            }
        }
    },
    // 类型查找
    getItemsByCategory: function (category) {
        if (!category) return null;
        let results = [];
        for (let i = 0, size = this.itemList.length; i < size; i++) {
            let item = this.itemList[i];
            if (item.category && item.category.length && item.category.indexOf(category) >= 0) {
                results.push(item);
            }
        }
        return results;
    },
};
module.exports = itemObject;