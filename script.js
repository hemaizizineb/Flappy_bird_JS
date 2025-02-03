let move_speed = 3.5; // Adjusted speed
let gravity = 0.5;

let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.getElementById('score_val');
let message = document.querySelector('.message');
let score_title = document.getElementById('score_title');

let game_state = 'Start';
let bird_dy = 0;

// Start or restart the game
function startGame() {
    document.querySelectorAll('.pipe_sprite').forEach(e => e.remove());
    bird.style.top = '40vh';
    bird_dy = 0;
    game_state = 'Play';
    message.innerHTML = '';
   // score_title.innerHTML = 'Score:';
    score_val.innerHTML = '0';//init value
    play();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && game_state !== 'Play') {
        startGame();
    }
    if ((e.key === 'ArrowUp' || e.key === ' ') && game_state === 'Play') {
        bird_dy = -7.6;
    }
    
});
document.addEventListener('touchstart', (e) => {
    if (game_state !== 'Play') {
        startGame();  // Start the game on touch
    }
});

document.addEventListener('mousedown', () => {
    if (game_state === 'Play') {
        bird_dy = -7.6;
    }
});

document.addEventListener('touchstart', () => {
    if (game_state === 'Play') {
        bird_dy = -7.6;
    }
});

function play() {
    function move() {
        if (game_state !== 'Play') return;

        document.querySelectorAll('.pipe_sprite').forEach(element => {
            let pipe_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_props.right <= 0) {
                element.remove();
            } else {
                if (
                    bird_props.left < pipe_props.left + pipe_props.width &&
                    bird_props.left + bird_props.width > pipe_props.left &&
                    bird_props.top < pipe_props.top + pipe_props.height &&
                    bird_props.top + bird_props.height > pipe_props.top
                ) {
                    gameOver();
                    return;
                }
                if (pipe_props.right < bird_props.left && !element.scored) {
                    element.scored = true;
                    score_val.innerHTML = (parseFloat(score_val.innerHTML) + 0.5);
                }
                element.style.left = pipe_props.left - move_speed + 'px';
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    function apply_gravity() {
        if (game_state !== 'Play') return;
        bird_dy += gravity;
        bird.style.top = Math.min(bird_props.top + bird_dy, background.height - bird_props.height) + 'px';
        bird_props = bird.getBoundingClientRect();
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            gameOver();
        }
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_gap = 240;
    let pipe_separation = 0;

    function create_pipe() {
        if (game_state !== 'Play') return;
        if (pipe_separation > 115) {
            pipe_separation = 0;
            let pipe_height = Math.floor(Math.random() * (background.height / 3)) + 50;

            let pipe_top = document.createElement('div');
            pipe_top.className = 'pipe_sprite';
            pipe_top.style.top = '0px';
            pipe_top.style.height = pipe_height + 'px';
            pipe_top.style.left = '100vw';
            document.body.appendChild(pipe_top);

            let pipe_bottom = document.createElement('div');
            pipe_bottom.className = 'pipe_sprite';
            pipe_bottom.style.top = (pipe_height + pipe_gap) + 'px';
            pipe_bottom.style.height = (background.height - pipe_height - pipe_gap) + 'px';
            pipe_bottom.style.left = '100vw';
            document.body.appendChild(pipe_bottom);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}

function gameOver() {
    game_state = 'End';
    message.innerHTML = 'GAME OVER ! - Press Enter To Restart -';
    message.style.left = '30 vw';
    message.style.color = 'rgba(254, 51, 153, 0.7)';  
    message.style.textAlign='center';
    message.style.backgroundColor = 'rgba(40, 39, 39, 0.5)' ;
    message.style.padding = '0'; // Add some padding around the message
    message.style.borderRadius = '10px'; // Round the corners
    message.style.boxShadow = '0 0 15px rgba(62, 58, 58, 0.3)';
    message.style.position='absolute';
   message.style.fontSize ='3vw';
   message.style.width = 'auto';  // Let the width adjust based on the text
   message.style.height = 'auto';
   message.style.top = '40%';  // Center vertically
   message.style.left = '50%'; // Center horizontally
   message.style.transform = 'translate(-50%, -50%)'; 
}
