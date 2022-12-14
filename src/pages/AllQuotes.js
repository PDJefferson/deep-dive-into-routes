import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="centered focused">
        <p>{error}</p>
      </div>
    );
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    console.log("check");
    return <NoQuotesFound />;
  }

 
  return <QuoteList quotes={loadedQuotes} />;
};
export default AllQuotes;
