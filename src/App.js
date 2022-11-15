// import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingPic, setIngPic] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [value, setValue] = useState("");
  // const [status, setStatus] = useState("");

  const formValidation = (formValue) => {
    if (!formValue) {
      return false;
    }
    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formValidation(event.target.ingredient.value)) {
      setIngredient(event.target.ingredient.value);
    } else {
      return;
    }
  };

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  // console.log(ingredient);
  useEffect(() => {
    if (ingredient !== "") {
      axios
        .get(`http://localhost:8080/ingredients/${ingredient}`)
        .then((response) => {
          setApiResponse(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [ingredient]);

  useEffect(() => {
    if (ingredient !== "") {
      axios
        .get(
          `https://api.unsplash.com/photos/random/?query=${ingredient}&client_id=j7R8iAliFC_AlYcVyunt2WVivOGuiYQHhevmoK91IhA`
        )
        .then((response) => {
          setIngPic(response.data.urls.regular);
        })
        .catch((error) => console.log(error));
    }
  }, [ingredient]);

  return (
    <div className="App">
      <h1 className="App__title">Ingredient Checker App</h1>
      <form className="form" onSubmit={submitHandler}>
        <label className="form__label" htmlFor="ingredient">
          Check your ingredient
        </label>
        <input
          className="form__input"
          onChange={inputChangeHandler}
          value={value}
          type="text"
          id="ingredient"
          name="ingredient"
          placeholder="Enter an ingredient"
        ></input>
        <button className="form__button" type="submit">
          Submit
        </button>
      </form>
      {apiResponse && (
        <>
          {apiResponse.includes("not") ? (
            <>
              <span className="ingredient__response--not">{apiResponse}</span>
              <img
                className="ingredient__img--not"
                src={ingPic}
                alt={ingredient}
              ></img>
            </>
          ) : (
            <>
              <span className="ingredient__response">{apiResponse}</span>

              <img
                className="ingredient__img"
                src={ingPic}
                alt={ingredient}
              ></img>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
