import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import FilterModal from '../FilterModal';

describe('Filter Modal test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FilterModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
