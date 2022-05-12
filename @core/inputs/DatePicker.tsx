import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, ButtonProps } from "react-native-elements";
import { $color } from "@/assets/colors";

interface Props extends ButtonProps {
  date: Date | null;
  title: string;
  label?: string;
  changeDate: (arg0: Date) => void;
  mode?: "date" | "time";
  errorMessage?: string;
}

const DatePicker: React.FC<Props> = ({
  date,
  title,
  label,
  changeDate,
  mode = "date",
  errorMessage = null,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
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
          title={`${
            date
              ? mode === "date"
                ? date.getDate() +
                  " - " +
                  (date.getMonth() + 1) +
                  " - " +
                  date.getFullYear()
                : ("0" + date.getHours()).slice(-2) +
                  ":" +
                  ("0" + date.getMinutes()).slice(-2)
              : title
          }`}
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
            color: date ? "black" : "#3333337f",
            fontFamily: "sans",
            paddingVertical: 4,
            fontSize: 18,
          }}
          onPress={() => setShowDatePicker(true)}
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
      {showDatePicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event: unknown, selectedDate: Date | undefined) => {
            const currentDate = selectedDate || new Date();
            setShowDatePicker(Platform.OS === "ios");
            if (event.type == "set") {
              //ok button clicked
              changeDate(currentDate);
            } else {
              //cancel button clicked
              return null;
            }
          }}
        />
      )}
    </>
  );
};

export default DatePicker;
