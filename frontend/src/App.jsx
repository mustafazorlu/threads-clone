import "./App.css";
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import HomePage from "./pages/HomePage";

function App() {
    const user = useRecoilValue(userAtom);
    return (
        <>
            <Container maxW={"620px"}>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={user ? <HomePage /> : <Navigate to={"/auth"} />}
                    />
                    <Route path="/:username" element={<UserPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/:username/post/:pid" element={<PostPage />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
