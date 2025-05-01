import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import Error from "next/error";
import ArtworkCard from "@/components/Artworkcard";
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1]; 
  
    const { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    );
  
    useEffect(() => {
      if (data?.objectIDs) {
          // Step 1: Filter valid objectIDs
          let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs.includes(x));
  
          // Step 2: Chunk into pages of PER_PAGE size
          let paginatedResults = [];
          for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
              paginatedResults.push(filteredResults.slice(i, i + PER_PAGE));
          }
  
          // Step 3: Update state with paginated results
          setArtworkList(paginatedResults);
          setPage(1); // Reset to page 1 on new search
      }
  }, [data]);
  
  
  
    const previousPage = () => {
      if (page > 1) setPage(page - 1);
    };
  
    const nextPage = () => {
      if (page < artworkList.length) setPage(page + 1);
    };
  
    if (error) return <Error statusCode={404} />;
    if (!artworkList) return null;
  
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4> Try searching for something else.
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
  
        {artworkList.length > 0 && (
          <Row className="mt-4">
            <Col>
              <Pagination className="justify-content-center">
                <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  }