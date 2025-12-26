<!-- CHESS CONTAINER -->
<div style="display:flex;flex-direction:column;align-items:center;">
  <div id="board" style="width:320px;"></div>
  <div id="status" style="margin-top:10px;"></div>
  <button onclick="resetGame()" style="margin-top:10px;">Restart Game</button>
</div>

<!-- 1️⃣ LOAD CSS FIRST -->
<link rel="stylesheet"
href="https://unpkg.com/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css">

<!-- 2️⃣ LOAD LIBRARIES (ORDER MATTERS!) -->
<script src="https://unpkg.com/chess.js@0.12.0/chess.min.js"></script>
<script src="https://unpkg.com/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>

<!-- 3️⃣ CHESS SCRIPT -->
<script>
let board;
let game;

document.addEventListener("DOMContentLoaded", function () {

  game = new Chess();

  board = Chessboard('board', {
    draggable: true,
    position: 'start',

    onDragStart: function (source, piece) {
      if (game.game_over()) return false;
      if (
        (game.turn() === 'w' && piece.startsWith('b')) ||
        (game.turn() === 'b' && piece.startsWith('w'))
      ) return false;
    },

    onDrop: function (source, target) {
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
      });

      if (move === null) return 'snapback';
      updateStatus();
    },

    onSnapEnd: function () {
      board.position(game.fen());
    }
  });

  updateStatus();
});

function updateStatus() {
  let status = '';
  let moveColor = game.turn() === 'w' ? 'White' : 'Black';

  if (game.in_checkmate()) {
    status = `Game Over – ${moveColor} is checkmated`;
  } else if (game.in_draw()) {
    status = 'Game Draw';
  } else {
    status = `${moveColor} to move`;
    if (game.in_check()) status += ' (Check)';
  }

  document.getElementById('status').innerText = status;
}

function resetGame() {
  game.reset();
  board.start();
  updateStatus();
}
</script>
