import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Picker, PickerProps } from '@react-native-picker/picker'
import { TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { useField } from '@unform/core';
import { Container, Icon } from './styles';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

interface InputProps extends PickerProps {
  name: string;
  icon: string;
  containerStyle?: StyleProp<ViewStyle>;
  items: SelectPropsModel[]
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}


interface SelectPropsModel {
  label: string
  value: string
}

const Select: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, items, containerStyle = {}, ...rest },
  ref,
) => {

  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      setValue(ref: any, value) {
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
    <Container style={containerStyle} isFocused={false} isErrored={!!error}>
      <Icon isFilled={false} isFocused={false} name={icon} size={20} />
      <Picker
        ref={inputElementRef}
        style={{ width: '90%' }}
        selectedValue={defaultValue}
        onValueChange={(itemValue, itemIndex) =>
          inputValueRef.current.value = String(itemValue)
        }
        {...rest}
      >
        <Picker.Item label="Selecione" value={undefined} />
        {
          items.map(e =>{
            return(
              <Picker.Item key={e.label} label={e.label} value={e.value} />
            )
          })
        }

      </Picker>
    </Container>
  );
};

export default forwardRef(Select);
