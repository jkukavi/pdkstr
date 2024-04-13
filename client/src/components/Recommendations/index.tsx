import React, { useState, useEffect } from "react";

import Cards from "components/Cards";

import { getRecommendations } from "apiCalls";
import { notify } from "components/Notifications";

const Recommendations = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AnyItem[]>([]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const recommendations = await getRecommendations();
      if (recommendations) {
        setRecommendations(recommendations);
      }
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  return (
    <>
      <Cards loading={loading} searchArray={recommendations} />
    </>
  );
};

export default Recommendations;
