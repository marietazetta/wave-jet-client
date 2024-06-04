import SearchResultsCard from "../SearchResultsCard/SearchResultsCard";
import { Container } from "react-bootstrap";




const SearchResultsList = ({ searchResults }) => {
    return (
        <>
            <Container className="mt-5 pt-5 pb-5">

                {
                    searchResults.map(search => <SearchResultsCard {...search} />)
                }

            </Container>
        </>

    );
};

export default SearchResultsList;