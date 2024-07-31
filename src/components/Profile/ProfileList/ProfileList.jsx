import { Col, Row } from "react-bootstrap"
import ProfileCard from "../ProfileCard/ProfileCard"
import "./ProfileList.css"



const ProfileList = ({ profile, loadProfile }) => {


    return (
        <>
            <Row>
                {
                    profile.map(elm => {
                        return (
                            <Col lg={{ span: 6 }} md={{ span: 6 }} key={elm._id}>
                                <ProfileCard {...elm} loadProfile={loadProfile} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>

    )

}
export default ProfileList