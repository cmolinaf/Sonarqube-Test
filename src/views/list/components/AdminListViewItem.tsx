import React from "react";
import { Icon, ListItem, ListItemProps } from "react-native-elements";
import { $color } from "@/assets/colors";
import { ApplicationProps } from "@/types";

interface Props extends ApplicationProps, ListItemProps {
  marginDivider?: boolean;
}

const AdminListViewItem: React.FC<Props> = (props) => {
  const { marginDivider = true, id_bandeja, detalle } = props;
  const details = JSON.parse(detalle)[0];

  return (
    <ListItem
      activeOpacity={9}
      style={{
        borderRadius: 12,
        marginBottom: marginDivider ? 6 : 0,
      }}
      containerStyle={{ backgroundColor: "#3333331a", borderRadius: 12 }}
      {...props}
    >
      <ListItem.Content style={{ flex: 8 }}>
        <ListItem.Title>
          {id_bandeja} - {details.solicitante}
        </ListItem.Title>
        <ListItem.Subtitle>{details.division}</ListItem.Subtitle>
        {/* flecha */}
      </ListItem.Content>
      <ListItem.Content style={{ flex: 1 }}>
        {/* <ListItem.CheckBox /> */}
        <Icon
          name="plus-circle"
          style={{ alignSelf: "center" }}
          type="feather"
          color={$color.primary}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default AdminListViewItem;
