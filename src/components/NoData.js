import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NoData = ({ text }) => {
  return (
    <Case>
      <span>{text}</span>
    </Case>
  );
};

const Case = styled.div`
  display: grid;
  place-items: center;

  span {
    font-size: 1.2rem;
    font-size: bold;
  }

`;


NoData.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoData;
