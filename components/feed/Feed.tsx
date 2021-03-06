import {Box, Flex, Heading, HStack, Stack, Text} from '@chakra-ui/react';
import CardBox from 'components/common/CardBox';
import React from 'react';
import {colors} from 'style';
import {FeedInfo} from 'types/domain';
import TextFeed from './type/TextFeed';

const FeedWrapper = (props: {children?: React.ReactNode}) => {
  return (
    <CardBox className='feedWrapper' paddingX='12px' paddingY='20px'>
      {props.children}
    </CardBox>
  );
};

const FeedContent = (props: {feed: FeedInfo}) => {
  switch (props.feed.type) {
    case 'Text':
      return <TextFeed feed={props.feed} />;
    default:
      return null;
  }
};

const FeedTitle = (props: {title: string}) => {
  return (
    <Heading size='sm' marginBottom='2'>
      {props.title}
    </Heading>
  );
};

const FeedFooter = (props: {feed: FeedInfo}) => {
  return (
    <Stack spacing={1} color={colors.minorTextGray}>
      <Text fontSize='xs'>
        {`${props.feed.group_name} · ${props.feed.user_nickname}`}
      </Text>
      <HStack spacing={3}>
        <IconAndNumber icon='heart' number={props.feed.like} />
        <IconAndNumber icon='message' number={props.feed.comment} />
      </HStack>
    </Stack>
  );
};

const IconAndNumber = (props: {icon: string; number: number}) => {
  return (
    <HStack spacing={1}>
      <Box
        boxSize='16px'
        background={`no-repeat center url(/icons/${props.icon}.svg)`}
      />
      <Text fontSize='xs'>{props.number}</Text>
    </HStack>
  );
};

const Feed = (props: {feed: FeedInfo}) => {
  return (
    <FeedWrapper>
      <Flex
        height='125px'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box>
          <FeedTitle title={props.feed.title} />
          <FeedContent {...props} />
        </Box>
        <FeedFooter {...props} />
      </Flex>
    </FeedWrapper>
  );
};

export default Feed;
