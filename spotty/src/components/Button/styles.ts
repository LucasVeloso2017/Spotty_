import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background:#D3D5D7;
  border-radius: 10px;
  margin-top: 5%;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Kanit';
  color: black;
  font-size: 20px;
`;
