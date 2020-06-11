/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */

export const isFunction = (obj: any): obj is Function => {
  return typeof obj === 'function';
};
