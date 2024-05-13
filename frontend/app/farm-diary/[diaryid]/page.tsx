import { FetchCalendar } from "@/api/farm_diary";

const Posts = async () => {
  const data = await FetchCalendar();
  return data.data.result.map((item : any, index : number) => <div key={index}>{JSON.stringify(item)}</div>);
};

export default Posts;