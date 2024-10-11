import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p>© 2024 Mi Aplicación. Todos los derechos reservados.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#privacy" className="text-white me-3">
              Política de Privacidad
            </a>
            <a href="#terms" className="text-white">
              Términos y Condiciones
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;