/**
 * @author lindong
 * @date 2018/7/30
 * @desc 公共方法集合,公共方法存放在此处，写好备注
 */
const comm = {
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 检测手机号以及邮箱
     */
    checkAccountType(account) {
        let type = ''
        // if (/^(127|13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(account)) {
        if (/^1\d{10}$/.test(account)) {
            type = 'mobile'
        }
        if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(account)) {
            type = 'email'
        }
        return type
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc HTML转换为字符串
     */
    htmlToString(str) {
        var rstStr = (str + '').replace(/[<>&]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;'}[c]
        })
        var tempArr = rstStr.split('\&lt\;\/a\&gt\;&lt\;a')

        if (tempArr.length >= 2) {
            rstStr = tempArr.map(function (d, index) {
                var s = d.replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi, '<a href="$1">$2')
                s = s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)&lt\;\/a\&gt\;/gi, ' href="$1">$2</a>')
                return s
            }).join('</a><a')
        } else {
            rstStr = (rstStr + '').replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)\&lt\;\/a\&gt\;/gi, '<a href="$1">$2</a>')
            /* 恢复文本中的提醒谁看的A链接*/
        }
        rstStr = rstStr.replace(/@@/g, '@')
        return rstStr
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 数字转换为2千+、3万+
     */
    toWKH(v) {
        if (isNaN(parseInt(v))) return 0
        if (parseInt(v, 10) < 10000 && parseInt(v, 10) > 999) {
            return Math.floor(parseInt(v, 10) / 1000) + '千+'
        } else if (parseInt(v, 10) > 9999) {
            return Math.floor(parseInt(v, 10) / 10000) + '万+'
        } else {
            return v
        }
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 获取URL参数
     */
    queryParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 获取URL参数对象方式
     */
    getpara(symbol) { //获取参数的函数
        let param = {}
        let search = location.search.split('?')[1]
        let hash = location.hash
        if (search) {
            search = search.split('&')
            for (let i = 0; i < search.length; i++) {
                let item = search[i].split('=')
                if (item[1]) {
                    param[item[0]] = decodeURIComponent(item[1].split('#/')[0])
                }
            }
        }
        if (hash) {
            let newarr = hash.split('?')
            for (let i = 0; i < newarr.length; i++) {
                let ii = newarr[i].split('&')
                for (let j = 0; j < ii.length; j++) {
                    let item = ii[j].split('=')
                    if (item[1]) {
                        param[item[0]] = decodeURIComponent(item[1].split('#/')[0])
                    }
                }

            }
        }
        return param
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 超出字符串加...
     */
    getStrLen(str, len) {
        if (typeof str != 'undefined') {
            var strlen = 0,
                s = ''
            for (var i = 0; i < str.length; i++) {
                s = s + str.charAt(i)
                if (str.charCodeAt(i) > 128) {
                    strlen = strlen + 2
                    if (strlen >= len) {
                        return s.substring(0, s.length - 1) + '...'
                    }
                } else {
                    strlen = strlen + 1
                    if (strlen >= len) {
                        return s.substring(0, s.length - 2) + '...'
                    }
                }
            }
            return s
        }
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 获取字符串长度
     */
    getByteLen(val) {
        var len = 0
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) !== null) // 全角
                len += 2
            else
                len += 1
        }
        return len
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 截取字符串
     */
    cutstr(str, len, symbol) {
        let str_length = 0
        let str_len = 0
        let str_cut = new String()
        str_len = str.length
        for (var i = 0; i < str_len; i++) {
            let a = str.charAt(i)
            str_length++
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++
            }
            str_cut = str_cut.concat(a)
            if (str_length >= len) {
                if (symbol) {
                    str_cut = str_cut.concat('...')
                }
                return str_cut
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str
        }
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 判断当前设备
     */
    browser: {
        mozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
        webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
        opera: /opera/.test(navigator.userAgent.toLowerCase()),
        msie: /msie/.test(navigator.userAgent.toLowerCase()),
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
            }
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 判断请求参数是否有效
     */
    hasResponseData(r) {
        if (r && r.responseObject && r.responseObject.responseData && !this.isEmptyObject(r.responseObject.responseData)) {
            return true
        }
        return false
    },
    hasResponseMessage(r) {
        if (r && r.responseObject && r.responseObject.responseMessage && !this.isEmptyObject(r.responseObject.responseMessage)) {
            return true
        }
        return false
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 判断是否微信
     */
    isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 剪切字符串
     */
    cutDoctorTitle(arr) {
        let title = ''
        if (arr.length > 0) {
            let arrList = arr.split(',');
            let regExp = /(医师|医学生|护士|讲师)/g;    //讲师在消息页医师列表容错
            for (let i = 0; i < arrList.length; i++) {
                if (regExp.test(arrList[i])) {
                    title = arrList[i];
                    break
                }
            }
        }
        return title
    },
    /**
     * @author lindong
     * @date 2018/7/30
     * @desc 隐式转换
     */
    getRegisterName(email, mobile) {
        let count = ''
        if (email) {
            count = email.substr(0, 2) + '****' + email.substring(email.lastIndexOf('@'))
        } else if (mobile) {
            count = mobile.substr(0, 3) + '****' + mobile.substring(mobile.length - 4)
        }
        return count
    },
    /**
     * @author liuzhen
     * @date 2018/7/30
     * @desc 表单非空提示
     */
     open(_this,msg){
        const h = _this.$createElement;
        _this.$notify({
            title: '提示',
            message: h('i', { style: 'color: teal'}, msg)
        });
    },
    successRemid(_this,message,title='成功'){
        _this.$notify({
            title,
            message,
            type:'success',
            duration:3000
        });
    },
    warnRemid(_this,message,title='警告'){
        _this.$notify({
            title,
            message,
            type:'warning',
            duration:3000
        });
    },
    infoRemid(_this,message,title='信息'){
        _this.$notify({
            title,
            message,
            type:'info',
            duration:3000
        });
    },
    errorRemid(_this,message,title='错误'){
        _this.$notify({
            title,
            message,
            type:'error',
            duration:3000
        });
    },
    // 我的考勤请假加班列表验证手机号
    isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
    }
}
export default comm;
