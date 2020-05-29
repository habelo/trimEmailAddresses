function validateEmail(email) {
    var addresses = email.split(/[;,]+/);
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    for (var i = 0; i < addresses.length; i++) {
        var address = addresses[i];
        if (!re.test(address.trim())) {
            return false;
        }
    }
    return true;
}

function deductAddressesFromCharDelimiter(addressInput, char) {
    var array = addressInput.split(char)
    for (var i = 0; i < array.length; i++) {
        if (char === '<') {
            array[i] = array[i].slice(0, array[i].indexOf('>'))
        }
        array[i] = array[i].replace(char, "")
        if (!validateEmail(array[i])) {
            array.splice(i, 1)
            i--;
        }
    }
    return array;
}


function trimAddressInput(addressInput) {

    console.log("Handling full addressPasted: " + addressInput)
    var inputSplitBySpace = deductAddressesFromCharDelimiter(addressInput, " ")
    var inputSplitByColon = deductAddressesFromCharDelimiter(addressInput, ":")
    var inputSplitByPlaceholders = deductAddressesFromCharDelimiter(addressInput, "<")
    var inputSplitByComma = deductAddressesFromCharDelimiter(addressInput, ",")
    var addressesArray = inputSplitBySpace
        .concat(inputSplitByColon)
        .concat(inputSplitByPlaceholders)
        .concat(inputSplitByComma)
    console.log("After trim addressInput is: " + addressesArray)
    return addressesArray.join(",");
}
