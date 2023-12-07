import React, { useState, useEffect } from 'react';
import axios from 'axios';


function test() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // API 요청을 보내는 함수
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.odcloud.kr/api/15048444/v1/uddi:8b6f5b5e-7415-4509-bd34-b1e98656958d_201912241009?page=1&perPage=300&serviceKey=Ur6kk3Un1TMf2yb8jCLqFsV0kY1lqiQhFvWVmB9FVvte6EZXEDzpA5%2BvOi9xEHftbQ0%2BSRv31lQPTlweUq0fsg%3D%3D"
          );
        setData(response.data); // API 응답 데이터를 상태에 저장
        console.log(response.data);
        
        setLoading(false); // 로딩 상태 업데이트
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setLoading(false); // 에러 발생 시 로딩 상태 업데이트
      }
    }

    fetchData(); // 함수 호출
    //{JSON.stringify(data)}
    //{data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true}/>}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행
//<p>{JSON.stringify(data)}</p>
  return (
    <div className="test">
      <h1>공공데이터 API 예제</h1>
      {loading ? (
        <p>데이터 불러오는 중...</p>
      ) : (
        <div>
  <h2>데이터:</h2>
  {data.data.map(item => (
    <div key={item.순번}>
      <img src={item.사진파일} alt="여행 이미지" />
      <p>순번: {item.순번}</p>
      <p>시군구: {item.시군구}</p>
      <p>시도: {item.시도}</p>
      <p>요약: {item.요약}</p>
      <p>월: {item.월}</p>
      <p>주제: {item.주제}</p>
      <p>코스정보: {item.코스정보}</p>
      <p>태그: {item.태그}</p>
    </div>
  ))}
</div>
      )}
    </div>
  );
}

export default test;