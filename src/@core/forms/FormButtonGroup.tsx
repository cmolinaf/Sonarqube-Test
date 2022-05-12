import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Storage } from "@libs/storage";
import { View } from "react-native";
import Button from "@core/elements/Button/Button";
import { RootStackParamList } from "@core/types/RootStackParamList";

// const buttons = ['Cancelar', 'Observación', 'Guardar'];

interface Props {
  resetValues: () => void;
  onSave: () => void;
}

const FormButtonGroup: React.FC<Props> = ({ resetValues, onSave }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const handleButtonGroupPress = (selectedIndex: number) => {
    const cancel = async () => {
      try {
        const userData = await Storage.getUserData();
        navigation.navigate("HomeScreen", { userID: userData.uid });
        resetValues();
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    // const observation = () => {
    //   // console.log('observación');
    // };
    const save = async () => {
      try {
        setLoading(true);
        await onSave();
        const userData = await Storage.getUserData();
        navigation.navigate("HomeScreen", { userID: userData.uid });
        setLoading(false);
      } catch (err) {
        // handle errors from server
        console.error("error de save: ", err);
        setLoading(false);
      }
    };

    if (selectedIndex === 2) {
      save();
    }
    // else if (selectedIndex === 1) {
    //   observation();
    // }
    else if (selectedIndex === 0) {
      cancel();
    }
  };
  return (
    <>
      {/* <ButtonGroup
        onPress={handleButtonGroupPress}
        buttons={buttons}
        containerStyle={{ height: 50, marginBottom: 24 }}
      /> */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <Button
            title="Cancelar"
            variant="warning"
            contentType="filled"
            onPress={() => handleButtonGroupPress(0)}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Button
            title="Guardar"
            variant="success"
            contentType="filled"
            loading={loading}
            onPress={() => handleButtonGroupPress(2)}
          />
        </View>
      </View>
    </>
  );
};

export default FormButtonGroup;
