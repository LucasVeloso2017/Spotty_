import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { Container, TextLogo } from './styles';

const SimpleHeader: React.FC = () => {
    return (
        <Container>
            <Icon name="chevron-left" color="white" size={20} />
            <View style={{ width: '90%', justifyContent: 'center', alignItems: 'flex-end' }}>
                <TextLogo>Spotty.</TextLogo>
            </View>
        </Container>
    );
}

export default SimpleHeader;