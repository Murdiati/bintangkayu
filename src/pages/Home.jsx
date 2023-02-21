import React from 'react';
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from '../assets/images/hero-img.png';
import Services from "../services/Services";

const Home = () => {

    return <Helmet title={"Home"}>
        <section className="hero__section">
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className="hero__content">
                            <p className="hero__subtitle"></p>
                            <h2>Bintang Kayu Furniture</h2>
                            <p> Selamat Datang di Bintang Kayu Furniture. Kami menyediakan produk-produk Furniture atau Mebel rumahan yang dibuat langsung oleh pekerja asal Jepara, Jawa Tengah, Indonesia. Kerajinan Furniture seperti Kursi, Meja, Pintu, dan lain-lain.</p>
                        </div>
                    </Col>
                    <Col lg='6' md='6'>
                        <div className="hero__img">
                            <img src={heroImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <Services />
    </Helmet>;
};

export default Home;
