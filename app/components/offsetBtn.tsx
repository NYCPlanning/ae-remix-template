import { Button } from "@nycplanning/streetscape";
import { useSearchParams } from "@remix-run/react";

export interface OffsetBtnProps {
  current: number;
  target: number;
}

export function OffsetBtn({ current, target }: OffsetBtnProps) {
  const [_, setSearchParams] = useSearchParams();
  const isActive = current === target;
  return (
    <Button
      variant={isActive ? "primary" : "secondary"}
      isDisable={isActive}
      onClick={() =>
        setSearchParams((draft) => {
          draft.set("limit", `${target}`);
          return draft;
        })
      }
    >
      {target}
    </Button>
  );
}
