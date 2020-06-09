const fs = require("fs");

const imageFileNames = () => {
    const array = fs
        .readdirSync("src/res/images")
        .filter(file => {
            return file.endsWith(".png");
        })
        .map(file => {
            return file
                .replace(".png", "")
                .replace("@2x", "")
                .replace("@3x", "");
        });

    return Array.from(new Set(array));
};

const generate = () => {
    let properties = imageFileNames()
        .map(name => {
            return `${name.replace("-", "_")}: require('./images/${name}.png')`;
        })
        .join(",\n  ");

    const string = `const images = {
  ${properties}
}

export default images
`;

    fs.writeFileSync("src/res/images.js", string, "utf8");
};

generate();
