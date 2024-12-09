import axios from "axios";

export const fetchProductList = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/products?populate=*`);
    const data = response.data.data
    return data;
}

export const fetchProductWithStockDetail = async (documentId) => {
    try {
      const [productResponse, stockResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/products/${documentId}?populate=*`),
        axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/stocks?populate=*&filters[product][documentId][$eq]=${documentId}`)
      ]);
  
      const productData = productResponse.data.data;
      const stockData = stockResponse.data.data;
  
     
      return {
        ...productData,
        stockDetails: stockData,
      };
    } catch (error) {
      console.error("Error fetching product with stock details:", error);
      throw error;
    }
  };

export const fetchProduct  = async(documentId) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/products/${documentId}?populate=*`);
    const data = response.data.data
    return data;
}



export const registerUser = async(username,email,password)=> {
    const Urls = `${import.meta.env.VITE_BACKEND_API_URL}/auth/local/register`;

    try {
        const response = await axios.post(Urls,{
            username:username,
            email:email,
            password:password
        })

        return response.data;

    } catch (error) {
        console.log("error",error);
        throw error;
    }

}


export const loginUser = async(email,password)=> {
  const Urls = `${import.meta.env.VITE_BACKEND_API_URL}/auth/local`;

  try {
      const response = await axios.post(Urls,{ 
          identifier:email,
          password:password
      })
      console.log(response.data);
      return response.data;
     

  } catch (error) {
      console.log("error",error);
      throw error;
  }

}


