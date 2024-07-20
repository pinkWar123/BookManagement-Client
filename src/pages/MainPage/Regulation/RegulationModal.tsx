import { Col, Form, InputNumber, Modal, Row, Switch } from "antd";
import { FunctionComponent, useState } from "react";
import { ModalConfig } from "./RegulationPage";
import { IRegulation } from "../../../models/IRegulation";

interface RegulationModalProps {
  modalConfig: ModalConfig;
  onClose: () => void;
  onSubmit: (
    regulation: IRegulation | undefined,
    newValue: number,
    newStatus: boolean
  ) => void;
}

const RegulationModal: FunctionComponent<RegulationModalProps> = ({
  modalConfig,
  onClose,
  onSubmit,
}) => {
  const [newValue, setNewValue] = useState<number>(
    modalConfig?.regulation?.value ?? -1
  );
  const [newStatus, setNewStatus] = useState<boolean>(
    modalConfig.regulation?.status ?? true
  );
  return (
    <Modal
      open={modalConfig?.open ?? false}
      onCancel={onClose}
      onOk={() => onSubmit(modalConfig.regulation, newValue, newStatus)}
    >
      <Row>
        <Col span={16}>
          <span>{modalConfig?.regulation?.content ?? ""}</span>:
        </Col>
        <Col span={6}>
          <Form.Item>
            {modalConfig?.regulation?.code === "QD4" ? (
              <Switch
                value={newValue === 0 ? false : true}
                onChange={(value) => setNewValue(value ? 1 : 0)}
              />
            ) : (
              <InputNumber
                type="number"
                value={newValue}
                onChange={(value) => setNewValue(value ?? -1)}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <span>Áp dụng: </span>
        </Col>
        <Col span={8}>
          <Switch value={newStatus} onChange={(value) => setNewStatus(value)} />
        </Col>
      </Row>
    </Modal>
  );
};

export default RegulationModal;
