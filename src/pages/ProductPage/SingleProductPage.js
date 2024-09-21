import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getProductById, addToFavorites, checkIfFavorite } from '../../WebAPI';
import { AuthContext } from '../../contexts'; 
import { MEDIA_QUERY_MOBILE } from '../../constants/style';

// Styled Components
const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const Container = styled.div`
  padding: 20px;
  border-radius: 8px;  
  display: flex;
  max-width: 1000px;
  margin-bottom: 200px;
  ${MEDIA_QUERY_MOBILE} {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImgContainer = styled.div`
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  border: 0.5px solid rgb(47, 150, 169, 0.2);
  box-shadow: 0px 5px 5px rgb(47, 150, 169, 0.5);
  ${MEDIA_QUERY_MOBILE} {
    width: 300px;
    border: none;
    box-shadow: none;
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  flex: 1;
  margin-left: 50px;
  ${MEDIA_QUERY_MOBILE} {
    margin: 30px 0 0 0;
  }
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  color: rgb(31, 100, 113);
`;

const ItemGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Label = styled.span`
  color: rgb(31, 100, 113);
  font-size: 18px;
  margin-right: 10px;
  flex-shrink: 0;
`;

const Text = styled.span`
  color: rgb(60, 60, 60);
  font-size: 18px;
`;

const ProductDescription = styled.div`
  overflow-y: auto;
  color: rgb(60, 60, 60);
  font-size: 18px;
  margin-top: 10px;
  text-align: justify;
  width: 100%;
  flex-grow: 1;
`;

const Category = styled.span`
  color: rgb(31, 100, 113);
  font-size: 18px;
  font-weight: bold;
  &::before {
    content: "#";
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isFavorite ? 'rgb(35, 112, 128)' : 'rgb(47, 150, 169)'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  margin-top: 20px;
  cursor: pointer;
  flex: 1;

  svg {
    margin-right: 5px;
  }
  &:hover {
    background: rgb(35, 112, 128);
  }
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 0px;
  }
`;

const ButtonLabel = styled.span`
  font-size: 16px;
  ${MEDIA_QUERY_MOBILE} {
    font-size: 0px;
  }
`;

// Main Component
export default function SingleProductPage({ setCartItems }) {
  const { product_id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(product_id);
        if (!response.ok) {
          console.error('Response not ok:', response.statusText);
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);

        if (user && user.user_id) {
          const favoriteResponse = await checkIfFavorite(user.user_id, product_id);
          setIsFavorite(favoriteResponse.isFavorite);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [product_id, user]);

  const handleFavorite = async (product_id) => {
    try {
      if (!user || !user.user_id) {
        alert('請先登入會員');
        navigate("/login");
        return;
      }
      await addToFavorites({ user_id: user.user_id, product_id });
      alert('成功加入收藏清單');
      setIsFavorite(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('該商品已存在收藏清單中');
      } else {
        alert('添加到收藏清單失敗');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit'};
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };

  const openWebsite = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Root>
      <Container>
        {product ? (
          <>
            <ProductImgContainer>
              <ProductImg src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.product_path}`} alt={`Product ${product.product_id}`} />
            </ProductImgContainer>
            <ProductDetails>
              <ProductTitle>{product.product_title}</ProductTitle>
              <ItemGroup>
                <Label>譯名：</Label>
                <Text>{product.product_translation}</Text>
              </ItemGroup>
              <ItemGroup>
                <Label>簡介：</Label>
                <ProductDescription>{product.product_description}</ProductDescription>
              </ItemGroup>
              <ItemGroup>
                <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                <ProductDescription>{product.product_description_foreign}</ProductDescription>
              </ItemGroup>
              <ItemGroup>
                <Label>作者：</Label>
                <Text>{product.product_author}</Text>
              </ItemGroup>
              <ItemGroup>
                <Label>出版：</Label>
                <Text>{product.product_publisher}</Text>
              </ItemGroup>
              <ItemGroup>
                <Label>出版日期：</Label>
                <Text>{formatDate(product.product_date)}</Text>
              </ItemGroup>
              <ItemGroup>
                <Label>分類：</Label>
                <Category>{product.product_category}</Category>
              </ItemGroup>

              <ButtonGroup>
                <Button onClick={() => openWebsite(product.product_link)}>
                  <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white', fontSize: '24px' }} />
                  <ButtonLabel>前往購買</ButtonLabel>
                </Button>
                <Button
                  onClick={() => handleFavorite(product.product_id)}
                  isFavorite={isFavorite}
                >
                  <FontAwesomeIcon icon={faHeart} style={{ color: 'white', fontSize: '24px' }} />
                  <ButtonLabel>{isFavorite ? '已收藏' : '收藏'}</ButtonLabel>
                </Button>
              </ButtonGroup>
            </ProductDetails>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </Root>
  );
};
