import React, { useEffect } from 'react';

interface InfiniteScrollingConfig {
  /**
   * If the distance between the bottom of the scroll container and the vertical scroll position
   * is less than or equal to this value, the callback function will be triggered.
   */
  gap: number;
}

const useInfiniteScrolling = (
  ref: React.RefObject<HTMLElement>,
  onBottomHit: (e: Event) => void,
  config: InfiniteScrollingConfig = {
    gap: 0,
  },
): void => {
  useEffect(
    (): void | (() => void | undefined) => {
      if (!ref || !ref.current) {
        return;
      }

      const elem = ref.current;
      const gap = Math.max(0, config.gap);

      const scrollHandler = (e: Event): void => {
        const isAtBottom =
          elem.scrollTop &&
          elem.clientHeight >=
          elem.scrollHeight - Math.ceil(elem.scrollTop) - gap;

        if (isAtBottom) {
          onBottomHit(e);
        }
      };

      elem.addEventListener('scroll', scrollHandler, {
        capture: false,
        passive: true,
      });

      return (): void => {
        elem.removeEventListener('scroll', scrollHandler);
      };
    }
  );
};

export default useInfiniteScrolling;
