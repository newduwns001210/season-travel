import React, { useState, useEffect } from 'react';
import axios from 'axios'; //액시오스 test

const dataContainerStyle = {
  maxWidth: '800px',
  margin: 'auto',
};

const blurredBackgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/06/17/18/35/beach-2413081_1280.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(5px)',
};

const buttonStyle = {
  cursor: 'pointer',
  margin: '5px',
  padding: '8px 16px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #3498db',
  backgroundColor: 'white',
  color: '#3498db',
};

const categoryStyle = {
  backgroundColor: '#3498db',
  padding: '10px',
  textAlign: 'center',
  borderRadius: '4px',
  marginBottom: '10px',
};

const dataItemStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const loadingStyle = {
  textAlign: 'center',
  fontSize: '18px',
  marginTop: '20px',
};

const Menu = ({ category, options, selectedOption, onSelect, onHover, hoveredCategory }) => (
  <div
    onMouseEnter={() => onHover(category)}
    onMouseLeave={() => onHover(null)}
    style={{
      position: 'relative',
      display: 'inline-block',
    }}
  >
    <button
      onClick={() => onSelect(null)}
      style={{
        ...buttonStyle,
        backgroundColor: selectedOption ? '#2980b9' : 'white',
        color: selectedOption ? 'white' : '#3498db',
        borderRadius: '4px',
      }}
    >
      {category}
    </button>
    {category === hoveredCategory && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          width: '100%',
          backgroundColor: '#3498db',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option, category)}
            style={{
              ...buttonStyle,
              width: '100%',
              borderRadius: '0',
              borderTop: '1px solid #2980b9',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedSeason, selectedRegion, selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.odcloud.kr/api/15048444/v1/uddi:0ca96f4a-73ff-488c-92f1-ed6463171392?page=1&perPage=100&serviceKey=Ur6kk3Un1TMf2yb8jCLqFsV0kY1lqiQhFvWVmB9FVvte6EZXEDzpA5%2BvOi9xEHftbQ0%2BSRv31lQPTlweUq0fsg%3D%3D"
      );

      let filteredData = response.data.data;

      if (selectedSeason) {
        filteredData = filteredData.filter(item => {
          const month = parseInt(item.월);
          if (selectedSeason === '봄') return month >= 3 && month <= 5;
          else if (selectedSeason === '여름') return month >= 6 && month <= 8;
          else if (selectedSeason === '가을') return month >= 9 && month <= 11;
          else if (selectedSeason === '겨울') return month >= 12 || (month >= 1 && month <= 2);
          return false;
        });
      } else if (selectedRegion) {
        filteredData = filteredData.filter(item => item.시도 === selectedRegion);
      } else if (selectedMonth) {
        filteredData = filteredData.filter(item => parseInt(item.월) === parseInt(selectedMonth));
      }

      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setLoading(false);
    }
  };

  const handleFilter = (condition, type) => {
    setSelectedSeason(null);
    setSelectedRegion(null);
    setSelectedMonth(null);

    if (type === 'season') setSelectedSeason(condition);
    else if (type === 'region') setSelectedRegion(condition);
    else if (type === 'month') setSelectedMonth(condition);
  };

  const handleCategoryHover = category => {
    setHoveredCategory(category);
  };

  return (
    <div>
      <div style={blurredBackgroundStyle}></div>
      <div className="App" style={dataContainerStyle}>
        <div style={{ textAlign: 'center', backgroundColor: 'skyblue', padding: '20px' }}>
          <h1 style={{ margin: 0, color: 'white' }}>계절 테마 여행</h1>
        </div>

        <Menu
          category="계절"
          options={['봄', '여름', '가을', '겨울']}
          selectedOption={selectedSeason}
          onSelect={(option) => handleFilter(option, 'season')}
          onHover={handleCategoryHover}
          hoveredCategory={hoveredCategory}
        />

        <Menu
          category="지역"
          options={['경기도', '강원도', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도']}
          selectedOption={selectedRegion}
          onSelect={(option) => handleFilter(option, 'region')}
          onHover={handleCategoryHover}
          hoveredCategory={hoveredCategory}
        />

        <Menu
          category="월별"
          options={Array.from({ length: 12 }, (_, index) => `${index + 1}월`)}
          selectedOption={selectedMonth}
          onSelect={(option) => handleFilter(option, 'month')}
          onHover={handleCategoryHover}
          hoveredCategory={hoveredCategory}
        />

        {loading ? (
          <p style={loadingStyle}>데이터 불러오는 중...</p>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>데이터:</h2>
            {data.map((item) => (
              <div key={item.순번} style={dataItemStyle}>
                <p>월: {item.월}</p>
                <p>시군구: {item.시군구}</p>
                <p>시도: {item.시도}</p>
                <p>태그: {item.태그}</p>
                <p>요약: {item.요약}</p>
                <p>주제: {item.주제}</p>
                <p>코스정보: {item.코스정보}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;