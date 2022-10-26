import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "completed") {
      //replace works as a redirect to the desired page
      //whereas push adds the new page to the history stack
      //meaning that the user can go back to the previous page
      navigate("/quotes", { replace: true });
      //history.replace("/quotes");
    }
  }, [status, navigate]);
  
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};
export default NewQuote;
