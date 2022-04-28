import React from 'react';
import renderer from 'react-test-renderer';
import GithubSearchCard from '../GithubSearchCard';
fetch = jest.fn(() => Promise.resolve());

describe('GithubSearchCard Testing', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GithubSearchCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
