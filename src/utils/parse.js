const babylon = require('babylon');
const generate = require('@babel/generator').default;

const removeCommeents = (code) => {
    const ast = babylon.parse(code);
    const output = generate(ast, {
        comments: false
    }, code);
    return output.code;
};

module.exports = removeCommeents;