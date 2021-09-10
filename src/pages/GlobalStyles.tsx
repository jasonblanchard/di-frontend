import React, { FunctionComponent } from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles: FunctionComponent = ({ children }) => {
  const theme = useTheme()

  const styles = css`
    // @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
    // @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

    body {
      margin: 0;
      font-family: ${theme.typography.fonts.sansSerif};
      font-size: ${theme.typography.sizes.body};
      color: ${theme.typography.colors.primary};
    }

    #root, #app {
      height: 100%;
    }
    
    textarea, input {
      font-family: ${theme.typography.fonts.sansSerif};
    }

    a {
      text-decoration: none;
      color: ${theme.typography.colors.primary};
    }

    a:hover {
      text-decoration: underline;
    }

    button {
      font-family: ${theme.typography.fonts.sansSerif}
    }

    h1, h2, h3, h4 {
      margin: 0;
    }
  `

  return (
    <Global styles={styles} />
  );
}

export default GlobalStyles;
