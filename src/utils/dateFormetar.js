export const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(new Date(date));
};
