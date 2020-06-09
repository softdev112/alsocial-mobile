const updateObjects = (objects, id, processing) => {
    const index = objects.indexOf(id);
    if (!processing && index !== -1) {
        objects.splice(index, 1);
    } else if (processing && index === -1) {
        objects.push(id);
    }
};

module.exports = {
    updateObjects,
};
