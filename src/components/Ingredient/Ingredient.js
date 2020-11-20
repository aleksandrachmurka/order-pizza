import React from 'react';
import PropTypes from 'prop-types';
import ingredients from './Ingredient.module.css';

const Ingredient = props => {
	let ingredient = null;

	switch (props.type) {
		case ('bread-bottom'):
			ingredient = <div className={ingredients.breadBottom}></div>;
			break;
		case ('bread-top'):
			ingredient = (
				<div className={ingredients.breadTop}>
					<div className={ingredients.seeds1}></div>
					<div className={ingredients.seeds2}></div>
				</div>
			);
			break;
		default:
			ingredient = <div className={ingredients[props.type]}></div>;
	}

	return ingredient;
};

Ingredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default Ingredient;