import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const showToast = useShowToast();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                // setLoading(true);
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }

                setUser(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [username, showToast]);

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found.</h1>;
    return (
        <>
            <UserHeader user={user} />
            <UserPost
                likes={1200}
                replies={481}
                postImg="/post1.jpg"
                postTitle="Let's talk about threads."
            />
        </>
    );
};

export default UserPage;
