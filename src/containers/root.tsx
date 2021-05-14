import React, { useState } from "react";
import Form from "../components/Form/Form";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { ISheep } from "../components/Sheep/ISheep";
import { SHEEP_NAMES, GENDERS } from "../components/constants/constants";
import {
  getRandomId,
  getRandomIndex,
  getFiftyFiftyChance
} from "../utils/random";

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

  const getSheepColor = (sheep: ISheep): string => {
    if (sheep.branded) return "bg-success";
    if (sheep.gender === "female") return "bg-danger";
    return "bg-primary";
  };

  const getSheep = (id: number): ISheep => {
    const unbrandedSheepArray = getUnbrandedSheep();
    const sheepIndex = unbrandedSheepArray.findIndex(sheep => sheep.id === id);
    return unbrandedSheepArray[sheepIndex];
  };

  const canReproduce = (
    firstSheepGender: string,
    secondSheepGender: string
  ): boolean => {
    return firstSheepGender !== secondSheepGender;
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
    const unbrandedSheep = getUnbrandedSheep();

    if (!unbrandedSheep || unbrandedSheep.length === 0) {
      setDisplayError(true);
      setErrorMessage("There are no sheep that can be branded.");
      return;
    }

    const idToUpdate = getRandomId(unbrandedSheep);
    updateSheep(idToUpdate);
  };

  const spawnSheep = () => {
    const name = SHEEP_NAMES[getRandomIndex(SHEEP_NAMES)];
    const gender = GENDERS[getRandomIndex(GENDERS)];

    updateArray(name, gender, false);
  };

  const breedSheep = (): void => {
    resetErrors();
    const unbrandedSheep = getUnbrandedSheep();
    const firstSheepId = getRandomId(unbrandedSheep);
    const secondSheepId = getRandomId(
      unbrandedSheep.filter(sheep => sheep.id !== firstSheepId)
    );

    const firstSheep = getSheep(firstSheepId);
    const secondSheep = getSheep(secondSheepId);

    if (!canReproduce(firstSheep.gender, secondSheep.gender)) {
      setDisplayError(true);
      setErrorMessage(
        "The two sheep had fun, but two sheep of the same gender can't reproduce."
      );
      return;
    }

    if (!getFiftyFiftyChance()) {
      setDisplayError(true);
      setErrorMessage(
        "The two sheep tried to reproduce, but were not successful. Better luck next time!"
      );
      return;
    }

    spawnSheep();
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
