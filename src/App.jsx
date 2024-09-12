import { useState } from "react";
import InputBox from './components/InputBox'; 
import useCurrencyInfo from './hooks/useCurrencyInfo';
import Footer from "./components/Footer";
function App() {
    const [amount, setAmount] = useState(1); 
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("PKR");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const { data: currencyInfo, loading, error } = useCurrencyInfo(from);

    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    // Handle the currency swap
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount); // Swap the convertedAmount and amount
        setAmount(convertedAmount);
    };

    // Convert the amount based on the selected "from" and "to" currencies
    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div>Loading currency data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert(); // Perform conversion on form submit
                        }}
                    >
                        {/* From Currency InputBox */}
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options} // Options from currencyInfo
                                onCurrencyChange={(currency) => setFrom(currency)} // Change "from" currency
                                selectCurrency={from} // Set selected currency for "from"
                                onAmountChange={(amount) => setAmount(amount)} // Handle amount input
                            />
                        </div>

                        {/* Swap Button */}
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>

                        {/* To Currency InputBox */}
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount} // Show converted amount
                                currencyOptions={options} // Options from currencyInfo
                                onCurrencyChange={(currency) => setTo(currency)} // Change "to" currency
                                selectCurrency={to} // Set selected currency for "to"
                                amountDisable // Disable amount input for "to"
                            />
                        </div>

                        {/* Convert Button */}
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
