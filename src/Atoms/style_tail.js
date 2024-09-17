export const style_tail = (type,role) => {
    let style;
    style = type == "input" && role=="edit" && "focus:border-orange-500 w-full focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2";
    return style
}