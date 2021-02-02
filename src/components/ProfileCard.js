import { Card, Row } from 'antd'


const { Meta } = Card

const ProfileCard = ({ profile }) => {
    return (
        <Card title={`${profile.FirstName} ${profile.LastName}`} style={{ width: "100%"}} extra={profile.Gender}>
            <Meta title={profile.UserName} description={profile.URL} />
            <p>Phone: {profile.PhoneNumber}</p>
            <Card type="inner" title={profile.LastLogin} style={{ marginTop: 20 }}>
                <p>Mac-Address: {profile.MacAddress}</p>
                <Row justify="space-between">
                    <p>Long: {profile.Longitude}</p><p>Lat: {profile.Latitude}</p>
                </Row>
            </Card>
            <Card
            style={{ marginTop:20 }}
            type="inner"
            title={profile.CreditCardNumber}
            extra={profile.CreditCardType}
            >
                <p>Payment method: {profile.PaymentMethod}</p>
            </Card>
        </Card>
    )
}

export default ProfileCard
