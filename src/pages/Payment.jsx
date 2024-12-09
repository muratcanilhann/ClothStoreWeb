import { useBasket } from "../context/BasketContext"
import photo1 from "./../assets/Kıyafet1.png"

export default function Payment(){
  const { items } = useBasket();
    return(
        <div className="flex justify-evenly  bg-noisy-background pt-10 max-lg:flex-col items-center gap-20">
            <div >

            <div id="paymentForm" className="font-beatriceDisplayTrial max-w-[468px]">
            <h2 className="text-3xl font-bold">CHECKOUT</h2>
            <ul className="text-[#8A8A8A]  flex gap-[36px]">
                <li >INFORMATION</li>
                <li>SHIPPING</li>
                <li>PAYMENT</li>
            </ul>
            <p className="mt-[60px]">CONTACT INFO</p>
            <form action="">
            <input type="email" placeholder="Email"
            className="w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

<input type="phone" placeholder="Phone"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

        <h2 className="text-xl">SHIPPING ADRESS</h2>
          
          <div className="flex gap-3">
        <input type="text" placeholder="First Name"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

<input type="text" placeholder="Last Name"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />
          
          </div>

          <input type="text" placeholder="Country"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

<input type="text" placeholder="State/Region"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

<input type="text" placeholder="Adres"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />



<div className="flex gap-3">
        <input type="text" placeholder="City"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />

<input type="text" placeholder="Postal Code"
            className="mt-[12px] w-full border-[1px]
            border-solid border-[#D9D9D9]
            pl-4 p-3
    ]" />
          
          </div>
        <div>
          <button type="submit" className="w-[231px]
          h-[44px] bg-[#D9D9D9] max-lg:w-full mt-5">
            Shipping
          </button>
          </div>
            </form>

        </div>
       </div>

        <div>




        <div className="w-[406px] h-[538px] border-[#D9D9D9] border-solid border-[1px] font-beatriceDisplayTrial p-10">
      <h2 className="font-bold">YOUR ORDER</h2>

      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.documentId} id="orderCard" className="flex gap-3 mb-4"> 
            <img
              src={`${import.meta.env.VITE_BACKED_URL}${item.image?.[0]?.url || photo1}`}
              className="w-[113px] h-[134px]"
              alt={item.name}
            />

            <div className="w-full flex flex-col">
              <div className="flex justify-between">
                <h3 className="text-xs font-bold">{item.name}</h3>
                <a href="" className="text-xs underline">
                  Change
                </a>
              </div>

              <div>
                <h4 className="text-[10px]">{`${item.color} / ${item.size}`}</h4>
              </div>

              <div className="flex justify-between mt-auto">
                <p>({item.quantity})</p>
                <p>${item.price}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No items in the basket</p>
      )}
    </div>





        </div>

       </div>
    )
}