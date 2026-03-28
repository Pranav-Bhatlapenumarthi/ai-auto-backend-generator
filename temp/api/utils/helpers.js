javascript
export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return typeof value === 'object' && value !== null;
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

export function isEmpty(value) {
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  if (isString(value)) return value.trim() === '';
  return false;
}

export function isEqual(a, b) {
  if (a === b) return true;
  if (isArray(a) && isArray(b)) return JSON.stringify(a) === JSON.stringify(b);
  if (isObject(a) && isObject(b)) return JSON.stringify(a) === JSON.stringify(b);
  return false;
}

export function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value));
}