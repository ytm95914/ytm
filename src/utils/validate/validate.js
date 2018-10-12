/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 验证方法集
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
import CryptoJS from 'crypto-js'

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor','wang']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

//新增用户页面用到如下start
/**
 * validate username
 * @param username
 * @returns {boolean}
 */
// export function validateUsername(username) {
//     const re = /^[A-Za-z]\d{7}$/;
//     return re.test(username)
// }

/**
 * validate validateuser
 * @param validateuser
 * @returns {boolean}
 */
export function validateUser(validateuser) {
    const re = /^[A-Za-z]\d{7}$/;
    return re.test(validateuser)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * validate phone
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
    const re = /^1(|3|4|5|6|7|8)\d{9}$/;
    return re.test(phone)
}


/**
 * validate phone
 * @param Yearnum
 * @returns {boolean}
 */
export function validateNumber(number) {
    const re =  /^\d+(\.\d{1})?$/;
    return re.test(number)
}


//新增用户页面用到如上end

/**
 * validate password
 */
export function  encrypt(word){
    let key = CryptoJS.enc.Utf8.parse('1234567887654321');
    let iv  = CryptoJS.enc.Utf8.parse('1234567887654321');
    let encrypted = '';
    if (typeof(word) == 'string') {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    } else if (typeof(word) == 'object') {//对象格式的转成json字符串
        let data = JSON.stringify(word);
        let srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        })
    }
    return encrypted.toString();
}


