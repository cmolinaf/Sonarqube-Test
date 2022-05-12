import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import ListData from "@core/chart/ListData";
import { chartListTypes } from "@core/types/chartsTypes";
import { $http } from "@libs/axios";
import NavigationMenu from "@core/navigation/NavigationMenu";
import { AdminNavigation } from "@/navigation";

const AdminHome: React.FC = () => {
  const isFocused = useIsFocused();
  const [resumeList, setResumeList] = useState<chartListTypes[] | null>(null);
  const [isLoadingResume, setLoadingResume] = useState(true);

  const getResume = async () => {
    try {
      setLoadingResume(true);
      const { data }: { data: chartListTypes[] } = await $http.get(
        "https://cmp.grupoavanza.com/api/sac/dev.php?a=asm3"
      ); //URL_AXIOS
      const storedData = data;
      setResumeList(storedData);
      setLoadingResume(false);
    } catch (err: unknown) {
      console.error(err);
      setLoadingResume(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getResume();
    }
  }, [isFocused]);

  return (
    <>
      {/* <Background /> */}
      {/* <InformationRequest
        text={'Usted esta actualmente en el modo Administrador'}
      /> */}
      <NavigationMenu navigationList={AdminNavigation} />
      <ListData items={resumeList} isLoading={isLoadingResume} />
    </>
  );
};

export default AdminHome;
