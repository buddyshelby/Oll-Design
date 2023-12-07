import React, { useEffect, useState } from "react";

const MediaQuery = ({ query, children }) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(query);
        const mqlListener = (event) => setMatches(event.matches);

        mql.addListener(mqlListener);
        setMatches(mql.matches);

        return () => {
            mql.removeListener(mqlListener);
        };
    }, [query]);

    return <>{children({ matches })}</>;
};

export default MediaQuery;
