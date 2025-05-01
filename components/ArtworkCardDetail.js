import { useAtom } from "jotai";
import { useState } from "react";
import { favouritesAtom} from "@/store";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { addToFavourites, removeFromFavourites } from '../lib/userData';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? 
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  };  

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);
  
  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"} <br />
          <strong>Classification:</strong> {data.classification || "N/A"} <br />
          <strong>Medium:</strong> {data.medium || "N/A"}
        </Card.Text>
        <br />
        <br />
        <Card.Text>
          <strong>Artist:</strong>{" "}
          {data.artistDisplayName ? (
            <>
              {data.artistDisplayName}{" "}
              {data.artistWikidata_URL && (
                <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                  wiki
                </a>
              )}
            </>
          ) : (
            "N/A"
          )}
          <br />
          <strong>Credit Line:</strong> {data.creditLine || "N/A"} <br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}
        </Card.Text>
        
        <Button 
        variant={showAdded ? "primary" : "outline-primary"} 
        onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>

      </Card.Body>
    </Card>
  );
}
