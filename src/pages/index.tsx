import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { ModalAddImage } from '../components/Modal/AddImage';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    const data = await api.get('/api/images', { params: { after: pageParam } });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage, pages) => lastPage.data.after,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const images = data?.pages?.map(page => {
      return page?.data?.data;
    });

    return images?.flat();
  }, [data]);

  return isLoading ? (
    // TODO RENDER LOADING SCREEN
    <Loading />
  ) : isError ? (
    // TODO RENDER ERROR SCREEN
    <Error />
  ) : (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {
          hasNextPage ? (
            <Button
              mt="12"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Carregando...'
                : hasNextPage
                  ? 'Carregar mais'
                  : null
              }
            </Button>
          ) : null
        }
      </Box>
    </>
  );
}