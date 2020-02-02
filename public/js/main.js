const typed = document.querySelector('#typed');
const untyped = document.querySelector('#untyped');
const cursor = document.querySelector("#cursor");
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const comment = document.getElementById('comment');

let code = untyped.textContent.replace(/\t/g, ' ');
let loc;
let score;
let miss;
let isPlaying = false;


const updateTarget = () => {
    typed.textContent = code.substring(0, loc);
    cursor.textContent = code[loc];
    untyped.textContent = code.substring(loc+1, code.length);
    Prism.highlightAll();
};

const initialize = () => {
    isPlaying = true;
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;

    updateTarget();
};

setTimeout(() => {
    initialize();
}, 2000);

window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
        return;
    }

    if ((e.key === code[loc]) || (code[loc] === '\n' && e.keyCode == 13)) {
        loc++;

        if (loc === code.length) {
            const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
            comment.textContent = `clear!\n${accuracy.toFixed(1)}% accuracy!`;
            untyped.textContent = '';
            isPlaying = false;
        }

        score++;
        scoreLabel.textContent = score;

        updateTarget();
    } else {
        if (e.keyCode !== 16 && e.keyCode !== 18) {
            miss++;
            missLabel.textContent = miss;
        }
    }

    window.addEventListener('keydown', e => {
        if (e.target === document.body) {
            if (e.keyCode === 32) {
                e.preventDefault();
            }
        }
    });

    document.getElementById('text-button').onclick = () => {
        location.reload();
    };
});