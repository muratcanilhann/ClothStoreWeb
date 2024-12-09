import lastPhoto from "../assets/LastPhotos.png";


export default function ExplanationCard(){
    return(
        <div id="lastCont" className="flex flex-col   mt-36 items-center">
        <h2 className="text-center text-6xl">OUR APPROACH TO FASHION DESIGN</h2>
    
        <p className="text-center font-light tracking-[2px] max-w-[685px] max-h-[96px] mt-4">
            At Elegant Vogue, we blend creativity with craftsmanship to create fashion 
            that transcends trends and stands the test of time. Each design is meticulously 
            crafted, ensuring the highest quality and exquisite finish.
        </p>
    
    
        <div id="images" className="h-[493px] w-full gap-[36px]  flex justify-center overflow-hidden ">
            
                <img src={lastPhoto} className="w-[317px] h-[419px] " alt="" />
                <img src={lastPhoto} className="w-[317px] h-[419px] self-end " alt="" />
                <img src={lastPhoto} className="w-[317px] h-[419px] " alt="" />
    
               
            
                </div>
    
    
    
    
    </div>
    )
}