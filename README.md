## A more effective way to organise Redux action creator codes.

### Motivation:

This is a handy helper function to allow react redux projects to work more effectively with redux actions. This is inspired by Flux Standard Action and Key Mirror. It’s designed for people:

>- Who don’t want to write constant strings.  (never write const ADD_TODO = 'ADD_TODO')

>- Who want single source of truth and don’t want to look over actions  back and forth.

>- Who want to group relative variables and concepts into one array.

>- Who still want to keep the redux real.

>- And (most importantly) who want to use the Auto-Completing feature in IDEs.


### Install 

npm install --save action-creator-mirror

### Example:

contactAction.js:
```
import actionCreatorMirror from '../common/actionCreatorMirror';

var contactActions = {
    FETCH_CONTACTS: function (offset = 0) {
        return async (dispatch) => {
            ...Some async calls return the result
           dispatch(contactActions.FETCH_CONTACT_SUCCESS(result));
        }
    },
    FETCH_CONTACT_SUCCESS: function (result) {
        return {
            payload: result
        }
    },
   ... Other contact related actions
}

// Then you must call actionCreatorMirror at the end of each xxxAction.js file
var contactActions = actionCreatorMirror(contactActions);
export default contactActions;
```

contactReducer.js:
```
import contactActions from '../actions/contactActions';
export const contact = (state = {}, action) => {
    switch (action.type) {
        case contactActions.FETCH_CONTACT_SUCCESS.name:  //Note the ‘.name’ 
                   return action.payload;
        ...
        
        default:
            return state;
    }
};
```

contactContainer.js
```
import contactActions from '../actions/contactActions';
...
export default connect(mapStateToProps, {
    fetchContact:   contactActions.FETCH_CONTACT,

})(ContactContainer);
```
