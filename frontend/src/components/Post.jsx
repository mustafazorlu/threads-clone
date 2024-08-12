/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const Post = ({ post, postedBy }) => {
    const [liked, setLiked] = useState(false);
    const showToast = useShowToast();

    //5:49:04

    useEffect(() => {
        const getUser = async () => {
            try {
                const getUser = await fetch(
                    "/api/users/profile/" + postedBy
                );
            } catch (error) {
                showToast("Error", error, "error");
            }
        };
    });
    return (
        <Link>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size={"md"}
                        name="Mark Zuckerberg"
                        src="/zuck-avatar.webp"
                    />
                    <Box w={1} h={"full"} bg={"gray.light"} my="2"></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar
                            size={"xs"}
                            name="Mark Zuckerberg"
                            src="https://bit.ly/ryan-florence"
                            position={"absolute"}
                            top={"0"}
                            left={"15px"}
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name="Mark Zuckerberg"
                            src="https://bit.ly/prosper-baba"
                            position={"absolute"}
                            bottom={"0"}
                            right={"-5px"}
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name="Mark Zuckerberg"
                            src="https://bit.ly/sage-adebayo"
                            position={"absolute"}
                            bottom={"0"}
                            left={"4px"}
                            padding={"2px"}
                        />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>
                                markzuckerberg
                            </Text>
                            <Box
                                w={0.5}
                                h={0.5}
                                borderRadius={"full"}
                                bg={"gray.light"}
                            ></Box>
                            <Image src="/verified.png" w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>
                                1d
                            </Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.postImg && (
                        <Box
                            borderRadius={6}
                            overflow={"hidden"}
                            border={"1px solid"}
                            borderColor={"gray.light"}
                        >
                            <Image src={post.img} />
                        </Box>
                    )}

                    <Actions liked={liked} setLiked={setLiked} />

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {post.replies.length} replies
                        </Text>
                        <Box
                            w={0.5}
                            h={0.5}
                            borderRadius={"full"}
                            bg={"gray.light"}
                        ></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {post.likes.length} likes
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
