import { Flex } from "@chakra-ui/react";
import { BsHeart } from "react-icons/bs";

const Actions = ({ liked, setLiked }) => {
    return (
        <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
            <BsHeart
                fontSize={24}
                // color={liked ? "rgb(237, 73, 86)" : ""}
                // fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                onClick={() => setLiked(!liked)}
            />
        </Flex>
    );
};

export default Actions;
