import React, { FormEvent, useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { RoundButton } from "../../Controls/Buttons";
import { RoundInput } from "../../Controls/Input";
import { Logo } from "../../Layouts/Logo";
import Axios from 'axios';
import { APIURL } from "../../ducks/quoteReducer";
export const LostPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message,setMessage]=useState("");
  const handleSubmit = (e:FormEvent) => {
      e.preventDefault();
      Axios.post(APIURL+'/lostpassword',{username:email}).then(res=>{
          setMessage("Se ha enviado un correo a la direccion indicada, por favor haga click en el link enviado para recuperar su cuenta");
      })
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
                <label>Correo Electronico:</label>
                <RoundInput
                  size="sm"
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </Form.Group>

              <Form.Group>
                <RoundButton block type="submit">Recuperar mi Contraseña</RoundButton>
                {message && <Alert className='mt-5' variant='success'>{message}</Alert>}
              </Form.Group>
            </Form>
          </Col>
        </div>
      </Col>
    </Row>
  );
};
