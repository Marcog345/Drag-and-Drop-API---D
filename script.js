// Selecionar os elementos
const items = document.querySelectorAll('.item');
const dropZone = document.getElementById('dropZone');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Configurar eventos para cada item arrastável
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Funções para os eventos de arrastar (Drag)
function dragStart(e) {
    // Guarda o ID e o tipo do item sendo arrastado
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.setData('type', e.target.getAttribute('data-type'));
    
    // Adiciona classe para efeito visual
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

// Configurar eventos para a zona de largar (Drop Zone)
dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('dragenter', dragEnter);
dropZone.addEventListener('dragleave', dragLeave);
dropZone.addEventListener('drop', drop);

// Funções para os eventos da zona de largar
function dragOver(e) {
    e.preventDefault(); // Necessário para permitir o "drop"
}

function dragEnter(e) {
    e.preventDefault();
    dropZone.classList.add('over'); // Destaca a zona
}

function dragLeave(e) {
    dropZone.classList.remove('over'); // Remove o destaque
}

function drop(e) {
    e.preventDefault();
    dropZone.classList.remove('over');

    // Obter os dados do item arrastado
    const itemType = e.dataTransfer.getData('type');
    
    // Lógica da pontuação
    if (itemType === 'healthy') {
        score += 10; // Soma pontos se for saudável
    } else if (itemType === 'junk') {
        score -= 10; // Perde pontos se for besteira (junk food)
    }

    // Atualizar a pontuação no ecrã
    scoreDisplay.innerText = score;

    /* 
     * Nota: Neste formato, o item volta à sua posição original 
     * permitindo que o jogador continue a interagir. 
     * Caso quisesse mover o item para dentro da zona, 
     * usaria: dropZone.appendChild(document.getElementById(itemId));
     */
}