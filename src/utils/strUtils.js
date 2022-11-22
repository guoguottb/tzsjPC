/**
 * 对传入参数判空
 * 返回 true or false
 *
 * @param { String|Number|undefined|Object|Array|Date} para
 * @return { Boolean } true or false
 */
export function isEmpty (params) {
  let _isEmpty = false;
  if (typeof params === 'undefined') {
    _isEmpty = true;
  } else if (typeof params === 'string') {
    // StringObj.trim():从字符串中移除前导空格、尾随空格和行终止符。
    _isEmpty = (params.trim() === '');
  } else if (params instanceof Array) {
    _isEmpty = (params.length === 0);
  } else if (params instanceof Date) {
    _isEmpty = false;
  } else if (typeof params === 'object') {
    let paramsName;
    // 如果params不是一个空的对象才能进入for in循环体中
    for (paramsName in params) {
      _isEmpty = false;
    }
    _isEmpty = true;
  } else if (typeof params === 'number') {
    return isEmpty(params + '');
  }
  return _isEmpty;
}
export function extend (source, target) {
  for (var obj in source) {
    target[obj] = source[obj];
  }
  return target;
}
