import React from 'react';
import { Modal as RNModal} from 'react-native';

import Icon from 'react-native-vector-icons/Feather'
import { Container, ModalContainerCentred } from './styles';

interface ModalProps{
    visible:boolean
}

const Modal: React.FC<ModalProps> = ({children,visible}) => {
    return (
        <Container>
            <RNModal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <ModalContainerCentred>
                    
                    {children}
                </ModalContainerCentred>
            </RNModal>
        </Container>
    );
}

export default Modal;