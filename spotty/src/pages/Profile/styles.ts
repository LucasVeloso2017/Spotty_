import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #232227;
`;
export const SimpleHeaderContainer = styled.View`
    width: 100%;
    height: 10%;
`
export const Body = styled.View`
    width: 100%;
    height: 90%;
`
export const ImageContainer = styled.View`
    width: 100%;
    height: 35%;
    justify-content: center;
    align-items: center;
`
export const ImageSelect = styled.View`
    position: absolute;
    background-color: #D3D5D7;
    width: 44px;
    height: 44px;
    border-radius: 100px;
    bottom:50px;
    right:140px;

    justify-content: center;
    align-items: center;
`
export const Username = styled.Text`
    margin-top: 20px;
    color: white;
    font-size: 25px;
    font-family: 'Kanit';
`
export const UserInformations  = styled.View`
    width: 100%;
    height: 10%;
    margin-top: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
export const UserInformationCard = styled.View`
    width: 33%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const UserInformationCardTitle = styled.Text`
    color: white;
    font-size: 20px;
`
export const UserInformationCardInfo = styled.Text`
    margin-top: 10px;
    color: white;
    font-size: 15px;
`
export const UserInformationBio = styled.View`
    width: 100%;
    height: 35%;
    padding-top:20px;
    padding-left:50px;
    padding-right:50px;
`
export const UserInformationConfiguration = styled.View`
    width: 100%;
    padding-left:50px;
    padding-right:50px;
`