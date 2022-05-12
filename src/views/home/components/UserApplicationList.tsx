import React, { useState } from "react";
import { ApplicationProps } from "@/types";
import { SubContent } from "@core/elements/Base";
import DetalleSolicitud from "./DetalleSolicitud";
import UserApplicationItem from "./UserApplicationItem";

interface Props {
  applicationsList: ApplicationProps[] | undefined;
  isLoading?: boolean;
}

const UserApplicationList: React.FC<Props> = ({
  applicationsList,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<ApplicationProps | null>(null);

  const handleOnSelectItem = (item: ApplicationProps) => {
    setItem(item);
  };
  const handleOnCloseModal = () => {
    setItem(null);
  };

  return (
    <SubContent
      title="Solicitudes"
      isLoading={isLoading}
      isChildrenVoid={!!applicationsList && applicationsList.length > 0}
    >
      {applicationsList &&
        applicationsList.map((application, index) => {
          return (
            <UserApplicationItem
              key={`user-item-${application.id_bandeja}-${index}`}
              onPress={() => {
                setShowModal(true);
                handleOnSelectItem(application);
              }}
              marginDivider={applicationsList.length - 1 !== index}
              {...application}
            />
          );
        })}
      <DetalleSolicitud
        application={item}
        visible={showModal}
        showModal={setShowModal}
        onCloseModal={handleOnCloseModal}
      />
    </SubContent>
  );
};

export default UserApplicationList;
