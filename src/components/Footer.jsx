export default function Footer(){
return(

<footer
  className="w-full h-[628px]
   flex justify-center border-t-[2px]
   border-black  font-beatriceDisplayTrial  
   bg-[#F5F5F5] bg-opacity-50 bg-noisy-background bg-blend-overlay text-[#1E1E1E] ">
    
  <div className="w-[702px] h-[250px] mt-[128px] flex justify-between">
    <div>
      <h3 className="mb-10 opacity-40">INFO</h3>
      <ul>
        <li className="opacity-70">PRICING</li>
        <li className="opacity-70">ABOUT</li>
        <li className="opacity-70">CONTACTS</li>
      </ul>

      <h3 className="mt-20 mb-10 opacity-40">LANGUAGES</h3>
      <ul>
        <li className="opacity-70">ENG/</li>
        <li className="opacity-70">TR/</li>
        <li className="opacity-70">ESP/</li>
      </ul>
    </div>
    <div>
      <h3 className="mb-10 opacity-40">TECHNOLOGIES</h3>

      <p>Logo</p>
    </div>
  </div>
</footer>
)
}