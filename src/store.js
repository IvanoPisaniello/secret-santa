import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
    participants: {
        name: '',
        surname: '',
        email: '',
    },
    items: JSON.parse(localStorage.getItem('participants')) || [], //recupera i dati dal localstorage con chiave participants
    secretSanta: [],
    makeGift: [],
    receivedGift: [],
})

function updateLocalStorage() {
    localStorage.setItem('participants', JSON.stringify(store.items));
}

function addTo(participants) {
    if (
        participants.name.trim() !== '' &&
        participants.surname.trim() !== '' &&
        participants.email.trim() !== ''
    ) {
        store.items.push({ ...participants });
        store.participants = { name: '', surname: '', email: '' };
        updateLocalStorage();
    }
}

function removeItem(index) {
    store.items.splice(index, 1);
    updateLocalStorage();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createRandomAssociations() {
    while (store.secretSanta.length < store.items.length) {
        let gifterIsFound = false;
        let randomNumberForGifter = null;

        while (!gifterIsFound) {
            randomNumberForGifter = getRandomInt(store.items.length);

            if (!store.makeGift.includes(store.items[randomNumberForGifter])) {
                console.log("Chi farà il regalo: " + store.items[randomNumberForGifter].name);
                store.makeGift.push(store.items[randomNumberForGifter]);
                gifterIsFound = true;
            }
        }

        gifterIsFound = false;
        let randomNumberForGifted = null;

        while (!gifterIsFound) {
            randomNumberForGifted = getRandomInt(store.items.length);

            if (
                !store.receivedGift.includes(store.items[randomNumberForGifted]) &&
                randomNumberForGifted !== randomNumberForGifter
            ) {
                console.log("Chi riceverà il regalo: " + store.items[randomNumberForGifted].name);
                store.receivedGift.push(store.items[randomNumberForGifted]);
                gifterIsFound = true;
            }
        }

        let newSecretSanta = {
            sender: store.items[randomNumberForGifter],
            received: store.items[randomNumberForGifted],
        };

        store.secretSanta.push(newSecretSanta);
    }
    console.log("dati che sto inviando sono questi", store.secretSanta)
    axios.post('http://127.0.0.1:8010/sendMail', { secretSanta: store.secretSanta },)
        .then((response) => {
            console.log('i dati inviati sono: ', response);

        })
        .catch((error) => {
            if (!error.response) {
                // network error
                this.errorStatus = 'Error: errore di rete diocane';
            } else {
                this.errorStatus = error.response.data.message;
            }
        });


}

export {
    updateLocalStorage,
    addTo,
    removeItem,
    getRandomInt,
    createRandomAssociations,
};