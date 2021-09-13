import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Picker } from '@react-native-picker/picker';
import { Container, Logo, TextLogo } from './styles';
import Select from '../../components/Select';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface countries{
    nome:{
        abreviado:string
    }
}
interface SelectPropsModel{
    label:string
    value:string
}
const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [selectItems,setSelectItems] = useState<SelectPropsModel[]>([])
    
    const navigation = useNavigation();
    useEffect(()=>{
        const loadCountries = async()=>{
            const formatData:SelectPropsModel[] = []
            const response = await axios.get<countries[]>("https://servicodados.ibge.gov.br/api/v1/paises")
            const {data} = response
            const name = data.map(e => e.nome.abreviado)
            name.map(e =>{
                formatData.push({
                    label:e,
                    value:e
                })
            })
            setSelectItems(formatData.sort())
        }
        loadCountries()
    },[])

    return (
        <Container>
            <Logo>
                <TextLogo>Spotty.</TextLogo>
            </Logo>

            <Form onSubmit={() => { }} ref={formRef} style={{ width: '80%', height: '40%', marginTop: 20 }}>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    name="name"
                    icon="user"
                    placeholder="Nome"
                    returnKeyType="next"
                />
                <View style={{ marginTop: 20 }}>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        returnKeyType="next"
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Select items={selectItems} icon="map" name="country"/>
                </View>

                <Button>
                    Cadastrar
                </Button>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                    <TouchableOpacity onPress={()=> navigation.navigate('Signin' as never)}>
                        <Text style={{ color: 'white' }}>Já possui uma conta? Entre agora</Text>
                    </TouchableOpacity>
                </View>
            </Form>
        </Container>
    );
}

export default Signup;