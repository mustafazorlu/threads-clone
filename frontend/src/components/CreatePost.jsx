import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    CloseButton,
    Flex,
    FormControl,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("");
    const imageRef = useRef();
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const { user } = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const [loading, setLoading] = useState(false);
    console.log(user);

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        } else {
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    };

    console.log(postText);

    const handleCreatePost = async () => {
        setLoading(true);
        //5:25:20 de kaldık
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postedBy: user._id,
                    text: postText,
                    img: imgUrl,
                }),
            });
            const data = await res.json();

            console.log(data);

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            onClose();
            setPostText("");
            setImgUrl("");

            showToast("Success", "Post created successfully", "success");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Textarea
                                placeholder="post content goes here"
                                onChange={handleTextChange}
                                value={postText}
                            />
                            <Text
                                fontSize={"xs"}
                                fontWeight={"bold"}
                                textAlign={"right"}
                                margin={1}
                                color={"gray.500"}
                            >
                                {remainingChar}/{MAX_CHAR}
                            </Text>

                            <Input
                                type="file"
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />

                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>
                        {imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imgUrl} alt="selected img" />
                                <CloseButton
                                    onClick={() => {
                                        setImgUrl("");
                                    }}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleCreatePost}
                            isLoading={loading}
                        >
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;
