import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { color } from '../../common/color';

const StyledInput = styled.input`
  height: 20px;
  width: 100%;
  border-radius: 4px;
  background-color: ${color.WHITE};
  border: 2px solid ${color.LIGHT_GREY};
  margin: 2px;
  padding-left: 8px;
`;

interface Props {
  value: string;
  onUpdate(value: string): void;
}

const TextInput = (props: Props) => {
  const { value, onUpdate } = props;

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    onUpdate(target.value);
  };

  return <StyledInput defaultValue={value} onChange={onChange}></StyledInput>;
};

export default TextInput;
