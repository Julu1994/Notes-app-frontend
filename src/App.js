import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
