import React, { ReactNode, useContext, useState } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import SplitButton from "react-bootstrap/esm/SplitButton";
import { statData } from "../types/stat";
import { updateSheet } from "../functions/updateSheetCall";
import { IdContext } from "../providers/IdProvider";
import Card from "react-bootstrap/esm/Card";
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

interface props {
  statData: statData;
  index: number;
}

const Stat = ({ statData, index }: props) => {
  const { id } = useContext(IdContext);

  const [buttonState, setButtonState] = useState<statData>(statData);

  const setButton = (bstate: statData) => {
    updateSheet({
      object_id: id,
      filters: { "stats.label": bstate.label },
      changes: { "stats.$.value": bstate.value },
    });
    setButtonState(bstate);
  };

  const offsetClass: boolean = index % 2 === 0 ? false : true; //"round-left" : "round-right";
  return (
    <div className={`mb-2 ${offsetClass}`}>
      <Card.Body>
        <Card.Title>{statData.label}</Card.Title>
        <Dropdown as={ButtonGroup}>
          <Button
            className={`button-square button-53 ${
              offsetClass ? "button-53-posDeg" : ""
            }`}
          >
            {buttonState.value}
          </Button>
          <DropdownToggle
            split
            // className="button-square button-53"
            id={buttonState.label}
          />
          <Dropdown.Menu>
            {/* <SplitButton
            key={buttonState.label}
            id={`dropdown-split-variants-${buttonState.label}`}
            title={`${buttonState.value}`}
            className={`button-square button-53 ${
              offsetClass ? "button-53-posDeg" : ""
            }`}
            variant=""
          > */}
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 4 })}
              eventKey="4"
            >
              d4
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 6 })}
              eventKey="6"
            >
              d6
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 8 })}
              eventKey="8"
            >
              d8
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 10 })}
              eventKey="10"
            >
              d10
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 12 })}
              eventKey="12"
            >
              d12
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => setButton({ label: statData.label, value: 20 })}
              eventKey="20"
            >
              d20
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* </SplitButton> */}
      </Card.Body>
    </div>
    // <div className={`mb-2 ${offsetClass}`}>
    //   <p>{statData.label}</p>
    //   <SplitButton
    //     key={buttonState.label}
    //     id={`dropdown-split-variants-${buttonState.label}`}
    //     title={`d${buttonState.value}`}
    //     className="button-square"
    //     variant=""
    //   >
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 4 })}
    //       eventKey="4"
    //     >
    //       d4
    //     </Dropdown.Item>
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 6 })}
    //       eventKey="6"
    //     >
    //       d6
    //     </Dropdown.Item>
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 8 })}
    //       eventKey="8"
    //     >
    //       d8
    //     </Dropdown.Item>
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 10 })}
    //       eventKey="10"
    //     >
    //       d10
    //     </Dropdown.Item>
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 12 })}
    //       eventKey="12"
    //     >
    //       d12
    //     </Dropdown.Item>
    //     <Dropdown.Item
    //       onClick={(e) => setButton({ label: statData.label, value: 20 })}
    //       eventKey="20"
    //     >
    //       d20
    //     </Dropdown.Item>
    //   </SplitButton>
    // </div>
  );
};

export default Stat;
