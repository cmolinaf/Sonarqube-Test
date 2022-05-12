import React, { useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import {
  BottomSheet,
  Button,
  ButtonProps,
  ListItem,
} from "react-native-elements";
import { $color } from "@/assets/colors";

interface dataProps {
  [key: string]: unknown;
}

interface Props extends ButtonProps {
  title: string;
  label?: string;
  options: dataProps[] | string[];
  value: dataProps | string | null;
  keyValue?: keyof dataProps;
  keyText?: keyof dataProps;
  notCancel?: boolean;
  cancelTitle?: string;
  onCancelPress?: () => void;
  errorMessage?: string;
  onChange?: (arg0: string | number | boolean | object | null) => void;
}

const Select: React.FC<Props> = (props) => {
  const {
    title,
    label,
    options,
    value,
    keyValue,
    keyText,
    notCancel = false,
    cancelTitle,
    onCancelPress,
    errorMessage = null,
    onChange,
    ...ButtonProps
  } = props;
  const [showSelect, setShowSelect] = useState(false);
  const { height } = useWindowDimensions();

  return (
    <View>
      <View
        style={{
          paddingBottom: errorMessage ? 4 : 26,
          paddingTop: label ? 2 : 16,
          paddingHorizontal: 12,
        }}
      >
        {label && (
          <Text
            style={{
              marginBottom: 6,
              color: $color.secundary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {label}
          </Text>
        )}
        <Button
          {...ButtonProps}
          title={
            value
              ? keyText && typeof value === "object"
                ? value[keyText]
                : value
              : title
          }
          buttonStyle={{
            backgroundColor: "#33333316",
            borderWidth: 2,
            borderColor: errorMessage ? $color.danger : "transparent",
            justifyContent: "flex-start",
            borderRadius: 12,
            paddingHorizontal: 12,
          }}
          containerStyle={{
            borderRadius: 12,
          }}
          titleStyle={{
            textAlign: "left",
            color: value ? "black" : "#3333337f",
            fontFamily: "sans",
            paddingVertical: 4,
            fontSize: 18,
          }}
          onPress={() => setShowSelect(true)}
        />
        {!!errorMessage && (
          <Text
            style={{
              color: $color.danger,
              paddingHorizontal: 4,
              fontSize: 12,
              marginTop: 5,
              marginBottom: 1,
              paddingBottom: 0,
              fontFamily: "sans",
            }}
          >
            {errorMessage}
          </Text>
        )}
      </View>
      <BottomSheet
        key={`bottomsheet-${title}`}
        isVisible={showSelect}
        modalProps={{
          animationType: "fade",
          hardwareAccelerated: true,
          onRequestClose: () => {
            setShowSelect(false);
          },
        }}
        containerStyle={{
          backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
        }}
      >
        <View style={{ flex: 1, maxHeight: height }}>
          <ScrollView>
            {options.map((l, i) => (
              <ListItem
                key={`select-${title}-button-item-${i}`}
                onPress={() => {
                  onChange ? onChange(keyValue ? l[keyValue] : l) : "";
                  setShowSelect(false);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{keyText ? l[keyText] : l}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
          {/* cancel button */}
          {!notCancel && (
            <ListItem
              key={`select-${title}-button-item-exit`}
              containerStyle={{
                backgroundColor: $color.danger,
              }}
              onPress={() => {
                if (onCancelPress) {
                  onCancelPress();
                }
                setShowSelect(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {cancelTitle ?? "Cancelar"}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default Select;
