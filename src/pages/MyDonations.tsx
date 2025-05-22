import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
import { useAdoptionRequest } from "../hooks/useAdoptionRequest";
import { useEffect } from "react";

const MyDonations = () => {
  const { requestsReceived } = useUserContext();
  const { getRequestsReceived, requestLoading } = useAdoptionRequest();

  useEffect(() => {
    getRequestsReceived();
  }, []);

  console.log(requestsReceived);

  if (requestLoading) {
    return <Loading />;
  }

  return <main></main>;
};

export default MyDonations;
