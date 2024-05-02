import Input from "../_components/common/Input";
import DatePicker from "../_components/common/SelectDate";
import SelectMenu from "../_components/common/SelectMenus";
import { GoPlus } from "react-icons/go";

export default function FarmEnroll() {
  const people = [
    {
      id: 1,
      name: "Wade Cooper",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
    },
    {
      id: 3,
      name: "Devon Webb",
    },
    {
      id: 4,
      name: "Tom Cook",
    },
    {
      id: 5,
      name: "Tanya Fox",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
    },
    {
      id: 7,
      name: "Caroline Schultz",
    },
    {
      id: 8,
      name: "Mason Heaney",
    },
    {
      id: 9,
      name: "Claudie Smitham",
    },
    {
      id: 10,
      name: "Emil Schaefer",
    },
  ];
  return (
    <div className="flex justify-center mt-20">
      <div className="space-y-12 w-1/3">
        <div className="border-b border-gray-400 pb-12">
          <h2 className="text-h1 font-semibold text-black-100">밭 등록</h2>

          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p> */}

          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full mt-10">
              <Input
                labeltext={"밭 이름"}
                topcss="mt-8"
                labelcss={"block text-h4 leading-12 text-black-100"}
                inputcss={
                  "block flex-1 border-0 bg-transparent py-1.5 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 h-[2.8rem] shadow"
                }
                placeholder={"밭 이름을 정해주세요"}
                type={"text"}
                id={"name"}
                name={"name"}
              />
            </div>
            <div className="col-span-full mt-8">
              <SelectMenu
                labelcss={"text-h4 text-black-100"}
                topScript={"꾸민 텃밭 목록"}
                items={people}
                bordercss="ring-green-300"
              />
            </div>

            <div className="col-span-full mt-8">
              <div className="block text-h4 leading-12 text-black-100">
                IoT 기기 등록
              </div>
              <div className="flex mt-2 justify-between">
                <div className="relative mt-2">
                  <div className="flex rounded-md border border-green-300 w-72">
                    <input
                      type={"text"}
                      name={"IoT"}
                      id={"IoT"}
                      className={`focus:outline-none focus:ring-green-400 focus:ring-1 "block flex-1 border-0 bg-transparent h-[2.8rem] py-1.5 pl-3 text-black-100 placeholder:text-gary-500 sm:text-sm sm:leading-6 h-10 shadow`}
                      placeholder={"IoT 기기를 등록해주세요"}
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <SelectMenu
                    labelcss={"text-h4 text-black-100"}
                    topScript={""}
                    items={people}
                    bordercss="ring-green-300"
                  />
                </div>
              </div>
              <div className="flex border border-green-300 h-10 rounded-md mt-2 justify-center cursor-pointer">
                <div className="flex flex-col justify-center">
                  <GoPlus className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="col-span-full mt-8">
              <div className="block text-h4 leading-12 text-black-100">
                경작 시작 시기
              </div>
              <div className="mt">
                <DatePicker />
              </div>
            </div>

            <div className="col-span-full mt-8">
              <div className="block text-h4 leading-12 text-black-100">
                위치
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-400 w-full">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-black-100 placeholder:text-gary-500 focus:ring-0 sm:text-sm sm:leading-6 h-10 "
                    placeholder="밭 이름을 정해주세요"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full mt-8">
              <div className="block text-h4 leading-12 text-black-100">
                텃밭 소개
              </div>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={6}
                  className="block w-full rounded-md border-0 py-1.5 text-black-100 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-l sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-1 text-[0.8rem] leading-6 text-gray-400">
                텃밭을 설명할 글을 적어주세요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div> */}
    </div>
  );
}
