import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { isName } from "../../utils/validator";
import { GENDERS } from "../constants/constants";
import { getRandomCoord } from "../../utils/random";

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
        <input
          type="text"
          className="form-control"
          placeholder="Sheep name"
          aria-label="Sheep name with a select element for gender options and a submit button"
          name="name"
          value={formState.name}
          onChange={onHandleChange}
        />

        {formState.displayError && (
          <ErrorMessage message="Please enter a valid name." />
        )}
      </div>

      <div className="form-group">
        <select
          className="form-control"
          aria-label="Select sheep gender"
          name="gender"
          value={formState.gender}
          onChange={onHandleChange}
        >
          {GENDERS.map((gender, i) => (
            <option key={i} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <div aria-label="Form Submit button group">
        <button
          className="btn btn-primary mr-1 mb-1"
          type="submit"
          name="submit"
        >
          Add Sheep
        </button>

        <button
          className="btn btn-success mr-1 mb-1"
          type="button"
          name="button"
          onClick={brandSheep}
          disabled={brandDisabled}
        >
          Brand Sheep
        </button>

        <button
          className="btn btn-info mb-1"
          type="button"
          name="button"
          onClick={breedSheep}
          disabled={breedDisabled}
        >
          Breed Sheep
        </button>
      </div>
    </form>
  );
};

export default Form;
