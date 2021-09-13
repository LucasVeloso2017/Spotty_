import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { Alert, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup'

import { Container, Logo, TextLogo } from './styles';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useCallback } from 'react';
import { useAuth } from '../../hooks/authHook';
import getValidationErrors from '../../utils/getValidationErrors';

interface InputRef {
    focus(): void;
}
interface FormHandler{
    email:string
    password:string
}

const Signin: React.FC = () => {
    const {signIn} = useAuth()
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<InputRef>(null);
    
    const navigation = useNavigation();

    const handleSubmit = useCallback(async ({email,password}:FormHandler)=>{
        try{

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('O E-mail é obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('A Senha é obrigatória')
            });

            await schema.validate({email,password}, { abortEarly: false });

            signIn({
                email,
                password
            })

        }catch(e){
            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);                
                formRef.current?.setErrors(errors);
                return;
            }
        }
    },[signIn])


    return (
        <Container style={{position:'absolute'}}>
            <Logo>
                <TextLogo>Spotty.</TextLogo>
            </Logo>

            <Form onSubmit={handleSubmit} ref={formRef} style={{width:'80%',height:'40%',marginTop:20}}>
                
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordInputRef.current?.focus();
                        }}
                    />
                    <View style={{marginTop:20}}>
                        <Input

                            ref={passwordInputRef}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name="password"
                            icon="lock"
                            placeholder="Senha"
                            returnKeyType="next"
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />
                    </View>
                    
                    <Button onPress={() => formRef.current?.submitForm()}>
                        Entrar 
                    </Button>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Signup' as never)}>
                        <Text style={{color:'white'}}>Não possui uma conta? Registre-se agora</Text>
                    </TouchableOpacity>
                </View>
            </Form>
        </Container>
    );
}

export default Signin;