const cardsColor = ['red', 'red', 'green', 'green', 'blue', 'blue', 'yellow', 'yellow', 'orange', 'orange', 'purple', 'purple', 'greenyellow', 'greenyellow', 'lightsalmon', 'lightsalmon', 'brown', 'brown'];

let cards = document.querySelectorAll('.box-wrapper>div');
cards = [...cards];
const startTime = new Date().getTime();
let activeCard = '';
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;


const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    activeCard.classList.remove('hidden');
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return
    } else {
        cards.forEach(card => card.removeEventListener('click', clickCard));
        activeCards[1] = activeCard;
        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add('off'));
                gameResult++;
                cards.filter((card) => !card.classList.contains('off'));
                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    alert(`Gratulacje, udaøo sié!!! Gra zakoñczona w ${(startTime - endTime)/1000} sekund`);
                    location.reload;
                }
            } else {
                activeCards.forEach(card => card.classList.add('hidden'));
            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard));
        }, 700);
    }
}

const init = () => {
    cards.forEach(card => {
        const index = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[index]);
        cardsColor.splice(index, 1);
    });
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('hidden');
            card.addEventListener('click', clickCard);
        })
    }, 1500);
}

init();