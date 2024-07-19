import { Location } from "react-router-dom";

export const getLastSegment = (location: Location<string>) => {
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  return lastSegment;
};
