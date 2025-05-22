import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About'; 
import StudentDashboard from './components/pages/studentDashbord/StudentDashbord';
import TeacherDashbord from './components/pages/teacher/TeacherDashbord';
import LoginPage from './components/pages/auth/Login';
import RegisterPage from './components/pages/auth/Register';
import ExamConfig from './components/ExamConfig';
import ExamsList from './components/ExamsList';
import {Profile} from './components/pages/profil/Profil';
import {ProfileStudent} from './components/pages/profil/ProfilStudent';
import StudentHelp from './components/pages/help/HelpStudent';
import TeacherHelp from './components/pages/help/Help';
import GradeExam from './components/GradeExam';
import ExamPage from './components/ExamPage';
import ExamResults from './components/ExamResults';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add more routes as needed */}
          <Route path="/about" element={<About />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashbord />} />
          <Route path="/exam-config/:examId" element={<ExamConfig />} />
          <Route path="/exam-list" element={<ExamsList />} />
          <Route path="/teacher-profile" element={<Profile />} />
          <Route path="/student-profile" element={<ProfileStudent />} />
          <Route path="/help" element={<TeacherHelp />} />
          <Route path="/student-help" element={<StudentHelp />} />
          <Route path="/grade-exam/:examId" element={<GradeExam />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/exam-results/:examId" element={<ExamResults />} />

          {/* Add more routes as needed */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;
