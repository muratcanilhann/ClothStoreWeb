import { FaBeer } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function TopHeader(){

    return(
        <div className="bg-gray-100 w-full h-12 text-gray-400 px-24 font-notoSans text-sm tracking-wide">

        <ul className="flex justify-between max-lg:justify-center items-center h-full">

            <li className='max-lg:hidden'>
                <ul className="flex gap-10">
                    <li>Welcome to Our store</li>
                    <li>Call Us: 123 - 456 - 7890</li>
                </ul>
            </li>

            <li >
                <ul className="flex  gap-20">
                    <li>
                        <button className='flex h-full items-center gap-1'>
                           <FaHeart/>
                           Wishlist
                            </button>
                        </li>
                    <li>
                        <button className='flex h-full items-center gap-1'>
                           <MdAccountCircle />
                           My Account
                           </button>
                        </li>
                </ul>
            </li>
        </ul>


      </div>

    )


}
