'use client'

import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

export default function EditorComponent() {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                HTMLAttributes: {
                    className: "inline-flex items-center gap-x-1 text-blue-500 decoration-2 hover:underline font-medium",
                },
            }),
            Underline,
        ],
        content: '',
    });

    const handleAction = (action: string) => {
        if (!editor) return;


        switch (action) {
            case 'bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'underline':
                editor.chain().focus().toggleUnderline().run();
                break;
            case 'strike':
                editor.chain().focus().toggleStrike().run();
                break;
            case 'ol':
                editor.chain().focus().toggleOrderedList().run();
                break;
            case 'ul':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'blockquote':
                editor.chain().focus().toggleBlockquote().run();
                break;
            case 'code':
                editor.chain().focus().toggleCode().run();
                break;
            default:
                break;
        }
    };

    if (!editor) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-300 bg-white">
                <div id="hs-editor-tiptap">
                    <div className="m-1 flex items-center gap-0.5 rounded-lg bg-gray-100 p-1">
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"

                            onClick={() => { handleAction('bold') }}
                        >
                            <svg
                                width="20px"
                                height="20px"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M12 11.6667H8M12 11.6667C12 11.6667 15.3333 11.6667 15.3333 8.33333C15.3333 5.00002 12 5 12 5C12 5 12 5 12 5H8.6C8.26863 5 8 5.26863 8 5.6V11.6667M12 11.6667C12 11.6667 16 11.6667 16 15.3333C16 19 12 19 12 19C12 19 12 19 12 19H8.6C8.26863 19 8 18.7314 8 18.4V11.6667"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-italic
                        >
                            <svg
                                width="20px"
                                height="20px"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M11 5L14 5M17 5L14 5M14 5L10 19M10 19L7 19M10 19L13 19"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-underline
                        >
                            <svg
                                width="20px"
                                height="20px"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M16 5V11C16 13.2091 14.2091 15 12 15V15C9.79086 15 8 13.2091 8 11V5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M6 19L18 19"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-strike
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M3 12L21 12"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M16.2857 3L10.068 3C7.82129 3 6 4.82129 6 7.06797C6 8.81895 7.12044 10.3735 8.78157 10.9272L12 12M6 21H13.932C16.1787 21 18 19.1787 18 16.932C18 16.2409 17.8255 15.5804 17.512 15"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>

                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-ol
                        >
                            <svg
                                width="20px"
                                height="20px"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M8 6L20 6"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M4 6.01L4.01 5.99889"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M4 12.01L4.01 11.9989"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M4 18.01L4.01 17.9989"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M8 12L20 12"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M8 18L20 18"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-ul
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M9 5L21 5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M5 7L5 3L3.5 4.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M5.5 14L3.5 14L5.40471 11.0371C5.46692 10.9403 5.50215 10.8268 5.47709 10.7145C5.41935 10.4557 5.216 10 4.5 10C3.50001 10 3.5 10.8889 3.5 10.8889C3.5 10.8889 3.5 10.8889 3.5 10.8889L3.5 11.1111"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M4 19L4.5 19C5.05228 19 5.5 19.4477 5.5 20V20C5.5 20.5523 5.05228 21 4.5 21L3.5 21"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M3.5 17L5.5 17L4 19"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M9 12L21 12"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M9 19L21 19"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-hs-editor-code
                        >
                            <svg
                                width="20px"
                                height="20px"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path
                                    d="M13.5 6L10 18.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M6.5 8.5L3 12L6.5 15.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M17.5 8.5L21 12L17.5 15.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>

        </>
    )
}
