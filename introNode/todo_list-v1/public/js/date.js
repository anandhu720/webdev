exports.findDate = function() {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    return today.toLocaleDateString("en-US", options);
};

exports.findDay = function() {
    let today = new Date();

    let options = {
        weekday: "long",
    };
    return today.toLocaleDateString("en-US", options);
};