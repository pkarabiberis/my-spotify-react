import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }
  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
  }
  #root {
    min-height: 100%;
  }
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.025em;
    margin: 0 0 10px;
    font-weight: 700;
  }
  p {
    margin: 0 0 10px;
  }
  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: ${theme.transition};
  }
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
