import React from "react";
import { createPopper } from "@popperjs/core";

const Dropdown = ({ color, title, children }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    // bg colors
    let bgColor;
    color === "white"
        ? (bgColor = "bg-blueGray-700")
        : (bgColor = "bg-" + color + "-500");
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                    <div className="relative inline-flex align-middle w-full">
                        <button
                            className={`
                                    dropdown-toggle
                                    px-6
                                    py-2.5
                                    bg-yellow-700
                                    text-white
                                    font-medium
                                    text-xs
                                    leading-tight
                                    uppercase
                                    rounded
                                    shadow-md
                                    hover:bg-yellow-700 hover:shadow-lg
                                    focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0
                                    active:bg-yellow-800 active:shadow-lg active:text-white
                                    transition
                                    duration-150
                                    ease-in-out
                                    flex
                                    items-center
                                    whitespace-nowrap
                                    ${bgColor}`}

                            type="button"
                            ref={btnDropdownRef}
                            onClick={() => {
                                dropdownPopoverShow
                                    ? closeDropdownPopover()
                                    : openDropdownPopover();
                            }}
                        >
                            <span className="text-white">
                                {title}
                            </span>
                        </button>
                        <div
                            ref={popoverDropdownRef}
                            className={
                                (dropdownPopoverShow ? "block " : "hidden ") + "bg-yellow-700 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                            }
                            style={{ minWidth: "12rem" }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function DropdownRender({ color, title, children }) {
    return (
        <>
            <Dropdown color={color} title={title}>
                {children}
            </Dropdown>

        </>
    );
}