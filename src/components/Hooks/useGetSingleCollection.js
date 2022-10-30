import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useGetSingleCollection = () => {
  const { collectionID, userId } = useParams();

  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    fetchedCollection: {},
    fetchedUrl: ''
  });

  const fn = async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .get(`http://localhost:3001/profile/${userId}/edit/${collectionID}`)
      .then((res) => {
        let collection;
        let url;
        if (res.data) {
          collection = res.data.collection;
          url = res.data.singleImageUrl;
    
        }
        setState({
          isLoading: false,
          error: '',
          fetchedCollection: collection,
          fetchedUrl: url,
        });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default useGetSingleCollection;
