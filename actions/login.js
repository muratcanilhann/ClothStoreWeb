import axios from "axios";

const Urls = `${process.env.NEXT_PUBLIC_BACKED_API_URL}/auth/local`

const loginUser = async(email,password)=> {

    try {
        const response = await axios.post(Urls,{
            idetifer:email,
            password:password
        })

        return response.data;

    } catch (error) {
        console.log("error",error);
        throw error;
    }

}

export default loginUser;