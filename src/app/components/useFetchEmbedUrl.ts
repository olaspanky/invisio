"use client";
import { useState, useEffect } from "react";

const useFetchEmbedUrl = (dashboardId: string) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmbedUrl = async () => {
    try {
      const response = await fetch(
        `https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEmbedUrl(data.embedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching embed URL:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmbedUrl();
  }, [dashboardId]);

  return { embedUrl, loading, error };
};

export default useFetchEmbedUrl;