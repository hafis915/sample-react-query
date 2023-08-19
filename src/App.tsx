import './App.css';
import { FC } from 'react'
import Home from './pages/home';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const  App: FC = ()  => {
  return (
    <div className="h-screen">
      <QueryClientProvider client={queryClient}>
        <Home/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
