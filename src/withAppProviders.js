import React from "react";
import store from "./store";
import { Provider } from "react-redux";

const withAppProviders = (Component) => (props) => {
  const WrapperComponent = () => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
