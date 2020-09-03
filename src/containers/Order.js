import React, { Component } from 'react';
import Pizza from '../components/Pizza/Pizza';
import IngredientsList from '../components/IngredientsList/IngredientsList';
import Modal from '../components/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
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
		orderEnabled: false,
		ordering: false,
	}

	addIngredientHandler = (type) => {
		const ingredients = {
			...this.state.ingredients,
			[type]: this.state.ingredients[type] + 1
		}
		const price = this.state.price + PRICES[type];
		this.setState({ ingredients, price })
		this.updateOrderEnabled(ingredients)
	}

	removeIngredientHandler = (type) => {
		const ingredients = {
			...this.state.ingredients,
			[type]: this.state.ingredients[type] - 1
		}
		const price = this.state.price - PRICES[type];
		this.setState({ ingredients, price })
		this.updateOrderEnabled(ingredients)
	}

	updateOrderEnabled = ingredients => {
		const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
		this.setState({
			orderEnabled: (sum > 0)
		});
	}

	orderHandler = () => {
		this.setState({ ordering: true });
	}

	cancelOrderHandler = () => {
		this.setState({ ordering: false })
	}

	proceedToCheckoutHandler = () => {
		alert('Proceed');
	}

	render() {
		return (
			<>
				<Modal show={this.state.ordering} close={this.cancelOrderHandler}>
					<OrderSummary
						ingredients={this.state.ingredients} price={this.state.price}
						cancel={this.cancelOrderHandler} proceed={this.proceedToCheckoutHandler}
					/>
				</Modal>
				<Pizza ingredients={this.state.ingredients} />
				<IngredientsList
					price={this.state.price} ingredients={this.state.ingredients}
					addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}
					orderEnabled={this.state.orderEnabled} order={this.orderHandler}
				/>
			</>
		)
	}
};

export default Order;