import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import TextInput from '../TextInput';

describe('Header test', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<TextInput label="Facebook" style={{}} onUpdate={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Labels', () => {
    const {getByText} = render(
      <TextInput
        label="Enter Organization name"
        style={{}}
        onUpdate={jest.fn()}
      />,
    );
    expect(getByText('Enter Organization name')).toHaveTextContent(
      'Enter Organization name',
    );
  });
});
