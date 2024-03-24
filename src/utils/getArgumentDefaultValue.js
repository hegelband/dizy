function getArgumentDefaultValue(arg) {
    if (!arg) return null;
    const parts = arg.split('=');
    if (parts.length > 1) {
        return {
            name: parts[0].trim(),
            value: parts[1].trim(),
        };
    }
    return null;
}

export default getArgumentDefaultValue;
