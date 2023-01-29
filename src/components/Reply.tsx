import React from 'react'
import { Box, Flex, Image, Text, Icon, IconButton } from '@chakra-ui/react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import type { ReplyData } from './Replies'

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
        <Box flex={1}>
          <Text>
            {reply}
          </Text>
          <Flex
            mt={6}
            gap={4}
            flexWrap="wrap"
          >
            {images.map((image, i) => (
              <Image
                key={i}
                src={image}
                h="200px"
                w="auto"
              />
            ))}
          </Flex>
        </Box>
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

    </Box>
  )
}

export default Reply