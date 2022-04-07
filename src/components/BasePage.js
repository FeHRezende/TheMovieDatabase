import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BasePage = ({ children }) => {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100vh;
`;


BasePage.propTypes = {
  children: PropTypes.array.isRequired,
};

export default BasePage;
