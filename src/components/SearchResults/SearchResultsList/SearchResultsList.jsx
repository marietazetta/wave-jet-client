import React, { useEffect, useState } from 'react';
import SearchResultsCard from "../SearchResultsCard/SearchResultsCard";
import { Container } from "react-bootstrap";

const SearchResultsList = ({ searchResults, requestBooking }) => {
    const [searchInitiated, setSearchInitiated] = useState(false);

    const initiateSearch = () => {
        setSearchInitiated(true);
    };

    useEffect(() => {
        if (searchResults.length > 0 || searchInitiated) {
            initiateSearch();
        }
    }, [searchResults]);

    return (
        <Container className="mt-5 pt-5 pb-5">
            {
                searchInitiated && !searchResults.length ?
                    <h3>The selected route is not available</h3> :
                    searchResults.map(aircraft => (
                        <SearchResultsCard key={aircraft._id} {...aircraft} requestBooking={requestBooking} />
                    ))
            }
        </Container>
    );
};

export default SearchResultsList;
