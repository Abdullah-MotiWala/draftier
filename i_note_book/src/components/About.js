import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function About() {
  const context = useContext(noteContext);

  return <div>this is about and my name is {context.name}</div>;
}
