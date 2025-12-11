import { Modal, Button } from "react-bootstrap";

type Props = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

export default function ConfirmDelete({
  show,
  onConfirm,
  onCancel,
  message = "Bạn có chắc chắn muốn xóa?",
}: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
