import { useEffect, useRef } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import { fetchAttributes } from "@/app/store/thunks";

type AttributesTableRowRefProps = {
  attributes: Attributes;
};

export const AttributesTableRowRef = ({
  attributes,
}: AttributesTableRowRefProps) => {
  const containerRef = useRef<HTMLTableRowElement | null>(null);
  const dispatch = useAppDispatch();

  // --- EFFECTS ---

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && attributes.meta.hasNextPage) {
          dispatch(fetchAttributes({}));
        }
      },
      {
        threshold: 1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [attributes.meta.hasNextPage, containerRef, dispatch]);

  // --- RENDER ---

  return <tr ref={containerRef}></tr>;
};
