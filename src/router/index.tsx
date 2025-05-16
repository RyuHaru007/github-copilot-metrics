// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import MainLayout from '@/components/ui/layout/MainLayout'
import DashboardPage from '@/pages/DashBoardPage';
import OrganizationPage from '@/pages/OraganisationPage';
import LanguagesPage from '@/pages/LanguagesPage';
import EditorsPage from '@/pages/EditorsPage';
import CopilotChatPage from '@/pages/CopilotChatPage';
import SeatAnalysisPage from '@/pages/SeatAnalysisPage';
import ApiResponsePage from '@/pages/ApiResponsePage';
import ProtectedRoute from '@/components/common/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'organization', element: <OrganizationPage /> },
      { path: 'languages', element: <LanguagesPage /> },
      { path: 'editors', element: <EditorsPage /> },
      { path: 'copilot-chat', element: <CopilotChatPage /> },
      { path: 'seat-analysis', element: <SeatAnalysisPage /> },
      { path: 'api-response', element: <ApiResponsePage /> },
    ],
  },
  {
    path: '*', // Fallback for any other route
    element: <Navigate to="/login" replace />, // Or a dedicated 404 page within the layout if logged in
  },
]);