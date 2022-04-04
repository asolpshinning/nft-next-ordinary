import { useMemo } from "react";

export const csvMimeTypes = [
  "text/csv",
  "text/plain",
  "text/x-csv",
  "application/vnd.ms-excel",
  "application/csv",
  "application/x-csv",
  "text/comma-separated-values",
  "text/x-comma-separated-values",
  "text/tab-separated-values",
];

export const jsonMimeTypes = [
  "application/json",
  "application/x-json",
  "application/ld+json",
  "application/json-ld",
  "application/x-json-ld",
];

export const transformHeader = (h) => {
  const headersToTransform = [
    "name",
    "description",
    "image",
    "animation_url",
    "external_url",
    "background_color",
    "youtube_url",
  ];

  if (headersToTransform.includes(h.trim().toLowerCase())) {
    return h.trim().toLowerCase();
  }
  return h.trim();
};

export const getAcceptedFiles = (acceptedFiles) => {
  const csv = acceptedFiles.find(
    (f) => csvMimeTypes.includes(f.type) || f.name.endsWith(".csv"),
  );
  const json = acceptedFiles.find(
    (f) => jsonMimeTypes.includes(f.type) || f.name.endsWith(".json"),
  );
  const images = acceptedFiles
    .filter((f) => f.type.includes("image/"))
    // sort in ascending order
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  const videos = acceptedFiles
    .filter((f) => f.type.includes("video/"))
    // sort in ascending order
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));

  return { csv, json, images, videos };
};

export const removeEmptyKeysFromObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

export const useMergedData = (
  csvData,
  jsonData,
  imageFiles,
  videoFiles,
) => {
  return useMemo(() => {
    if (csvData?.data) {
      return csvData.data.map((row, index) => {
        const {
          name,
          description,
          image,
          animation_url,
          external_url,
          background_color,
          youtube_url,
          ...properties
        } = row;

        return removeEmptyKeysFromObject({
          name,
          description,
          external_url,
          background_color,
          youtube_url,
          properties: removeEmptyKeysFromObject(properties),
          image: imageFiles[index] || image || undefined,
          animation_url: videoFiles[index] || animation_url || undefined,
        });
      });
    } else if (Array.isArray(jsonData)) {
      return jsonData.map((nft, index) => ({
        ...nft,
        properties: (nft?.attributes || nft?.properties || []).map(
          (attribute) => ({
            key: attribute.key || attribute.trait_type,
            value: attribute.value
              ? attribute.value.trim() === "None"
                ? ""
                : attribute.value.trim()
              : "",
          }),
        ),
        image: imageFiles[index] || nft.image || nft.file_url || undefined,
        animation_url: videoFiles[index] || nft.animation_url || undefined,
      }));
    } else {
      return [];
    }
  }, [csvData, jsonData, imageFiles, videoFiles]);
};
