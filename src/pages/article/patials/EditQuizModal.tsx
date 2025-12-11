import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import type { QuizPayload } from "../../../services/quizServices";

type Props = {
  quiz: any;
  onEdit: (data: QuizPayload) => void;
  show: boolean;
  setShow: (value: boolean) => void;
};

export default function EditQuizModal({ quiz, onEdit, show, setShow }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Sync khi quiz thay đổi
  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
    }
  }, [quiz]);

  const handleSubmit = () => {
    if (!quiz) return;
    onEdit({ ...quiz, title, description });
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Quiz</Modal.Title>
      </Modal.Header>

      {/* Modal body */}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quiz description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Modal footer */}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!title}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
