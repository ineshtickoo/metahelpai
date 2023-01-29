import React from 'react'
import { Box, Divider, Flex } from '@chakra-ui/react';
import Reply from './Reply';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtom } from "jotai";

export type ReplyData = {
  id: string,
  prompt: string,
  reply: string,
  images: string[]
}

export const repliesAtom = atom<ReplyData[]>([
  // {
  //   "id": "d650dbd3-4d08-49e4-9634-5aaf3ce62547",
  //   "prompt": "How to apply a torniquet to a disabled person?",
  //   "reply": "Tourniquets should only be used in life-threatening situations where bleeding cannot be controlled by other means. If a disabled person has a bleeding limb, it is important to first assess their ability to communicate and understand instructions. If they are able to understand and cooperate, provide them with clear instructions on how to apply the tourniquet to the affected limb. If the person is unable to assist, it may be necessary to have another person help you or call for emergency medical services. When applying a tourniquet, it should be placed directly above the wound and tightened until bleeding stops. It is important to note that tourniquets should only be left in place for a maximum of two hours, as prolonged use can lead to tissue damage.",
  //   "images": ["https://i.imgur.com/DGMw9wE.png"]
  // },
  // {
  //   id: "1a82f3db-93f1-4f67-933e-c304ef2afc10",
  //   prompt: "What if they are retarded?",
  //   reply: "Tourniquets should only be used in life-threatening situations where bleeding cannot be controlled by other means. If a disabled person has a bleeding limb, it is important to first assess their ability to communicate and understand instructions. If they are able to understand and cooperate, provide them with clear instructions on how to apply the tourniquet to the affected limb. If the person is unable to assist, it may be necessary to have another person help you or call for emergency medical services. When applying a tourniquet, it should be placed directly above the wound and tightened until bleeding stops. It is important to note that tourniquets should only be left in place for a maximum of two hours, as prolonged use can lead to tissue damage.",
  //   images: ["https://i.imgur.com/DGMw9wE.png"]
  // }
]);

function Replies() {
  const [replies] = useAtom(repliesAtom);

  return replies.length === 0
    ? (<></>)
    : (
      <Flex
        flexDir="column"
        rowGap={10}
        p={6}
        w="full"
        rounded="3xl"
        border="2px solid"
        borderColor="brand.borderlight"
        bg="brand.bglight">
        {replies.map((reply, i) => (
          <React.Fragment key={i}>
            <Reply {...reply} />
            {i !== replies.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Flex>
    );
}

export default Replies