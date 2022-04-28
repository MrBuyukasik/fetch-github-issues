import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';
fetch = jest.fn(() => Promise.resolve());
const mockFn = jest.fn();

describe('Button', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Button
          label="test"
          testId="button"
          onPress={mockFn}
          accessibilityLabel="button"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
