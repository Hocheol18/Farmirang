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

      // Parse the input address string and form the full address
      const addressObj = JSON.parse(address);
      const fullAddress = addressObj.areaAddress + addressObj.townAddress;

      // Geocode the address
      geocoder.addressSearch(fullAddress, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const options = {
            center: coords,
            level: 3, // Zoom level
          };

          // Create the map
          const map = new window.kakao.maps.Map(mapRef.current, options);

          // Create a marker
          const marker = new window.kakao.maps.Marker({
            position: coords,
          });

          // Place the marker on the map
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
