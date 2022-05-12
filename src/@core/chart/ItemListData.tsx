import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem, ListItemProps } from "react-native-elements";
import { $color } from "@/assets/colors";

interface Props extends ListItemProps {
  avatar?: unknown;
  title: string;
  subtitle: string;
  counter: string | number;
  marginDivider?: boolean;
}

const ItemListData: React.FC<Props> = (props) => {
  const { avatar, title, subtitle, counter, marginDivider = true } = props;
  return (
    <View>
      <ListItem
        underlayColor="#33333337"
        activeOpacity={9}
        style={{
          borderRadius: 12,
          marginBottom: marginDivider ? 6 : 0,
        }}
        containerStyle={{ backgroundColor: "#3333331a", borderRadius: 12 }}
        {...props}
      >
        <ListItem.Content style={{ flex: 1 }}>
          <Avatar
            size={48}
            rounded
            icon={avatar ?? false}
            containerStyle={{
              borderColor: "grey",
              borderStyle: "solid",
              backgroundColor: $color.warning,
            }}
          />
        </ListItem.Content>
        <ListItem.Content style={{ flex: 5 }}>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
          {/* flecha */}
        </ListItem.Content>
        <ListItem.Content style={{ flex: 1 }}>
          <Text style={styles.counter}>{counter}</Text>
          {/* flecha */}
        </ListItem.Content>
      </ListItem>
      {/* <View style={styles.item}>
        <Avatar
          size={48}
          rounded
          icon={avatar ?? false}
          containerStyle={{
            borderColor: 'grey',
            borderStyle: 'solid',
            backgroundColor: '#981bd1',
            borderWidth: 1,
          }}
        />
        <View style={styles.itemTitleContent}>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <Text style={styles.counter}>{counter}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  itemTitleContent: {
    width: "100%",
    paddingHorizontal: 12,
    flex: 1,
  },
  itemSubtitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
  },
  itemTitle: {
    fontSize: 18,
  },
  counter: {
    paddingHorizontal: 6,
    fontSize: 24,
  },
});
export default ItemListData;
