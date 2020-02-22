import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Counter from './Counter';

const renderApp = (Component) => {
	render(<AppContainer>
		<Component/>
	</AppContainer>, document.getElementById('root'));
};

renderApp(Counter);

if(module.hot) {
	module.hot.accept("./Counter.js", () => {
		const NewCounter = require("./Counter").default;
		renderApp(NewCounter);
	})
}

