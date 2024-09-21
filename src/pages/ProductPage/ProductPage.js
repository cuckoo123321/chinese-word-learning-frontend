import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchProductData } from '../../WebAPI';
import { MEDIA_QUERY_MOBILE, MEDIA_QUERY_TABLET, MEDIA_QUERY_DESKTOP } from '../../constants/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 500px;
`;

const FilterContainer = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  background-color: #fff;
  z-index: 100; /* 固定在最上層 */
  padding: 20px;
  box-shadow: 0 2px 0 0 rgba(47, 150, 169, 0.2); /* 添加陰影效果 */
`;


const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid rgb(47, 150, 169);
  border-radius: 4px;
  margin-right: 8px;
  outline-color: #32a1ce;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: rgb(47, 150, 169);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgb(35 112 128);
  }
`;

const Label = styled.label`
  margin: 0 5px 30px 20px;
  color: rgb(47, 150, 169);
  font-size: large;
  font-weight: bold;

  ${MEDIA_QUERY_MOBILE} {
    font-size: 0;
  }

`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid rgb(47, 150, 169);
  border-radius: 4px;
  margin-right: 8px;
  outline-color: #32a1ce;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-left: 10px;
  font-size: 18px;
  color: rgb(47, 150, 169);
`;

const ProductContainer = styled.div`
  width: 1375px;
  padding: 180px 0;
  height: 100vh; /* 設定整個區域的高度為視窗高度 */

  ${MEDIA_QUERY_MOBILE} {
    padding: 20px 20px;
  }

  ${MEDIA_QUERY_TABLET} {
    padding: 60px 20px;
  }

  ${MEDIA_QUERY_DESKTOP} {
    padding: 80px 30px;
  }
`;


const ProductTitle = styled.div`
  h1 {
    text-align: center;
    font-weight: 700;
    color: rgb(47, 150, 169);
    letter-spacing: 0.04em;
    margin-bottom: 40px;
  }
`;

const ProductCard = styled.div`
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: start;
  text-align: center;
  margin: 80px 0px;
  overflow: auto; /* 讓內容溢出時可以捲動 */
 

  ${MEDIA_QUERY_MOBILE} {
    margin: 250px 5px 0 5px;
  }

  ${MEDIA_QUERY_TABLET} {
    margin: 150px 10px 0 10px;
  }

  ${MEDIA_QUERY_DESKTOP} {
    margin: 150px 20px 0 20px;
  }
`;

const ProductImg = styled.img`
  width: 250px;
  height: 275px;
  overflow: hidden;
  object-fit: contain;
  object-position: center center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.15); /* 放大 15% */
  }
`;

const ProductText = styled.div`
  width: 275px;
  height: auto;
  margin-top: 16px;
  font-weight: 400;
  letter-spacing: 0.04em;
  overflow-wrap: break-word;
  cursor: pointer;

  &:hover {
    color:  rgb(31 100 113);
  }

  ${MEDIA_QUERY_MOBILE} {
    font-size: 12px;
  }

  ${MEDIA_QUERY_DESKTOP} {
    font-size: 16px;
  }
`;

const Author = styled.div`
  font-weight: 500;
  font-size: medium;
  letter-spacing: 0.08em;
  color: rgb(107 107 107);

  &::before {
    content: "作者：";
  }
`;

const Publisher = styled.div`
    font-weight: 500;
    font-size: medium;
    letter-spacing: 0.08em;
    color: rgb(107 107 107);
    margin-bottom: 50px;

    &::before {
    content: "出版：";
    }
`;


