import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'common/store/store';
import { Main } from 'pages/main';

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root'),
);
