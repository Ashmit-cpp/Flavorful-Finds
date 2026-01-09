// components/Footer.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <FooterContainer role="contentinfo">
      <FooterContent>
        <Logo to="/" aria-label="Flavorful Finds home">
          <GiKnifeFork />
          <span>Flavorful Finds</span>
        </Logo>

        <SocialIcons aria-label="social links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </SocialIcons>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} Flavorful Finds
      </Copyright>
    </FooterContainer>
  );
}

/* ----- compact styles ----- */

const FooterContainer = styled.footer`
  background: #fff;
  border-top: 1px solid #f3f4f6;
  padding: 0.9rem 0.75rem;
  margin-top: auto;
  font-family: 'Poppins', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;

  svg {
    font-size: 1.125rem;
    color: #e94a63;
    line-height: 1;
  }

  span {
    display: inline-block;
    vertical-align: middle;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 8px;
    background: #f7f7f8;
    color: #6b7280;
    font-size: 0.9rem;
    transition: transform 0.14s ease, background 0.14s ease, color 0.14s ease;
    border: 1px solid transparent;
    text-decoration: none;

    &:hover,
    &:focus {
      background: #e94a63;
      color: #fff;
      transform: translateY(-2px);
      outline: none;
      box-shadow: 0 6px 12px rgba(233, 74, 99, 0.08);
    }
  }
`;

const Copyright = styled.div`
  max-width: 920px;
  margin: 0.45rem auto 0;
  text-align: center;
  color: #9ca3af;
  font-size: 0.75rem;
  padding-top: 0.45rem;
`;

export default Footer;
