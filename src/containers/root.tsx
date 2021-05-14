import React, { useState } from "react";
import Form from "../components/Form/Form";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { ISheep } from "../components/Sheep/ISheep";

const Root: React.FunctionComponent = () => {
  const [sheepArray, updateSheepArray] = useState<ISheep[]>([]);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateArray = (name: string, gender: string, branded: boolean) => {
    const id: number = sheepArray.length;
    const newSheep: ISheep = { name, gender, branded, id };
    updateSheepArray(sheepArray => [...sheepArray, newSheep]);
  };

  const getUnbrandedSheep = () => {
    return sheepArray.filter(sheep => !sheep.branded);
  };

  const getRandomId = (array: Array<ISheep>): number => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex]["id"];
  };

  const getSheepColor = (sheep: ISheep): string => {
    if (sheep.branded) return "bg-success";
    if (sheep.gender === "female") return "bg-danger";
    return "bg-primary";
  };

  const updateSheep = (id: number): void => {
    const clonedArray: ISheep[] = [...sheepArray];
    const indexToUpdate: number = clonedArray.findIndex(
      sheep => sheep.id === id
    );

    clonedArray[indexToUpdate]["branded"] = true;
    updateSheepArray(clonedArray);
  };

  const resetErrors = (): void => {
    setDisplayError(false);
    setErrorMessage("");
  };

  const brandSheep = (): void => {
    resetErrors();

    if (!getUnbrandedSheep() || getUnbrandedSheep().length === 0) {
      setDisplayError(true);
      setErrorMessage("There are no sheep that can be branded.");
      return;
    }

    const idToUpdate = getRandomId(getUnbrandedSheep());
    updateSheep(idToUpdate);
  };

  const breedSheep = (): void => {
    resetErrors();

    if (!getUnbrandedSheep() || getUnbrandedSheep().length < 2) {
      setDisplayError(true);
      setErrorMessage(
        "There should be at least two unbranded sheep to be able to breed."
      );
      return;
    }

    return;
  };

  return (
    <div className="container">
      <Form updateArray={updateArray} />
      <button
        className="btn btn-success"
        type="button"
        name="button"
        onClick={brandSheep}
      >
        Brand Sheep
      </button>

      <button
        className="btn btn-info"
        type="button"
        name="button"
        onClick={breedSheep}
        disabled={getUnbrandedSheep().length < 2}
      >
        Breed Sheep
      </button>

      {displayError && <ErrorMessage message={errorMessage} />}

      {sheepArray.map((sheep, i) => (
        <div key={i} className={getSheepColor(sheep)}>
          <p>{sheep.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Root;
