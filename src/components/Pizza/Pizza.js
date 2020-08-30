import React from 'react';
import { pizza } from './Pizza.module.css';
import Ingredient from './Ingredient/Ingredient';

const Pizza = ({ ingredients }) => {
	let ingred = Object.entries(ingredients)
		.map(([key, value]) => [...Array(value)].map((_, i) => <Ingredient key={key + i} type={key} />));

	return (
		<div className={pizza}>
			<Ingredient type="bread-top" />
			{ingred}
			<Ingredient type="bread-bottom" />
		</div>
	)
};

export default Pizza;