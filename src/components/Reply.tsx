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

const urls = ['https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-3gcALPkNmian9ydv0eKbejih.png?st=2023-01-29T06%3A11%3A29Z&se=2023-01-29T08%3A11%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A35%3A43Z&ske=2023-01-29T23%3A35%3A43Z&sks=b&skv=2021-08-06&sig=eHkYpdecUf5m0d1UkbpCd8amaUF%2BI%2BEykcYKWR%2BbI1I%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-DKMsQvTD92U4Kao2noQ84T3K.png?st=2023-01-29T06%3A11%3A34Z&se=2023-01-29T08%3A11%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A35%3A50Z&ske=2023-01-29T23%3A35%3A50Z&sks=b&skv=2021-08-06&sig=Bg%2BW6dAic/F9p5Q4ugX8Nd0SwLdDENJTEiHkK3bn3go%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-10IgaloOmAOifkdyQzn0hnix.png?st=2023-01-29T06%3A11%3A40Z&se=2023-01-29T08%3A11%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T00%3A49%3A01Z&ske=2023-01-30T00%3A49%3A01Z&sks=b&skv=2021-08-06&sig=Nl9hU5Rxbt7ccIm0MuP300Fj3GNb4Y0nIjyX2GJbzT0%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-qjWaLrl1Frh3JLp9d06qWcPJ.png?st=2023-01-29T06%3A11%3A45Z&se=2023-01-29T08%3A11%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A43%3A02Z&ske=2023-01-29T23%3A43%3A02Z&sks=b&skv=2021-08-06&sig=5oZO383i7ZlJjw//3hhQPUH4YY9wBlrGcJo2/FJSvGg%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-wKaegTEDCT9SUTe6Tn5u8eCQ.png?st=2023-01-29T06%3A11%3A51Z&se=2023-01-29T08%3A11%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T19%3A26%3A32Z&ske=2023-01-29T19%3A26%3A32Z&sks=b&skv=2021-08-06&sig=SjLWh32sIuhNZ6v1JmHSGMiyQGuXT2N7hDLlXwp8v%2BA%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-YDttCZI1sIpcULhvZEycgyvX.png?st=2023-01-29T06%3A11%3A56Z&se=2023-01-29T08%3A11%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A35%3A11Z&ske=2023-01-29T23%3A35%3A11Z&sks=b&skv=2021-08-06&sig=1KWDHpMmuHikA35FMfGMrx/8xTSgm1TG73nnE4KISvY%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-8dCa0x1kJWkQ2F3TCBrnCLdN.png?st=2023-01-29T06%3A12%3A02Z&se=2023-01-29T08%3A12%3A02Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T07%3A09%3A52Z&ske=2023-01-30T07%3A09%3A52Z&sks=b&skv=2021-08-06&sig=4J/7AOHz%2ByxbOYk6VF27njDAU9d014ZcdC9hZWAFOBs%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-uiPWnSiWUbLJvjW7xHrvUhUO.png?st=2023-01-29T06%3A12%3A08Z&se=2023-01-29T08%3A12%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A32%3A52Z&ske=2023-01-29T23%3A32%3A52Z&sks=b&skv=2021-08-06&sig=xv8nGEH6fyUc%2Ba8Sr09mfaIPCTniAHwoJrfmQTNTOns%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-ei4B7fe8U34WGttHKPUNFnNy.png?st=2023-01-29T06%3A12%3A14Z&se=2023-01-29T08%3A12%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A34%3A31Z&ske=2023-01-29T23%3A34%3A31Z&sks=b&skv=2021-08-06&sig=e0eLvgBa793F1Kb4ZrhTzcT5Ps0osnVGePQULjiUcx4%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-YrKiSzLUiwhwUgtIfdM3UGaF.png?st=2023-01-29T06%3A12%3A19Z&se=2023-01-29T08%3A12%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A33%3A33Z&ske=2023-01-29T23%3A33%3A33Z&sks=b&skv=2021-08-06&sig=nIK63TENiGLPPsFqPkmTcYfAfjHD5yU/fGVJn4Sre5c%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-xSPFz2tfStqJLPYigW4AVYAF.png?st=2023-01-29T06%3A12%3A25Z&se=2023-01-29T08%3A12%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A40%3A50Z&ske=2023-01-29T23%3A40%3A50Z&sks=b&skv=2021-08-06&sig=RiwZgfkzS8iLWwTMbdEBeqjtmRc4jF/cnfoqhKAXo6E%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-uB6fvnLQuAlZRkxnIRWCVihZ.png?st=2023-01-29T06%3A12%3A31Z&se=2023-01-29T08%3A12%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A38%3A26Z&ske=2023-01-29T23%3A38%3A26Z&sks=b&skv=2021-08-06&sig=fNmbzYTdoq1nAdICYH8vwgJnCrYxYRJ4Br9HpIsCcA8%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-s3VYNE7PSJobU8dTAdkoBFLG.png?st=2023-01-29T06%3A12%3A37Z&se=2023-01-29T08%3A12%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T06%3A18%3A37Z&ske=2023-01-30T06%3A18%3A37Z&sks=b&skv=2021-08-06&sig=/wLuRE8ylSar%2BggdgRDGMmQNN8luDIAfYBDpZRXTsOw%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0wQIDi3eJIe73MXnjXnoMAJo/user-eS3FMCemDaTv8zHmoJokZ7dz/img-L2RsXMpXiPj9muCSdxs3s6o5.png?st=2023-01-29T06%3A12%3A42Z&se=2023-01-29T08%3A12%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-28T23%3A37%3A03Z&ske=2023-01-29T23%3A37%3A03Z&sks=b&skv=2021-08-06&sig=%2BkthYENOHYaSrUkuiv3InAbZRQynutPQaS1hSsbbtBc%3D']
const sentences = ['Once upon a time there was a family of five who loved to go camping.', 'Every summer, they would pack up their car and drive to the nearby forest.', 'They would hike, fish, and explore the area.', 'One night, as they were roasting marshmallows over the campfire, the youngest son, Jack, noticed a bright light in the sky.', 'It was a shooting star!', 'He excitedly pointed it out to his family, and they all made a wish.', 'The next morning, Jack was surprised to find a mysterious box on the ground near the campfire.', 'He opened it and found a beautiful golden coin inside.', 'He was sure it was the shooting star he had seen the night before.', 'The family was amazed and excited by Jack’s discovery.', 'They all agreed that the coin must have been sent from the heavens as a reward for their wish.', 'The family decided to keep the coin as a reminder of the special night they had spent together.', 'They also used it as a reminder to be kind and generous to others, because you never know when a wish might come true.', 'Moral: Wishes can come true if you are kind and generous to others.']

const pages = [];

for (let i = 0; i < urls.length; i++) {
  pages.push({
    sentence: sentences[i],
    image: urls[i]
  })
}

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
          flexDir="row"
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