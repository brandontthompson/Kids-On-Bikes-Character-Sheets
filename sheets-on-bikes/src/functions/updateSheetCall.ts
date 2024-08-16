import { CONSTS } from "../consts";
import { updateCall } from "../interfaces/updateCall";

export const updateSheet = (data: updateCall) => {
  console.log(data);
  fetch(CONSTS.url + "echo?echo=" + JSON.stringify(data))
    .then((resp) => resp.json())
    .then((res) => console.log(res));

  fetch(CONSTS.url + "sheet/update", {
    method: "PATCH",
    body: JSON.stringify(data),
  }).catch((e) => console.log(e));

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     object_id: "66b702c2a1e25cb2dc4c4c2c",
  //     filters: {
  //       "stats.label": "Fight",
  //     },
  //     changes: {
  //       "stats.$.value": 4,
  //       name: "tessa",
  //     },
  //   });

  //   var requestOptions: RequestInit = {
  //     method: "PATCH",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(CONSTS.url + "sheet/update", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
};
