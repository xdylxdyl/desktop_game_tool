/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-14
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-29
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */




String.prototype.template = function () {
    var msg = arguments[0];

    var isnull = false;
    var r = this.replace(/\{(native|array|name|hint|model)_([^_\}]*)_*([^\}]*)\}/g, function (m, pre, parameter, clz) {
        var result;
        switch (pre) {
            case "native":
                result = msg[parameter];
                break;
            case "name":
                result = playerService.getNamesByIds(msg[parameter], ",");
                break;
            case "model":
                result = versionFunction.model[parameter];
                break;
            case "hint":
                result = versionFunction.templateConfig[msg.predict].hint[msg[parameter]];
                if (versionFunction.templateConfig[msg.predict].hint[msg[parameter]] == undefined) {
                    isnull = true;
                }
                break;
        }
        if (clz) {
            console.log(clz + " is clz");
            result = "<span class='" + clz + "'>" + result + "</span>";
        } else {
            console.log("no clz ");
        }
        return result;
    });

    if (isnull) {
        return null;
    }
    return r;
}



var angularUtil = {
    updateModels:function (id, models) {
        var s = angular.element($("#" + id)).scope();
        if (s == null || s == undefined) {
            console.log(id + " scope not exist");
            return;
        }
        $.each(models, function (key, value) {
            console.log(key, value);
            $.extend(s[key], value);
        });
        s.$apply();
    },
    clearModels:function (id, key) {
        console.log(id + "===" + key + "=======");
        var s = angular.element($("#" + id)).scope();
        if (s == null || s == undefined) {
            console.log(id + " scope not exist");
            return;
        }
        var as = key.split(".");
        console.log(key + " get key split array lengt " + as.length)
        var m = null;
        for (var i = as.length - 1; i >= 0; i--) {
            var temp = {};
            temp[as[i]] = m;
            m = temp;
        }
        console.log(JSON.stringify(s[as[0]]) + " will replace by " + JSON.stringify(m));
        $.extend(true, s, m);
        console.log(JSON.stringify(s[as[0]]) + " after replace  " + JSON.stringify(m));
        s.$apply();
    },

    updateModel:function (id, key, value, type) {
        console.log(id + "===" + key + "=======" + value);
        var s = angular.element($("#" + id)).scope();
        if (s == null || s == undefined) {
            console.log(id + " scope not exist");
            return;
        }
        var as = key.split(".");
        console.log(key + " get key split array lengt " + as.length)
        var m = value;
        for (var i = as.length - 1; i > 0; i--) {
            var temp = {};
            temp[as[i]] = m;
            m = temp;
        }
        console.log(JSON.stringify(s[as[0]]) + " will replace by" + JSON.stringify(m));
        if ("append" == type) {

        } else {
            if (as.length > 1) {
                $.extend(true, s[as[0]], m);
            } else {
                s[key] = value;
            }

        }
        console.log(JSON.stringify(s[as[0]]) + " after replace " + JSON.stringify(m));
        s.$apply();
    }
}

function initMultiSelect(objects) {

    $("#boxMultiObject").multiselect('dataprovider', objects);

}

function initRadio(objects) {
    var h = "";
    $.each(objects, function (key, value) {

        var html = '<label class="btn btn-primary"> <input type="radio" name="' + key + '" id="' + key + '">' + value + '</label>';
        h = h + html;
    })
    $("#boxObject").html(h);
}


