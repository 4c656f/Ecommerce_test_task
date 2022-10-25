import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "4c656f_react_ui_kit";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Provider>
);

