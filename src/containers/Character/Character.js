import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
import Header from "../../components/Header/Header";
import "./Character.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height:'90%',
    width:'70%',
    backgroundColor:'black',
    transform: 'translate(-50%, -50%)',
    display:'flex',
    // justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column',
    padding:'1rem',
  },
};

const Character = (props) => {
  const [characterDetail, setCharacterDetail] = useState([]);
  const [quotes, setQuotes] = useState([])

  useEffect(() => fetchDetails(), []);

  const fetchDetails = async () => {
    const id = parseInt(props.location.pathname.split("/")[2]);
    try {
      const response = await axios.get(
        `https://www.breakingbadapi.com/api/characters/${id}`
      );
      setCharacterDetail(response.data);
      fetchQuotes(response.data[0].name)
    } catch (error) {
      setCharacterDetail([]);
    }
  };

  const fetchQuotes = async (name)=>{
    let data = name.split(' ').join('+')
    try {
      const response = await axios.get(`https://www.breakingbadapi.com/api/quote?author=${data}`)
      
      setQuotes(response.data)
    } catch (error) {
      
    }
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {characterDetail.length > 0 ? (
        <Header name={characterDetail[0].name} />
      ) : null}

      <div className="displayContainer">
        {characterDetail.length > 0 ? (
          <div className="cardContainer">
            <div className="imageContainer">
              <img className="image" src={characterDetail[0].img} />
            </div>
            <div className="detailContainer">
              <div className="details">
                <div className="placeholder">Date Of Birth</div>
                <div className="values">{characterDetail[0].birthday}</div>
              </div>
              <div className="details">
                <div className="placeholder">Occupation</div>
                <div className="values">{characterDetail[0].occupation[0]}</div>
              </div>
              <div className="details">
                <div className="placeholder">Status</div>
                <div className="values">{characterDetail[0].status}</div>
              </div>
              <div className="details">
                <div className="placeholder">Nickname</div>
                <div className="values">{characterDetail[0].nickname}</div>
              </div>
              <div className="details">
                <div className="placeholder">Portrayed By</div>
                <div className="values">{characterDetail[0].portrayed}</div>
              </div>
              <div className="details">
                <div className="placeholder">Season Appearance</div>
                <div className="values">
                  {characterDetail[0].appearance.join("  ")}
                </div>
              </div>
              <div className="details" onClick={openModal}>All Quotes</div>
            </div>
          </div>
        ) : null}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal__title">All Quotes</div>
          <div className="quotes__container">
            {quotes.length > 0 ? quotes.map(el=>(
                        <div className="details">
                        <div className="placeholder" key={el.quote_id}>{el.quote}</div>
                        </div>
            )):<div className="details">
            <div className="placeholder">No Quotes Found!</div>
            </div> }
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Character;
