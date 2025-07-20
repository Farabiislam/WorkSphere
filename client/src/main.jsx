import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/route';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './components/ui/theme-provider';
import AuthContextProvider from './context/AuthContextProvider';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
