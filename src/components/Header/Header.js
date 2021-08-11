import React from "react";
import "./Header.css";

const Header = (props) => {
  // console.log(props.name)
  return (
    <>
      <div className="TitleContainer">
        <h1>BREAKING BAD</h1>
      </div>
      <div className="HeaderRest">
        <div className="SubHeading">
          <h2 className="">{props.name == "" || props.name == undefined ? "LIST OF CHARACTERS" : `${props.name}`}</h2>
        </div>

      </div>
    </>
  );
};

export default Header;
