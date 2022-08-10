import { FC } from "react";

type DotIconProps = {
  color: string;
};

export const DotIcon: FC<DotIconProps> = (props) => {
  const { color = "black" } = props;

  return (
    <svg
      width="6"
      height="7"
      viewBox="0 0 6 7"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3.5" r="3" />
    </svg>
  );
};
