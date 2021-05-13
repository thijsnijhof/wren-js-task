import React, { useState } from "react";
import { isName } from "../../utils/validator";

interface IState {
  name: string;
  gender: string;
  displayError: boolean;
}

const GENDERS = ["male", "female"];

const Form: React.FunctionComponent = () => {
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

  const onHandleSubmit = () => {
    if (!formState.name || !isName(formState.name)) {
      setFormState({ ...formState, displayError: true } as Pick<
        IState,
        keyof IState
      >);
    }
    // submit form
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
        defaultValue="male"
        name="gender"
        value={formState.gender}
        onChange={onHandleChange}
      >
        {GENDERS.map(gender => (
          <option value={gender}>{gender}</option>
        ))}
      </select>
      <button className="btn btn-primary" type="submit" name="submit">
        Add Sheep
      </button>
    </form>
  );
};

export default Form;
