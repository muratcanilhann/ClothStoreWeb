export default function ToggleButton({children,onClick}){
    return(
        <button onClick={onClick} className="max-md:hidden border-solid w-[40px] h-[40px] border-2 border-[#292929] opacity-55">{children}</button>
    )
}