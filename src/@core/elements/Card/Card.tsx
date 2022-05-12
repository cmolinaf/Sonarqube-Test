import React from "react";
import {
  Card as RNECard,
  CardProps,
  DividerProps,
} from "react-native-elements";

interface Props extends CardProps {
  children: React.ReactNode;
}

const Card: React.FC<Props> & { Divider: React.FC<DividerProps> } = (props) => {
  // eslint-disable-next-line
  const { children, ...cardProps } = props;
  return (
    <RNECard
      {...cardProps}
      containerStyle={[
        {
          paddingHorizontal: 0,
          borderRadius: 16,
          marginBottom: 16,
        },
      ]}
    >
      {children}
    </RNECard>
  );
};

const Divider: React.FC<DividerProps> = (props: DividerProps) => {
  const dividerComponent = (innerProps: DividerProps) => (
    <RNECard.Divider {...innerProps} />
  );
  dividerComponent.name = "DividerItem";
  return dividerComponent(props);
};

Card.Divider = Divider;

export default Card;
