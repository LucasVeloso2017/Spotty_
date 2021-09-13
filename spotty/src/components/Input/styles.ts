import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  flex-direction: column;
`
export const ErrorTextMessage = styled.Text`
  font-family: "Kanit";
  color: #fd003a;
  padding:5px;
`

export const InputContainer = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 5%;
  background: #D3D5D7;
  border-radius: 10px;
  border-width: 2px;
  border-color: #D3D5D7;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color:#fd003a;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color:#054A91;
    `}
`;

export const TextInputComponent = styled.TextInput`
  width: 100%;
  color: black;
  font-size: 16px;
  font-family: "Kanit";
  
`;

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 5%;
  color: black;

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      color: #054A91;
    `}
  ${props =>
    props.isErrored &&
    css`
      color:#fd003a;
    `}
`;
