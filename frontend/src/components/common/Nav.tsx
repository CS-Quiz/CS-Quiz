import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/quiz", label: "퀴즈풀기" },
    { path: "/notes", label: "오답노트" },
    { path: "/community", label: "커뮤니티" },
  ];

  return (
    <nav className="bg-white shadow-md flex items-center justify-between h-12">
      {/* 로고 */}
      <div className="bg-blue-600 px-4 h-full flex items-center">
        <Link to="/" className="text-white font-bold text-lg">
          CSQUIZ
        </Link>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-sm font-medium px-4 py-2 transition ${
                location.pathname === item.path
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* 프로필 */}
      <div
        className="flex items-center space-x-2 pr-4 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <span className="text-gray-600 text-sm">김덕배</span>
      </div>
    </nav>
  );
};

export default Nav;
