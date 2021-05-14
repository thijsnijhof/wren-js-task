// import React from "react";
// import { ISheep } from "./ISheep";
// import sheepmale from "../../assets/images/sheepmale.png";
// import sheepfemale from "../../assets/images/sheepfemale.png";
// import sheepmale_branded from "../../assets/images/sheepmale_branded.png";
// import sheepfemale_branded from "../../assets/images/sheepfemale_branded.png";
//
// const Sheep: React.FunctionComponent<ISheep> = ({
//   gender,
//   name,
//   branded,
//   id
// }) => {
//   const getImgSource = (): string => {
//     if (branded && gender === "male") return sheepmale_branded;
//     if (branded && gender === "female") return sheepfemale_branded;
//     if (gender === "male") return sheepmale;
//     return sheepfemale;
//   };
//
//   return <img id={`${id}`} src={getImgSource()} alt={`sheep-${name}`} />;
// };
//
// export default Sheep;
