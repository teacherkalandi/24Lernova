import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SchoolEducation from './pages/SchoolEducation';
import CompetitiveExams from './pages/CompetitiveExams';
import InternalPortal from './pages/InternalPortal';
import ClassPage from './pages/ClassPage';
import SubjectPage from './pages/SubjectPage';
import ChapterDetail from './pages/ChapterDetail';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <Header />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/school-education" element={<SchoolEducation />} />
              <Route path="/competitive-exams" element={<CompetitiveExams />} />
              <Route path="/internal-portal" element={<InternalPortal />} />
              <Route path="/class/:id" element={<ClassPage />} />
              <Route path="/class/:id/subject/:subjectId" element={<SubjectPage />} />
              <Route path="/class/:id/subject/:subjectId/chapter/:chapterId" element={<ChapterDetail />} />
              {/* Fallback for other routes */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
