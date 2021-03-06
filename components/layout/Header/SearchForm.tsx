import React, {useEffect} from 'react';
import {CloseIcon, Search2Icon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import {colors} from 'style';
import multiplyColors from 'utils/style/multiplyColors';
import useSearchForm from 'hooks/search/useSearchForm';
import {useRouter} from 'next/dist/client/router';

const searchFormStyle = {
  backgroundColor: colors.panelGray,
  _hover: {backgroundColor: multiplyColors(colors.panelGray, colors.panelGray)},
  _focus: {
    backgroundColor: colors.white,
    borderColor: colors.mainBlue[1],
  },
  _placeholder: {
    color: colors.mainGray[0],
  },
};

const SearchForm = (props: {onOpen: () => void; onClose: () => void}) => {
  const router = useRouter();
  const params: any = router.query;
  const {onOpen} = props;
  const [keyword, setKeyword] = React.useState('');
  const {search} = useSearchForm(keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleReset = () => {
    setKeyword('');
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    if (params.keyword) {
      setKeyword(params.keyword);
    }
  }, [params.keyword]);

  return (
    <Box className='searchFormWrapper' width='340px' height='36px'>
      <InputGroup className='searchInput'>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
        >
          <Search2Icon color='gray.400' />
        </InputLeftElement>
        <Input
          onClick={onOpen}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          variant='filled'
          borderRadius='full'
          placeholder='찾으시는 모임이 있으신가요?'
          value={keyword}
          {...searchFormStyle}
        />
        <InputRightElement {...(keyword === '' && {display: 'none'})}>
          <Button
            opacity='1'
            onClick={handleReset}
            borderRadius='full'
            colorScheme='blackAlpha'
            variant='solid'
            size='xs'
          >
            <CloseIcon boxSize='2' />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchForm;
