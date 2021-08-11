import React from "react";
import classes from './Card.css'

console.log(classes)

const Card = (props) => {
  const redirectToCharacter = (id)=>{
    props.props.history.push(`/character/${id}`);
  }



  return (

    <div className="award__card" key={props.key}>
    <div className="award__card award__card-front"><img src={props.image} alt="House 1" className="card__img" /></div>
    <div className="award__card award__card-back">
        <div className="award-details">
            <p className="characterName">{props.name}</p>
        </div>
        <div className="detailsContainer">
          <div className="placeholderName">Show Name</div>
          <div className="value">{props.showName}</div>
        </div>
        <div className="detailsContainer">
          <div className="placeholderName">D.O.B</div>
          <div className="value">{props.dob}</div>
        </div>
        <div className="detailsContainer">
          <div className="placeholderName">Status</div>
          <div className="value">{props.status}</div>
        </div>
        <div className="btn__container">
        <div className="btn" onClick={()=>redirectToCharacter(props.id)}>LEARN MORE</div>
        </div>
    </div>
</div>
  );
};

export default Card;
