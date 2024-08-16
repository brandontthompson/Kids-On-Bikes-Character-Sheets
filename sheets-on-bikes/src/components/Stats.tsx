import { useContext, useEffect } from "react";
import { statData } from "../types/stat";
import Stat from "./Stat";
import { StatsContext } from "../providers/StatsProvider";

const Stats = () => {
  const { stats } = useContext(StatsContext);

  return (
    <div className="stat-container text-center">
      <div className="flex-next">
        {stats?.map((stat: statData, index: number) => (
          <div key={stat.label}>
            <Stat statData={stat} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