export default function ProductPage() {
      const [productData, setProductData] = useState([]);
      const [searchKeyword, setSearchKeyword] = useState('');
      const [originalProductData, setOriginalProductData] = useState([]);
      const [categories, setCategories] = useState([]);
      const [categoryFilter, setCategoryFilter] = useState(null);    
      const [isLoading, setIsLoading] = useState(true); 
      const [imagesLoaded, setImagesLoaded] = useState(0); 
      
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const result = await fetchProductData();
                  setProductData(result);
                  setOriginalProductData(result); // 將原始數據保存下來
                  // 取得並設定商品分類
                  const uniqueCategories = [...new Set(result.map(product => product.product_category))];
                  setCategories(uniqueCategories);                  
                  setIsLoading(false);// 加載完產品數據時立即隱藏加載狀態
              } catch (error) {
                  console.error('Error fetching product data:', error);
              }
          };
      
          fetchData();
      }, []); // 空的依賴表示只在組件初次渲染時調用
  
      useEffect(() => {
          if (productData.length > 0 && imagesLoaded === productData.length) {
              setIsLoading(false); // 當所有圖片加載完畢時，隱藏加載狀態
          }
      }, [imagesLoaded, productData]);
  
      // 更新加載完成的圖片數量
      const handleImageLoad = () => {
          setImagesLoaded(prevCount => prevCount + 1);
      };
  
      const handleSearch = () => {
          const lowerCaseSearchKeyword = searchKeyword.toLowerCase();
          // 如果搜索條件為空，顯示所有商品
          if (lowerCaseSearchKeyword === '' && !categoryFilter) {
              setProductData(originalProductData); // 使用原始的商品數據
          } else {
              // 根據搜索條件篩選商品數據
              const filteredProducts = originalProductData.filter(product =>
                  product.product_title.toLowerCase().includes(lowerCaseSearchKeyword) ||
                  product.product_author.toLowerCase().includes(lowerCaseSearchKeyword) ||
                  product.product_publisher.toLowerCase().includes(lowerCaseSearchKeyword)
              );
              setProductData(filteredProducts);
          }
      };
  
      const handleKeyDown = (e) => {
          if (e.key === 'Enter') {
              handleSearch();
          }
      };
  
      const handleCategoryFilter = (selectedCategory) => {
          // 如果選擇的是所有分類，顯示原始的商品數據
          if (selectedCategory === '') {
              setProductData(originalProductData);
          } else {
              // 根據選擇的商品分類篩選所有商品數據
              const filteredProducts = originalProductData.filter(product =>
                  product.product_category === selectedCategory
              );
              setProductData(filteredProducts);
          }
        
          // 設定選擇的商品分類
          setCategoryFilter(selectedCategory);
      };
  
      return (
          <Root>
            <FilterContainer>
              <ProductTitle><h1>產品總覽</h1></ProductTitle>
              <Input
                type="text"
                placeholder="請輸入關鍵字搜尋"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#fff", fontSize: "18px"}} />
              </Button>
              <Label>產品屬性</Label>
              <Select onChange={(e) => handleCategoryFilter(e.target.value)} value={categoryFilter || ''}>
                <option value="">所有分類</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>     
            </FilterContainer>
        
            {isLoading && (
              <LoadingContainer>
                <FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(47, 150, 169)", fontSize: "48px" }} />
                <LoadingText>Loading...</LoadingText>
              </LoadingContainer>
            )}
        
            {!isLoading && (
              <ProductContainer> 
                <ProductCard>
                  {productData.map((product) => (
                    <Link to={`/product/${product.product_id}`} key={product.product_id} style={{textDecoration: "none"}}>
                      <div>
                        {/* 點擊時導向到 SingleProductPage */}
                        <ProductImg 
                          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.product_path}`} 
                          alt={`Product ${product.product_id}`} 
                          onLoad={handleImageLoad} // 處理圖片加載完成
                        />
                      </div>
                      <ProductText style={{color:"rgb(31 100 113)"}}>{product.product_title}</ProductText>
                      <Author>{product.product_author}</Author>
                      <Publisher>{product.product_publisher}</Publisher>
                    </Link>            
                  ))}
                </ProductCard>
              </ProductContainer>
            )}
          </Root>
        );
  }
  
