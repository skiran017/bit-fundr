import React from 'react';
import {
  FormLabel,
  Textarea,
  chakra,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

function FormField({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) {
  return (
    <FormLabel display="flex" w="full" flexDirection="column" flex={1}>
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <Textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          py="16px"
          px={{ base: '26px', md: '16px' }}
          outline="none"
          bg="transparent"
          fontSize="14px"
          rounded="10px"
          minW={{ sm: '300px' }}
        />
      ) : (
        <Input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          py="16px"
          px={{ base: '26px', md: '16px' }}
          outline="none"
          bg="transparent"
          fontSize="14px"
          rounded="10px"
          minW={{ sm: '300px' }}
        />
      )}
    </FormLabel>
  );
}

export default FormField;
