import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as authReducer from "redux/main/reducers/authReducers";
import movieListReducer from "redux/main/reducers/movieListReducer";

const rootReducer = combineReducers({
  userSignIn: authReducer.userSignInReducer,
  userSignUp: authReducer.userSignUpReducer,
  movieList: movieListReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
