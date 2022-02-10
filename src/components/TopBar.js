import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopBar = ({ children }) => {
  return (
    <Case>
      <LogoCase>
        <LinkPage to={'/'}>TMDB</LinkPage>
        <div />
      </LogoCase>
      {children}
  </Case>
  );
};

const Case = styled.div`
  width: 100%;
  background-color: #2D0C5D;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  color: white;
  text-align: center;
`;

const LogoCase = styled.div`

  background-color: #5C16C5;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 0.2rem;
  padding: 0.6rem 3.6rem;
  display: flex;

  @media(max-width: 600px) {
    text-align: center;
    padding: 0.4rem 0;
    align-items: center;
    justify-content: center;
  }

  div {
    margin: 0.2rem;
    background: white;
    width: 3rem;
    height: 1rem;
    border-radius: 8rem;
  }
`;

const LinkPage = styled(Link)`
  text-decoration: none;
  color: white;
`;

TopBar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TopBar;
