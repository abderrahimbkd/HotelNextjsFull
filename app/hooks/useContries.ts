import countries from "world-countries";

const formattedContries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag:country.flag,
    latlng: country.latlng,
    region: country.region,
}));

/// create hook

const useContries = () => {
    const getAll = () => formattedContries;

    const getByvalue = (value: string) => {
        return formattedContries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByvalue
    }
};

export default useContries;