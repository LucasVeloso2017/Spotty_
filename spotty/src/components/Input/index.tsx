import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  RefAttributes,
} from 'react';
import { TextInputProps, TextInput,Text, View  } from 'react-native';
import { useField } from '@unform/core';

import { InputContainer, Icon,TextInputComponent,Container, ErrorTextMessage } from './styles';

interface InputProps extends Omit<Omit<TextInputProps & RefAttributes<TextInput>, never> & Partial<Pick<TextInputProps & RefAttributes<TextInput>, never>>, "theme">{
  name: string;
  icon: string;
  containerStyle?: { [key: string]: string | number };
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, containerStyle, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <InputContainer style={containerStyle} isFocused={isFocused} isErrored={!!error}>
        <Icon isFilled={isFilled} isFocused={isFocused} isErrored={!!error} name={icon} size={20} />

        <TextInputComponent
          //@ts-ignore
          ref={inputElementRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </InputContainer>
        {
          error && <ErrorTextMessage>{error}</ErrorTextMessage>
        }
    </Container>
    
  );
};

export default forwardRef(Input);
