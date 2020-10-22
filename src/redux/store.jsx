import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as authReducer from "redux/reducers/authReducers";

const rootReducer = combineReducers({
  userSignIn: authReducer.userSignInReducer,
  userSignUp: authReducer.userSignUpReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
