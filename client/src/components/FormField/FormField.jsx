import React from 'react';
import { FormLabel, Textarea, chakra, Input } from '@chakra-ui/react';

function FormField({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  ...props
}) {
  return (
    <FormLabel display="flex" w="full" flexDirection="column" flex={1}>
      {labelName && (
        <chakra.span
          fontWeight="medium"
          fontSize="14px"
          lineHeight="22px"
          mb="10px"
        >
          {labelName}
        </chakra.span>
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
          fontSize="14px"
          rounded="10px"
          minW={{ sm: '300px' }}
          _focus={{
            bg: 'whiteAlpha.100',
          }}
          _focusVisible={{
            border: 'brand.custom',
          }}
          position="inherit"
        />
      ) : (
        <Input
          position="inherit"
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          py="16px"
          px={{ base: '26px', md: '16px' }}
          outline="none"
          fontSize="14px"
          rounded="10px"
          minW={{ sm: '300px' }}
          _focus={{
            bg: 'whiteAlpha.100',
          }}
          _focusVisible={{
            border: 'brand.custom',
          }}
          {...props}
        />
      )}
    </FormLabel>
  );
}

export default FormField;
