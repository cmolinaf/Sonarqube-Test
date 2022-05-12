import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { ApplicationProps } from "@/types";
import { $http } from "@libs/axios";
import { useNavigation, useNavigationState } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Select from "@core/inputs/Select";
import { statusTitlesPlural } from "@const/StatusTitles";
import AdminListViewItem from "./components/AdminListViewItem";
import { $color } from "@/assets/colors";
import { AppRoute } from "@const/AppRoute";
import { serviceTypeId } from "@const/ServiceType";

interface Props {
  title: string;
  type: keyof typeof serviceTypeId;
}

const ListView: React.FC<Props> = ({ title, type }) => {
  // show loading spinner
  const [isLoading, setLoading] = useState(true);
  const [keyFilter, setKeyFilter] = useState<number | null>(null);
  const [applications, setApplications] = useState<ApplicationProps[]>();
  const [copyApplications, setCopyApplications] =
    useState<ApplicationProps[]>();

  const navigation = useNavigation<StackNavigationProp<unknown, unknown>>();
  const { index, routes } = useNavigationState((state) => state);
  const typeOfApplication = serviceTypeId[type];

  const getListViewApplications = async () => {
    try {
      setLoading(true);
      // if (!applications) {
      //   const { data }: { data: ApplicationProps[] } = await $http.get(
      //     'https://cmp.grupoavanza.com/api/sac/dev.php?a=asm1',
      //   ); //URL_AXIOS

      //   await Storage.removeAllApplications();
      //   const isSaved = await Storage.createApplication(data);
      //   isSaved ? (storedData = data) : null;
      // } else {
      //   storedData = await Storage.getAllApplications();
      // }
      const { data }: { data: ApplicationProps[] } = await $http.get(
        `https://cmp.grupoavanza.com/api/sac/dev.php?a=asm1&t=${typeOfApplication}`
      ); //URL_AXIOS
      const storedData = data;
      setApplications(storedData);
      setLoading(false);
    } catch (err: unknown) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routes[index].name === AppRoute.TableScreen) {
      getListViewApplications();
    }
  }, [routes, index]);

  const listStatusFilter = [
    {
      text: statusTitlesPlural[1],
      value: 1,
    },
    {
      text: statusTitlesPlural[2],
      value: 2,
    },
    {
      text: statusTitlesPlural[4],
      value: 4,
    },
    {
      text: "Todos",
      value: null,
    },
  ];

  useEffect(() => {
    console.log(keyFilter);
    if (keyFilter) {
      setCopyApplications(
        applications?.filter((item) => item.estado_bandeja === `${keyFilter}`)
      );
    } else {
      setCopyApplications(applications);
    }
  }, [keyFilter, applications]);

  // components
  const RenderHeader = (
    <View>
      <Text
        h4
        h4Style={{
          textAlign: "center",
          marginBottom: 16,
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      <Select
        title="Filtrar solicitudes"
        label="Filtro"
        options={listStatusFilter}
        keyText="text"
        keyValue="value"
        onChange={(value) => {
          setKeyFilter(value as number | null);
        }}
        value={keyFilter ? statusTitlesPlural[keyFilter] : "Todos"}
      />
      {/* <InformationRequest text={'El siguiente proceso tiene como limite el 50% de la renta liquida mensual'}></InformationRequest> */}
    </View>
  );
  const RenderEmpty = (
    <View style={styles.emptyListContainer}>
      {isLoading ? (
        <ActivityIndicator size="small" color={$color.warning} />
      ) : (
        <Text style={styles.emptyListText}>Parece que no hay datos</Text>
      )}
    </View>
  );

  return (
    <>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={copyApplications}
        renderItem={({ item, index }) => {
          return (
            <AdminListViewItem
              key={`admin-item-${item.id_bandeja}-${index}`}
              onPress={() => {
                const parametros = {
                  title: "ApplicationScreen",
                  param: { data: item },
                };
                navigation.navigate(parametros.title, parametros.param);
              }}
              {...item}
            />
          );
        }}
        ListHeaderComponent={RenderHeader}
        ListEmptyComponent={RenderEmpty}
        ListHeaderComponentStyle={{ marginBottom: 15 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#3a4049",
    borderBottomWidth: 1,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  list: {
    marginRight: Platform.OS == "ios" ? 0 : 8,
    marginLeft: Platform.OS == "ios" ? 0 : 8,
  },
  emptyListContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
  },
});
export default ListView;
