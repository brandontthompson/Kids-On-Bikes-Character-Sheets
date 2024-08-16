import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { strength } from "../types/strength";
import { ErrorContext } from "../providers/ErrorProvider";
import Skill from "./Skill";
import { SkillContext } from "../providers/SkillProvider";

const containsSkill = (str: strength, skills: strength[]): boolean => {
  console.log(skills.some((s: strength) => s.label === str.label));
  return skills.some((s: strength) => s.label === str.label);
};

const Skills = () => {
  const [skillData, setSkillData] = useState<strength[]>([]);
  const { skills } = useContext(SkillContext);
  // const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    fetch("http://192.168.95.128:3030/template/66b7d388505a7b41b54f9dc5")
      .then((response) => response.json())
      .then((json) => {
        setSkillData(json.Value.strengths);
      });

    // .catch((error) => setError(error));
  }, []);

  return (
    <div className="d-flex justify-content-start mb-2 p-2 flex-next">
      {skillData.map((strength: strength) => (
        <div key={strength.label} className="mb-3 mw-290">
          <Skill skill={strength} selected={containsSkill(strength, skills)} />
        </div>
      ))}
    </div>
  );
};

export default Skills;
