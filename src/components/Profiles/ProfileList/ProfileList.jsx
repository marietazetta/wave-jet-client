import { Col, Row } from "react-bootstrap";
import ProfileCard from "../../Profiles/ProfileCard/ProfileCard";

const ProfileList = ({ profiles, loadProfiles }) => {
    return (
        <Row>
            {profiles.map(profile => (
                <Col lg={{ span: 8 }} md={{ span: 8 }} key={profile._id}>
                    <ProfileCard {...profile} loadProfiles={loadProfiles} />
                </Col>
            ))}
        </Row>
    );
};

export default ProfileList;
