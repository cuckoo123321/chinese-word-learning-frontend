import React from 'react';
import styled, { css } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faPenToSquare, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react'; ////用於在函式組件中存取上下文
import { AuthContext } from '../../contexts'; //該上下文是用於存儲和共享身份驗證相關資訊的上下文
import { setAuthToken } from '../../constants/utils';//設置 token
import { useNavigate } from 'react-router-dom';
import { MEDIA_QUERY_MOBILE, MEDIA_QUERY_TABLET, MEDIA_QUERY_DESKTOP } from '../../constants/style';


const baseLinkStyles = css`
  height: 70px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  color: rgb(47 150 169);
  text-decoration: none;
  padding: 0px 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(47, 150, 169, 0.2);
  }
`;

const HeaderContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  box-sizing: border-box;
  background: #ffffff;
  color: rgb(47 150 169);
  z-index: 1000;

  ${MEDIA_QUERY_MOBILE} {
    padding: 0px 8px;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: rgb(47 150 169);
  
  ${[MEDIA_QUERY_DESKTOP, MEDIA_QUERY_TABLET, MEDIA_QUERY_MOBILE].map(query => `
    ${query} {
      font-size: 0px;
    }`)}
  
  /* 確保在桌面和平板模式下是水平排列 */
  ${MEDIA_QUERY_TABLET} {
    flex-direction: row;
  }
  
  /* 在移動裝置上隱藏文字，但保持圖片排列 */
  ${MEDIA_QUERY_MOBILE} {
    flex-direction: row;
  }
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  margin-left: 30px;

  ${MEDIA_QUERY_MOBILE} {
    flex-direction: row;
    align-items: flex-start;
    margin-left: 0;
  }
`;

const NavLeft = styled(Link)`
  ${baseLinkStyles}
  justify-content: center;
  width: 130px;
  font-size: 20px;
  font-weight: 500;

  ${(props) =>
    props.$active &&`
      background: rgba(47, 150, 169, 0.1);
    `}

    ${MEDIA_QUERY_MOBILE} {
      width:100px;
      font-size: 16px;
    }
`;

const NavRight = styled(Link)`
  ${baseLinkStyles}
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  font-size: 18px;
  font-weight: 400;

  ${(props) =>
    props.$active &&
    `
      background: rgba(47, 150, 169, 0.1);
    `}

  ${MEDIA_QUERY_TABLET} {
    font-size: 16px;
    &:last-child {
      margin-right: 50px;
    }
  }

  ${MEDIA_QUERY_MOBILE} {
    width: 100%;
    font-size: 0px;
    margin-right: 20px;
    &:last-child {
      margin-right: 100px;
    }
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;

  ${MEDIA_QUERY_MOBILE} {
    margin-left: 20px;
  }
`;

const ImageS = styled.img`
  width: 35px;  
  height: auto; 
  margin-right:10px;

  ${MEDIA_QUERY_TABLET} {
    margin-right: 10px;
  }

  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;

const Image = styled.img`
  height: auto; 
  margin-right:10px;

  ${MEDIA_QUERY_TABLET} {
    display: none;
  }

  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;
const ImageCKS = styled.img`
  width: 70px;  
  height: auto; 
  margin-right:10px;

  ${MEDIA_QUERY_TABLET} {
    margin-left: 10px;
    margin-right: 0;
  }

  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;


export default function Header() {  
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if(location.pathname !== '/'){
      navigate('/');
    }    
  };  


   return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
    <HeaderContainer>
      <LeftContainer>
        <Brand to="/" $active={location.pathname === '/'}>
          <ImageS 
         src={process.env.PUBLIC_URL + '/imgs/monster_S-3.png'}  
         alt="小怪獸S-3"
         />
         <Image 
         src={process.env.PUBLIC_URL + '/imgs/monster_D-1.png'}  
         alt="小怪獸D-1"
         style={{width:"28px"}}
         />
          <Image 
         src={process.env.PUBLIC_URL + '/imgs/monster_O-2.png'}  
         alt="小怪獸O-2"
         style={{width:"40px"}}
         />
         <ImageCKS 
         src={process.env.PUBLIC_URL + '/imgs/CKIS logo.png'}  
         alt="CKIS logo"
         />
         
         記憶術提升漢字詞學習</Brand>
        <NavbarList>
          <NavLeft to="/about" $active={location.pathname === '/about'}>關於我們</NavLeft>
          <NavLeft to="/article" $active={location.pathname === '/article'}>學術成果</NavLeft>
          <NavLeft to="/product" $active={location.pathname === '/product'}>實務應用</NavLeft>
        </NavbarList>
      </LeftContainer>

        <NavbarList>
        {!user && <NavRight to="/register" $active={location.pathname === '/register'}>
            <div><FontAwesomeIcon icon={faPenToSquare} style={{color: "#2f96a9", fontSize: "24px"}} /></div>
            <div>註冊</div>
          </NavRight> }
          
          {!user && <NavRight className="margin: 0px" to="/login" $active={location.pathname === '/login'}>
            <div><FontAwesomeIcon icon={faRightToBracket} style={{ color: "#2f96a9", fontSize: "24px"}} /></div>
            <div>登入</div>          
          </NavRight> }

          {user && <NavRight to="/user" $active={location.pathname === '/user'}>
            <div><FontAwesomeIcon icon={faUser} style={{color: "#2f96a9", fontSize: "24px"}} /></div>
            <div>會員</div>
          </NavRight> }

          {user && <NavRight className="margin: 0px" to="/login" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#2f96a9", fontSize: "24px"}}/><div>登出</div></NavRight>}

        </NavbarList>
      
    </HeaderContainer>
   </StyleSheetManager>
  )
}