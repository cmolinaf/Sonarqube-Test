import React from "react";
import { getServiceType } from "@const/ServiceType";
import { chartListTypes } from "@core/types/chartsTypes";
import { SubContent } from "@core/elements/Base";
import ItemListData from "./ItemListData";

interface Props {
  title?: string;
  items: chartListTypes[] | null;
  isLoading?: boolean;
}

const ListData: React.FC<Props> = ({ title = "Resumen", items, isLoading }) => {
  const getIcon = (idApplication: string | number) => {
    switch (idApplication) {
      case "1":
        return {
          name: "emoji-transportation",
          type: "material",
          color: "#fff",
        };
      case "2":
        return { name: "payments", type: "material", color: "#fff" };
      case "3":
        return { name: "monetization-on", type: "material", color: "#fff" };
      case "4":
        return { name: "clipboard", type: "feather", color: "#fff" };
      case "5":
        return { name: "school", type: "material", color: "#fff" };
      case "9":
        return { name: "hotel", type: "fontawesome", color: "#fff" };
    }
    return { name: "question", type: "fontawesome5", color: "#fff" };
  };

  return (
    <SubContent
      title={title}
      isLoading={isLoading}
      isChildrenVoid={!!items && items?.length > 0}
    >
      {items &&
        items.map((item, index) => (
          <ItemListData
            key={item.id_solicitud + "Pendiente por Aprobar"}
            avatar={getIcon(item.id_solicitud)}
            title={`${getServiceType(item.id_solicitud)}`}
            subtitle="Pendiente por Aprobar"
            counter={item.total ?? 0}
            marginDivider={index !== items.length - 1}
          />
        ))}
    </SubContent>
  );
};

export default ListData;
