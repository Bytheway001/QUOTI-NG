import React, { FormEvent, useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { RoundButton } from "../../Controls/Buttons";
import { RoundInput } from "../../Controls/Input";
import { Logo } from "../../Layouts/Logo";
import Axios from "axios";
import { APIURL } from "../../ducks/quoteReducer";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
export const NewPassword: React.FC<RouteComponentProps> = ({ location }) => {
  const email = queryString.parse(location.search).uid;
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === password_confirmation) {
      Axios.post(APIURL + "/change_password", { email, password }).then(
        (res) => {
          window.location.href = "/";
        }
      );
    } else {
      setMessage("Las claves no coinciden");
    }
  };
  return (
    <Row
      noGutters
      className="h-100 login-screen"
      style={{ marginLeft: -15, marginRight: -15 }}
    >
      <Col
        xs={{ span: 10, offset: 1 }}
        md={{ span: 4, offset: 4 }}
        className="h-100 d-flex flex-column justify-content-center"
      >
        <div className="form-wrapper">
          <div className="text-center logo-wrap">
            <Logo type="full" />
          </div>

          <Col sm={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <label>Nueva Contraseña:</label>
                <RoundInput
                  size="sm"
                  type="text"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>Confirmar Contraseña:</label>
                <RoundInput
                  size="sm"
                  type="text"
                  value={password_confirmation}
                  onChange={({ target }) =>
                    setPasswordConfirmation(target.value)
                  }
                />
              </Form.Group>

              <Form.Group>
                <RoundButton block type="submit">
                  Recuperar mi Contraseña
                </RoundButton>
                {message && (
                  <Alert className="mt-5" variant="danger">
                    {message}
                  </Alert>
                )}
              </Form.Group>
            </Form>
          </Col>
        </div>
      </Col>
    </Row>
  );
};
