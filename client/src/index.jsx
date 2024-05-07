import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@/styles/index.css";
import "@/styles/colors.css";
import { store } from "@/store";
import App from "@/App";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
