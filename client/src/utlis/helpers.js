export const binarySearch = (arr, key) => {
    let left = 0,
        right = arr.length;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (arr[mid].id === key) return mid;
        if (arr[mid].id < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};

export const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const isNumber = (str) => {
    if (isNaN(parseInt(str))) return false;
    else return true;
};

export const dataCheck = (productData, setErrorMsg) => {
    const { id, popularity, price, subcategory, title } = productData;

    if (parseInt(id) < 0) {
        setErrorMsg("Unexpected Error");
        return 0;
    }

    if (subcategory.length === 0) {
        setErrorMsg("Subcategory can't be empty");
        return 0;
    } else if (title.length === 0) {
        setErrorMsg("Title can't be empty");
        return 0;
    } else if (popularity.length === 0) {
        setErrorMsg("Popularity can't be empty");
        return 0;
    } else if (price.length === 0) {
        setErrorMsg("Price can't be empty");
        return 0;
    }

    if (isNumber(subcategory)) {
        setErrorMsg("Subcategory can only be string");
        return 0;
    } else if (!isNumber(popularity)) {
        setErrorMsg("Popularity can only be number");
        return 0;
    } else if (!isNumber(price)) {
        setErrorMsg("Price can only be number");
        return 0;
    }

    setErrorMsg("");

    return 1;
};
