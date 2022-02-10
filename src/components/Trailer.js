import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Trailer = ({ trailer }) => {
  return (
    <Case>
      <iframe 
        title={trailer.name}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        frameBorder="0"
      />
    </Case>
  );
};

const Case = styled.div`
  height: 30rem;
  width: 53.3rem;
  margin-left: 4rem;

  @media(max-width: 600px) {
    margin: 0rem;
    height: 11.6rem;
    width: 20.7rem;
    display: grid;
    place-items: center;
  }

`;


Trailer.propTypes = {
  data: PropTypes.element.isRequired,
};

export default Trailer;
