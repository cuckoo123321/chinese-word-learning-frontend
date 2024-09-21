import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchArticleData } from '../../WebAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MEDIA_QUERY_MOBILE } from '../../constants/style';


const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap; 
  margin-top: 70px;
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

const ButtonSearch = styled.button`
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

const ArticleTitle = styled.div`
  h1 {
    text-align: center;
    font-weight: 500;
    color: rgb(47, 150, 169);
    letter-spacing: 0.04em;
    margin-bottom: 40px;
    ${MEDIA_QUERY_MOBILE} {
      font-size: 20px;
    }
`;

const ArticleContainer = styled.div`
  width: 1375px;
  height: 100%;
  padding: 250px 0 100px 0;
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: start;
`;

const ArticleCard = styled.div`
  width: 400px;  
  height: 500px; 
  margin: 0 20px 40px 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 300px;
  }
`;

const ArticleName = styled.h2`
  height:100px;
  font-size: 1.5rem;
  margin-bottom: 10px;
  overflow-y: auto;
`;

const ArticleInfo = styled.p`
  font-size: large;
  margin-bottom: 10px;
  text-align: justify;
  width: 100%;
  height: 250px;
  overflow-y: auto;
`;

const Title = styled.strong`
  display: inline-block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Content = styled.span`
  display: inline-block;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 350px;
  background-color: rgb(47, 150, 169);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 10px 0 10px 0;
  position: relative;
  bottom: 5px;

  &:hover {
    background-color:rgb(35 112 128);
  }

  ${MEDIA_QUERY_MOBILE} {
    width: 250px;
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
`;

const PageButton = styled.button`
  margin: 0 10px;
  padding: 8px 16px;
  font-size: 20px;
  background-color: rgb(47, 150, 169);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 200px;

  &:hover {
    background: rgb(35 112 128);
  }
`;

const PageCount = styled.span`
margin-bottom: 200px;
`;
const FirstLastPageButton = styled(PageButton)`
  margin: 0 5px;
  margin-bottom: 200px;
`;

const PAGE_SIZE = 18; // 每頁顯示的文章數量

export default function ArticlePage() {
  const [articleData, setArticleData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [originalArticleData, setOriginalArticleData] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchArticleData();
        setArticleData(result);
        setOriginalArticleData(result); // 將原始數據保存下來
        setTotalPages(Math.ceil(result.length / PAGE_SIZE));
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentArticles = articleData.slice(startIndex, endIndex);

  const openArticleWebsite = (url) => {
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit'};
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };

  
  const handleSearch = () => {
    const lowerCaseSearchKeyword = searchKeyword.toLowerCase();

    if (lowerCaseSearchKeyword === '') {
      // 如果搜索條件為空，顯示所有文章
      setArticleData(originalArticleData);
    } else {
      // 否則，根據搜索條件篩選文章數據
      const filteredArticles = originalArticleData.filter(article =>
        article.article_title.toLowerCase().includes(lowerCaseSearchKeyword) ||
        article.article_date.toLowerCase().includes(lowerCaseSearchKeyword) ||
        article.article_author.toLowerCase().includes(lowerCaseSearchKeyword) ||
        article.article_journal.toLowerCase().includes(lowerCaseSearchKeyword) ||
        article.article_abstract.toLowerCase().includes(lowerCaseSearchKeyword)
      );

      // 更新文章數據，只顯示符合搜索條件的文章
            setArticleData(filteredArticles);
            setTotalPages(Math.ceil(filteredArticles.length / PAGE_SIZE));
    }
    setCurrentPage(1);
  };


 

  const handleSort = (option) => {
    let sortedArticles = [...articleData];

    switch (option) {
      case 'dateNewToOld':
        sortedArticles.sort((a, b) => new Date(b.article_date) - new Date(a.article_date));
        break;
      case 'dateOldToNew':
        sortedArticles.sort((a, b) => new Date(a.article_date) - new Date(b.article_date));
        break;
      // 添加其他排序選項，根據需要
      default:
        break;
    }

    setArticleData(sortedArticles);
    setSortOption(option);
  };

  const sortOptions = [
    { label: '新 → 舊', value: 'dateNewToOld' },
    { label: '舊 → 新', value: 'dateOldToNew' },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Root>
      <FilterContainer>
        <ArticleTitle><h1>學術成果</h1></ArticleTitle>
        <Input
          type="text"
          placeholder="請輸入關鍵字搜尋"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ButtonSearch onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fff", fontSize: "18px" }} />
        </ButtonSearch>

        <Label>日期排序</Label>
        <Select onChange={(e) => handleSort(e.target.value)} value={sortOption || ''}>
          <option value="">顯示所有文章</option>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      </FilterContainer>

      <ArticleContainer>
        {currentArticles.map((article, index) => (
          <ArticleCard key={index}>
            <ArticleName>{article.article_title}</ArticleName>
            <hr></hr>
            <ArticleInfo>
              <Title>發表日期：</Title> <Content>{formatDate(article.article_date)}</Content><br />
              <Title>作者：</Title> <Content>{article.article_author}</Content><br />
              <Title>期刊名稱：</Title> <Content>{article.article_journal}</Content><br />
              <Title>摘要：</Title> <Content>{article.article_abstract}</Content><br />
            </ArticleInfo>
            <Button onClick={() => openArticleWebsite(article.article_link)}>前往網站</Button>
          </ArticleCard>
        ))}
      </ArticleContainer>

      <Pagination>
        <FirstLastPageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>第一頁</FirstLastPageButton>
        <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>◀︎</PageButton>
        <PageCount>{currentPage} / {totalPages}</PageCount>
        <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>▶︎</PageButton>
        <FirstLastPageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>最末頁</FirstLastPageButton>
      </Pagination>
    </Root>
  );
};
