import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchCarouselData } from '../../WebAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { MEDIA_QUERY_MOBILE, MEDIA_QUERY_TABLET } from '../../constants/style';

const Root = styled.div`
  margin-top:70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselItem = styled.div`
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(47, 150, 169, 0.1), rgba(47, 150, 169, 0.7));
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const CarouselImg = styled.img`
  width: 100%;
  height: 600px;
  object-fit: contain;
  object-position: center center;
  border-bottom: 1px solid rgba(47, 150, 169, 0.1);
`;

const CarouselPage = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'rgb(55 177 200)' : '#ffffff')};
  border: 3px solid rgb(55 177 200);
  position: absolute;
  top: 550px;
  right: ${({ offset }) => `${130 - (25 * (offset - 1))}px`};

  &:hover {
    background: rgb(55 177 200);
    cursor: pointer;
  }
`;

const CarouselLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const Title = styled.div`
h1 {
font-size: 45px;
  text-align: center;
  font-weight: 500;
  color: rgb(47, 150, 169);
  letter-spacing: 0.04em;
  margin: 660px 0 10px 0;
  ${MEDIA_QUERY_TABLET} {
    font-size: 30px;
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 500px;
    font-size: 22px;
  }
}
`;

const TitleEnglish = styled.div`
h1 {
font-size: 30px;
  text-align: center;
  font-weight: 500;
  color: rgb(47, 150, 169);
  letter-spacing: 0.04em;
  margin: 0 0 40px 0;
  ${MEDIA_QUERY_MOBILE} {
    width: 500px;
    font-size: 22px;
  }
}
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 100px;
  margin-top: auto;
`;

const Paragraph = styled.p`
  font-size: 1.5em;
  line-height: 1.5;
  margin-bottom: 15px;
  color: rgb(25 80 91);
  text-align: justify;
  padding: 0 100px;
  margin: auto 0 30px 0;
  ${MEDIA_QUERY_TABLET} {
    width: 800px;
    font-size: 20px;
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 700px;
    font-size: 16px;
  }
`;

const YoutubeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 60px;
`;

const YoutubeEmbed = styled.iframe`
  width: 995px;
  height: 560px;
`;

const Button = styled.button`
  width: 995px;
  background-color: rgb(47, 150, 169);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 150px;
  letter-spacing: .2rem;

  &:hover {
    background-color: rgb(35 112 128);
  }
  ${MEDIA_QUERY_TABLET} {
    width: 700px;
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 600px;
  }
`;

export default function HomePage() {
  const [carouselData, setCarouselData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCarouselData();
        setCarouselData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [carouselData]);

  const handlePageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNavigate = () => {
    navigate("/about");
  }

  return (
    <Root>
      <CarouselContainer>
        {carouselData.map((carousel, index) => (
          <CarouselItem
            key={carousel.carousel_id}
            isVisible={index === currentIndex}
          >
            <CarouselLink href={carousel.carousel_link} target="_blank" rel="noopener noreferrer">
              <CarouselImg
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${carousel.carousel_path}`}
                alt={`Carousel ${carousel.carousel_id}`}
              />
            </CarouselLink>
          </CarouselItem>
        ))}
        <div className="carousel__page">
          {carouselData.map((_, index) => (
            <CarouselPage 
              key={index}
              offset={index + 1} 
              active={index === currentIndex} 
              onClick={() => handlePageClick(index)} 
            />
          ))}
        </div> 
      </CarouselContainer>
      
      <TextContainer>        
        <Title><h1>歡迎來到「使用記憶術提升漢字詞學習」的世界</h1></Title>
        <TitleEnglish><h1>Welcome to the world of learning "Chinese characters and words"</h1> </TitleEnglish>
        <Paragraph>
        讓我們透過下面這段影片，認識「漢字鍵接圖學習法(Chinese Key-Image Strategy, CKIS)」吧！
        </Paragraph>
      </TextContainer>
      <YoutubeContainer>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/_VQ_gWpI9Kk"
          frameBorder="0"
          allowFullScreen
        />
      </YoutubeContainer>
      <TextContainer>        
        <Paragraph>
          讓我們透過下面這段影片，認識什麼是「中日同形詞」，以及有哪些同形詞小怪獸吧！
        </Paragraph>
      </TextContainer>
      <YoutubeContainer>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/_hYLuk6lElE"
          frameBorder="0"
          allowFullScreen
        />
      </YoutubeContainer>
      <Button onClick={handleNavigate}>
        了解詳情  
        <FontAwesomeIcon icon={faRightLong} style={{ marginLeft: '10px' }} />
      </Button>
    </Root>
  );
}
