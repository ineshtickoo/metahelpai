import { Box, Button, Flex, Image, Input, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai';
import React from 'react'
import { repliesAtom, ReplyData } from './Replies';

async function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function PromptInput() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const toast = useToast()
  const [_replies, setReplies] = useAtom(repliesAtom)

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      if (prompt === "") {
        return {
          success: false,
          errorMsg: "Please enter a prompt"
        }
      }

      const resp = await fetch("http://127.0.0.1:5000/get_pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({ prompt }),
      })
      const data = await resp.json()

      return {
        success: true,
        reply: data
      };
    },
    onSuccess: ({ success, reply, errorMsg }) => {
      if (success) {
        setReplies((replies) => [...replies, {
          id: reply?.id ?? "",
          prompt: reply?.prompt ?? "",
          reply: reply?.reply ?? "",
          images: reply?.images ?? []
        }]);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        toast({
          status: "error",
          title: "Error",
          description: errorMsg,
          position: "top-right"
        });
      }
    }
  });

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus()
      inputRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [inputRef, mutation.isLoading])

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(inputRef.current?.value ?? "");
      }}>
      <Flex alignItems="center" columnGap={3}>
        <Flex
          bg="brand.bglight"
          w="full"
          h="50px"
          p={"10px"}
          columnGap={2}
          border="2px solid"
          borderColor="brand.borderlight"
          rounded="full"
          transition="border 0.2s ease"
          _focusWithin={{
            // borderColor: "purple.600",
            borderColor: "#00000060",
          }}>
          <Image src="/logo-icon.png" h="full" w="auto" />
          <Input
            ref={inputRef}
            type="text"
            p={0}
            h="100%"
            bg="none"
            border="none"
            fontSize="md"
            color="gray.800"
            placeholder="how to heal burns from a campfire with no burn cream?"
            _placeholder={{ color: "gray.500" }}
            _focus={{ boxShadow: "none !important", border: "none !important", outline: "none !important" }}
            _active={{ boxShadow: "none !important", border: "none !important", outline: "none !important" }}
            disabled={mutation.isLoading}
          />
        </Flex>

        <Button
          type="submit"
          colorScheme="gray"
          rounded="full"
          h="50px"
          px={6}
          fontSize="sm"
          textTransform="uppercase"
          color="gray.600"
          letterSpacing={"0.5px"}
          fontWeight="bold"
          isLoading={mutation.isLoading}
          disabled={mutation.isLoading}>
          {/* onClick={() => mutation.mutate(inputRef.current?.value ?? "")}> */}
          Submit
        </Button>
      </Flex>
    </form >
  )
}

export default PromptInput