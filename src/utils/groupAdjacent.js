export function groupAdjacent(classifier, array) {
    return array.reduce((agg, curr) => {
        const currentKey = classifier(curr);

        if (agg.length) {
            const prev = agg[agg.length - 1];
            if (prev.key === currentKey) {
                prev.values.push(curr);
                return agg;
            }
        }
        agg.push({
            key: currentKey,
            values: [curr],
        });
        return agg;
    }, []);
}
