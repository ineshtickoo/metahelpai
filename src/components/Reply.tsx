import React from 'react'
import { Box, Flex, Image, Text, Icon, IconButton } from '@chakra-ui/react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import type { ReplyData } from './Replies'
import HTMLFlipBook from "react-pageflip";
import { Sniglet } from '@next/font/google';
import axios from 'axios';

interface Page{
  text: string;
  image: string;

}

interface MyBookProps{
  pages: Page;
}


const Reply: React.FC<ReplyData> = ({prompt, reply, images }) => {
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);
  // const [pages, setPages] = React.useState([{'sentence': '', "image": ''}]);
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
  const pages = [
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-joiGI07flksecyKJRcS4izTt.png?st=2023-01-29T15%3A25%3A12Z&se=2023-01-29T17%3A25%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T16%3A25%3A12Z&ske=2023-01-30T16%3A25%3A12Z&sks=b&skv=2021-08-06&sig=Sjpe7BQliMKMKIFucwoExFHar7e8GCwmhE5pPccmN6E%3D",
        "sentence": "Once there was a dog named Rex."
    },
    {
        "image": "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
        "sentence": "He loved to go for long walks and play fetch with his owners."
    },
    {
        "image": "https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=iQEwihUn",
        "sentence": "He was always so happy and full of energy."
    },
    {
        "image": "https://static01.nyt.com/images/2022/05/10/science/28DOGS-BEHAVIOR1/28DOGS-BEHAVIOR1-mobileMasterAt3x.jpg",
        "sentence": "One day, Rex got lost and his owners searched everywhere for him."
    },
    {
        "image": "https://i.natgeofe.com/n/187b3223-0b45-4aa5-ae5c-24793dd2d6cb/01-german-shepherd-coronavirus-bwtkdt.jpg",
        "sentence": "Fortunately, they found him and were so relieved to have their beloved dog back home."
    }
]
  // axios.post('http://127.0.0.1:5000/get_pages', prompt)
  //   .then(response => {
  //    setPages(response.data);
  //     // you can now use the pages array in your react component
  //   })
  //   .catch(error => {
  //     console.log(error);
  // });

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
  
      <HTMLFlipBook className='flipbook' width={300} height={500}>
        {pages.map((page, i) => (
          <div className='page' key={i}>
            <Image src={page.image} h="280" w="auto" />
            <Text className="pp">{page.sentence}</Text>
          </div>
        ))}
      </HTMLFlipBook>        
    </Box>
  )
}

export default Reply