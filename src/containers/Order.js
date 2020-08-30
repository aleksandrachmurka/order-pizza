import React, { Component } from 'react';
import Pizza from '../components/Pizza/Pizza';
import IngredientsList from '../components/IngredientsList/IngredientsList';
import { INGREDIENTS_PRICES as PRICES } from '../const/data';

class Order extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		price: 3,
	}

	addIngredientHandler = (type) => {
		const ingredients = {
			...this.state.ingredients,
			[type]: this.state.ingredients[type] + 1
		}
		const price = this.state.price + PRICES[type];
		this.setState({ ingredients, price })
	}

	removeIngredientHandler = (type) => {
		const ingredients = {
			...this.state.ingredients,
			[type]: this.state.ingredients[type] - 1
		}
		const price = this.state.price - PRICES[type];
		this.setState({ ingredients, price })
	}

	render() {
		return (
			<>
				<Pizza ingredients={this.state.ingredients} />
				<IngredientsList price={this.state.price} ingredients={this.state.ingredients}
					addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}
				/>
			</>
		)
	}
};

export default Order;