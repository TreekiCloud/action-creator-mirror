# A more efficient way to organise Redux action creator codes

## Motivation:

This is a handy helper function to allow react redux projects to work more effectively with redux actions. This is inspired by Flux Standard Action and Key Mirror. It’s designed for people:

>- Who don’t want to write constant strings.  (never write const ADD_TODO = 'ADD_TODO')

>- Who want single source of truth and don’t want to look over actions  back and forth (No more actionTypes.js).

>- Who want to group relative variables and concepts into one array.

>- Who still want to keep the redux real.

>- And (most importantly) who want to use the auto-completing and js-validator in IDEs.

Currently, this helper only works with redux-thunk middleware.
 
## Install
```
npm install --save action-creator-mirror
```
or

```
yarn add action-creator-mirror
```

## Example:

### contactAction.js:
```
import actionCreatorMirror from 'action-creator-mirror';
//NO MORE type_consts.js

var contactActions = {
    FETCH_CONTACT: function (endPoint, offset = 0) {
        return async (dispatch) => {
           //dispatch an action to trigger a preloader indicator
           dispatch(contactsActions.FETCH_CONTACT_PENDING());

           ...Some async calls return the result,like:
           await result = api.fetch(endPoint, offset);

           //dispatch an action to reduce the fetch result
           dispatch(contactActions.FETCH_CONTACT_DONE(result));
        }
    },

    //This creator just needs to be an empty function.
    FETCH_CONTACT_PENDING: function() {},

    FETCH_CONTACT_DONE: function (result) {
        return {
            //type: 'NOT_NECESSARY'
            //Don't need to write type of a flux standard action
            //The type is a mirror of the function name

            //An action MAY
            //   have a error property.
            //   have a payload property.
            //   have a meta property.

            payload: result
        }
    },

   ... Other contact related actions
}

// Then you must call actionCreatorMirror at the end of each xxxAction.js file
var contactActions = actionCreatorMirror(contactActions);
//or mirror with a namespace like this:
//var contactActions = actionCreatorMirror(contactActions,'contactActions');
//then export
export default contactActions;
```

### contactReducer.js:
```
import contactActions from '../actions/contactActions';
export const contact = (state = {}, action) => {
    switch (action.type) {
        case contactsActions.FETCH_CONTACT_PENDING.name: //Note the ‘.name’
        ...

        case contactActions.FETCH_CONTACT_DONE.name:     //Note the ‘.name’
            return action.payload;
        ...

        default:
            return state;
    }
};
```

### contactContainer.js
```
import contactActions from '../actions/contactActions';
...

//To dispatch some actions
    this.props.dispatch(contactAction.FETCH_CONTACT(endPoint));
...

//or use reducx connector to map action creators in.
export default connect(mapStateToProps, {
    ...
    fetchContact:        contactActions.FETCH_CONTACT
    ...
})(ContactContainer);
```
