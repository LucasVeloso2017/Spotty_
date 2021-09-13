import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Camera as ExpoCamera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Feather'
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CameraPictureOptions, CameraType } from 'expo-camera/build/Camera.types';

import { Container, CameraContainer, CameraControlsContainer, PictureButton, ItemControl, SimpleHeaderContainer, PreviewContainer, PreviewFrame, ModalContainer, ModalHeader, ModalControls, ModalButton } from './styles';
import SimpleHeader from '../SimpleHeader';
import Modal from '../Modal';
import Button from '../Button';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const Camera: React.FC = () => {
    const isCarousel = useRef(null)
    const cameraRef = useRef<ExpoCamera>(null)
    const [hasPermission, setHasPermission] = useState(false);
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState("back" as CameraType);
    const [maximumPhotos, setMaximumPhotos] = useState<String[]>([])

    useEffect(() => {
        const loadPerms = async () => {
            const { status } = await ExpoCamera.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        }
        loadPerms()

    }, []);

    const handlePhoto = useCallback(async () => {
        const options: CameraPictureOptions = {
            quality: 1,
            base64: true
        }
        if (!cameraRef.current) {
            console.log('não existe ref')
            return
        }
        const { uri } = await cameraRef.current.takePictureAsync(options)
        
        if(maximumPhotos.length > 2){
            Alert.alert("Limite Excedido","O Maxímo de fotos permitdas são 3")
            return
        }else{
            setMaximumPhotos(st => [...st, uri])
        }

        console.log(maximumPhotos.length > 2)
        
    }, [type, maximumPhotos])
    
    const handleCancelPhotos = useCallback(()=>{
        setVisible(false)
        setMaximumPhotos([])
    },[visible,maximumPhotos])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const CarouselCardItem = ({ item, index }: any) => {
        return (
            <View style={{ width: '100%', height: '100%'}} key={index}>
                <Image
                    source={{ uri: item }}
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
            <CameraContainer type={type} ref={cameraRef} autoFocus={true} style={{ justifyContent: "flex-end" }}>
                {/* {
                    maximumPhotos.length > 0 && (

                        <PreviewContainer>
                            
                                <PreviewFrame>
                                    <Image style={{ width: "100%", height: "100%", resizeMode: "contain", borderRadius: 10 }} source={{ uri: maximumPhotos[0].toString() }} />
                                </PreviewFrame>
                            </TouchableOpacity>
                        </PreviewContainer>

                    )
                } */}
            </CameraContainer>
            <CameraControlsContainer>
                <ItemControl>
                    {
                        maximumPhotos.length > 0  && (
                            <View style={{ width: '40%', height: '40%', backgroundColor: '#38b000', padding: 5, borderRadius: 5 }}>
                                <TouchableOpacity onPress={() => setVisible(st => !st)}>
                                    <Image style={{ width: "100%", height: "100%", resizeMode: "contain", borderRadius: 10 }} source={{ uri: maximumPhotos[0].toString() }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    
                </ItemControl>
                <ItemControl>
                    <PictureButton onPress={handlePhoto} />
                </ItemControl>
                <ItemControl >
                    <TouchableOpacity onPress={() => setType(st => st === CameraType.back ? CameraType.front : CameraType.back)}>
                        <Icon name='repeat' color="white" size={25} />
                    </TouchableOpacity>
                </ItemControl>
            </CameraControlsContainer>
            <Modal visible={visible}>
                <ModalContainer>
                    <ModalHeader style={{width:'100%',height:'10%',justifyContent:'center',alignItems:'flex-end',paddingRight:'5%'}}>
                        <Icon name='x' color="black" size={30} />
                    </ModalHeader>
                    <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center',overflow:'hidden' }}>
                        <Carousel
                            style={{ width: '100%', height: '50%' }}
                            layout="default"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            data={maximumPhotos}
                            renderItem={CarouselCardItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />

                        <Text style={{paddingTop:'10%',fontSize:20}}>Quero essas imagens ?</Text>
                    </View>
                    <ModalControls>
                        <ModalButton style={{backgroundColor:'#38b000',width:"45%"}}>
                            <Icon name='check' color="white" size={30} />
                        </ModalButton>
                        <ModalButton style={{backgroundColor:'#d90429',width:"45%"}} onPress={handleCancelPhotos}>
                            <Icon name='x' color="white" size={30} />
                        </ModalButton>
                    </ModalControls>
                </ModalContainer>
            </Modal>
        </Container>
    );
}


export default Camera;