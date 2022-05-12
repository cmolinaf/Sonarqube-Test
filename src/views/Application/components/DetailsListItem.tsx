import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { $color } from "@/assets/colors";

interface Props {
  title: string;
  value: string | number | undefined | null;
  isValueBold?: boolean;
}

const DetailsListItem: React.FC<Props> = ({
  title,
  value,
  isValueBold = false,
}) => {
  const [dataValue, setDataValue] = useState<typeof value>(value);

  useEffect(() => {
    setDataValue(value);
  }, [value]);

  return (
    <>
      {value && (
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: $color.secundary,
              }}
            >
              {title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                flexWrap: "wrap",
                fontWeight: isValueBold ? "bold" : "normal",
              }}
            >
              {dataValue}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 12,
    marginHorizontal: 12,
    maxWidth: "100%",
  },
});

export default DetailsListItem;
