import React from 'react';
import { shallow, configure } from 'enzyme';
import Landing from '../Landing';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Landing', () => {
  it('Landing page should exists', () => {
    const component = shallow(<Landing />);
    expect(component.exists()).toBe(true);
  });
});
