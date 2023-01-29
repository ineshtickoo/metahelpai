import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

function Intro() {
  return (
    <Box px={4}>
      <Image src="/logo.png" h="130px" w="auto" mx="auto" />
      <Text mt={6} fontSize="lg" textAlign="center">
        Get instant access to expert medical advice in any medical or emergency situation with our AI-powered, visual medical guides. Simply ask us a question we will provide you with easy-to-understand information to help you navigate any medical situation or emergency with confidence. On top of that, we can also answer specific follow-up questions, or connect you with an expert!
      </Text>
    </Box>
  )
}

export default Intro