/**********************************************
* MIT License
* Copyright (c) 2017 TreekiCloud
* www.treeki.com
***********************************************/


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


import _ from 'lodash'

export default function actionCreatorMirror(objs) {
    var ret = {};
    //!(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'actionMirror(...): Argument must be an object.') : invariant(false) : void 0;
    _.each(objs, function(actionCreator,key) {
        // if(! payloadCreator ){
        //     ret[key] = {
        //         type: key
        //     }
        // }
        if(typeof actionCreator !== 'function'){
            throw new Error('actionCreatorMirror(...): Property must be a function');
        }
        ret[key] = function(param) {
            var payload = actionCreator(param);
            if(typeof payload === 'function'){
                return payload;
            }else if (payload instanceof Object){
                return Object.assign(
                    payload,
                    {type: key}
                );
            }else if(!payload){
                return {type: key};
            } else {
                throw new Error('actionCreatorMirror(...): The creator function must return a function, a flux-standard-action or a null');
            }
        }
        Object.defineProperty(ret[key], "name", { value: key });
        
    });
    return ret;
};
