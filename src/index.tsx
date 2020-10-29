import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./ducks/rootReducer";
import { Provider } from "react-redux";
import {setInterceptors} from './utils/token';
import { getSession, getToken } from "./utils/token";
import jwt from 'jsonwebtoken';
export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
let token = getToken();
let session =getSession();
if(token && session){
  store.dispatch({type:"SET_CURRENT_USER",payload:jwt.decode(token).data})
}
setInterceptors(getToken(),getSession());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
