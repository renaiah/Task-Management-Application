import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
function Home() {
  return (
    <Container className="home-container">
       <div className="text-center">
        <h1 className="text-center fw-bold">Task Management Application</h1>
        <p>This is a efficient task management app with secured features.</p>
        <Link className="btn btn-warning" to="/register">Get started</Link>
       </div>
    </Container>
  );
}

export default Home;
