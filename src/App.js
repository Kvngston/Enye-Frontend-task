import { Row, Col, Layout, Typography } from "antd";
import ProfileList from './components/ProfileList';

const { Header } = Layout
const { Title } = Typography

const App = () => {
    return (
        <>
            <Header>    
              <Row justify="center">
                  <Title as="h1" level={1} className="light-text text-center">Enye Profiles</Title>
              </Row>
            </Header>
            <Row justify="center">
                <Col xs={{ span: 23 }} md={{ span: 22 }} className="bg-light board">
                    <ProfileList/>
                </Col>
            </Row>
        </>
    )
}

export default App;
