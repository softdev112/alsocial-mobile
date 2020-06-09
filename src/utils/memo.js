export function memo(fn) {
    let executed = false;
    let value;
    return () => {
        if (executed) return value;
        value = fn();
        executed = true;
        return value;
    };
}
