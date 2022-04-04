import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const TWInput = (props) => {
  const { key, name, label, helperText, ...restInputProps } = props;
  const methods = useFormContext();

  // const isRequired: (name: string) => boolean | undefined = (
  //   methods.control._options?.context 
  // )?.isRequired;
  const isRequired = (name) => (
    methods.control._options?.context 
  )?.isRequired;

  const fieldState = methods.getFieldState(name, methods.formState);

  return (
    <FormControl
      isInvalid={fieldState.invalid}
      isRequired={isRequired && isRequired(name)}
      key={key}
    >
      <FormLabel textTransform={!label ? "capitalize" : "none"}>
        {label || name}
      </FormLabel>
      <Input {...restInputProps} {...methods.register(name)} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  );
};
