import {useRouter} from 'next/dist/client/router';

const usePageMove = () => {
  const router = useRouter();

  const pageMove = (url: string) => {
    router.push(url);
  };

  const pageMoveWithRedirect = (url: string) => {
    router.push({
      pathname: url,
      query: {redirect: window.location.pathname},
    });
  };

  const getRedirect = () => {
    const {redirect} = router.query;
    return redirect as string | undefined;
  };

  const pageRedirect = (url: string) => {
    router.replace(url);
  };

  const pageRedirectWithRedirect = (url: string) => {
    router.replace({
      pathname: url,
      query: {redirect: window.location.pathname},
    });
  };

  return {
    pageMove,
    pageRedirect,
    pageMoveWithRedirect,
    getRedirect,
    pageRedirectWithRedirect,
  };
};

export default usePageMove;
