// GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #ffedd5 100%);
        color: #313131;
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
        line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        line-height: 1.2;
        color: #1c1917;
    }

    h3 {
        font-size: 1.5rem;
        line-height: 2.5rem;
        margin-bottom: 1.5rem;
    }

    a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s ease;
    }

    button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
        transition: all 0.2s ease;
    }

    input {
        font-family: inherit;
    }

    /* Utility classes for consistent spacing */
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-spacing {
        padding: 4rem 0;
    }

    .content-spacing {
        margin-bottom: 3rem;
    }
`;

export default GlobalStyles;