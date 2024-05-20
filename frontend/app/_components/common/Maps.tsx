"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      // parse 데이터 받아오기
      const addressObj = JSON.parse(address);
      const fullAddress = addressObj.areaAddress + addressObj.townAddress;

      // Geocoder로 돌리기
      geocoder.addressSearch(fullAddress, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const options = {
            center: coords,
            level: 3,
          };

          // 맵 생성
          const map = new window.kakao.maps.Map(mapRef.current, options);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: coords,
          });

          marker.setMap(map);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadKakaoMap);
    }
  }, []);

  // window.kakao.maps.load(() => {
  //   const options = {
  //     // 지도 좌표
  //     center: new window.kakao.maps.LatLng(37.501286, 127.0396029),
  //     level: 3, // 확대 축소
  //   };

  //   const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

  //   const markerPosition = new window.kakao.maps.LatLng(
  //     37.501286,
  //     127.0396029
  //   );

  //   // 마커를 생성합니다
  //   var marker = new window.kakao.maps.Marker({
  //     position: markerPosition,
  //   });

  //   // 마커가 지도 위에 표시되도록 설정합니다
  //   marker.setMap(map);
  // });

  return (
    <div
      ref={mapRef}
      className={"w-full h-[300px] border border-black-100"}
    ></div>
  );
}
