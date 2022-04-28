import React from 'react';
import {
  StyleProp,
  TouchableOpacity as RNTouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import styled from 'styled-components/native';
import {color} from '../../common/color';
import Text from '../atoms/Text';

const StyledTouchableOpacity = styled(RNTouchableOpacity)`
  height: 50px;
  width: 50%;
  border-radius: 12px;
  background-color: ${color.AQUA_BLUE};
  align-self: center;
`;

const StyledText = styled(Text)`
  text-align: center;
`;

const StyledTextContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface Props {
  label: string;
  onClick: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  testID?: string;
}

const Button = (props: Props) => {
  const {style, label, onClick, testID} = props;

  return (
    <StyledTouchableOpacity testID={testID} style={style} onPress={onClick}>
      <StyledTextContainer>
        <StyledText label={label} />
      </StyledTextContainer>
    </StyledTouchableOpacity>
  );
};

export default Button;
