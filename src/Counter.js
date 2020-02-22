import React, {useState} from 'react';
import './main.css';

const Counter = () => {
	const [count, setCount] = useState(2);



	return(
		<div>
			<h1>
				Count un reder ddddd: {count}
			</h1>
			<button onClick={() => setCount(count + 1)}>
				incresed
			</button>
		</div>
	)
};

export default Counter;