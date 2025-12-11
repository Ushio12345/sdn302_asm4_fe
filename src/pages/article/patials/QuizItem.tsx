import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import type { QuizType } from "../../../types/quiz.type";

type QuizItemProps = {
  data: QuizType;
};
const QuizItem = ({ data }: QuizItemProps) => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-sm mb-3" style={{ borderRadius: "12px" }}>
      <Card.Body>
        <Card.Title className="fw-bold">{data.title}</Card.Title>

        <Card.Text className="text-muted">
          {data.description || "No description"}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold text-primary">
            {data.questions?.length || 0} câu hỏi
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/admin/articles/${data._id}`)}
          >
            Chi tiết
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuizItem;
