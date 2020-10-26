import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as authReducer from "redux/main/reducers/authReducers";
import sharedReducer from "redux/main/reducers/sharedReducer";
import movieListReducer from "redux/main/reducers/movieListReducer";
import movieDetailReducer from "redux/main/reducers/movieDetailReducer";

const rootReducer = combineReducers({
  userSignIn: authReducer.userSignInReducer,
  userSignUp: authReducer.userSignUpReducer,
  shared: sharedReducer,
  movieList: movieListReducer,
  movieDetail: movieDetailReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
