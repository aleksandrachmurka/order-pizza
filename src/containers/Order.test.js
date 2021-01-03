import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Order } from './Order'
import IngredientsList from '../components/IngredientsList/IngredientsList'

configure({ adapter: new Adapter() })

describe('Order', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Order initIngredientsHandler={() => {}} />)
  })
  it('should render controls when receiving ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 0 } })
    expect(wrapper.find(IngredientsList)).toHaveLength(1)
  })
})
