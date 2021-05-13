import React, { useState } from "react";
import Form from "../components/Form/Form";
import { Sheep } from "../components/Sheep/SheepType";

const Root: React.FunctionComponent = () => {
  const [sheepArray, updateSheepArray] = useState<Sheep[]>([]);

  const updateArray = (name: string, gender: string, branded: boolean) => {
    const newSheep: Sheep = { name, gender, branded };
    updateSheepArray(sheepArray => [...sheepArray, newSheep]);
  };

  return (
    <div className="container">
      <Form updateArray={updateArray} />
      {sheepArray.map((sheep, i) => (
        <div
          key={i}
          className={sheep.gender === "female" ? "bg-danger" : "bg-primary"}
        >
          <p>{sheep.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Root;
