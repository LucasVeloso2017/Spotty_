import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, Keyboard, Text, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather'
import SimpleHeader from '../../components/SimpleHeader';
import TextArea from '../../components/TextArea';

import { Body, Container, SimpleHeaderContainer } from './styles';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const CreateSpot: React.FC = () => {

    const [showKeyboard, setShowKeyboard] = useState(false)
    const isCarousel = useRef(null)
    const formRef = useRef<FormHandles>(null);
    const [state] = useState([
        {
            imgUrl: "https://picsum.photos/id/11/200/300"
        },
        {
            imgUrl: "https://picsum.photos/id/10/200/300"
        },
        {
            imgUrl: "https://picsum.photos/id/12/200/300"
        }
    ])

    Keyboard.addListener('keyboardDidShow', () => {
        setShowKeyboard(true)
    })

    Keyboard.addListener('keyboardDidHide', () => {
        setShowKeyboard(false)
    })


    const CarouselCardItem = ({ item, index }: any) => {
        return (
            <View style={{ width: '100%', height: '100%' }} key={index}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                />
            </View>
        )
    }

    return (
        <Container>
            <SimpleHeaderContainer>
                <SimpleHeader />
            </SimpleHeaderContainer>
            <Body>
                {!showKeyboard && (
                    <View style={{ width: '00%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <Carousel
                            style={{ width: '100%', height: '50%' }}
                            layout="default"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            data={state}
                            renderItem={CarouselCardItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />
                    </View>
                )}
                
                <Form onSubmit={() => { }} ref={formRef} style={{ width: '80%', height: '40%', marginTop: 20 }}>

                    <Button>
                        <Icon name="camera" color="black" size={20} /> Camera
                    </Button>

                    <View style={{ marginTop: 20 }}>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name="name"
                            icon="hash"
                            placeholder="Nome do Spot"
                            returnKeyType="next"
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TextArea
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name="description"
                            icon="paperclip"
                            placeholder="Descrição do Spot"
                            returnKeyType="next"
                        />
                    </View>

                    <Button>
                        Enviar
                    </Button>

                </Form>
            </Body>
        </Container>
    );
}

export default CreateSpot;