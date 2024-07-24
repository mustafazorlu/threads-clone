import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comments = () => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src="/zuck-avatar.webp" size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex
                        w={"full"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Text fontSize="sm" fontWeight="bold">
                            mark
                        </Text>
                    </Flex>
                    <Text>text</Text>
                </Flex>
            </Flex>
            {/* {!lastReply ? <Divider /> : null} */}
        </>
    );
};

export default Comments;
