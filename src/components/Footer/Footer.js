import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.footer`
  display:flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;  
  background-color: rgb(214 232 235);
  text-align: center;
`;

const CopyRight = styled.p`
  color: rgb(42 134 152);
  font-weight: blod;
  margin: 20px 0 20px 0;
  transition: transform 0.3s ease-in-out; 
  &:hover { 
    color: rgb(35 112 128);
    transform: scale(1.1);
  }
`



const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  
  return (
    <FooterContainer>      
      <CopyRight>&copy; {currentYear} 我也繪漢字暨實用中日同形詞攻略法 All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;

