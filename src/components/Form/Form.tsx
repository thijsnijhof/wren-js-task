/*
 * Form component that allows you to do the following:
 * Add a sheep name
 * Select sheep gender
 * Add a new sheep to the field
 * Brand a random sheep
 * Breed two random opposite sex sheep
 * Displays error message on invalid name
 */
import React, { useState } from "react";
import Message from "../Message/Message";
import { isName } from "../../utils/validator";
import { getRandomCoord } from "../../utils/random";
import { GENDERS } from "../constants/constants";
import "./Form.css";
import sheepmale from "../../assets/images/sheepmale.png";
import heart from "../../assets/images/heart.png";
import bucket from "../../assets/images/bucket.png";

interface IState {
  name: string;
  gender: string;
  displayError: boolean;
}

interface IFormProps {
  updateArray: (
    name: string,
    gender: string,
    branded: boolean,
    x: number,
    y: number
  ) => void;
  breedSheep: () => void;
  brandSheep: () => void;
  brandDisabled: boolean;
  breedDisabled: boolean;
}

const Form: React.FunctionComponent<IFormProps> = ({
  updateArray,
  breedSheep,
  brandSheep,
  brandDisabled,
  breedDisabled
}) => {
  const [formState, setFormState] = useState<IState>({
    name: "",
    gender: "male",
    displayError: false
  });

  const onHandleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const onHandleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const name = formState.name ? formState.name.trim() : "";

    if (!name || !isName(name)) {
      setFormState({ ...formState, displayError: true });
      return;
    }

    const x = getRandomCoord(300);
    const y = getRandomCoord(400);

    updateArray(name, formState.gender, false, x, y);

    setFormState({ name: "", gender: formState.gender, displayError: false });
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div className="form-group">
        <label htmlFor="gender" className="text-white text-bg">
          Enter a name for your sheep
        </label>
        <input
          type="text"
          className="form-control input-custom"
          placeholder="Sheep name"
          aria-label="Sheep name with a select element for gender options and a submit button"
          name="name"
          value={formState.name}
          onChange={onHandleChange}
          maxLength={20}
        />

        {formState.displayError && (
          <Message type="error" message="Please enter a valid name." />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender" className="text-white text-bg">
          Select a gender
        </label>
        <select
          className="form-control text-capitalize input-custom"
          aria-label="Select sheep gender"
          name="gender"
          value={formState.gender}
          onChange={onHandleChange}
        >
          {GENDERS.map((gender, i) => (
            <option className="text-capitalize" key={i} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <div aria-label="Form Submit button group">
        <button
          className="btn btn-success mr-1 mb-1 btn-block btn-custom"
          type="submit"
          name="submit"
        >
          <i
            className="icon-image"
            style={{
              backgroundImage: `url(${sheepmale})`
            }}
          />
          Add Sheep
        </button>

        <button
          className="btn btn-success mr-1 mb-1 btn-block btn-custom"
          type="button"
          name="button"
          onClick={brandSheep}
          disabled={brandDisabled}
        >
          <i
            className="icon-image"
            style={{
              backgroundImage: `url(${bucket})`
            }}
          />
          Brand Sheep
        </button>

        <button
          className="btn btn-success mb-1 btn-block btn-custom"
          type="button"
          name="button"
          onClick={breedSheep}
          disabled={breedDisabled}
        >
          <i
            className="icon-image"
            style={{
              backgroundImage: `url(${heart})`
            }}
          />
          Breed Sheep
        </button>
      </div>
    </form>
  );
};

export default Form;
