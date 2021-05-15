import * as React from "react";
import { useRef, useEffect } from "react";
import { ISheep } from "../../interfaces/ISheep";
import sheepmale from "../../assets/images/sheepmale.png";
import sheepfemale from "../../assets/images/sheepfemale.png";
import sheepmale_branded from "../../assets/images/sheepmale_branded.png";
import sheepfemale_branded from "../../assets/images/sheepfemale_branded.png";
import "./Field.css";

interface IFieldProps {
  data: Array<ISheep>;
}

const Field: React.FunctionComponent<IFieldProps> = ({ data}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const style = {
    background: "transparent"
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
      context.fillText(sheep.name, sheep.x + 24, sheep.y - 10);
      img.onload = function() {
        context.drawImage(img, sheep.x, sheep.y, 48, 48);
      }
    });
  }

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (context) {
      drawSheep(context)
    }
  }, [drawSheep]);

  return (
      <div className="rounded field-bg d-flex justify-content-center">
        <canvas ref={ref} width="360" height="600" style={style} className="rounded"/>
      </div>
    )
};

export default Field;
