import {
	legacy_createStore as createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	usersReducer,
	postReducer,
	postsReducer,
	appReducer,
} from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
