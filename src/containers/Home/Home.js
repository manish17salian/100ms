import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronRight,FiChevronLeft } from "react-icons/fi";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./Home.css";


const Home = (props) => {


  const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [displayResults, setDisplayResult] = useState([]);
  const [searchedChar, setSearchedChar] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => fetchCharacters(), []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://www.breakingbadapi.com/api/characters"
      );
      totalPageDecider(response.data)
      setCharacters(response.data)
  


      pagination(pageNumber, response.data);
    } catch (error) {
      setCharacters([]);
    }
  };

  const totalPageDecider = (data)=>{
      
      let totalResult = data.length
      let reminder = totalResult / 10
      setTotalPage(Math.ceil(reminder))


  }

  const increasePageNumber = ()=>{
    let newPageNumber = pageNumber + 1
      setPageNumber(pageNumber + 1)
      pagination(newPageNumber,characters)
  }

  const decreasePageNumber = ()=>{
    let newPageNumber = pageNumber - 1
    setPageNumber(pageNumber - 1)
    pagination(newPageNumber,characters)
}

  const pagination = (pageNumber, data) => {
    let lastPage = pageNumber * 10;
    let firstPage = lastPage - 10;

    const filteredData = data.slice(firstPage, lastPage);
    setDisplayResult(filteredData);
  };

  const filterSearch = (value)=>{
      value = value.target.value
    setSearchedChar(value)
    let filteredResult = characters.filter(player => {
        player = player.name.toLowerCase();
  
        let userSearchedLower = value.toLowerCase();
        return player.indexOf(userSearchedLower) > -1;
      });
      setFilteredData(filteredResult)
    pagination(1, filteredResult)
    totalPageDecider(filteredResult)
  }

  return (
    <>
      <Header/>
      <div className="search-box">
          <input
            type="text"
            className="input-search"
            placeholder="Search Characters..."
            onChange={filterSearch}
          />
        </div>
      <section className="ShowDisplaySection">
          {searchedChar === '' ? displayResults.map((el) => (
          <Card
          key={el.char_id}
          id={el.char_id}
          props={props}
            image={el.img}
            name={el.name}
            showName="Breaking Bad"
            dob={el.birthday}
            status={el.status}
          />
        )): filteredData.length !==0 ? displayResults.map((el) => (
            <Card
          props={props}
          id={el.char_id}
              image={el.img}
              name={el.name}
              showName="Breaking Bad"
              dob={el.birthday}
              status={el.status}
            />
          )): <div className="error__details">Nothing Found!</div> }
        
      </section>

      {characters.length == 0 ? null : <div className="pagination">
        {pageNumber === 1 ? null : <div className="buttonPagination" onClick={()=>decreasePageNumber()}><FiChevronLeft/></div>}

        <div className="paginationBox">
            {pageNumber}
        </div>
          <div className="slash">/</div>

        <div className="paginationBox">
            {totalPage}
        </div>
       { pageNumber === totalPage ? null: <div className="buttonPagination" onClick={()=>increasePageNumber()}><FiChevronRight/></div>}
      </div>}
    </>
  );
};

export default Home;
