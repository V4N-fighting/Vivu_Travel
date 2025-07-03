import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

/**
 * Custom hook để fetch data từ API bằng Axios
 * @param url Đường dẫn API cần fetch
 */
export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: true,
  });

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source(); // Tạo token để huỷ request nếu component unmount

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, { cancelToken: source.token });

        if (isMounted) {
          setState({ data: response.data, loading: false, error: false });
        }
      } catch (err) {
        if (isMounted) {
          const error = err as AxiosError;
          setState({ data: null, loading: false, error: true });
        }
      }
    };

    fetchData();


    return () => {
      isMounted = false;
      source.cancel("Request canceled because component unmounted.");
    };
  }, [url]);

  return state;
}
