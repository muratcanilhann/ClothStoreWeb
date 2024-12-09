import classNames from "classnames";

export default function Button({ children, label, variant, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className={classNames(
                "flex justify-center items-center", 
                {
                    "font-beatriceDisplayTrial font-medium text-l": variant === "onlyText",
                    "bg-black w-[50px] h-[50px] rounded-full": variant === "bgBlackIconSmall",
                    "bg-black text-white font-thin text-xs w-[76px] h-[50px] rounded-3xl": variant === "bgBlackTextWhite",
                    "text-gray-700 font-thin": variant === "tabDefault",
                    "text-black font-bold": variant === "activeTab"
                }
            )}
        >
            {label || children}
        </button>
    );
}