var boxUtil = {
    getObjectValue:function (type, value) {
        var object = "";
        switch (type) {
            case "multiSelect":
                object = boxUtil.getCheckdMultiObjectValue();
                break;
            case "confirm":
                object = value;
                break;

            default:
                object = boxUtil.getCheckdMultiObjectValue();
                break;

        }

        return object;

    },

    getCheckdMultiObjectValue:function () {
        var selected = [];
        $('#boxMultiObject option:selected').each(function () {
            selected.push([$(this).val()]);
        });
        return selected;
    },

    checkMultiCount:function (limit) {
        var selected = boxUtil.getCheckdMultiObjectValue();
        if (selected.length == limit) {
            selected = selected;
            return true;
        } else {
            alert("必须选择 " + limit + " 个");
            return false;
        }


    },

    showBox:function (config) {

        var type = config.type;
        console.log(type + "  config is " + JSON.stringify(config));


        var successLabel = "";
        var cancelLabel = "";

        switch (type) {
            case "dialog":
                var title = config.title.template();
                var message = config.content.template();
                console.log(title + " : " + message);
                var sourceType = config.sourceType;
                switch (sourceType) {
                    case "multiSelect":
                        var h = '<div><select class="multiselect dropup" multiple="multiple" id="boxMultiObject"></select></div>';
                        message = message + h;
                        successLabel = "确定";
                        cancelLabel = "取消";
                        break;
                    case "select":
                        break;

                    case "confirm":

                        successLabel = config.successCallback.label;
                        cancelLabel = config.cancelCallback.label;
                        break;
                    case "none":
                        break;
                    default:
                        break;

                }

                var source = config.source;


                console.log("titles is " + title);
                console.log("message is " + message);

                var successCallback = function () {
                    var result = true;

                    if (config.successCallback.method != undefined && config.successCallback.method != "") {
                        var param = config.successCallback.param.template();
                        result = config.successCallback.method(param);

                    }
                    if (result) {
                        //update target


                        var value = config.successCallback.value;
                        var object = boxUtil.getObjectValue(config.sourceType, value);

                        controlView.setObjectValue(config.target, object);
                        // send message
                        console.log("i will send message ");
                        var predict = config.predict;
                        roomService.sendMessage(predict, sourceType);


                    } else {
                        return false;

                    }


                };

                var cancelCallback = function () {

                    if ("multiSelect" == sourceType) {
                        return true;
                    }
                    var result = true;

                    if (config.cancelCallback.method != undefined && config.cancelCallback.method != "") {
                        var param = config.cancelCallback.param.template();
                        result = config.cancelCallback.method(param);

                    }

                    if (result) {
                        //update target
                        var value = config.cancelCallback.value;
                        var object = boxUtil.getObjectValue(config.sourceType, value);

                        controlView.setObjectValue(config.target, object);

                        // send message
                        console.log("i will send message ");
                        var predict = config.predict;
                        roomService.sendMessage(predict, sourceType);


                    } else {


                    }

                };


                var bootboxModal = bootbox.dialog({
                    message:message,
                    title:title,
                    buttons:{
                        success:{
                            label:successLabel,
                            className:"btn-success",
                            callback:successCallback
                        },
                        danger:{
                            label:cancelLabel,
                            className:"btn-danger",
                            callback:cancelCallback

                        }
                    },
                    show:false

                });

                bootboxModal.on("shown.bs.modal", function () {

                    switch (sourceType) {
                        case "multiSelect":

                            var objects = config.source.method(config.source.param);
                            console.log("get objects " + objects);
                            initMultiSelect(objects);
                            break;
                        case "select":
                            break;
                        case "radio":

                            var objects = config.source.method(config.source.param);
                            console.log("get objects " + objects);
                            initRadio(objects);

                            break;


                        case "none":
                            break;
                        default:
                            break;

                    }

                });

                bootboxModal.modal("show");

                break;
            case "confirm":


                var content = config.content.template();
                bootbox.confirm(content, function (xx) {
                    alert(xx);
                })

                break;
            case "alert":
                break;

        }


    }

}

function ajaxJson(url, type, param, parse, timeout, dataType, async) {
    lastMessageSendAt = jQuery.now();

    if (timeout == null) {
        timeout = 10000;
    }
    if (async == null) {
        async = false;
    }
    var result;
    $.ajax({
        url:url,
        type:type,
        data:param,
        dataType:dataType,
        timeout:timeout,
        async:async,
        success:function (data) {

            if (parse == null) {
                result = data;

            } else {
                if (parse != null) {
                    result = parse(data);


                }

            }


        },

        error:function (XMLHttpRequest, textStatus) {
            if (textStatus == "timeout") {
                console.log("[超时]");
                //alert("连接超时");
                return null;
            } else {
                console.log("[error]" + textStatus);
                // alert("无法获取版本号");
                return null;
            }

        }

    });
    return result;
}

function redirect(url) {
    document.location.href = url;
};


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */

var notifyUtil = {



    sendNotify:function (title, content, icon) {
        if (!window.webkitNotifications) {

        } else {
            if (window.webkitNotifications.checkPermission() != 0) {
                notifyUtil.RequestPermission(notifyUtil.sendNotify);
            } else {
                var notification = window.webkitNotifications.createNotification(icon, title, content);
                notification.ondisplay = function (event) {
                    setTimeout(function () {
                        event.currentTarget.cancel();
                    }, 2 * 1000);
                }

                notification.show();

            }
        }


    },
    RequestPermission:function (callback) {
        window.webkitNotifications.requestPermission(callback);
    }

}


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-7
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */
function DBC2SBC(str) {
    var result = '';
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);//获取当前字符的unicode编码
        if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已及各种字符
        {
            result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
        } else if (code == 12288)//空格
        {
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}

function full2half(str) {
    str = str.replace('，', ',');
    str = str.replace('“', '"');
    str = str.replace('”', '"');
    return str
}

function format(str) {
    str = DBC2SBC(str);
    str = full2half(str);
    return str;
}


function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    }
    else {
        return '';
    }
}

