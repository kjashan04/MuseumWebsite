import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from '../lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if (!searchHistory) return null;
  
  // Parse search history into readable objects
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // Function to navigate to a previous search
  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Function to remove a search query from history
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Prevent triggering historyClicked()
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  return (
    <>
      <h1>Search History</h1>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for some artwork.
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item 
              key={index} 
              className={styles.historyListItem} 
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button 
                className="float-end" 
                variant="danger" 
                size="sm" 
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
