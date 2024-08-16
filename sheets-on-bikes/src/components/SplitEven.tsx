interface props {
  index: number;
}

const SplitEven = ({ index }: props) => {
  if (index % 2 === 1) return <div className="spacer"></div>;
  return <></>;
};

export default SplitEven;
