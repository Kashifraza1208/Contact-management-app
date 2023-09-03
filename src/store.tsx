import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



import contactsReducer from "./components/redux/contactsReducer";
import { ContactsState } from "./components/redux/contactsReducer";

// Define the root state type
export interface RootState {
  contacts: ContactsState;
}

const rootReducer = combineReducers<RootState>({
  contacts: contactsReducer,
});

const initialState: RootState = {
  contacts: {
    contacts: [],
  },
};

// Define the type of the store
export type AppStore = Store<RootState, any>;

const middleware = [thunk as ThunkMiddleware<RootState, any>];

const store: AppStore = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
