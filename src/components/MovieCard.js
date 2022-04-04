import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieCard = ({ data }) => {

  const posterPath = data.poster_path ? `https://image.tmdb.org/t/p/w154/${data.poster_path}` : '/no-small-poster.png';

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Case>
      <LinkDetails to={`/filme/${data.id}`}>
        <Poster onClick={scrollTop()}>
          <img src={posterPath} alt="poster" />
        </Poster>  
        <MovieTitle>{data.title}</MovieTitle>
      </LinkDetails>
      <MovieDate>{data.release_date}</MovieDate>
    </Case>
  );
};

const Case = styled.div`
  width: 10.5rem;
  height: 19rem;

  @media(max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    height: 16rem;
    margin-bottom: 2rem;
  }
`;

const LinkDetails = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Poster = styled.div`
  img {
    width: 10.5rem;
    height: 16rem;
    border-radius: 0.2rem;
    border: 1px solid #E7E7E7;
  }

  @media(max-width: 600px) {
    width: 100%;
    height: 100%;

    img {
      width: 10rem;
    }

  }
`;

const MovieTitle = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;

 @media(max-width: 600px) {
    font-size: 0.8rem;
    margin-top: 0.6rem;
  }

`;

const MovieDate = styled.div`
  margin-top: 0.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #646464;

  @media(max-width: 600px) {
    font-size: 0.7rem;
  }
`;

MovieCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MovieCard;
