import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import type { QuizPayload } from "../../../services/quizServices";

type Props = {
  onAddQuiz: (data: QuizPayload) => void;
};

export default function AddQuizModal({ onAddQuiz }: Props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onAddQuiz({ title, description });
    setTitle("");
    setDescription("");
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Add New Quiz</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
