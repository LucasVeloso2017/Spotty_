import styled, { css } from 'styled-components/native';

interface HeaderProps{
    isOpen:boolean
}

export const Container = styled.View<HeaderProps>`
     width: 100%;
    height: 10%;
    background-color: #232227;
    ${props => props.isOpen && css`
        height: 20%;
    `}
    flex-direction: row;
    justify-content: space-around;
    align-items:center;
`;

export const TextLogo = styled.Text`
    color: white;
    font-size: 23px;
    font-family: 'Lobster';
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