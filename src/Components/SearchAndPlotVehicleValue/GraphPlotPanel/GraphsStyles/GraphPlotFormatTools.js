function convertLabelToCurrency(labelArray) {

    var converted = [];

    if (labelArray.length > 0) {

        labelArray.map((item) => converted.push("R$ " + item.replace(",", ".")));
    }

    // console.log("Converted", converted);

    return converted; 
}

export { convertLabelToCurrency };