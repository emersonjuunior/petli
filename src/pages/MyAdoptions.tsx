import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import { useEffect } from "react";

const MyAdoptions = () => {
  const { requestsSent } = useUserContext();
  const { getRequestsSent, requestLoading } = useAdoptionRequest();

  useEffect(() => {
    getRequestsSent();
  }, []);

  console.log(requestsSent)

  if (requestLoading) {
    return <Loading />;
  }

  return <main></main>;
};

export default MyAdoptions;
