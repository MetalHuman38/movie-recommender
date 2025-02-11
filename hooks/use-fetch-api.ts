import { useState, useEffect, useMemo, useRef } from "react";
import axiosInstance from "@/axiosConfig";
import isEqual from "lodash/isEqual";

export const useFetchAPI = (
  apiPath: string,
  queryParams: Record<string, any> = {}
) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // ✅ Default to false
  const [error, setError] = useState<string | null>(null);

  // Use a ref to store the previous queryParams
  const prevQueryParamsRef = useRef<Record<string, any>>({});

  // Deep compare queryParams and memoize them
  const memoizedQueryParams = useMemo(() => {
    if (typeof queryParams !== "object") {
      setError("Query parameters must be an object");
      return {};
    }

    // Compare current and previous queryParams
    if (isEqual(prevQueryParamsRef.current, queryParams)) {
      return prevQueryParamsRef.current;
    }

    // Update the ref with the new queryParams
    prevQueryParamsRef.current = queryParams;
    return queryParams;
  }, [queryParams]);

  useEffect(() => {
    if (!apiPath) {
      setError("API path is required");
      return;
    }

    // Skip select API calls if query is empty
    if (memoizedQueryParams.query === "") {
      setData(null); // Clear previous data
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(`🚀 Fetching API: ${apiPath} with`, memoizedQueryParams);

        const response = await axiosInstance.get(apiPath, {
          params: memoizedQueryParams,
        });

        console.log("✅ API Response:", response.data);

        if (response.status === 200) {
          setData(response.data);
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (err: any) {
        console.error("❌ API Fetch Error:", err);
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiPath, memoizedQueryParams]);

  return { data, isLoading, error };
};
