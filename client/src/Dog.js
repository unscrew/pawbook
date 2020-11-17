import React from 'react';
import { Row, Col, Table } from 'reactstrap';

const Dog = (props) => {
    const { data } = props;

    if (!data)
        return <div></div>;

    return (
        <Row className="dog">
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <h2>{data.name}</h2>
                <img src={`https://dog.ceo/api/breeds/image/random`} alt="Dog Image"/>
                <span>{data.Dog[0].main}</span>$nbsp;
                <span>{Math.floor(data.main.temp)}&deg;C</span>
                <Table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{Math.floor(data.wind.speed)} km/h</td>
                        </tr>
                        <tr>
                            <td>Breed</td>
                            <td>{Math.floor(data.wind.speed)} km/h</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default Dog;