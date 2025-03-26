import { ReactNode } from "react";

export const IconButton = ({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated?: boolean;
}) => {
  return (
    <div
      className={`pointer rounded-full border p-2 hover:bg-gray-100 hover:text-black ${
        activated ? "bg-gray-100 text-black" : "bg-black  text-white"
      }`}
      onClick={onClick}>
      {icon}
    </div>
  );
};
