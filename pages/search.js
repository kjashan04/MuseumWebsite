import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '../lib/userData';

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));
    
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
        <Form.Group>
            <Form.Label>Search By</Form.Label>
            <Form.Select>
                <option value="title">Title</option>
                <option value="tags">Tags</option>
                <option value="artorculture">Art or Culture</option>
            </Form.Select>
        </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="" {...register("geoLocation")} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" {...register("medium")} />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Currently On View</Form.Label>
            <Form.Check 
            type="checkbox" 
            {...register("isOnView")} 
            />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group>
            <Form.Label>Highlighted</Form.Label>
            <Form.Check 
            type="checkbox"  
            {...register("isHighlight")} 
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
}
