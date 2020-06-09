const fs = require("fs");

const iconFileNames = () => {
    const array = fs
        .readdirSync("src/res/icons")
        .filter(file => {
            return file.endsWith(".js") && file !== "index.js";
        })
        .map(file => {
            return file.replace(".js", "");
        });

    return Array.from(new Set(array));
};

const generate = () => {
    let icons = iconFileNames();
    let properties = iconFileNames()
        .map(name => {
            return `import ${name} from "./${name}"`;
        })
        .join(";\n  ");

    const string = `${properties} 
module.exports = {
  ${icons}
} 
`;

    fs.writeFileSync("src/res/icons/index.js", string, "utf8");
};

generate();
