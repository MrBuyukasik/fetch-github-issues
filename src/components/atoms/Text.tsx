import React from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled(RNText)`
  width: 100%;
  font-size: 16px;
`;

interface Props {
  label: string;
  style?: StyleProp<TextStyle> | undefined;
  testID?: string;
}

const Text = (props: Props) => {
  const {label, style, testID} = props;

  return (
    <StyledText testID={testID} style={style}>
      {label}
    </StyledText>
  );
};

export default Text;
