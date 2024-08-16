import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Item = ({ children }: props) => {
  return <div>{children}</div>;
};

export default Item;
