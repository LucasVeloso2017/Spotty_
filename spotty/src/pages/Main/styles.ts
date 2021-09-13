import styled, { css } from 'styled-components/native';

import { Marker } from 'react-native-maps'

interface HeaderProps{
    isOpen:boolean
}

export const Container = styled.View`
    width: 100%;
    height: 100%;
`

export const Header = styled.View<HeaderProps>`
    width: 100%;
    height: 10%;
    background-color: #232227;
    ${props => props.isOpen && css`
        height: 20%;
    `}
    flex-direction: row;
    justify-content: space-around;
    align-items:center;
`

export const SearchBar = styled.View`
    width: 50%;
    height: 50%;
    background-color: white;
    border-radius: 50px;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const SearchInput = styled.TextInput`
    color: black;
    font-size: 14px;
    width: 70%;
`

export const TextLogo = styled.Text`
    color: white;
    font-size: 23px;
    font-family: 'Lobster';
`

export const Body = styled.View`
    width: 100%;
    height: 90%;
`

export const OverlayAddPoint = styled.View`
    
    width: 84px;
    height: 84px;
    border-radius: 42px;
    background-color:#232227;
    position: absolute;
    bottom:10px;
    right:10px;

    justify-content: center;
    align-items: center;
`

export const MapMarker = styled(Marker)`
    width: 120px;
    height: 90px;
`

export const MapMarkerContainer = styled.View`
    width: 120px;
    height: 90px;
    background-color: #232227;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    justify-content: center ;
`

export const MapMarkerImage = styled.Image`
    width: 120px;
    height: 50px;
`

export const MapMarkerTitle = styled.Text`
    flex: 1;
    font-family: 'Kanit';
    color:white;
    font-size: 10px;
    line-height: 23px;
`

export const ModalContainer = styled.View`
    width: 90%;
    height: 90%;
    background-color: #4f4d59;
    border-radius: 10px;
`
export const ModalHeader = styled.View`
    width: 100%;
    height: 10%;
    justify-content: center;
    align-items:flex-end;
    padding-right: 5%;
`
export const ModalBody = styled.View`
    width: 100%;
    height: 60%;
    padding-top: 40px;
`
export const SpottyLabel = styled.Text`
    font-family: 'Kanit';
    color:white;
    font-size: 20px;
`
export const SpottyValue = styled.Text`
    font-family: 'Kanit';
    color:white;
    font-size: 17px;
`