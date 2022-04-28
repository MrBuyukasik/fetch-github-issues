import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../Input';
fetch = jest.fn(() => Promise.resolve());

describe('Input Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
