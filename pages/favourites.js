import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/Artworkcard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;

  return (
    <>
      <h1>My Favourites</h1>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
