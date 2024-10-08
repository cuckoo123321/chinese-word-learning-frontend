import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {  useLocation } from "react-router-dom";
import UserNav from './UserNav';
import { fetchProductData, getFavoriteList, removeFromFavorites} from '../../WebAPI';
import { Link } from 'react-router-dom';
import { useContext } from 'react'; //用於在函式組件中存取上下文
import { AuthContext } from '../../contexts'; //存儲和共享身份驗證相關資訊的上下文
import { MEDIA_QUERY_MOBILE} from '../../constants/style';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 70px;
`;

const UserFavoriteContainer = styled.div`
  width: 700px;
  height: 100%;
  padding: 60px 20px;
  margin-bottom: 200px;
  border: 1px solid #ddd; 
  border-radius: 8px; /* 圓角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY_MOBILE} {
    width: 350px;
  }
`;

const UserFavoriteTitle = styled.h1`
    text-align: center;
    font-weight: 500;
    color: rgb(47, 150, 169);
    letter-spacing: 0.04em;
    margin-bottom: 30px;
`;

const Alert = styled.div`
  color: rgb(60, 60, 60);
  margin-top:50px;
  font-size: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    ${MEDIA_QUERY_MOBILE} {
      flex-direction: column;
      align-items: flex-start;
      margin: 10px 0;
    }
`;

const Index = styled.div`
    color: rgb(47, 150, 169);
    font-size: 18px;
    font-weight: 500;
`;

const ProductTitle = styled.div`
    width:300px;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    margin: 0 0 0 10px;
`;

const FavoriteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  &:hover{
    background: rgb(47, 150, 169, 0.1);
  }
  ${MEDIA_QUERY_MOBILE} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonContainer = styled.div`

`;

const Button = styled.button`
    background-color: rgb(47, 150, 169);
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;

    &:hover {
    background-color: rgb(35 112 128);
    }
    &:first-child {
        margin-right: 20px;
    }
    &:last-child{
        background-color: rgb(47, 150, 169, 0.7);
        &:hover {
            background-color: rgb(35 112 128);
            }
    }
`;

export default function UserFavoritePage () {
    const location = useLocation();
    const [favorites, setFavorites] = useState([]);
    const [productData, setProductData] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        fetchProductData().then((data) => setProductData(data));
        if (user) {
          getFavoriteList(user.user_id).then((response) => {
            // 檢查 response 中的 success，確保成功取得資料
            if (response.success) {
              // 將收藏清單設定為 response.data
              setFavorites(response.data);
            } else {
              console.error('Failed to get favorites:', response.error);
            }
          });
        }
      }, [user]);

      const handleRemoveFavorite = async (favorite_id) => {
        // 使用 window.confirm 彈出確認框
        const userConfirmed = window.confirm('確定取消收藏？');
        if (userConfirmed) {
            try {
              await removeFromFavorites(favorite_id);
              alert('成功移除收藏');              
        
              // 刷新收藏清單
              if (user) {
                const response = await getFavoriteList(user.user_id);
                // 檢查 response 中的 success，確保成功取得資料
                if (response.success) {
                  // 將收藏清單設定為 response.data，轉換為陣列
                  setFavorites(Object.values(response.data));
                } else {
                  console.error('Failed to get favorites:', response.error);
                }
              }
            } catch (error) {
              console.error('移除收藏失敗:', error);
            }
          }
      };
      const openWebsite = (url) => {
        window.open(url, '_blank');
      };
    
      

    return (
        <Root>
            <UserNav location={location} />
           
            <UserFavoriteContainer>
                <UserFavoriteTitle>收藏商品清單</UserFavoriteTitle>
                  {favorites.length === 0 ? (
                    <Alert>您尚未收藏任何商品</Alert>
                ) : (
                    favorites.map((favorite, index) => {
                        // 查找當前收藏的商品數據
                        const product = productData.find((p) => p.product_id === favorite.product_id);
                      
                        return (
                          <FavoriteItem key={favorite.favorite_id}>
                            <Index>{`#${index + 1}`}</Index>
                            {product && (
                              <>
                                <Link to={`/product/${product.product_id}`} style={{ textDecoration: "none", color: "rgb(60, 60, 60)" }}>
                                  <InfoContainer>
                                    <ProductTitle>{product.product_title}</ProductTitle>
                                  </InfoContainer>
                                </Link>
                              </>
                            )}
                            <ButtonContainer>
                              <Button onClick={() => openWebsite(product.product_link)}>前往購買</Button>
                              <Button onClick={() => handleRemoveFavorite(favorite.favorite_id)}>取消收藏</Button>
                            </ButtonContainer>
                          </FavoriteItem>
                        );
                      })
                )}               
            </UserFavoriteContainer>
      </Root>
    );
  };