import styled from 'styled-components/native';
import { Camera } from 'expo-camera';

export const Container = styled.View`
    width: 100%;
    height: 100%;
`;
export const SimpleHeaderContainer = styled.View`
    width: 100%;
    height: 10%;
    background-color:#232227 ;
`

export const CameraContainer = styled(Camera)`
    width: 100%;
    height: 70%;
`
export const CameraControlsContainer = styled.View`
    width: 100%;
    height: 20%;
    background-color:#232227 ;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
`
export const ItemControl = styled.View`
    width: 33%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const PictureButton = styled.TouchableOpacity`
    width: 94px;
    height: 94px;
    background-color:white;
    border-radius: 47px;
`
export const PreviewContainer = styled.View`
    width: 100%;
    height: 15%;
    padding:10px;
`
export const PreviewFrame = styled.View`
    width: 15%;
    height: 100%;
    background-color: #232227;
    border-radius:10px;
    padding:5px;
`

export const ModalContainer = styled.View`
    width: 85%;
    height: 85%;
    background-color: #D3D5D7;
    border-radius: 10px;
    justify-content: center;
    align-items:center;
`
export const ModalHeader = styled.View`
    width: 100%;
    height: 10%;
    justify-content: center;
    align-items:flex-end;
    padding-right: 5%;
`

export const ModalControls = styled.View`
    width: 100%;
    height: 30%;
    justify-content: space-around;
    align-items:center;
    flex-direction: row;
`

export const ModalButton = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background:#D3D5D7;
    border-radius: 10px;
    margin-top: 5%;

    justify-content: center;
    align-items: center;
`