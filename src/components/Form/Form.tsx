import React, { useState } from "react";
import { isName } from "../../utils/validator";

interface IState {
  name: string;
  gender: string;
  displayError: boolean;
}

interface IFormProps {
  updateArray: (name: string, gender: string, branded: boolean) => void;
}

const GENDERS = ["male", "female"];

const Form: React.FunctionComponent<IFormProps> = ({ updateArray }) => {
  const [formState, setFormState] = useState<IState>({
    name: "",
    gender: "",
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
    console.log(isName(formState.name));
    if (!formState.name || !isName(formState.name)) {
      setFormState({ ...formState, displayError: true });
      return;
    }
    // submit form
    updateArray(formState.name, formState.gender, false);
    setFormState({ name: "", gender: "", displayError: false });
  };

  return (
    <form className="input-group" onSubmit={onHandleSubmit}>
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
        <div className="invalid-feedback">Please enter a valid name.</div>
      )}

      <select
        className="form-select"
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
      <button className="btn btn-primary" type="submit" name="submit">
        Add Sheep
      </button>
    </form>
  );
};

export default Form;
