import lettuce from "../../../../public/icons/farms/crops-lettuce.svg"
import blueberry from "../../../../public/icons/farms/crops-blueberry.svg"
import carrot from "../../../../public/icons/farms/crops-carrot.svg"
import cheongyang from "../../../../public/icons/farms/crops-cheongyang-chili-pepper.svg"
import cherrytomato from "../../../../public/icons/farms/crops-cherry-tomato.svg"
import corn from "../../../../public/icons/farms/crops-corn.svg"
import cucumber from "../../../../public/icons/farms/crops-cucumber.svg"
import ginger from "../../../../public/icons/farms/crops-ginger.svg"
import koreamelon from "../../../../public/icons/farms/crops-korean-melon.svg"
import leek from "../../../../public/icons/farms/crops-leek.svg"
import onion from "../../../../public/icons/farms/crops-onion.svg"
import peanut from "../../../../public/icons/farms/crops-peanut.svg"
import potato from "../../../../public/icons/farms/crops-potato.svg"
import strawberry from "../../../../public/icons/farms/crops-strawberry.svg"
import sweetpotato from "../../../../public/icons/farms/crops-sweet-potato.svg"
import radish from "../../../../public/icons/farms/crops-young-radish.svg"
import Image from "next/image"

export const cropData = [
    {
      id: 1,
      name: "부추",
      image : <Image src={leek} alt="" width={55} height={55}></Image>
    },
    {
      id: 2,
      name: "상추",
      image : <Image src={lettuce} alt="" width={45} height={45}></Image>
    },
    {
      id: 3,
      name: "고추",
      image : <Image src={cheongyang} alt="" width={45} height={45}></Image>
    },
    {
      id: 4,
      name: "고구마",
      image : <Image src={sweetpotato} alt="" width={45} height={45}></Image>
    },
    {
      id: 5,
      name: "감자",
      image : <Image src={potato} alt="" width={45} height={45}></Image>
    },
    {
      id: 6,
      name: "참외",
      image : <Image src={koreamelon} alt="" width={45} height={45}></Image>
    },
    {
      id: 7,
      name: "오이",
      image : <Image src={cucumber} alt="" width={45} height={45}></Image>
    },
    {
      id: 8,
      name: "당근",
      image : <Image src={carrot} alt="" width={45} height={45}></Image>
    },
    {
      id: 9,
      name: "방울토마토",
      image : <Image src={cherrytomato} alt="" width={45} height={45}></Image>
    },
    {
      id: 10,
      name: "옥수수",
      image : <Image src={corn} alt="" width={45} height={45}></Image>
    },
    {
      id: 11,
      name: "땅콩",
      image : <Image src={peanut} alt="" width={45} height={45}></Image>
    },
    {
      id: 12,
      name: "양파",
      image : <Image src={onion} alt="" width={45} height={45}></Image>
    },
    {
      id: 13,
      name: "블루베리",
      image : <Image src={blueberry} alt="" width={45} height={45}></Image>
    },
    {
      id: 14,
      name: "열무",
      image : <Image src={radish} alt="" width={45} height={45}></Image>
    },
    {
      id: 15,
      name: "딸기",
      image : <Image src={strawberry} alt="" width={45} height={45}></Image>
    },
    {
      id: 16,
      name: "생강",
      image : <Image src={ginger} alt="" width={45} height={45}></Image>
    },
  ];
  