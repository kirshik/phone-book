import { useState } from "react";
import { FILTER_BTN_STYLE } from "../globals";
function PhotoFilter(props) {
  const { handleFilterClick, show, filter: selectedOption } = props;

  const filterBtnStyle = FILTER_BTN_STYLE;

  const options = {
    1: "original",
    2: "gray",
    3: "blur",
    4: "saturate"
  }

  const handleClick = (e) => {
    handleFilterClick(e.target.name);
  }
  const buttons = Object.values(options).map((option, index) => {
    return (
      <button className={filterBtnStyle + ` ${selectedOption === option ? 'active-filter' : ''}`}
        type="button" name={option} onClick={handleClick} key={index}>
        {option[0].toUpperCase() + option.slice(1)}
      </button>
    )
  });

  return (
    <>
      <div className="row m-2" hidden={show}>
        {buttons}
      </div>
    </>)
}
export default PhotoFilter;