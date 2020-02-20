require("babel-runtime/regenerator");
require("./main.css");
require("./images/link.jpg");
require("./index.html");

const a = async (args) => {
	const {a, b} = args;
	await console.log('arror func', a, b)
};
a({a: 1, b: 2});
