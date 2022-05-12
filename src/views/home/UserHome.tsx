import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ApplicationProps } from "@/types";
import { $http } from "@libs/axios";
import UserApplicationList from "./components/UserApplicationList";
import NavigationMenu from "@core/navigation/NavigationMenu";
import { UserNavigation } from "@/navigation";

const ResumenSolicitudes: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationProps[]>();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);

  const getApplications = async () => {
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
        "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm1"
      ); //URL_AXIOS
      setApplications(data.reverse());
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getApplications();
    }
  }, [isFocused]);

  return (
    <>
      {/* <Notification /> */}
      {/* <InformationRequest text={'Hola Usuario'}></InformationRequest> */}
      <NavigationMenu navigationList={UserNavigation} />
      <UserApplicationList
        applicationsList={applications}
        isLoading={isLoading}
      />
    </>
  );
};

export default ResumenSolicitudes;
