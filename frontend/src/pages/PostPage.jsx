import { Avatar, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Comments from "../components/Comments";

const PostPage = () => {
    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar
                        src="/zuck-avatar.webp"
                        size={"md"}
                        name="Mark Zuckerberg"
                    />
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"}>
                            mark
                        </Text>
                        <Image src="/verified.png" w="4" h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text
                        fontSize={"xs"}
                        width={36}
                        textAlign={"right"}
                        color={"gray.light"}
                    >
                        2 hours ago
                    </Text>

                    {/* {currentUser?._id === user._id && (
                        <DeleteIcon
                            size={20}
                            cursor={"pointer"}
                            onClick={handleDeletePost}
                        />
                    )} */}
                </Flex>
            </Flex>

            <Text my={3}>text</Text>

            {/* {currentPost.img && (
                <Box
                    borderRadius={6}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"gray.light"}
                >
                    <Image src="/zuck-avatar.webp" w={"full"} />
                </Box>
            )} */}

            <Flex gap={3} my={3}>
                {/* <Actions post={currentPost} /> */}
            </Flex>

            <Divider my={4} />

            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.light"}>
                        Get the app to like, reply and post.
                    </Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4} />

            <Comments/>
        </>
    );
};

export default PostPage;
