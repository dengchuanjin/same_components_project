//返回传递给他的任意对象的类
function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

//深度克隆
export const deepClone = (obj) => {
    var result = {},
        oClass = isClass(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (var key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = deepClone(copy);
        } else if (isClass(copy) == "Array") {
            result[key] = deepClone(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
};


export const getNewStr = 'https://hly.1000da.com.cn';