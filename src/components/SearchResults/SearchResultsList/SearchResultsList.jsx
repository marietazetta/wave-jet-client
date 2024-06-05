import SearchResultsCard from "../SearchResultsCard/SearchResultsCard";
import { Container } from "react-bootstrap";


const SearchResultsList = ({ searchResults, requestBooking }) => {

    return (
        <Container className="mt-5 pt-5 pb-5" >

            {
                !searchResults.length ?
                    <h3>The selected route is not available</h3> :
                    searchResults.map(aircraft => <SearchResultsCard {...aircraft} requestBooking={requestBooking} />)
            }

        </Container>
    )
}

export default SearchResultsList;