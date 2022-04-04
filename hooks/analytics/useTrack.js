import { useCallback } from "react";
import { Options, useTracking } from "react-tracking";

export function useTrack(params, options) {
  const { Track, trackEvent } = useTracking(params, options);

  const trackEventWithCategoryActionLabel = useCallback(
    (trackParams) => {
      trackEvent(trackParams);
    },
    [trackEvent],
  );

  return { Track, trackEvent: trackEventWithCategoryActionLabel };
}
