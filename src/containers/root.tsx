/*
 * Entry component of the app that adheres to the following business logic:
 * Adds a new sheep to the field based on the selection of the form (name + gender)
 *
 * Allows the user to brand a sheep on the field when there are unbranded sheep on the field
 * Disables the "Brand a sheep" button when: all sheep are branded || there are no sheep on the field
 * Disables the "Breed a sheep" button when: there are no sheep of the opposite sex on the field || only one sheep is on the field
 * Branding a sheep colors a random unbranded sheep green by updating the "branded" property on the object.
 *
 * When two sheep of opposite sex are on the field, and are unbranded, the user can breed sheep.
 * This has a 50% chance of spawning a new sheep with a random name and a random gender
 * On a successful spawn, a success message is displayed with the male sheeps' name, the female sheeps' name, and the new sheeps' name.
 * On an unsuccessful spawn, an error message is displayed with the male sheeps' name, the female sheeps' name.
 */
import React, { useState } from "react";
import Form from "../components/Form/Form";
import Message from "../components/Message/Message";
import Field from "../components/Field/Field";
import { ISheep } from "../interfaces/ISheep";
import { SHEEP_NAMES, GENDERS } from "../components/constants/constants";
import {
  getRandomId,
  getRandomIndex,
  getFiftyFiftyChance,
  getRandomCoord
} from "../utils/random";
import "./root.css";
import sheepmale from "../assets/images/sheepmale.png";

const Root: React.FunctionComponent = () => {
  const [sheepArray, updateSheepArray] = useState<ISheep[]>([]);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const updateArray = (
    name: string,
    gender: string,
    branded: boolean,
    x: number,
    y: number
  ): void => {
    const id: number = sheepArray.length;
    const newSheep: ISheep = { name, gender, branded, id, x, y };
    updateSheepArray(sheepArray => [...sheepArray, newSheep]);
  };

  const getUnbrandedSheep = (): ISheep[] => {
    return sheepArray.filter(sheep => !sheep.branded);
  };

  const getUnbrandedMaleSheep = (): ISheep[] => {
    return sheepArray.filter(
      sheep => !sheep.branded && sheep.gender === "male"
    );
  };

  const getUnbrandedFemaleSheep = (): ISheep[] => {
    return sheepArray.filter(
      sheep => !sheep.branded && sheep.gender === "female"
    );
  };

  const getSheep = (id: number): ISheep => {
    const unbrandedSheepArray = getUnbrandedSheep();
    const sheepIndex = unbrandedSheepArray.findIndex(sheep => sheep.id === id);
    return unbrandedSheepArray[sheepIndex];
  };

  const updateSheep = (id: number): void => {
    const clonedArray: ISheep[] = [...sheepArray];
    const indexToUpdate: number = clonedArray.findIndex(
      sheep => sheep.id === id
    );

    clonedArray[indexToUpdate]["branded"] = true;
    updateSheepArray(clonedArray);
  };

  const resetMessages = (): void => {
    setDisplayError(false);
    setErrorMessage("");
    setDisplaySuccess(false);
    setSuccessMessage("");
  };

  const brandSheep = (): void => {
    resetMessages();
    const unbrandedSheep = getUnbrandedSheep();

    if (!unbrandedSheep || unbrandedSheep.length === 0) {
      setDisplayError(true);
      setErrorMessage("There are no sheep that can be branded.");
      return;
    }

    const idToUpdate = getRandomId(unbrandedSheep);
    updateSheep(idToUpdate);
  };

  const spawnSheep = (
    firstSheepName: string,
    secondSheepName: string
  ): void => {
    const name = SHEEP_NAMES[getRandomIndex(SHEEP_NAMES)];
    const gender = GENDERS[getRandomIndex(GENDERS)];
    const x = getRandomCoord(300);
    const y = getRandomCoord(400);

    setDisplaySuccess(true);
    setSuccessMessage(
      `${firstSheepName} and ${secondSheepName} created a new sheep called ${name}!`
    );

    updateArray(name, gender, false, x, y);
  };

  const breedSheep = (): void => {
    resetMessages();
    const unbrandedMaleSheep = getUnbrandedMaleSheep();
    const unbrandedFemaleSheep = getUnbrandedFemaleSheep();

    const firstSheep = getSheep(getRandomId(unbrandedMaleSheep));
    const secondSheep = getSheep(getRandomId(unbrandedFemaleSheep));

    if (!getFiftyFiftyChance()) {
      setDisplayError(true);
      setErrorMessage(
        `${firstSheep.name} and ${
          secondSheep.name
        } tried to reproduce, but were not successful. Better luck next time!`
      );
      return;
    }

    spawnSheep(firstSheep.name, secondSheep.name);
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
                breedDisabled={
                  getUnbrandedFemaleSheep().length < 1 ||
                  getUnbrandedMaleSheep().length < 1
                }
                brandDisabled={getUnbrandedSheep().length === 0}
              />

              {displayError && <Message type="error" message={errorMessage} />}

              {displaySuccess && (
                <Message type="success" message={successMessage} />
              )}
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
