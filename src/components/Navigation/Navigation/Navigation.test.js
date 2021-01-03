import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navigation from './Navigation'
import NavItem from '../NavItem/NavItem'

configure({ adapter: new Adapter() })

describe('Navigation', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Navigation />)
  })

  it('should render 2 nav items when user is not autehnticated', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2)
  })
  it('should render 3 navitems when user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.find(NavItem)).toHaveLength(3)
  })
  it('should render Logout when user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(
      true
    )
  })
})
