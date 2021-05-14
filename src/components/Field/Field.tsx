import * as React from "react";
import { useRef, useEffect } from "react";
import { ISheep } from "../Sheep/ISheep";
import sheepmale from "../../assets/images/sheepmale.png";
import sheepfemale from "../../assets/images/sheepfemale.png";
import sheepmale_branded from "../../assets/images/sheepmale_branded.png";
import sheepfemale_branded from "../../assets/images/sheepfemale_branded.png";

interface IFieldProps {
  data: Array<ISheep>;
}

const Field: React.FunctionComponent<IFieldProps> = ({ data}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const style = {
    background: "green"
  };

  const getImgSource = (branded: boolean, gender: string): string => {
    if (branded && gender === "male") return sheepmale_branded;
    if (branded && gender === "female") return sheepfemale_branded;
    if (gender === "male") return sheepmale;
    return sheepfemale;
  };

  const drawSheep = (context: CanvasRenderingContext2D) => {
    data.forEach((sheep) => {
      context.font = "20px Arial, sans-serif";
      context.fillStyle = "white";
      context.textAlign = "center";

      const img = new Image();
      img.src = getImgSource(sheep.branded, sheep.gender);
      context.fillText(sheep.name, sheep.x, sheep.y - 10);
      img.onload = function() {
        context.drawImage(img, sheep.x, sheep.y, 32, 32);
      }
    });
  }

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (context) {
      drawSheep(context)
    }
  }, [drawSheep]);

  return <canvas ref={ref} width="300" height="400" style={style} />;
};

export default Field;