function isJson(content) {
    /*没有判断是对象的情况*/
    if (content.match("^\{(.+:.+,*){1,}\}$")) {
        return true;
    } else {
        return false;
    }
}

function array2splitString(arrays, split) {

    if (split == null || split == undefined) {
        split = ",";
    }
    var result = "";
    for (var i = 0; i < arrays.length; i++) {
        if (i == arrays.length - 1) {
            result = result + arrays[i];
        } else {
            result = result + arrays[i] + split;
        }

    }

    return result;

}

function splitString2Array(string, split) {
    if (string == null) {
        string == "";
    } else {
        var result = string.split(split)
        var r = []
        $.each(result, function (k, v) {
            r.push(result[k].trim());
        });
        return r;
    }


}

/*
 * poll ajax
 * */


var timeUtil = {
    constant:{
        Second_MILLISECOND:1000,
        Minute_MILLISECOND:60 * 1000,
        Hour_MILLISECOND:3600 * 1000,
        Day_MILLISECOND:24 * 3600 * 1000,
        WEEK_MILLISECOND:7 * 24 * 3600 * 1000,
        MONTH_MILLISECOND:30 * 24 * 3600 * 1000,
        YEAR_MILLISECOND:365 * 24 * 3600 * 1000
    },


    convertTime2Length:function (time) {
        var s;

        if (time <= this.constant.Minute_MILLISECOND) {
            s = time / this.constant.Second_MILLISECOND + "秒";
        } else if (time <= this.constant.Hour_MILLISECOND) {
            s = time / this.constant.Minute_MILLISECOND + "分钟";

        } else if (time <= this.constant.Day_MILLISECOND) {
            s = time / this.constant.Hour_MILLISECOND + "小时";
        } else if (time <= this.constant.WEEK_MILLISECOND) {
            s = time / this.constant.Day_MILLISECOND + "日";

        } else if (time <= this.constant.MONTH_MILLISECOND) {
            s = time / this.constant.WEEK_MILLISECOND + "周";
        } else if (time <= this.constant.YEAR_MILLISECOND) {
            s = time / this.constant.MONTH_MILLISECOND + "月";
        } else {
            s = "好长";
        }
        return s;

    },
    time2String:function (time) {
        var date = new Date(time);

        return date.format("hh:mm");

    }
}


