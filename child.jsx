import React, { useContext } from "react";
import { UserContext } from "./App";
 
function Child() {
  const user = useContext(UserContext);
 
  return <h2>Hello {user}</h2>;
}
export default Child;