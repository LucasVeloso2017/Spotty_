import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Gravatar from '@krosben/react-native-gravatar';
import Icon from 'react-native-vector-icons/Feather'


import { Body, Container, ImageContainer, ImageSelect, SimpleHeaderContainer, UserInformationBio, UserInformationCard, UserInformationCardInfo, UserInformationCardTitle, UserInformationConfiguration, UserInformations, Username } from './styles';
import Button from '../../components/Button';
import SimpleHeader from '../../components/SimpleHeader';

const Profile: React.FC = () => {
    return (
        <Container>
            <SimpleHeaderContainer>
                <SimpleHeader/>
            </SimpleHeaderContainer>
            <Body>
                <ImageContainer>
                    <Gravatar defaultImage="robohash" email="lucas.velloso2017@gmail.com" size={350} style={{position:'relative'}} />
                    <ImageSelect>
                        <TouchableOpacity>
                            <Text><Icon name="camera" color="black" size={18} /></Text>
                        </TouchableOpacity>
                    </ImageSelect>
                    <Username>Lucas Veloso</Username>
                </ImageContainer>
                <UserInformations>
                    <UserInformationCard>
                        <UserInformationCardTitle>Base</UserInformationCardTitle>
                        <UserInformationCardInfo>Goofy</UserInformationCardInfo>
                    </UserInformationCard>
                    <UserInformationCard>
                        <UserInformationCardTitle> Marcas</UserInformationCardTitle>
                        <UserInformationCardInfo>Flip,BONES...</UserInformationCardInfo>
                    </UserInformationCard>
                    <UserInformationCard>
                        <UserInformationCardTitle>Spots</UserInformationCardTitle>
                        <UserInformationCardInfo>Galpão,Duo...</UserInformationCardInfo>
                    </UserInformationCard>
                </UserInformations>

                <UserInformationBio>
                    <UserInformationCardTitle>Bio</UserInformationCardTitle>
                    <Text
                        style={{color:'#D3D5D7',marginTop:10}}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, animi? Ipsam, asperiores nesciunt! Expedita deserunt quas dicta qui? Eos harum nemo nihil molestias et cupiditate ad tempora minus officiis. Mollitia!
                    </Text>
                </UserInformationBio>
                <UserInformationConfiguration>
                    <Button>
                        <Icon name="settings" color="black" size={18} /> Configurações 
                    </Button>
                </UserInformationConfiguration>

            </Body>

        </Container>
    );
}

export default Profile;