Date.prototype.format = function (format) {
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+":this.getMonth() + 1,
        "d+":this.getDate(),
        "h+":this.getHours(),
        "m+":this.getMinutes(),
        "s+":this.getSeconds(),
        "q+":Math.floor((this.getMonth() + 3) / 3),
        "S":this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * Created with JetBrains WebStorm. User: Administrator Date: 13-6-7 Time:
 * 上午10:08 To change this template use File | Settings | File Templates.
 */


var checkWebSocket = function () {

    if (!webSocketUtil._ws || webSocketUtil._ws.readyState != 1) {
        console.log("reconnect");

        webSocketUtil.connect(webSocketUtil.uid);
    } else {
        console.log("normal");
    }
};

var checkID = null;

var webSocketUtil = {
    _ws:"",
    uid:null,
    retryCount:0,
    retryLimit:3,
    version:0,

    connect:function (uid) {

        if ("WebSocket" in window) {
            webSocketUtil.uid = uid;
            var l = document.location.toString();
            var index = l.indexOf("com");
            var location = "ws://42.121.113.70:8013/servlet/websocket?uid=" + uid;
            if (index > 0) {

            } else {
                location = "ws://192.168.11.68:9090/servlet/websocket?uid=" + uid;
            }
            console.log(" this will create websocket ? " + location);


            webSocketUtil._ws = new WebSocket(location);
            console.log(webSocketUtil._ws.readyState);
            webSocketUtil._ws.onopen = webSocketUtil._onopen;
            webSocketUtil._ws.onmessage = webSocketUtil._onmessage;
            webSocketUtil._ws.onclose = webSocketUtil._onclose;
            webSocketUtil._ws.onerror = webSocketUtil._onerror;
        } else {
            alert("不支持的浏览器~,请使用Chrome/Firefox/搜狗/360极速");


        }


    },

    _onopen:function () {
        clearInterval(checkID);
        webSocketUtil.retryCount = 0;
        //webSocketUtil.timer();
        $("#netSpeedHint").text("已连接");
        //$("#netSpeedHint").empty().html("断线了...点击此处<a href='' id='reconnect'>重连</a>");

    },

    _send:function (message) {
        webSocketUtil._ws.send(message);
        console.log(message);
    },


    retry:function () {
        console.log("retry count is " + webSocketUtil.retryCount);

        webSocketUtil.connect(webSocketUtil.uid);


    },

    _onmessage:function (m) {
        if (m.data) {

            if (isJson(m.data)) {
                console.log(m.data);
                var message = JSON.parse(m.data);
                cometService.parseMessage(message.message);

            } else {
                console.log(m.data);
            }

        }
    },
    _onclose:function (m) {
        console.log("connection close .reopen it ");
        $("#netSpeedHint").empty().html("断线了...点击此处<a href=''  id='reconnect'>重连</a>");

        bootbox.alert("神马情况,断线了,找不到服务器~点击确定,重新找找", function () {
            webSocketUtil.retry();
        });


    },
    _onerror:function (m) {

        console.log("connection close cause something wrong?.reopen it ");
        $("#netSpeedHint").text("网络连接异常.");

    },
    isConnect:function () {
        if (webSocketUtil._ws == null || webSocketUtil._ws.readyState == 3) {
            return false;
        } else {
            return true;
        }
    },
    timer:function () {
        checkID = setInterval(checkWebSocket, 60000);
    }

}


$(document).ready(function () {
    $("#netSpeedHint").on("click", 'a', function (event) {

        webSocketUtil.retry();
        event.preventDefault();


    });
});


var musicService = {
    getMusics:function () {

        return  ajaxJson("/music/list", "get", {}, musicService.parseMusic, 5000, "json");

    },
    parseMusic:function (result) {
        return result.data;
    }
}
function MusicCtrl($scope) {
    $scope.musics = musicService.getMusics();
    $scope.refreshMusic = function () {
        $scope.musics = musicService.getMusics();
    };


};


var myStringUtils = {
    filterAray:function (array, filter) {
        var result = [];
        var re = new RegExp(filter);

        $.each(array, function (i, val) {
            var a = array[i];
            var b = re.test(a);
            if (b) {
                result.push(a);
            } else {

            }

        })

        return result;
    }

}


/**
 *
 * @param url
 * @param param
 */
function getParameterFromUrl(url, param) {
    var params = getUrlVars(url);
    if (params == null) {
        return null;
    } else {
        return params[param];
    }

}

function getUrlVars(url) {
    var vars = [], hash;
    var index = url.indexOf('?');
    if (index <= 0) {
        return null;
    } else {

    }
    var params = url.slice(index + 1);
    var hashes = params.split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var html5StorageService = {
    checkVersion:function (key) {


        if (constants.version.debug) {
            return true;
        } else {
            var v = html5StorageService.get(constants.version.key);
            if (v == null) {
                html5StorageService.update(constants.version.key, constants.version.version);
                return true;
            }
            if (v < constants.version.version) {
                html5StorageService.update(constants.version.key, constants.version.version);
                return true;
            }
        }
        return false;

    },


    update:function (key, value) {
        window.localStorage[key] = JSON.stringify(value);
    },


    get:function (key, model, url) {
        var result = eval('(' + window.localStorage.getItem(key) + ')');


        var isUpdate = false;
        if (result == null || html5StorageService.checkVersion()) {
            isUpdate = true;

        }
        console.log("data is update "+isUpdate);
        if (isUpdate) {
            if (model != null) {
                html5StorageService.update(key, model);

            } else {

                if (url != null) {
                    var r = ajaxJson(url, "GET", {}, null, 5000, "json", false);
                    html5StorageService.update(key, r);
                } else {


                }

            }
        }

        result = eval('(' + window.localStorage.getItem(key) + ')');
        return result;
    },
    delete:function (key) {
        window.localStorage.removeItem(key);
    }

}


var roleMaker = function (config,dataArray) {
    var playerNum = config.playerNum,
        rolesArray = [],
        rolesNumArray = [],
        roleChooser = 0,
        str = "",
        count = 1,
        returnData,
        flag = 1;
    var showList=config.showProperties;

    for (var i in config.roles) {
        rolesArray.push(config.roles[i].name);
        rolesNumArray.push(config.roles[i].num);
    }
    while (flag) {
        roleChooser = Math.floor(Math.random() * 4);
        if (rolesNumArray[roleChooser] > 0) {
            str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "'},";
            rolesNumArray[roleChooser]--;
            count++;
        }
        if (count == playerNum + 1) break;
    }
    returnData = "[" + str.substring(0, str.length - 1) + "]";
    return eval("(" + returnData + ")");

}
var JsonUtil = {
    push :function (jsonData, o) {
        if (typeof(o) == "object") {
            for (var k in o) jsonData[k] = o[k];
                return jsonData.length;
        }
    },
    pop : function (jsonData, key) {
         //var tempStr=toString(jsonData);
         delete  jsonData[key];
        return jsonData.length;
    },
    toJSON : function (string) {
        if (typeof string === "string")
            return eval("(" + string + ")");
    },
    toString : function (json) {
        if (typeof json == "object")
            return json.parseJSON();
    }
}