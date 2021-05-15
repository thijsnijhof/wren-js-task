import React, { useState } from "react";
import Form from "../components/Form/Form";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { ISheep } from "../components/Sheep/ISheep";
import { SHEEP_NAMES, GENDERS } from "../components/constants/constants";
import {
  getRandomId,
  getRandomIndex,
  getFiftyFiftyChance,
  getRandomCoord
} from "../utils/random";
import Field from "../components/Field/Field";
import "./root.css";
import sheepmale from "../assets/images/sheepmale.png";

const Root: React.FunctionComponent = () => {
  const [sheepArray, updateSheepArray] = useState<ISheep[]>([]);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateArray = (
    name: string,
    gender: string,
    branded: boolean,
    x: number,
    y: number
  ) => {
    const id: number = sheepArray.length;
    const newSheep: ISheep = { name, gender, branded, id, x, y };
    updateSheepArray(sheepArray => [...sheepArray, newSheep]);
  };

  const getUnbrandedSheep = () => {
    return sheepArray.filter(sheep => !sheep.branded);
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
    const x = getRandomCoord(300);
    const y = getRandomCoord(400);
    updateArray(name, gender, false, x, y);
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
    <div className="container-fluid bg-transparent">
      <div className="row mt-4">
        <div className="col-md-4 mb-4 mb-sm-4 mb-md-0 mb-lg-0 d-flex flex-column">
          <div className="card mb-2 border-brown rounded">
            <div className="card-body bg-brown">
              <div className="d-flex">
                <img
                  className="mr-4"
                  src={sheepmale}
                  alt="male sheep"
                  style={{ height: 22, width: 22 }}
                />
                <h5 className="card-title text-uppercase text-white mb-0">
                  Sheep Breeder
                </h5>
              </div>
            </div>
          </div>
          <div className="card flex-grow-1 bg-green">
            <div className="card-body">
              <Form
                updateArray={updateArray}
                breedSheep={breedSheep}
                brandSheep={brandSheep}
                breedDisabled={getUnbrandedSheep().length < 2}
                brandDisabled={getUnbrandedSheep().length === 0}
              />
              {displayError && <ErrorMessage message={errorMessage} />}
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-6">
          <Field data={sheepArray} />
        </div>
      </div>
    </div>
  );
};

export default Root;
