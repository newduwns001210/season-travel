import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.odcloud.kr/api/15048444/v1/uddi:0ca96f4a-73ff-488c-92f1-ed6463171392?page=1&perPage=100&serviceKey=Ur6kk3Un1TMf2yb8jCLqFsV0kY1lqiQhFvWVmB9FVvte6EZXEDzpA5%2BvOi9xEHftbQ0%2BSRv31lQPTlweUq0fsg%3D%3D"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setLoading(false);
    }
  };

  const handleFilter = (condition, type) => {
    if (type === 'season') {
      const filteredData = data.data.filter(item => {
        const month = parseInt(item.월);
        if (condition === '봄') {
          return month >= 3 && month <= 5;
        } else if (condition === '여름') {
          return month >= 6 && month <= 8;
        } else if (condition === '가을') {
          return month >= 9 && month <= 11;
        } else if (condition === '겨울') {
          return month >= 12 && month <= 2;
        }
        return false;
      });
      setData({ data: filteredData });
    } 
  };

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  return (
    <div className="App">
      <div style={{ textAlign: 'center', backgroundColor: 'skyblue', padding: '20px' }}>
        <h1 style={{ margin: 0, color: 'white' }}>계절 테마 여행</h1>
      </div>

      <div style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
        <button
          onMouseEnter={() => handleCategoryHover('계절')}
          onMouseLeave={() => handleCategoryHover(null)}
        >
          계절
        </button>
        {hoveredCategory === '계절' && (
          <div
            onMouseEnter={() => handleCategoryHover('계절')}
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <button onClick={() => handleFilter('봄', 'season')}>봄</button>
            <button onClick={() => handleFilter('여름', 'season')}>여름</button>
          </div>
        )}
        
        <button
          onMouseEnter={() => handleCategoryHover('지역')}
          onMouseLeave={() => handleCategoryHover(null)}
        >
          계절
        </button>
        {hoveredCategory === '지역' && (
          <div
            onMouseEnter={() => handleCategoryHover('지역')}
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <button onClick={() => handleFilter('경기도', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('강원도', 'sido')}>강원도</button>
            <button onClick={() => handleFilter('전라북도', 'sido')}>전라북도</button>
            <button onClick={() => handleFilter('전라남도', 'sido')}>전라남도</button>
            <button onClick={() => handleFilter('경상북도', 'sido')}>경상북도</button>
            <button onClick={() => handleFilter('경상남도', 'sido')}>경상남도</button>
            <button onClick={() => handleFilter('충청북도', 'sido')}>충청북도</button>
            <button onClick={() => handleFilter('충청남도', 'sido')}>충청남도</button>
          </div>
        )}

        <button
          onMouseEnter={() => handleCategoryHover('월별')}
          onMouseLeave={() => handleCategoryHover(null)}
        >
          월별
        </button>
        {hoveredCategory === '월별' && (
          <div
            onMouseEnter={() => handleCategoryHover('월별')}
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <button onClick={() => handleFilter('1', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('2', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('3', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('4', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('5', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('6', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('7', 'sido')}>경기도</button>
            <button onClick={() => handleFilter('8', 'sido')}>경기도</button>
          </div>
        )}

      </div>

      {loading ? (
        <p>데이터 불러오는 중...</p>
      ) : (
        <div>
          <h2>데이터:</h2>
          {data.data.map((item) => (
            <div key={item.순번}>
              <p>월: {item.월}</p>
              <p>시군구: {item.시군구}</p>
              <p>시도: {item.시도}</p>
              <p>태그: {item.태그}</p>
              <p>요약: {item.요약}</p>
              <p>주제: {item.주제}</p>
              <p>코스정보: {item.코스정보}</p>
              <img src={item.사진파일} alt="사진파일" width="500" height="360" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;