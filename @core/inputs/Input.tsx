import React from "react";
import { Input as RNEInput, InputProps } from "react-native-elements";
import { $color } from "@/assets/colors";

const Input: React.FC<InputProps> = (props) => {
  const { inputStyle, ...inputProps } = props;
  return (
    <RNEInput
      inputContainerStyle={{
        borderBottomWidth: 0,
        borderRadius: 12,
      }}
      selectionColor={$color.primary}
      inputStyle={[
        inputStyle,
        {
          borderRadius: 12,
          borderWidth: 2,
          borderColor: props.errorMessage ? $color.danger : "transparent",
          backgroundColor: "#33333316",
          paddingHorizontal: 12,
        },
      ]}
      labelStyle={{
        marginBottom: 6,
        color: $color.secundary,
      }}
      errorStyle={{ color: $color.danger }}
      placeholderTextColor="#3333337f"
      {...inputProps}
    />
  );
};

export default Input;
