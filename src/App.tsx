import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, } from "react-router-dom";

import themes from './themes'
import Toast from './toast';
import Routes from './Routes';

export default function App() {
  return (
    <ThemeProvider theme={themes.light}>
      <RecoilRoot>
        <Toast />
        <Router>
          <Routes />
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}
