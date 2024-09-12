import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null); // Start with null to indicate loading state
    const [error, setError] = useState(null); // Handle errors
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Construct the API URL dynamically based on the base currency
        const url = `https://open.er-api.com/v6/latest/${currency}`;

        const fetchCurrencyData = async () => {
            setLoading(true);  // Start loading

            try {
                const response = await fetch(url);

                // Check if the response is OK (status code 200)
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.status}`);
                }

                const result = await response.json();
                setData(result.rates); // Store the exchange rates in the data state
            } catch (err) {
                setError(`Failed to fetch data: ${err.message}`);
            } finally {
                setLoading(false);  // Stop loading after data is fetched or error occurred
            }
        };

        fetchCurrencyData();
    }, [currency]);

    return { data, error, loading }; // Return data, error, and loading state
}

export default useCurrencyInfo;
