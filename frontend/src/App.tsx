import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/common/Nav";
import Quiz from "./pages/Quiz";
import QuizDetail from "./pages/QuizDetail"; 
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail"
import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      {/* 네비게이션 바 */}
      <Nav />
      
      {/* 라우트 설정 */}
      <Routes>
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:communityId" element={<CommunityDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
