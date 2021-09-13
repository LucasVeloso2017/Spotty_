import Gravatar from '@krosben/react-native-gravatar';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather'
import { View } from 'react-native';

import { Container, SearchBar, SearchInput, TextLogo } from './styles';
import Button from '../Button';
import { useAuth } from '../../hooks/authHook';

interface HeaderProps {
    isOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ isOpen }) => {

    const{signOut} = useAuth()

    return (
        <Container isOpen={isOpen}>
            <TextLogo>Spotty.</TextLogo>
            <SearchBar>
                <SearchInput placeholder="Pesquisar Spots" />
                <Icon name="search" color="black" size={20} />
            </SearchBar>
            <View>
                <Button style={{backgroundColor:'transparent'}} onPress={()=>signOut()}>
                    <Icon name="power" color="red" size={20} />
                </Button>
            </View>
            <Gravatar defaultImage="robohash" email="lucas.velloso2017@gmail.com" size={90} />
        </Container>
    );
}

export default Header;