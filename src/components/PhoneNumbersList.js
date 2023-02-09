import React, { useState } from "react";

function PhoneNumbersList(props) {
  const numbers = props.numbers;
  const setNumbers = props.setNumbers;

  const handleAddNumber = () => {
    setNumbers([
      ...numbers,
      {
        id: numbers.length + 1,
        number: ""
      }
    ]);
  };

  const handleChange = (event, index) => {
    const newNumbers = [...numbers];
    newNumbers[index].number = event.target.value;
    setNumbers(newNumbers);
  };

  return (
    <>
      <div className="d-grid">
        {numbers.map((number, index) => (
          <div key={number.id} className="text-center">
            <input
              disabled={props.isNotEdit}
              type="text"
              value={number.number}
              onChange={event => handleChange(event, index)}
              className="form-control mt-1 mb-1"
            />
          </div>
        ))}
        <>
          <button onClick={handleAddNumber} type="button" className="btn btn-primary" hidden={props.isNotEdit}>
            <span>+</span>
          </button>
        </>
      </div>
    </>
  );
};

export default PhoneNumbersList;