import {Button as ChakraButton} from '@chakra-ui/button';
import {Image} from '@chakra-ui/image';
import {AddIcon} from '@chakra-ui/icons';
import {Box, Center, Flex, Heading, Link, Stack} from '@chakra-ui/layout';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import {Button, Modal} from 'components/common/_basic';
import InputForm from 'components/form/formContent/InputForm';
import TextareaForm from 'components/form/formContent/TextareaForm';
import useGroupQuestList from 'hooks/api/useGroupQuestList';
import useAuth from 'hooks/auth/useAuth';
import useDeletePost from 'hooks/post/useDeletePost';
import useQuestForm from 'hooks/quest/useQuestForm';
import useModal from 'hooks/useModal';
import React from 'react';
import {colors} from 'style';
import {UserInfo} from 'types/auth';
import {SpecificGroupInfo} from 'types/group';
import {PostInfo} from 'types/post';
import {QuestInfo} from 'types/quest';
import refresh from 'utils/refresh';
import LoadingTab from './LoadingTab';

const PostMorePop = (props: {postInfo: PostInfo; userInfo?: UserInfo}) => {
  const {postInfo, userInfo} = props;
  const {deletePost, isDeleting} = useDeletePost();

  if (!userInfo || userInfo._id !== postInfo.author._id) {
    return null;
  }

  if (isDeleting) {
    return <LoadingSpinner />;
  }

  return (
    <Popover placement='bottom-end'>
      <PopoverTrigger>
        <Button
          width='24px'
          height='24px'
          variant='ghost'
          padding='0'
          margin='0'
        >
          <Image src='/images/more_button.svg' alt='more' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding='0'>
          <Button
            onClick={() => {
              deletePost(postInfo);
            }}
            variant='ghost'
            width='full'
            padding='0'
            margin='0'
            height='48px'
            color='#ff5847'
          >
            ????????????
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const AddQuestModal = (props: {groupId: string}) => {
  const {onClose} = useModal('addQuest');
  const {
    resetQuestForm,
    onTitleChange,
    onContentsChange,
    onSubmitClick,
    title,
    contents,
    isSubmitable,
    isCreating,
  } = useQuestForm(['title', 'contents', 'badges'], props.groupId, () => {
    onClose();
    resetQuestForm();
    refresh();
  });

  return (
    <Modal title='????????? ????????????' stateKey='addQuest'>
      <Stack spacing='20px'>
        <InputForm
          onChange={onTitleChange}
          value={title}
          label='??????'
          placeholder='????????? ??????????????????'
        />
        <TextareaForm
          onChange={onContentsChange}
          value={contents}
          label='?????? ??????'
          placeholder='????????? ??????????????????'
          resize='none'
          height='180px'
        />
      </Stack>
      <Box color='#666'>???????????? ????????? 5????????? ????????? ???????????????.</Box>
      <Button
        onClick={onSubmitClick}
        height='52px'
        width='full'
        marginTop='32px'
        disabled={!isSubmitable}
        isLoading={isCreating}
      >
        ????????????
      </Button>
    </Modal>
  );
};

const Quest = (props: {questInfo: QuestInfo}) => {
  const {questInfo} = props;
  return (
    <Link href={`/quest/${questInfo._id}`}>
      <Box
        borderRadius='4px'
        borderColor={colors.mainGray[0]}
        borderWidth='1px'
        padding='20px'
        position='relative'
        overflow='hidden'
      >
        <Heading fontSize='16px'>{questInfo.title}</Heading>
        <Box className='questContents' color='#666' marginTop='8px'>
          {questInfo.contents}
        </Box>
        <Flex className='questFooter' fontSize='12px' marginTop='18px'>
          <Box marginRight='4px'>?????? ?????? ??????</Box>
          <Box fontWeight='bold'>{questInfo.users.ongoing.length}???</Box>
        </Flex>
        {!questInfo.isActive && (
          <Center
            position='absolute'
            top='0'
            left='0'
            height='full'
            width='full'
            color={colors.white}
            fontWeight='bold'
            fontSize='20px'
            backgroundColor='rgba(0,0,0,0.6)'
          >
            ????????? ??????????????????.
          </Center>
        )}
      </Box>
    </Link>
  );
};

const QuestContainer = (props: {questList: QuestInfo[]; label: string}) => {
  const {questList, label} = props;

  return (
    <Box>
      <Heading fontSize='18px'>{`${label} ${questList.length}???`}</Heading>
      <Stack spacing='16px' marginTop='24px'>
        {questList.map((item, index) => (
          <Quest key={index} questInfo={item} />
        ))}
      </Stack>
    </Box>
  );
};

const QuestTab = (props: {groupInfo: SpecificGroupInfo}) => {
  const {groupInfo} = props;
  const {questList, isLoading} = useGroupQuestList(groupInfo.id);
  const {userData} = useAuth();
  const {onOpen} = useModal('addQuest');

  if (isLoading) {
    return <LoadingTab />;
  }

  return (
    <Box position='relative'>
      <Stack spacing='48px' paddingX='16px' paddingY='24px'>
        <QuestContainer
          questList={questList.filter((item) => {
            return item.users.ongoing.some((user) => user._id === userData._id);
          })}
          label='???????????? ?????????'
        />
        <QuestContainer
          questList={questList.filter((item) => {
            return (
              item.users.ongoing.every((user) => user._id !== userData._id) &&
              item.users.completion.every((user) => user._id !== userData._id)
            );
          })}
          label='????????? ?????????'
        />
        <QuestContainer
          questList={questList.filter((item) => {
            return !item.isActive;
          })}
          label='????????? ?????????'
        />
      </Stack>
      <ChakraButton
        onClick={onOpen}
        leftIcon={<AddIcon />}
        variant='ghost'
        position='absolute'
        right='16px'
        top='16px'
      >
        ????????? ????????????
      </ChakraButton>
      <AddQuestModal groupId={groupInfo._id} />
    </Box>
  );
};

export default QuestTab;
