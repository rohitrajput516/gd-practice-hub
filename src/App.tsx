import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  SchedulePage,
  SessionDetailsPage,
  TopicsPage,
} from './pages/PublicPagesPart1';
import {
  GuidelinesPage,
  AnnouncementsPage,
  ContactPage,
} from './pages/PublicPagesPart2';
import {
  AdminLoginPage,
  AdminDashboardOverview,
} from './pages/AdminAuthAndOverview';
import {
  AdminSessionsPage,
  AdminTopicsPage,
  AdminAnnouncementsPage,
  AdminFeedbackPage,
  AdminSettingsPage,
} from './pages/AdminManagementPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 7 Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/session" element={<SessionDetailsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 7 Admin Pages */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
        <Route path="/admin/sessions" element={<AdminSessionsPage />} />
        <Route path="/admin/topics" element={<AdminTopicsPage />} />
        <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
