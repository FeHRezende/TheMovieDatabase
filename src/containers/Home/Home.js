import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import BasePage from '../../components/BasePage';
import TopBar from '../../components/TopBar';
import MovieCard from '../../components/MovieCard';

import { getPopularMovies, getGenres } from '../../service/ApiService';
import { formatModernDate } from '../../helpers/formatDate';

function Home() {

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState('');
  const [totalPages] = useState(500);
  const [firstPage , setFirstPage] = useState(1);
  const [lastPage , setLastPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const types = await getGenres();
      types.genres.map((type) => {
        type.selected = false;
      });
      setGenres(types.genres);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getPopularMovies(1, selectedGenres);
      formatModernDate(data.results);
      setMovies(data.results);
    }
    fetchData();
  }, [selectedGenres]);

  const setColor = (parameter) => {
    if (parameter) {
      return 'background: #D18000; color: white';
    } return 'background: white; color: #323232;';
  };

  const selectGenres = async (id) => {
    const genresIds = [];
    let index = -1;
    genres.find((genre, i) => {
      index = i;
      return genre.id === id;
    });

    genres[index].selected = !genres[index].selected;
    genres.map((genre) => {
      if(genre.selected === true) {
        return genresIds.push(genre.id);
      };
    });
    setSelectedGenres(genresIds.join());
  };

  const changePage = async (page) => {
    const newData = await getPopularMovies(page, selectedGenres);
    formatModernDate(newData.results);
    setMovies(newData.results);
    setFirstPage(page);
    if(page >= totalPages-4){
      setLastPage(page);
    }else {  
      setLastPage(page+4);
    }
  }; 

  return (
    <>
      <BasePage>
        <TopBar>
          <Header>
            <TitleCase>
              <Title>Milhões de filmes, séries e pessoas para descobrir. Explore já.</Title>
            </TitleCase>
            <Filter>
              <h5>FILTRE POR:</h5>
              <div>
                {genres.map((genre) => (
                  <Button 
                    filterStyle={`${setColor(genre.selected)}`}
                    key={genre.id} 
                    onClick={() => selectGenres(genre.id)}>
                      {genre.name}
                    </Button>
                ))}
              </div>
            </Filter>
          </Header>
        </TopBar>
        <Body>
          <Grid>
            {movies.map((data) => (
              <MovieCard key={data.id} data={data} />
            ))}
          </Grid>
          <Pagination>
            {firstPage !== 1 && (
              <>
                <span onClick={() => changePage(1)}>Primeira</span>
                <span onClick={() => changePage(firstPage-1)}>{'<'}</span>
              </>
            )}
            <span onClick={() => changePage(firstPage)}>{firstPage}</span>
            {firstPage !== totalPages &&(<span onClick={() => changePage(firstPage+1)}>{firstPage+1}</span>)}
            {firstPage < totalPages-1 &&(<span onClick={() => changePage(firstPage+2)}>{firstPage+2}</span>)}
            {firstPage < totalPages-2 && (<span onClick={() => changePage(firstPage+3)}>{firstPage+3}</span>)}
            {firstPage < totalPages-3 && (<span onClick={() => changePage(firstPage+4)}>{firstPage+4}</span>)}
            {lastPage !== totalPages &&(
              <>
                <span onClick={() => changePage(firstPage+1)}>{'>'}</span>
                <span onClick={() => changePage(totalPages)}>Última</span>
              </>
            )}
          </Pagination>
        </Body>
      </BasePage>
    </>
  );
}

const Header = styled.div`
  background-color: #2D0C5E;
  color: white;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 2.5rem;

  @media(max-width: 600px) {
    top: 2rem;
  }

`;

const TitleCase = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  width: 45rem;

  @media(max-width: 600px) {
    text-align: left;
    margin: 0 2rem 0 1rem;
    font-size: 1.5rem;
  }

`;

const Button = styled.button`
  cursor: pointer;
  margin: 0.4rem;
    padding: 0.6rem;
    border: none;
    border-radius: 0.2rem;
    font-weight: bold;
  ${(props) => props.filterStyle};
`;

const Filter = styled.div`
  display: grid;
  place-items: center;

  div {
    width: 80%;
    margin-bottom: 2rem;
  }

  @media(max-width: 600px) {

    div {
      width: 95%;
    }

    h5 {
      margin: 0.4rem;
    }

    margin-left: 0.4rem;
    place-items: initial;
    text-align: left;
  }
`;

const Body = styled.body`
  margin: 27rem 0 4rem 0;
  background-color: #F3F3F3;
  height: 100%;

  @media(max-width: 600px) {
    margin-top: 34rem;
  }
`;

const Grid = styled.div`
  margin: 0 4rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3rem 1rem; 

  @media(max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 0.2rem;
    gap: 3rem 0.5rem; 
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 0 0;
  font-size: 1rem;
  gap: 0 2rem;
  font-weight: bold;
  color: #5C16C5;

  span {
    cursor: pointer;
  }

  @media(max-width: 600px) {
    gap: 0 1.5rem;
    font-size: 0.8rem;
  } 
`;

export default Home;
