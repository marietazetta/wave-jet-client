import './AboutPage.css'
import '../../../public/assets/ProfileMaria.jpg'
import '../../../public/assets/DiegoProfile.jpg'
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {

    const people = [
        {
            name: 'Maria',
            image: '/assets/ProfileMaria.jpg',
            linkedIn: 'https://www.linkedin.com/in/mariaramirezlaguia/',
            github: 'https://github.com/marietazetta'
        },
        {
            name: 'Diego',
            image: '/assets/DiegoProfile.jpg',
            linkedIn: 'https://www.linkedin.com/in/cerezodiego/',
            github: 'https://github.com/diego-cerezo'
        }
    ];
    return (
        <>
            <div className="about-container full-height font-family">
                {people.map((person, index) => (
                    <div key={index} className="person">
                        <img src={person.image} alt={person.name} className="person-image" />
                        <div className="links">
                            <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a href={person.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> GitHub
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </>

    )
}

export default AboutPage