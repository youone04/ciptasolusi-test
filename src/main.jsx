import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from '@/pages/Homepage';
import ReviewPage from '@/pages/ReviewPage';
import DashboardAdminpages from '@/pages/DashboardAdminpages';
import ViewComponent from '@/pages/ViewComponent';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/dashboard" element={<DashboardAdminpages />} />
        <Route path="/view-component" element={<ViewComponent />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
