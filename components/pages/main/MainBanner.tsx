import {Box, Image, Link} from '@chakra-ui/react';
import Banner from 'components/common/Banner';
import LoadingSpinner from 'components/common/LoadingSpinner';
import useMainBannerList from 'hooks/api/useMainBannerList';
import {BannerInfo} from 'types/domain';

const BannerItem = (props: BannerInfo) => {
  return (
    <Box>
      <Link href={props.url}>
        <Image src={props.img_url} alt='banner' />
      </Link>
    </Box>
  );
};

const MainBanner = () => {
  const {isLoading, bannerList} = useMainBannerList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Banner
      bannerItemComponent={BannerItem}
      bannerItemProps={bannerList} />
  );
};

export default MainBanner;