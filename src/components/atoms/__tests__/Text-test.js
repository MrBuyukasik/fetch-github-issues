import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../Text';
fetch = jest.fn(() => Promise.resolve());
const mockFn = jest.fn();

describe('Text', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Text />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
