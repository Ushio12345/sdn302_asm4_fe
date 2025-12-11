import { Button } from "react-bootstrap";
import type { QuestionType } from "../../../types/quiz.type";

type Props = {
  data: QuestionType;
  getCrr: (vl: QuestionType) => void;
  onDelete: (vl: string) => void;
};
const QuestionItem = ({ data, getCrr, onDelete }: Props) => {
  return (
    <div className="border p-4 bg-white mb-3">
      <h3>{data.text}</h3>
      <p>Key: {data.keywords?.join(", ")}</p>

      <div>
        {data.options.map((op, index) => {
          const isCorrect = index === data.correctAnswerIndex;

          return (
            <p
              key={op}
              className={`py-1 px-3 mb-1 rounded-md transition duration-150 ${
                isCorrect
                  ? "bg-green-100 text-green-800 font-bold border border-green-300"
                  : "text-gray-700"
              }`}
            >
              {index + 1}. {op} {isCorrect ? "(Correct)" : ""}
            </p>
          );
        })}
      </div>

      <p>Author: {data.author.userName}</p>
      <Button variant="warning" className="mr-2" onClick={() => getCrr(data)}>
        Edit
      </Button>
      <Button variant="danger" onClick={() => onDelete(data._id)}>
        Delete
      </Button>
    </div>
  );
};

export default QuestionItem;
