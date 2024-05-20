"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  labelcss: string;
  topScript: string;
  items: any;
  bordercss: string;
  topcss?: string;
  onChange: (value: any) => void;
  value: number;
  handleDirectionChange?: (parentValue: number) => void;
  textSmall?: string;
}

export default function SelectMenu({
  topScript,
  items,
  labelcss,
  bordercss,
  topcss,
  onChange,
  value,
  handleDirectionChange,
  textSmall,
}: Props) {
  const handleChange = (selectedItem: any) => {
    onChange(selectedItem.id);
    handleDirectionChange?.(Number(selectedItem.designId));
  };

  return (
    <Listbox value={items[value - 1]} onChange={handleChange}>
      {({ open }) => (
        <div className={topcss}>
          <Listbox.Label className={labelcss}>{topScript}</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button
              className={`relative w-full cursor-pointer rounded-lg bg-white-100 py-1 pl-3 pr-10 text-left text-black-100 shadow-sm ring-inset focus:outline-none focus:ring-2 focus:ring-green-400 sm:text-sm sm:leading-6 border ${bordercss}`}
            >
              <span className="flex items-center">
                <span
                  className={`ml-1 block truncate ${
                    textSmall ? textSmall : "text-h6"
                  } `}
                >
                  {items[value - 1].name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-black-100"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg border border-gray-300 ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item: any, idx: number) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-green-200 text-white" : "text-black-100",
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          textSmall ? textSmall : "text-lg"
                        } `
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-black-100",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
