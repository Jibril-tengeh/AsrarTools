import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { UserDashboard } from './pages/user/UserDashboard';
import { ToolPage } from './pages/user/ToolPage';
import './i18n/config';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/tool/:id" element={<ToolPage />} />
            {/* Admin routes will be injected here upon request */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
