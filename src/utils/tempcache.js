/**
 * @author Lindong Ding
 * @date 2018/7/30
 * @desc H5 sessions 存储方法集
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

const TempCache = {
    cache(value){
        sessionStorage.setItem("EasyWayTempCache",value)
    },
    getCache(){
        return sessionStorage.getItem("EasyWayTempCache")
    },
    setItem(key,value){
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    getItem(key){
        let item = sessionStorage.getItem(key);
        if(key && key == 'fromPage')
            sessionStorage.removeItem(key);
        return JSON.parse(item);
    },
    removeItem(key){
        return sessionStorage.removeItem(key)
    },
    clear(){
        sessionStorage.clear();
    }
};

export default TempCache;
