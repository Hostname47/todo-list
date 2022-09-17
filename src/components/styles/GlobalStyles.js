import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    color: ${ (props) => props.theme.foregroundColor };
    background-color: ${ (props) => props.theme.backgroundColor };
    transition: background-color 0.2s ease;
  }

  header {
    background-color: ${ props => props.theme.headerBackgroundColor };
  }
`

export default GlobalStyles