import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import styled from 'styled-components/native';
import Button from '../molecules/Button';
import TextInput from '../molecules/TextInput';

const StyledBottom = styled(Button)`
  margin-top: 20px;
`;

interface Props {
  style?: StyleProp<TextStyle> | undefined;
  onClick: () => void;
  organization?: any;
  repository?: any;
  author?: any;
}

const GithubSearchCard = (props: Props) => {
  const {organization, repository, onClick} = props;
  const ORGANIZATION_LABEL = 'Enter Organization name';
  const REPOSITORY_LABEL = 'Enter Repository name';
  const SEARCH_LABEL = 'Search Issues';

  return (
    <>
      <TextInput
        testID={ORGANIZATION_LABEL}
        label={ORGANIZATION_LABEL}
        onUpdate={organization}
      />

      <TextInput
        testID={REPOSITORY_LABEL}
        label={REPOSITORY_LABEL}
        onUpdate={repository}
      />

      <StyledBottom
        testID={SEARCH_LABEL}
        label={SEARCH_LABEL}
        onClick={onClick}
      />
    </>
  );
};

export default GithubSearchCard;
