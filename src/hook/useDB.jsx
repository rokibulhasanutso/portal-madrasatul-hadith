import { useState, useEffect, useCallback } from "react";
import supabase from "../supabase/config";

const useDB = ({ table, column = "*", filter = null }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from(table)
      .select(column)
      .order("id", { ascending: true });

    if (filter && filter.column && filter.value) {
      query = query.eq(filter.column, filter.value);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      setError(error);
    } else {
      setData(data);
    }

    setLoading(false);
  }, [table, column, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => fetchData();

  return { data, error, loading, refresh };
};

export default useDB;
