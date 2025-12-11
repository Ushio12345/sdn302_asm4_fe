import Table from "react-bootstrap/Table";
import type { QuizType } from "../../../types/quiz.type";

import { useNavigate } from "react-router";

type Props = {
  data: QuizType[];
  // onView: (quiz: QuizType) => void;
  onEdit: (quiz: QuizType) => void;
  onDelete: (quiz: string) => void;
};

const ArticlesTable = ({ data, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <Table striped bordered hover size="sm">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Total Questions</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((quiz, index) => (
          <tr
            key={quiz._id}
            onClick={(e) => {
              navigate(`/admin/articles/${quiz._id}`);
              e.stopPropagation();
            }}
          >
            <td>{index + 1}</td>
            <td className="fw-semibold">{quiz.title}</td>
            <td>{quiz.description || "No description"}</td>
            <td>{quiz.questions?.length || 0}</td>
            <td className="text-center">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(quiz);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(quiz._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ArticlesTable;
