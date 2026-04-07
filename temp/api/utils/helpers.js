javascript
export function isEmpty(value) {
  return value === null || value === undefined || value === '';
}

export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isString(value) {
  return typeof value === 'string';
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function mergeObjects(target, source) {
  return { ...target, ...source };
}

export function getUniqueArray(arr) {
  return [...new Set(arr)];
}

export function removeItemFromArray(arr, item) {
  return arr.filter(i => i !== item);
}

export function findItemInArray(arr, item) {
  return arr.find(i => i === item);
}

export function findIndexInArray(arr, item) {
  return arr.indexOf(item);
}

export function replaceItemInArray(arr, oldItem, newItem) {
  return arr.map(i => i === oldItem ? newItem : i);
}

export function sortByKey(arr, key) {
  return arr.sort((a, b) => a[key] > b[key] ? 1 : -1);
}

export function sortByKeyDesc(arr, key) {
  return arr.sort((a, b) => a[key] < b[key] ? 1 : -1);
}