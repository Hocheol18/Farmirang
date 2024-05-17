"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({address} : {address : string}) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        // 지도 좌표
        center: new window.kakao.maps.LatLng(37.501286, 127.0396029),
        level: 3, // 확대 축소
      };

      const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

      const markerPosition = new window.kakao.maps.LatLng(
        37.501286,
        127.0396029
      );

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className={"w-full h-[300px] border border-black-100"}
    ></div>
  );
}
