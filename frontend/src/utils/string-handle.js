const shortenString = (stringData, maxNumberChars) => {
    if (stringData.length > maxNumberChars) {
        stringData = stringData.substring(0, maxNumberChars) + '...';
    }
    return stringData;
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export {
    shortenString, formatDate
}