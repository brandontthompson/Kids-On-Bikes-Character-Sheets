import { useContext } from "react";
import Descriptor from "./Descriptor";
import { DescriptionContext } from "../providers/DescriptionProvider";

const Description = () => {
  const { description } = useContext(DescriptionContext);

  return (
    <div className="group border-thin">
      <Descriptor defaultValue={description?.name}>Name:</Descriptor>
      <Descriptor defaultValue={description?.age} type="number">
        Age:
      </Descriptor>
      <Descriptor defaultValue={description?.fear}>Fear:</Descriptor>
      <Descriptor defaultValue={description?.motivation}>
        Motivation:
      </Descriptor>
      <Descriptor defaultValue={description?.flaws}>Flaws:</Descriptor>
      <Descriptor defaultValue={description?.description} type="textarea">
        Description:
      </Descriptor>
    </div>
  );
};

export default Description;
