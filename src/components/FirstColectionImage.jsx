export default function FirstColectionImage({img,alt,...props}){
    return(
        <button> 
        <img className="w-[366px] h-auto  " {...props} src={img} alt={alt} />
      </button>
    )
}