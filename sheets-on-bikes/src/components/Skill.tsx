import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { strength } from "../types/strength";
import { updateSheet } from "../functions/updateSheetCall";
import { IdContext } from "../providers/IdProvider";
import { SkillContext } from "../providers/SkillProvider";

interface props {
  skill: strength;
  selected: boolean;
}

const Skill = ({ skill, selected }: props) => {
  const { id } = useContext(IdContext);
  const { skills, setSkills } = useContext(SkillContext);
  const [checked, setChecked] = useState<boolean>(selected);

  useEffect(() => {
    setChecked(selected);
  });

  const handleUpdate = (value: any) => {
    let a = value.target.checked;
    let s: strength[] = skills;
    if (!a) {
      s = skills.filter((s: strength) => s.label !== skill.label);
    }
    if (a && !skills.find((s: strength) => s.label === skill.label)) {
      s = [...s, skill];
    }
    setSkills(s);
    setChecked((checked) => !checked);
    updateSheet({ object_id: id, changes: { strengths: s } });
  };

  return (
    <Form.Check type="checkbox" id={`check-api-${skill.label}`}>
      <Form.Check.Input
        type="checkbox"
        isValid
        onChange={handleUpdate}
        checked={checked}
      />
      <Form.Check.Label>{`${skill.label.toUpperCase()}`}</Form.Check.Label>
      <Form.Control.Feedback type="valid">
        {skill.description}
      </Form.Control.Feedback>
    </Form.Check>
  );
};

export default Skill;
