import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';

import {color} from '../../common/color';

const StyledInput = styled(TextInput)`
  width: 100%;
  background-color: ${color.WHITE};
  border: 2px solid ${color.BLACK};
  margin: 2px;
  padding-left: 8px;
  padding: 10px;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  font-size: 18px;
`;

interface Props {
  defaultValue?: string;
  onUpdate(value: string): void;
}

const Input = (props: Props) => {
  const {defaultValue, onUpdate} = props;

  const onChange = (data: string) => {
    onUpdate(data);
  };

  return <StyledInput defaultValue={defaultValue} onChangeText={onChange} />;
};

export default Input;
