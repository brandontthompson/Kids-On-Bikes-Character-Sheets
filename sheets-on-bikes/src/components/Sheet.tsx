import Tokens from "./Tokens";
import Description from "./Description";
import Skills from "./Skills";
import Notes from "./Notes";
import Stats from "./Stats";
import Backpack from "./Backpack";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { CONSTS } from "../consts";
import { StatsContext } from "../providers/StatsProvider";
import { DescriptionContext } from "../providers/DescriptionProvider";
import { IdContext } from "../providers/IdProvider";
import { TokenContext } from "../providers/TokenProvider";
import { SkillContext } from "../providers/SkillProvider";

interface props {
  sheetId: string;
}

const Sheet = ({ sheetId }: props) => {
  const { setId } = useContext(IdContext);
  const { setStats } = useContext(StatsContext);
  const { setDescription } = useContext(DescriptionContext);
  const { setTokens } = useContext(TokenContext);
  const { setSkills } = useContext(SkillContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    setId(sheetId);

    fetch(CONSTS.url + "sheet/" + sheetId)
      .then((resp) => resp.json())
      .then((res) => {
        const result = res.Value;
        if (res.Error || res.Code != 200) {
          return setError(res.Error);
        }
        setStats(result.stats);
        setDescription(result.description);
        setTokens(result.adversity_tokens);
        setSkills(result.strengths);
      });
  }, []);

  return (
    <>
      {error && <div>{JSON.stringify(error)}</div>}
      {!error && (
        <div className="container border-thick">
          <Header />
          <div className="d-flex justify-content-center ">
            <div className="p-3 container border-thick group">
              <div className="d-flex justify-content-around mb-3">
                <div className="p-2">
                  <Description />
                  <div className="p-3">
                    <Tokens />
                  </div>
                </div>
                <div className="p-2">
                  <Stats />
                </div>
                <div className="p-2">
                  <Backpack />
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="p-2">
                  <Skills />
                </div>
              </div>
            </div>
            <div className="p-3">
              <Notes />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sheet;
