import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { ScrollbarProvider } from './modules/scrollbar';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <HelmetProvider>
        <React.StrictMode>
          <ScrollbarProvider>
            <App />
          </ScrollbarProvider>
        </React.StrictMode>
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
