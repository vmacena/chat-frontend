import { useState, useCallback } from "react";

export function useUploadFile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = useCallback(
    async (file: File, receiverId: string) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("receiverId", receiverId);

        const token = localStorage.getItem("token") || "";

        const res = await fetch("http://localhost:5008/api/Upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }

        return await res.json();
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { uploadFile, loading, error };
}
