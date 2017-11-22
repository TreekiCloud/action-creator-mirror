/*
 https://github.com/acdlite/flux-standard-action
 * Actions

 An action MUST

 be a plain JavaScript object.
 have a type property.


 An action MAY

 have a error property.
 have a payload property.
 have a meta property.

 var anAction = {
    type: 'FETCH_xxx',
    payload: {
        data1:  'xx'
    },
    meta: 'xxx'
 }


 *
 * */


/*

 https://github.com/STRML/keyMirror

 * KeyMirror

 Create an object with values equal to its key names.

 I thought react/lib/keyMirror was useful and wanted to reuse it without any dependencies.

 This is not my code, this is property of Facebook.

 */
/*
var keyMirror = function(obj) {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
    }
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = key;
        }
    }
    return ret;
};
*/


export default function actionCreatorMirror(objs, nameSpace = null) {
  let ret = {};
  Object.keys(objs).forEach((key) => {
    let keyName = key;
    const actionCreator = objs[key];
    if (nameSpace) {
      keyName = `${nameSpace}/${key}`;
    }
  
    if (typeof actionCreator !== 'function') {
      throw new Error('actionCreatorMirror(...): Property must be a function');
    }
    ret[key] = (...param) => {
      const action = actionCreator(...param);
      if (typeof action === 'function') {
        return action;
      } else if (action instanceof Object) {
        return Object.assign(
          action,
          { type: keyName }
        );
      } else if (!action) {
        return { type: keyName };
      }
    
      throw new Error('actionCreatorMirror(...): The creator function must return a function, a flux-standard-action or a null');
    };
  
    Object.defineProperty(ret[key], 'name', { value: keyName });
  });
  
  return ret;
}
