import React from 'react';
import styled from 'styled-components';
import {  useState } from 'react';
import { MEDIA_QUERY_MOBILE, MEDIA_QUERY_TABLET } from '../../constants/style';


const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap; 
  margin-top: 70px;
`;

const Title = styled.div`
h1 {
  text-align: center;
  font-weight: 500;
  color: rgb(47, 150, 169);
  letter-spacing: 0.04em;
  margin: 40px 0 20px 0;
  ${MEDIA_QUERY_MOBILE} {
    font-size: 20px;
  }
`;

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 0 100px 0 100px;

&:last-child {
  margin-bottom: 200px;
}
${MEDIA_QUERY_TABLET} {
  &:last-child {
    margin-bottom: 50px;
  }
}

${MEDIA_QUERY_MOBILE} {
  padding: 0 50px 0 50px;
}
`;

const Image = styled.img`
  width: 150px; 
  height: auto; 
  margin:20px 0 20px 0;
  transition: transform 0.3s ease-in-out; 
  cursor: pointer;
  
  &:hover { 
    transform: scale(1.3);
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 50px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 15px;
  color: rgb(25 80 91);
  text-align: justify;
  padding: 0 100px;
  margin-top: 20px;
  ${MEDIA_QUERY_TABLET} {
    font-size: 16px;
    padding: 0;
  }
  ${MEDIA_QUERY_MOBILE} {
    font-size: 16px;
    padding: 0;
  }
`;

const MonsterS = styled.div`
  width: 600px;
  color:rgb(180 143 74);
  font-size: 20px;
  border: 1px solid rgb(110 99 41);
  border-radius: 20px;
  padding: 5px;
`;
const MonsterO = styled.div`
  width: 400px;
  color:rgb(215 133 149);
  font-size: 20px;
  border: 1px solid rgb(173 31 37);
  border-radius: 20px;
  padding: 5px;
  margin-right: 10px;
`;
const MonsterD = styled.div`
  width: 250px;
  color:rgb(58 162 191);
  font-size: 20px;
  border: 1px solid rgb(4 66 74);
  border-radius: 20px;
  padding: 5px;
  margin-right: 10px;
`;
const ImageBook = styled.img`
  width: 600px; 
  height: auto; 
  margin:40px 0 20px 0;
  transition: transform 0.3s ease-in-out; 


  ${MEDIA_QUERY_MOBILE} {
    width: 400px;
  }
`;

export default function AboutPage() {
    const [imageDescriptionS, setImageDescriptionS] = useState('');
    const [imageDescriptionO, setImageDescriptionO] = useState('');
    const [imageDescriptionD, setImageDescriptionD] = useState('');
    const [currentImageS, setCurrentImageS] = useState(process.env.PUBLIC_URL + '/imgs/monster_S-4.png');
    const [currentImageO, setCurrentImageO] = useState(process.env.PUBLIC_URL + '/imgs/monster_O-4.png');
    const [currentImageD, setCurrentImageD] = useState(process.env.PUBLIC_URL + '/imgs/monster_D-4.png');

  
    const handleMouseEnterS = () => {
      setImageDescriptionS('漢字看起來好複雜、 好可怕！');
      setCurrentImageS(process.env.PUBLIC_URL + '/imgs/monster_S-2.png');
    };
  
    const handleMouseEnterO = () => {
      setImageDescriptionO('別擔心!有了記憶術 的幫忙，學習漢字變 得有趣又好玩。');
      setCurrentImageO(process.env.PUBLIC_URL + '/imgs/monster_O-3.png');
    };
  
    const handleMouseEnterD = () => {
      setImageDescriptionD('跟著我們一起用記憶術學漢字和更多生詞吧！');
      setCurrentImageD(process.env.PUBLIC_URL + '/imgs/monster_D-3.png');
    };
  
    const handleMouseLeave = () => {
      setImageDescriptionS('');
      setImageDescriptionO('');
      setImageDescriptionD('');
      setCurrentImageS(process.env.PUBLIC_URL + '/imgs/monster_S-4.png');
      setCurrentImageO(process.env.PUBLIC_URL + '/imgs/monster_O-4.png');
      setCurrentImageD(process.env.PUBLIC_URL + '/imgs/monster_D-4.png');
    };

  return (
    <Root>
      <Title><h1>歡迎光臨本網站 -- 「記憶術提升漢字詞學習」的世界</h1></Title>
      
      <Container>
      <Image 
         src={currentImageS}  
         alt="小怪獸S-2"
         style={{marginLeft:"20px"}}
         onMouseEnter={handleMouseEnterS}
         onMouseLeave={handleMouseLeave}
         />
      {imageDescriptionS && <MonsterS>{imageDescriptionS}</MonsterS>}
      <Paragraph style={{ paddingLeft: '30px' }}>
        本網站目的在向大家推廣漢字詞學習相關研究和產品。包含「鍵接圖系列教材」和「實用中日同形詞攻略法」兩大部分的成果。「鍵接圖系列教材」採用獨創的「鍵接圖學習法」學習漢字詞，透過關「鍵」串「接」漢字形和意的「圖」像，以創意的日常圖像輔助學 習者學習漢字，提升學習認字和寫字的效率。「實用中日同形詞攻略法」透過精緻化策略、分類等記憶術和比較中日漢字詞使用上的異同，為日籍華語學習者提供學習漢字詞的妙方。我們奠基於豐厚的學術成果和有力的實徵研究支持，已開發多款教研產品，期望能對學習者、教學者和家長帶來實質的幫助。
        </Paragraph>
      </Container>
     
      <Container>
        <Paragraph style={{ paddingRight: '30px' }}>
        本網站架構為：關於我們、學術成果、實務應用。透過「關於我們」，您可以了解網站目的，並取得學習資源和聯繫方式; 透過「學術成果」，您可以看到團隊在漢字詞領域豐富的期刊論文;透過「實務應用」，您可以進一步認識漢字詞學習週邊產品，讓學習變 得更有趣、有效、有意思。
        <br/><br/>
        如果您有購買產品需求，可透過各產品下方「前往購買」按鈕，即可前往購買頁面，也可以到各大銷售通路購買，以確保您得到最正確的資訊，並享受到優惠的價格。
        <br/><br/>
        隨著團隊研究和產品穩定發展，將不定期更新相關教學資源（例如:教案、教學活動），歡迎您透過 <a href="https://drive.google.com/drive/folders/1XKEPdqbzzcFKv1A6hiymD0eJh_TywDuS" style={{textDecoration: 'none'}}>此連結</a> 探索更多豐富的學習資源。
      </Paragraph>
      {imageDescriptionO && <MonsterO>{imageDescriptionO}</MonsterO>}
        <Image 
          src={currentImageO} 
          alt="小怪獸O-4"
          style={{marginLeft:"20px"}}
          onMouseEnter={handleMouseEnterO}
          onMouseLeave={handleMouseLeave}
        />
      </Container>
      
      <Container>
        <Image 
          src={currentImageD} 
          alt="小怪獸D-4"
          style={{marginLeft:"20px"}}
          onMouseEnter={handleMouseEnterD}
          onMouseLeave={handleMouseLeave}
        />
       {imageDescriptionD && <MonsterD>{imageDescriptionD}</MonsterD>}
        <Paragraph style={{ paddingLeft: '30px' }}>
        溫馨提醒，若您「註冊會員」，在瀏覽產品時即可「收藏」特定品項，團隊不會蒐集您的個人資料作其他用途。
        <br/>如有任何疑問，歡迎隨時來信聯繫團隊(chinesekeyimage@gmail.com)，團隊成員會盡快回覆您。<br/>
        感謝您的支持與參與，期待透過本網站，能帶給您愉快的漢字詞探索時光。
        <br/><br/>
        致謝:本書感謝教育部「高等教育深耕計畫」以及臺灣師範大學「華語文與科技研究中心」支持。 書中漢字鍵接圖，出自正中書局出版之《我也繪漢字》系列教材。
        </Paragraph>        
      </Container>
      <Container style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <ImageBook 
          src={process.env.PUBLIC_URL + '/imgs/books.png'} 
          alt="教材圖示"
        />
      </Container>
      
    </Root>
  );
};