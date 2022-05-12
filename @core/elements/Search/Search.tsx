import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { $color } from "@/assets/colors";
import { $http } from "@libs/axios";
import Button from "../Button/Button";

export interface searchSingleItemProps {
  [key: string]: unknown;
}
export interface searchSingleSelectedItemProps extends searchSingleItemProps {
  isSelect: boolean;
}

export interface searchRenderItemProps {
  item: searchSingleItemProps;
  index: number;
  selectType: "multiselect" | "multiDeselect" | "select" | "noSelect";
  onSelect?: () => void;
}

// props
interface Props {
  data: searchSingleItemProps[];
  keyExtractor: ((item: unknown, index: number) => string) | undefined;
  searchRoute?: (arg0: { searchValue: string }) => string;
  keyOfCheck: keyof searchSingleItemProps;
  onReady: (arg0: { items: searchSingleItemProps[] }) => void;
  SearchToolbar?: (arg0: { items: searchSingleItemProps[] }) => void;
  selectType: "multiselect" | "multiDeselect" | "select" | "noSelect";
  isVisible?: boolean;
  RenderItem: React.FC<searchRenderItemProps>;
}
interface PromiseWithCancel<T> extends Promise<T> {
  cancel: () => void;
}

const Search: React.FC<Props> = ({
  data = [],
  RenderItem,
  keyExtractor = undefined,
  searchRoute,
  keyOfCheck,
  onReady,
  SearchToolbar,
  selectType = "select",
  isVisible = true,
}) => {
  // show loading spinner
  const [isLoading, setLoading] = useState(false);
  const [isLoadingNewValue, setLoadingNewValue] = useState(false);
  //handle search bar value
  const [search, setSearch] = useState<string>("");
  // data arrays
  /*
    dataSource = data currently rendering in flatlist
    allDataGettingIn = data getting by API
    selectedItems = data which has been selected
   */
  const [dataSource, setDataSource] = useState<searchSingleSelectedItemProps[]>(
    []
  );
  const [allDataGettingIn, setAllDataGettingIn] = useState<
    searchSingleItemProps[]
  >([]);
  const [selectedItems, setSelectedItems] = useState<
    searchSingleSelectedItemProps[]
  >([]);
  // handle API request
  const [query, setQuery] = React.useState<
    PromiseWithCancel<searchSingleSelectedItemProps> | undefined
  >(undefined);

  // functions
  const handelSearch = async (text: string) => {
    // handle on search bar change
    setSearch(text); // set new value to search
    let newDataSource = []; // defined empty aux array
    if (allDataGettingIn.length > 0 && text.length > 2) {
      const selectedItemsIds = await new Set(
        selectedItems.map((d) => d[keyOfCheck])
      ); // array of items id's on selectedItems
      // component start search wen has item getting by API before and text of search bar is bigger than 2 characters
      const formatQuery = text.toLocaleLowerCase();
      newDataSource = await allDataGettingIn
        .filter((item) => {
          if (item.Nombre) {
            return item.Nombre.toLocaleLowerCase().includes(formatQuery); // returns elements that meet the condition
          }
        })
        .map((item) => {
          // append selected variable to selected items provide by parent component
          const itemAux = {
            ...item,
            isSelect: selectedItemsIds.has(item[keyOfCheck]),
          };
          return itemAux;
        });
      setDataSource(newDataSource); // set data to data rendering in flatlist
    }
    if (searchRoute && newDataSource.length < 5 && text.length > 2) {
      // handle find elements on API
      query?.cancel(); // cancel last API request if its currently running
      if (!isLoading) {
        // if not loading, show loading spinner
        setLoading(true);
      }
      const q = makeUserRequest(text); // create new API request
      setQuery(q);
      q.then(async (newData) => {
        // when API request completed
        if (newData.length > allDataGettingIn.length) {
          // compare if new data receive by API is less than existing data
          await setAllDataGettingIn(newData); // set new data getting by API
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
    if (text === "") {
      setDataSource(selectedItems); // clean data renderer and put selected items instead
    }
  };

  useEffect(() => {
    if (allDataGettingIn.length > 0) {
      handelSearch(search); // call handleSearch function when API request update items
    }
  }, [allDataGettingIn]);

  // on abort function
  // Error pendiente
  /*
    Debería usar `DOMException` en vez de `typeof error`, sin embargo
    no existe dicha instancia en react native
  */
  const isAbortError = (error: unknown): typeof error => {
    if (error && error.name === "AbortError") {
      return true;
    }
    return false;
  };

  // handle API request
  const makeUserRequest = (search: string) => {
    if (!searchRoute) return null;
    // create new abort controller
    const controller = new AbortController();
    const signal = controller.signal;

    // API call

    const APICall = async (resolve: (value: unknown) => void) => {
      try {
        const response = await $http.get(searchRoute({ searchValue: search }), {
          signal: signal, // pass abort controller as parameter
        }); // URL

        // append selected value to each object in array
        const newData: searchSingleItemProps[] = await response.data;

        // compare to current items in full items array
        const fullUsersIds = await new Set(
          allDataGettingIn.map((d) => d[keyOfCheck])
        );
        // get new array with differences appended to it
        const merged = await allDataGettingIn.concat(
          newData.filter((d) => !fullUsersIds.has(d[keyOfCheck]))
        );
        resolve(merged); // returns array
      } catch (ex: unknown) {
        // handle error
        // no esta mostrando nada por error en función isAbortError
        if (isAbortError(ex)) {
          // in case of abort API request
          console.warn(ex.message);
        }
      }
    };

    // declare API call as promise
    const promise = new Promise((resolve) => {
      APICall(resolve);
    });
    // append cancel function to the promise
    (promise as PromiseWithCancel<searchSingleItemProps[]>).cancel = () =>
      controller.abort();
    return promise as PromiseWithCancel<searchSingleItemProps[]>; // returns promise
  };

  // handle initial state of component
  useEffect(() => {
    if (isVisible && data.length > 0) {
      const aux: searchSingleSelectedItemProps[] = data.map((item) => {
        // append selected variable to selected items provide by parent component
        const itemAux = {
          ...item,
          isSelect: true,
        };
        return itemAux;
      });
      setDataSource(aux); // set selected items as data to render when searchBar is empty
      setSelectedItems(aux); // set selected items
      if (allDataGettingIn.length < 1) {
        // if all items data is empty
        setAllDataGettingIn(data); // set data provide by parent component
      }
    }
    if (!isVisible) {
      // on close as modal
      setDataSource([]); // clean renderer items state
      setSearch(""); // reset searchBar
    }
    return () => {
      setDataSource([]); // clear renderer items state
    };
  }, [isVisible]);

  const save = async () => {
    let newUsersAux: searchSingleItemProps[] = data; // data provide by parent component
    let diference = []; // initializing empty array that may contain the differences between old data and new selected items data
    // append items
    if (data.length < selectedItems.length && data.length > 0) {
      const fullUsersIds = await new Set(data.map((d) => d[keyOfCheck])); // array of items id's on parent data
      diference = await selectedItems.filter(
        (d) => !fullUsersIds.has(d[keyOfCheck])
      ); // get items that not been on parent data

      // if there have new items
      if (
        selectedItems.length > 0 &&
        (diference.length > 0 || data.length < selectedItems.length)
      ) {
        newUsersAux = await selectedItems.map((item) => {
          const { isSelect, ...newItem } = item; // remove select var on each item
          return newItem;
        });
      }
    } else if (data.length > selectedItems.length && selectedItems.length > 0) {
      // extract items
      if (selectedItems.length === new Set(selectedItems).size) {
        // if not exist duplicates
        newUsersAux = selectedItems; //set selected items
      } else {
        const uniqueEntries = [...new Set(selectedItems)]; // clear duplicates
        newUsersAux = uniqueEntries; // set new items
      }
    } else {
      newUsersAux = selectedItems; //set selected items
    }
    onReady({ items: newUsersAux }); // send items to onReady params
  };

  // components
  const RenderFooter = () => {
    return (
      <>
        {isLoading && <ActivityIndicator size="large" color={$color.warning} />}
      </>
    );
  };

  const RenderEmpty = () => {
    return (
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={$color.warning} />
          ) : (
            <Text
              style={{
                paddingHorizontal: 12,
                textAlign: "center",
                color: "white",
                fontSize: 18,
                backgroundColor: "#333333b3",
                paddingVertical: 6,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              {"Nada que mostrar"}
            </Text>
          )}
        </View>
      </>
    );
  };

  // change item state
  const changeItemSelectState = async (
    item: searchSingleSelectedItemProps,
    index: number
  ) => {
    // set lock of ready function
    await setLoadingNewValue(true);
    // define new item state
    const newSelectStatus = !item.isSelect;
    // declaring aux variable
    let dataSourceAux = dataSource;
    if (selectType === "multiselect" || selectType === "multiDeselect") {
      if (newSelectStatus) {
        const selectedItemAux = [...selectedItems, item]; // append to selectedItems array
        setSelectedItems(selectedItemAux); // set new selectedItems
      } else {
        // generate new array without selected item
        const newSelectedItems = selectedItems.filter(
          (data) => item[keyOfCheck] !== data[keyOfCheck]
        );
        if (newSelectedItems.length === selectedItems.length - 1) {
          setSelectedItems(newSelectedItems); // set new selectedItems
        }
      }
    } else if (selectType === "select") {
      if (newSelectStatus) {
        setSelectedItems([item]); // set new selectedItems
      } else {
        setSelectedItems([]);
      }
      dataSourceAux = dataSourceAux.map((dataSourceItem) => ({
        ...dataSourceItem,
        isSelect: false,
      }));
    }

    dataSourceAux[index].isSelect = newSelectStatus; // change state of item in renderer items array
    setDataSource(dataSourceAux); // set new renderer items

    // set unlock of ready function
    await setLoadingNewValue(false);
  };

  return (
    <FlatList
      data={dataSource}
      renderItem={({ item, index }) => (
        <RenderItem
          item={item}
          index={index}
          onSelect={
            selectType === "multiselect" ||
            selectType === "multiDeselect" ||
            selectType === "select"
              ? () => changeItemSelectState(item, index)
              : undefined
          }
          deselect={selectType === "multiDeselect"}
        />
      )}
      keyExtractor={keyExtractor}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <View
          style={{
            backgroundColor: "white",
            borderBottomColor: "#33333340",
            borderBottomWidth: 1,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            shadowColor: "#333",
            shadowOffset: {
              width: 4,
              height: 2,
            },
            shadowOpacity: 0.6,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <SearchBar
            placeholder="Buscar"
            platform="default"
            value={search}
            onChangeText={handelSearch}
            containerStyle={{
              backgroundColor: "white",
              borderColor: "none",
              shadowColor: "none",
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: "#33333322",
            }}
            lightTheme
            round
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            {SearchToolbar && (
              <View style={{ flex: 4, flexDirection: "row" }}>
                {SearchToolbar({ items: selectedItems })}
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Button
                title="Listo"
                contentType="clean"
                containerStyle={{
                  borderRadius: 8,
                }}
                loading={isLoadingNewValue}
                disabled={isLoadingNewValue}
                onPress={() => save()}
              />
            </View>
          </View>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      ListHeaderComponentStyle={{ marginBottom: 8 }}
      ListFooterComponent={RenderFooter}
      ListFooterComponentStyle={{ marginTop: 12 }}
      ListEmptyComponent={RenderEmpty}
      contentContainerStyle={{ flexGrow: 1 }}
      extraData={{ dataSource, isLoading }}
      // Performance settings
      removeClippedSubviews={true}
      initialNumToRender={7}
      maxToRenderPerBatch={3}
      updateCellsBatchingPeriod={100}
      windowSize={7}
    />
  );
};

export default Search;
