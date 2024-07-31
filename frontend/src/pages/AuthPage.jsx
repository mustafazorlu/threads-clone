import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";
import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);

    return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
