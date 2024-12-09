import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {BasketProvider} from "./context/BasketContext.jsx"
import { FavoriteProvider } from './context/FavoritesContex.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <StrictMode>
    
    <AuthProvider>
    <FavoriteProvider>
    <BasketProvider>
    <App />
    </BasketProvider>
    </FavoriteProvider>
    </AuthProvider>
   
  </StrictMode>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
