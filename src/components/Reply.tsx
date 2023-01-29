import React from 'react'
import { Box, Flex, Image, Text, Icon, IconButton } from '@chakra-ui/react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import type { ReplyData } from './Replies'
import HTMLFlipBook from "react-pageflip";
import { Sniglet } from '@next/font/google';


interface Page{
  text: string;
  image: string;

}

const pages = [{'sentence': 'I love the smell of coffee in the morning.', 'image': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-QICNRrVF35xyCbutpY6JKnkz.png?st=2023-01-29T08%3A00%3A20Z&se=2023-01-29T10%3A00%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A35%3A07Z&ske=2023-01-29T23%3A35%3A07Z&sks=b&skv=2021-08-06&sig=IcUcemeBSPZZsF9hYc8JkITyLYDHsIvFd9WZKFS9Cqk%3D'}, {'sentence': "It's my favorite part of the day.", 'image': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-7W55qXYJpZ2sfGjS8QARcqt2.png?st=2023-01-29T08%3A00%3A26Z&se=2023-01-29T10%3A00%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A36%3A26Z&ske=2023-01-29T23%3A36%3A26Z&sks=b&skv=2021-08-06&sig=45gelSRJ36Gu4NzPz/iVhBElQ/rGkaMh0TFvw7IPuVk%3D'}, {'sentence': 'Every morning I make a cup, sit down, and take a moment to appreciate the aroma and flavor of the perfect cup of coffee.', 'image': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-UGjoxiSkD3aAX76uXyylwv4A.png?st=2023-01-29T08%3A00%3A31Z&se=2023-01-29T10%3A00%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A35%3A24Z&ske=2023-01-29T23%3A35%3A24Z&sks=b&skv=2021-08-06&sig=ATfrJ9ubWg0BD8JEF05S8hNlG1vzq5KrJODslDCfo60%3D'}, {'sentence': "It's my little ritual that I look forward to every day.", 'image': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-rBSC6cMLiVJjqb8di4Gs5VX3.png?st=2023-01-29T08%3A00%3A37Z&se=2023-01-29T10%3A00%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A36%3A48Z&ske=2023-01-29T23%3A36%3A48Z&sks=b&skv=2021-08-06&sig=6%2BPWbBvAAi%2BDe2VKjp1BNNvcITJbAv/a0FF%2BFzRCMYw%3D'}]


interface MyBookProps{
  pages: Page;
}


const Reply: React.FC<ReplyData> = ({ prompt, reply, images }) => {
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);

  const like = () => {
    setLiked(true)
    setDisliked(false)
  }

  const reset = () => {
    setLiked(false)
    setDisliked(false)
  }

  const dislike = () => {
    setLiked(false)
    setDisliked(true)
  }

  return (
    <Box>
      <Flex
        alignItems="center">
        <Image src="/logo-icon.png" h="26px" w="auto" />
        <Text
          ml={3}
          fontWeight="bold"
          fontSize="lg"
          color="gray.700"
        >
          {prompt}
        </Text>
      </Flex>

      <Flex alignItems="flex-start" mt={3} columnGap={4}>
        
        <Flex
          flexDir="column"
          rowGap={2}
          justifyContent="center"
          alignItems="center">
          <IconButton
            colorScheme='gray'
            bg="none"
            aria-label='Like'
            icon={liked
              ? <Icon as={AiFillLike} boxSize="30px" color="gray.700" />
              : <Icon as={AiOutlineLike} boxSize="30px" color="gray.400" />}
            onClick={liked ? reset : like}
          />
          <IconButton
            colorScheme='gray'
            bg="none"
            aria-label='Dislike'
            icon={disliked
              ? <Icon as={AiFillDislike} boxSize="30px" color="gray.700" />
              : <Icon as={AiOutlineDislike} boxSize="30px" color="gray.400" />}
            onClick={disliked ? reset : dislike}
          />
        </Flex>
      </Flex>
      <HTMLFlipBook width={300} height={500}>
        {pages.map((page, i) => (
          <div key={i}>
            <Text>{page.sentence}</Text>
            <Image src={page.image} h="200px" w="auto" />
          </div>
        ))}
      </HTMLFlipBook>        
    </Box>
  )
}

export default Reply