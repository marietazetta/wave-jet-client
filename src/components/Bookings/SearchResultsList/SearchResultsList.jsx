import SearchResultsCard from "../SearchResultsCard/SearchResultsCard";
import { Container } from "react-bootstrap";


const SearchResultsList = ({ searchResults }) => {

    return (
        <Container className="mt-5 pt-5 pb-5" >

            {
                !searchResults.length ?
                    <h1>Sin resultados</h1> :
                    searchResults.map(aircraft => <SearchResultsCard {...aircraft} />)
            }

        </Container>
    )
}

export default SearchResultsList;