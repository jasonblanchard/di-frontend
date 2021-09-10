import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import GlobalStyles from './GlobalStyles';

const Container = styled.div`
  height: 100%;
`;

const Header = styled.header`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  font-family: ${props => props.theme.typography.fonts.serif};
  font-size: ${props => props.theme.typography.sizes.mainHeading};
`

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Container className="BaseLayout">
        <Header>
          <h1>
            <StyledLink to="/workspace/">Di</StyledLink>
          </h1>
          <Link to="/search/">search</Link>
        </Header>
        {children}
      </Container>
    </>
  )
}

export default BaseLayout;
