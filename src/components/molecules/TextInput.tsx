import React from 'react';
import {View} from 'react-native';

import styled from 'styled-components/native';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

const StyledView = styled(View)`
  margin: 16px;
`;

const StyledText = styled(Text)`
  margin: 6px;
`;

interface Props {
  label: string;
  defaultValue?: string;
  onUpdate(value: string): void;
  testID?: string;
}

const TextInput = (props: Props) => {
  const {label, defaultValue, onUpdate, testID} = props;

  return (
    <StyledView>
      <StyledText testID={testID} label={label} />
      <Input defaultValue={defaultValue} onUpdate={onUpdate} />
    </StyledView>
  );
};

export default TextInput;
