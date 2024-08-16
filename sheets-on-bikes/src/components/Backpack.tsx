import { item } from "../types/item";

const Backpack = () => {
  const items: item[] = [{ label: "test", description: "test desc" }];

  return (
    <div>
      {items.map((item) => (
        <div key={item.label}>{item.label}</div>
      ))}
    </div>
  );
};

export default Backpack;
