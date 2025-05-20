import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About'; 
import StudentDashboard from './components/pages/studentDashbord/StudentDashbord';
import TeacherDashbord from './components/pages/teacher/TeacherDashbord';
import LoginPage from './components/pages/auth/Login';
import RegisterPage from './components/pages/auth/Register';
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

          {/* Add more routes as needed */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;
