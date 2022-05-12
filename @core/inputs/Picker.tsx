import React from "react";
import DocumentPicker from "react-native-document-picker";
import { Platform, Text, View } from "react-native";
import { Button, ButtonProps, Icon } from "react-native-elements";
import { $color } from "@/assets/colors";

interface Props extends ButtonProps {
  title: string;
  value: string | null;
  label?: string;
  changeData: (
    arg: string | null,
    arg2: string | null,
    arg3: string | null
  ) => void;
  errorMessage?: string;
}

const Picker: React.FC<Props> = (props) => {
  const {
    title,
    label,
    value = null,
    errorMessage = null,
    changeData,
    ...buttonProps
  } = props;
  return (
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
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
        }}
      >
        <Button
          {...buttonProps}
          title={value ?? title}
          buttonStyle={{
            backgroundColor: value ? "#3e8ae2" : "#33333316",
            borderWidth: 0,
            justifyContent: "flex-start",
            paddingHorizontal: 12,
          }}
          containerStyle={{
            borderRadius: 12,
            flex: 1,
          }}
          titleStyle={{
            textAlign: "left",
            color: value ? "white" : "#3333337f",
            fontFamily: "sans",
            fontSize: 18,
            paddingVertical: 4,
            flex: 1,
          }}
          onPress={async () => {
            try {
              const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
              });
              if (res) {
                let uri = res[0].uri;
                const name = res[0].name;
                const type = res[0].type;
                if (Platform.OS === "ios") {
                  // Remove 'file://' from file path for FileViewer
                  uri = res[0].uri.replace("file://", "");
                }
                // generar nombre unico
                changeData(uri, name, type);
              }
            } catch (err) {
              // Handling Exception
              if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                console.error("Canceled");
              } else {
                // For Unknown Error
                console.error("Unknown Error: " + JSON.stringify(err));
                throw err;
              }
            }
          }}
        />
        {value && (
          <Button
            containerStyle={{
              flex: 1,
              maxWidth: 48,
              marginLeft: 12,
            }}
            buttonStyle={{
              flex: 1,
              borderRadius: 12,
              backgroundColor: $color.danger,
            }}
            icon={
              <Icon
                name="trash-can-outline"
                type="material-community"
                color="white"
                size={28}
              />
            }
            onPress={() => {
              changeData(null, null, null);
            }}
          />
        )}
      </View>
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
  );
};

export default Picker;
