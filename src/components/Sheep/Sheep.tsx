import React from "react";
import { ISheep } from "./ISheep";
import sheepmale from "../../assets/images/sheepmale.png";
import sheepfemale from "../../assets/images/sheepfemale.png";
import sheepmale_branded from "../../assets/images/sheepmale_branded.png";
import sheepfemale_branded from "../../assets/images/sheepfemale_branded.png";

const Sheep: React.FunctionComponent<ISheep> = ({
  gender,
  name,
  branded,
  id
}) => {
  // const getSheepColor = (branded: boolean, gender: string): string => {
  //   if (branded) return "bg-success";
  //   if (gender === "female") return "bg-danger";
  //   return "bg-primary";
  // };

  const getImgSource = (): string => {
    if (branded && gender === "male") return sheepmale_branded;
    if (branded && gender === "female") return sheepfemale_branded;
    if (gender === "male") return sheepmale;
    return sheepfemale;
  };

  return (
    <img ref={`${id}`} src={getImgSource()} alt={`sheep-${name}`} />
    // <p className={getSheepColor(branded, gender)}>
    //   {gender}
    //   {name}
    //   {branded}
    //   {id}
    // </p>
  );
};

export default Sheep;
