import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./reducer/store";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     
     <Auth0Provider
    domain="dev-7p31ae8urgwq8e46.us.auth0.com"
    clientId="DYoSIMNMavCm1ZQVxpJ1EfykKSW1HHPY"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
       <Provider store={store}>
         <App />
        </Provider>

      </Auth0Provider>
      
  </React.StrictMode>
);
