import { useEffect, useState } from "react";
import "./App.css";
import Sheet from "./components/Sheet";
import { Button } from "react-bootstrap";
import { CONSTS } from "./consts";
import ErrorProvider from "./providers/ErrorProvider";
import Error from "./components/Error";
import StatsProvider from "./providers/StatsProvider";
import DescriptionProvider from "./providers/DescriptionProvider";
import IdProvider from "./providers/IdProvider";
import TokenProvider from "./providers/TokenProvider";
import SkillProvider from "./providers/SkillProvider";

function App() {
  const [sheetId, setSheetId] = useState<string>("");

  const [error, setError] = useState();

  const handleCreate = () => {
    fetch(CONSTS.url + "sheet/create", { method: "POST" })
      .then((resp) => resp.json())
      .then((res) => {
        if (!res || res.Error || res.Code != 200) setError(res.Error);
        setSheetId(res.Value);
        window.location.pathname = "/" + res.Value;
      });
  };

  useEffect(() => {
    const sId = sheetId || window.location.pathname.split("/")[1];
    setSheetId(sId);
  }, []);

  return (
    <div>
      <ErrorProvider>
        {error && <Error />}
        {!sheetId && (
          <Button onClick={() => handleCreate()}> Create Sheet </Button>
        )}
        <IdProvider>
          <SkillProvider>
            <TokenProvider>
              <DescriptionProvider>
                <StatsProvider>
                  {sheetId && <Sheet sheetId={sheetId} />}
                </StatsProvider>
              </DescriptionProvider>
            </TokenProvider>
          </SkillProvider>
        </IdProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
