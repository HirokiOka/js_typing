const babylon = require('babylon');
const generate = require('@babel/generator').default;

const removeComments = (code) => {
    try {
        const ast = babylon.parse(code);
        const output = generate(ast, {
            comments: false,
            allowImportExportEverywhere: true,
            sourceType: "module"
        }, code);
    return output.code;
    } catch (e) {
        return code;
    }
    
};

module.exports = removeComments;