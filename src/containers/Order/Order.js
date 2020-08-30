import React, { Component } from 'react';
import Pizza from '../../components/Pizza/Pizza';

class Order extends Component {
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
		}
	}

	render() {
		return (
			<Pizza ingredients={this.state.ingredients} />
		)
	}
};

export default Order;