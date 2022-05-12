import React, { memo } from "react";
import { View } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import { $color } from "@/assets/colors";
import Badge from "@core/elements/Badge/Badge";
import { searchRenderItemProps } from "@core/elements/Search";

const RenderItem: React.FC<searchRenderItemProps> = ({
  item,
  selectType,
  onSelect,
}) => (
  <View
    style={{
      width: "100%",
      alignItems: "center",
    }}
  >
    <ListItem
      containerStyle={{
        width: "90%",
        borderRadius: 12,
        backgroundColor: "white",
      }}
      style={{
        borderRadius: 12,
      }}
      activeOpacity={0.8}
    >
      <ListItem.Content>
        {/* title of render item */}
        <ListItem.Title style={{ fontSize: 18, fontWeight: "bold" }}>
          {`${item.Nombre.toLocaleLowerCase()
            .split(" ")
            .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
            .join(" ")}`}
        </ListItem.Title>
        {item.rut && <ListItem.Subtitle>Externo</ListItem.Subtitle>}
        {/* details of render item */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Badge
            text={item.FichaSap}
            icon={{ name: "office-building", type: "material-community" }}
          />
          <Badge text={item.rut} icon={{ name: "perm-identity" }} />
          <Badge text={item.telefono} icon={{ name: "phone-iphone" }} />
          <Badge text={item.Email} icon={{ name: "email" }} />
        </View>
      </ListItem.Content>
      {/* action button of render item */}
      {onSelect && (
        <CheckBox
          checked={item.isSelect}
          checkedColor={$color.success}
          uncheckedColor={
            selectType === "multiDeselect" ? $color.danger : undefined
          }
          onPress={
            onSelect
              ? () => {
                  onSelect();
                }
              : undefined
          }
        />
      )}
      {/* <ListItem.Chevron /> */}
    </ListItem>
  </View>
);

export default memo(RenderItem);
