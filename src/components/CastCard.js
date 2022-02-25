import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CastCard = ({ data }) => {

  const profilePath = data.profile_path ? `https://image.tmdb.org/t/p/w185/${data.profile_path}` : '/no-photo.png';

  return (
    <Case key={data.cast_id}>
      <Photo>


        <img src={profilePath} alt={data.name} />
      </Photo>  
      <ActorName>{data.name}</ActorName>
      <CharacterName>{data.character}</CharacterName>
    </Case>
  );
};

const Case = styled.div`
  background-color: white;
  width: 12.5rem;
  height: 22rem;
  border-radius: 0.2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  @media(max-width: 600px) {
    width: 11rem;
    height: 22rem;
  }

`;

const Photo = styled.div`
  width: 10.5rem;
  height: 15rem;
  border-radius: 0.2rem;
  border: 1px solid #E7E7E7;
  margin: 0.2rem;
  overflow: hidden;

  img {
    width: 11rem;
    height: 16rem;
    border-radius: 0.2rem;
  }

  @media(max-width: 600px) {
    width: 10rem;
    height: 15rem;

    img {
      width: 11rem;
      height: 15.5rem;
      border-radius: 0.2rem;
    }
  }
`;

const ActorName = styled.div`
  margin: 1rem 0 0 0.6rem;
  font-size: 1rem;
  font-weight: 700;
`;

const CharacterName = styled.div`
  margin: 0.6rem 0 0.4rem 0.6rem;
  font-size: 0.9rem;
`;


CastCard.propTypes = {
  data: PropTypes.element.isRequired,
};

export default CastCard;
