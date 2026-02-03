const app = {
    player: {
        name: '',
        level: 1,
        badges: 0,
        stars: 0
    },
    
    currentGym: null,
    currentExercise: 0,
    totalExercises: 10,
    hearts: 3,
    score: 0,
    expertMode: false,
    usedItems: [],
    currentAudioInstruction: '', // Pour stocker l'instruction audio actuelle
    currentAudioPhonetics: false, // Pour savoir si on doit appliquer la phonétique
    
    gyms: {
        1: { 
            name: 'Arène Jadielle', icon: '🌱',
            letters: ['a', 'e', 'i', 'o', 'u', 'é', 'è', 'ê', 'à', 'â', 'î', 'ô', 'ù'],
            type: 'letters', unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        2: { 
            name: 'Arène Azuria', icon: '💧',
            letters: ['m', 'l', 'r', 's', 'p', 't', 'n', 'c', 'k', 'q', 'z', 'h', 'x', 'w'],
            type: 'letters', unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        3: { 
            name: 'Arène Carmin', icon: '⚡',
            syllables: ['ma', 'me', 'mi', 'mo', 'mu', 'la', 'le', 'li', 'lo', 'lu', 'ra', 're', 'ri', 'ro', 'ru', 
                        'sa', 'se', 'si', 'so', 'su', 'pa', 'pe', 'pi', 'po', 'pu', 'ta', 'te', 'ti', 'to', 'tu',
                        'na', 'ne', 'ni', 'no', 'nu', 'ca', 'co', 'cu', 'fa', 'fe', 'fi', 'fo', 'fu', 'va', 've', 'vi', 'vo', 'vu',
                        'ba', 'be', 'bi', 'bo', 'bu', 'da', 'de', 'di', 'do', 'du'],
            type: 'syllables', unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        4: { 
            name: 'Arène Céladopole', icon: '🌿',
            sounds: ['ch', 'j', 'v', 'f', 'b', 'd', 'g', 'ph', 'gn', 'gu'],
            pronunciation: { 'ch': 'che', 'j': 'je', 'v': 've', 'f': 'fe', 'b': 'be', 'd': 'de', 'g': 'gue', 'ph': 'fe', 'gn': 'gne', 'gu': 'gue' },
            type: 'sounds', unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        5: { 
            name: 'Arène Parmanie', icon: '🔥',
            words: ['le', 'la', 'un', 'ma', 'ta', 'sa', 'me', 'te', 'se', 'de', 'ne', 'du', 'il', 'sol', 'rat', 'sac', 'lit', 'mis', 'pas', 'bas',
                    'lac', 'sec', 'roc', 'pic', 'sot', 'pot', 'lot', 'rot', 'dot', 'vol', 'bol', 'col', 'mol', 'sol', 'riz', 'vis', 'bis',
                    'car', 'bar', 'far', 'par', 'tar', 'pur', 'mur', 'sur', 'dur', 'bus', 'pus', 'jus', 'rus', 'nus'],
            type: 'words', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        6: { 
            name: 'Arène Safrania', icon: '👻',
            sounds: ['ou', 'on', 'an', 'in', 'oi', 'eau', 'au', 'eu', 'ai', 'ei', 'un', 'en', 'am', 'em', 'im', 'om'],
            type: 'complex-sounds', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        7: { 
            name: 'Arène Cramois\'Île', icon: '🌋',
            words: ['salon', 'maman', 'papa', 'lapin', 'mouton', 'maison', 'savon', 'melon', 'pirate', 'tomate', 'salade', 'limonade',
                    'banane', 'carotte', 'purée', 'chapeau', 'bateau', 'gâteau', 'couteau', 'manteau', 'rideau', 'bureau', 'cadeau', 'niveau',
                    'oiseau', 'marteau', 'troupeau', 'jumeau', 'carreau', 'hameau', 'souris', 'fourmi', 'radis', 'Paris', 'vendredi', 'samedi',
                    'jeudi', 'mardi', 'dimanche', 'lundi', 'mercredi', 'automne', 'printemps', 'hiver'],
            type: 'words', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        8: { 
            name: 'Ligue Pokémon', icon: '🏆',
            sentences: ['Le rat lit.', 'Maman a un sac.', 'Papa va au lit.', 'Le lapin saute.', 'Le chat dort.', 'Marie joue.', 'Luc court vite.',
                'Papa lit le journal.', 'Maman fait un gâteau.', 'Le chien aboie fort.', 'Julie va à Paris.', 'Marc aime les pommes.',
                'La lune brille ce soir.', 'Mon ami habite ici.', 'Le soleil se lève tôt.', 'Les oiseaux chantent.', 'Je mange une banane.',
                'Tu dessines bien.', 'Il fait beau.', 'Elle court vite.', 'Nous aimons lire.', 'Vous jouez ensemble.', 'Ils sont gentils.',
                'Le vélo est rouge.', 'La maison est grande.', 'Mon chat est noir.', 'Ta soeur est jolie.', 'Leur jardin est fleuri.'],
            type: 'sentences', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        }
    },
    
    pokedex: [
        { id: 1, name: 'Bulbizarre', pokedexNum: 1, unlocked: false, gym: 1, isEvolution: false },
        { id: 2, name: 'Herbizarre', pokedexNum: 2, unlocked: false, gym: 1, isEvolution: true },
        { id: 3, name: 'Salamèche', pokedexNum: 4, unlocked: false, gym: 2, isEvolution: false },
        { id: 4, name: 'Reptincel', pokedexNum: 5, unlocked: false, gym: 2, isEvolution: true },
        { id: 5, name: 'Carapuce', pokedexNum: 7, unlocked: false, gym: 3, isEvolution: false },
        { id: 6, name: 'Carabaffe', pokedexNum: 8, unlocked: false, gym: 3, isEvolution: true },
        { id: 7, name: 'Pikachu', pokedexNum: 25, unlocked: false, gym: 4, isEvolution: false },
        { id: 8, name: 'Raichu', pokedexNum: 26, unlocked: false, gym: 4, isEvolution: true },
        { id: 9, name: 'Rondoudou', pokedexNum: 39, unlocked: false, gym: 5, isEvolution: false },
        { id: 10, name: 'Grodoudou', pokedexNum: 40, unlocked: false, gym: 5, isEvolution: true },
        { id: 11, name: 'Miaous', pokedexNum: 52, unlocked: false, gym: 6, isEvolution: false },
        { id: 12, name: 'Persian', pokedexNum: 53, unlocked: false, gym: 6, isEvolution: true },
        { id: 13, name: 'Psykokwak', pokedexNum: 54, unlocked: false, gym: 7, isEvolution: false },
        { id: 14, name: 'Akwakwak', pokedexNum: 55, unlocked: false, gym: 7, isEvolution: true },
        { id: 15, name: 'Évoli', pokedexNum: 133, unlocked: false, gym: 8, isEvolution: false },
        { id: 16, name: 'Aquali', pokedexNum: 134, unlocked: false, gym: 8, isEvolution: true },
        { id: 17, name: 'Ronflex', pokedexNum: 143, unlocked: false, gym: null, isEvolution: false },
        { id: 18, name: 'Mewtwo', pokedexNum: 150, unlocked: false, gym: null, isEvolution: false },
        { id: 19, name: 'Dracaufeu', pokedexNum: 6, unlocked: false, gym: null, isEvolution: false }
    ],
    
    // Fonction pour obtenir la position du sprite
    getSpritePosition(pokedexNum) {
        // Le sprite sheet fait 960x1040px avec une grille de 12 colonnes
        // Chaque tuile fait 80x80 pixels
        const spriteSize = 80;
        const columns = 12;
        const index = pokedexNum - 1; // Index commence à 0
        
        const col = index % columns;
        const row = Math.floor(index / columns);
        
        const x = col * spriteSize;
        const y = row * spriteSize;
        
        return { x: -x, y: -y };
    },
    
    init() {
        this.loadProgress();
        this.setupSpeech();
    },
    
    setupSpeech() {
        if ('speechSynthesis' in window) {
            this.speech = window.speechSynthesis;
        }
    },
    
    speak(text, applyPhonetics = false) {
        if (this.speech) {
            this.speech.cancel();
            
            let spokenText = text;
            
            // Appliquer les corrections phonétiques seulement pour les lettres/sons isolés
            if (applyPhonetics) {
                spokenText = text
                    // Sons complexes
                    .replace(/\bch\b/gi, 'che')
                    .replace(/\bph\b/gi, 'fe')
                    .replace(/\bgn\b/gi, 'gne')
                    .replace(/\bgu\b/gi, 'gue')
                    // Lettres isolées
                    .replace(/\bb\b/gi, 'bé')
                    .replace(/\bc\b/gi, 'cé')
                    .replace(/\bd\b/gi, 'dé')
                    .replace(/\bf\b/gi, 'effe')
                    .replace(/\bg\b/gi, 'gué')
                    .replace(/\bh\b/gi, 'ache')
                    .replace(/\bj\b/gi, 'ji')
                    .replace(/\bk\b/gi, 'ka')
                    .replace(/\bl\b/gi, 'elle')
                    .replace(/\bm\b/gi, 'emme')
                    .replace(/\bn\b/gi, 'enne')
                    .replace(/\bp\b/gi, 'pé')
                    .replace(/\bq\b/gi, 'ku')
                    .replace(/\br\b/gi, 'erre')
                    .replace(/\bs\b/gi, 'esse')
                    .replace(/\bt\b/gi, 'té')
                    .replace(/\bv\b/gi, 'vé')
                    .replace(/\bw\b/gi, 'double vé')
                    .replace(/\bx\b/gi, 'iks')
                    .replace(/\bz\b/gi, 'zède');
            }
            
            const utterance = new SpeechSynthesisUtterance(spokenText);
            utterance.lang = 'fr-FR';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            this.speech.speak(utterance);
        }
    },
    
    startAdventure() {
        const nameInput = document.getElementById('trainer-name');
        this.player.name = nameInput.value.trim() || 'Dresseur';
        
        // Sauvegarder d'abord
        this.saveProgress();
        
        // Forcer le changement d'écran de manière synchrone
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('map-screen').classList.add('active');
        
        // Mettre à jour l'interface
        this.updateUI();
        
        // Puis lancer le message vocal après un délai
        setTimeout(() => {
            this.speak(`Bienvenue ${this.player.name}! Prêt à devenir un maître de la lecture?`, false);
        }, 500);
    },
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },
    
    selectGym(gymId, isExpert = false) {
        const gym = this.gyms[gymId];
        if (!gym.unlocked) {
            this.speak('Cette arène est verrouillée! Gagne le badge précédent!', false);
            return;
        }
        
        if (isExpert && !gym.badge) {
            this.speak('Tu dois d\'abord gagner le badge normal!', false);
            return;
        }
        
        this.currentGym = gymId;
        this.currentExercise = 0;
        this.hearts = 3;
        this.score = 0;
        this.expertMode = isExpert;
        this.usedItems = [];
        
        // Afficher l'écran d'introduction
        this.showGymIntro();
    },
    
    showGymIntro() {
        const gym = this.gyms[this.currentGym];
        
        // Trouver le Pokémon à gagner
        let pokemon = null;
        if (this.expertMode) {
            pokemon = this.pokedex.find(p => p.gym === this.currentGym && p.isEvolution && !p.unlocked);
        } else {
            pokemon = this.pokedex.find(p => p.gym === this.currentGym && !p.isEvolution && !p.unlocked);
        }
        
        if (!pokemon) {
            // Si pas de nouveau Pokémon, trouver un Pokémon bonus
            pokemon = this.pokedex.find(p => p.gym === null && !p.unlocked);
        }
        
        this.showScreen('gym-intro-screen');
        
        document.getElementById('intro-gym-name').textContent = gym.name;
        
        const spriteContainer = document.getElementById('intro-pokemon-sprite');
        if (pokemon) {
            const pos = this.getSpritePosition(pokemon.pokedexNum);
            // Doubler les positions car le background-size est aussi doublé
            const posX = pos.x * 2;
            const posY = pos.y * 2;
            spriteContainer.innerHTML = `<div class="reward-pokemon-sprite" style="background-position: ${posX}px ${posY}px;"></div>`;
            
            const message = this.expertMode 
                ? `Un ${pokemon.name} sauvage apparaît ! Réponds correctement aux questions pour le faire évoluer !`
                : `Un ${pokemon.name} sauvage apparaît ! Réponds correctement aux questions pour l'attraper !`;
            
            document.getElementById('intro-message').textContent = message;
            this.speak(message, false);
        } else {
            spriteContainer.innerHTML = '<div style="font-size: 5rem;">🏆</div>';
            document.getElementById('intro-message').textContent = 'Prêt à relever le défi ?';
            this.speak('Prêt à relever le défi ?', false);
        }
    },
    
    startGymExercises() {
        const gym = this.gyms[this.currentGym];
        const mode = this.expertMode ? 'mode expert' : 'mode normal';
        this.speak(`C'est parti pour ${gym.name} en ${mode}!`, false);
        
        this.showScreen('exercise-screen');
        this.updateExerciseUI();
        this.nextExercise();
    },
    
    backToMap() {
        this.showScreen('map-screen');
        this.updateUI();
    },
    
    repeatInstruction() {
        if (this.currentAudioInstruction) {
            this.speak(this.currentAudioInstruction, this.currentAudioPhonetics);
        }
    },
    
    toggleSettings() {
        const panel = document.getElementById('settings-panel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    },
    
    toggleUnlockAll() {
        const checkbox = document.getElementById('unlock-all-gyms');
        if (checkbox.checked) {
            // Débloquer toutes les arènes
            Object.keys(this.gyms).forEach(id => {
                this.gyms[id].unlocked = true;
            });
            this.speak('Toutes les arènes sont débloquées !', false);
        } else {
            // Remettre les verrous selon la progression
            Object.keys(this.gyms).forEach(id => {
                const gymId = parseInt(id);
                if (gymId > 1) {
                    // Vérifier si l'arène précédente a son badge
                    const prevGym = this.gyms[gymId - 1];
                    this.gyms[gymId].unlocked = prevGym ? prevGym.badge : false;
                }
            });
            // Les 4 premières arènes restent débloquées
            [1, 2, 3, 4].forEach(id => {
                this.gyms[id].unlocked = true;
            });
            this.speak('Verrouillage normal restauré !', false);
        }
        this.updateUI();
        this.saveProgress();
    },
    
    updateUI() {
        document.getElementById('player-name').textContent = this.player.name;
        document.getElementById('player-level').textContent = this.player.level;
        
        const totalBadges = Object.values(this.gyms).filter(g => g.badge).length;
        const totalStars = Object.values(this.gyms).reduce((sum, g) => sum + g.stars, 0);
        const totalPokemon = this.pokedex.filter(p => p.unlocked).length;
        
        document.getElementById('total-badges').textContent = totalBadges;
        document.getElementById('total-stars').textContent = totalStars;
        document.getElementById('pokemon-count').textContent = totalPokemon;
        document.getElementById('pokemon-count-2').textContent = totalPokemon;
        
        // Vérifier si toutes les arènes sont débloquées pour la checkbox
        const allUnlocked = Object.values(this.gyms).every(g => g.unlocked);
        const checkbox = document.getElementById('unlock-all-gyms');
        if (checkbox) {
            checkbox.checked = allUnlocked;
        }
        
        this.renderGyms();
    },
    
    renderGyms() {
        const container = document.getElementById('gyms-container');
        container.innerHTML = '';
        
        Object.keys(this.gyms).forEach(id => {
            const gym = this.gyms[id];
            const card = document.createElement('div');
            card.className = `gym-card ${!gym.unlocked ? 'locked' : ''}`;
            
            card.innerHTML = `
                <div class="gym-icon">${gym.icon}</div>
                <h3>${gym.name}</h3>
                
                <div class="mode-section">
                    <div class="mode-label">NORMAL</div>
                    <div class="gym-badge ${gym.badge ? 'earned' : ''}">🎖️</div>
                    <div class="gym-stars">
                        ${[1,2,3].map(s => `<span class="star ${s <= gym.stars ? 'earned' : ''}">⭐</span>`).join('')}
                    </div>
                </div>
                
                ${gym.badge ? `
                <div class="mode-section expert">
                    <div class="mode-label expert">EXPERT</div>
                    <div class="gym-badge ${gym.expertBadge ? 'earned' : ''}">💎</div>
                    <div class="gym-stars">
                        ${[1,2,3].map(s => `<span class="star ${s <= gym.expertStars ? 'earned' : ''}">⭐</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="gym-buttons">
                    <button class="btn-gym btn-gym-normal" onclick="app.selectGym(${id}, false)" ${!gym.unlocked ? 'disabled' : ''}>
                        ${gym.badge ? '🔁 Rejouer' : '▶️ Jouer'}
                    </button>
                    ${gym.badge ? `
                        <button class="btn-gym btn-gym-expert" onclick="app.selectGym(${id}, true)">
                            ${gym.expertBadge ? '🔁 Expert' : '⚡ Expert'}
                        </button>
                    ` : ''}
                </div>
            `;
            
            container.appendChild(card);
        });
    },
    
    updateExerciseUI() {
        const gym = this.gyms[this.currentGym];
        document.getElementById('current-gym-name').textContent = gym.name;
        document.getElementById('current-exercise').textContent = this.currentExercise + 1;
        document.getElementById('total-exercises').textContent = this.totalExercises;
        document.getElementById('hearts').textContent = '❤️'.repeat(this.hearts);
        document.getElementById('helper-icon').textContent = this.expertMode ? '💎' : '⚡';
        document.getElementById('expert-badge').style.display = this.expertMode ? 'block' : 'none';
        
        const progress = ((this.currentExercise) / this.totalExercises) * 100;
        document.getElementById('exercise-progress-bar').style.width = progress + '%';
    },
    
    nextExercise() {
        if (this.currentExercise >= this.totalExercises) {
            this.completeGym();
            return;
        }
        
        this.currentExercise++;
        this.updateExerciseUI();
        
        const gym = this.gyms[this.currentGym];
        let exercise = null;
        
        if (gym.type === 'letters' || gym.type === 'sounds' || gym.type === 'complex-sounds') {
            exercise = this.createLetterSoundExercise(gym);
        } else if (gym.type === 'syllables') {
            exercise = this.createSyllableExercise(gym);
        } else if (gym.type === 'words') {
            exercise = this.createWordExercise(gym);
        } else if (gym.type === 'sentences') {
            exercise = this.createSentenceExercise(gym);
        }
        
        this.renderExercise(exercise);
    },
    
    createLetterSoundExercise(gym) {
        const items = gym.letters || gym.sounds;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            if (this.currentGym === 1) {
                this.usedItems = [];
                availableItems = items;
            } else {
                availableItems = items;
            }
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const allOptions = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const wrong = allOptions.filter(l => !items.includes(l)).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const pronunciation = gym.pronunciation ? gym.pronunciation[correct] || correct : correct;
        const typeText = gym.type === 'sounds' || gym.type === 'complex-sounds' ? 'son' : 'lettre';
        const article = gym.type === 'sounds' || gym.type === 'complex-sounds' ? 'le' : 'la';
        
        const instruction = this.expertMode 
            ? `Écoute bien et clique sur ${article} bon${article === 'le' ? '' : 'ne'} ${typeText}!`
            : `Clique sur ${article} ${typeText} "${correct.toUpperCase()}"`;
        
        const audioInstruction = `Trouve ${article} ${typeText} ${pronunciation}`;
        this.currentAudioInstruction = audioInstruction;
        this.currentAudioPhonetics = true; // Appliquer phonétique pour lettres/sons
        this.speak(audioInstruction, true); // true = appliquer corrections phonétiques
        
        return { type: 'letter', correct, options, instruction, showCorrect: !this.expertMode };
    },
    
    createSyllableExercise(gym) {
        const items = gym.syllables;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            availableItems = items;
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const wrong = items.filter(s => s !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const instruction = this.expertMode 
            ? 'Écoute bien et clique sur la bonne syllabe!'
            : `Clique sur la syllabe "${correct.toUpperCase()}"`;
        
        const audioInstruction = `Trouve la syllabe ${correct}`;
        this.currentAudioInstruction = audioInstruction;
        this.currentAudioPhonetics = true; // Appliquer phonétique pour syllabes
        this.speak(audioInstruction, true); // true = appliquer corrections phonétiques
        
        return { type: 'syllable', correct, options, instruction, showCorrect: !this.expertMode };
    },
    
    createWordExercise(gym) {
        const items = gym.words;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            availableItems = items;
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const wrong = items.filter(w => w !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const instruction = this.expertMode 
            ? 'Écoute bien et clique sur le bon mot!'
            : `Clique sur le mot "${correct.toUpperCase()}"`;
        
        const audioInstruction = `Trouve le mot ${correct}`;
        this.currentAudioInstruction = audioInstruction;
        this.currentAudioPhonetics = false; // Pas de phonétique pour les mots
        this.speak(audioInstruction, false); // false = pas de corrections phonétiques pour les mots
        
        return { type: 'word', correct, options, instruction, showCorrect: !this.expertMode };
    },
    
    createSentenceExercise(gym) {
        const items = gym.sentences;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            availableItems = items;
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const instruction = 'Lis la phrase à voix haute!';
        this.currentAudioInstruction = `Lis cette phrase. ${correct}`;
        this.currentAudioPhonetics = false; // Pas de phonétique pour les phrases
        this.speak('Lis cette phrase', false); // false = pas de corrections phonétiques
        setTimeout(() => this.speak(correct, false), 1000); // false = pas de corrections phonétiques
        
        return { type: 'sentence', correct, instruction };
    },
    
    renderExercise(exercise) {
        const content = document.getElementById('exercise-content');
        const instruction = document.getElementById('instruction-text');
        const feedback = document.getElementById('feedback');
        
        instruction.textContent = exercise.instruction;
        feedback.textContent = '';
        feedback.className = '';
        
        if (exercise.type === 'sentence') {
            content.innerHTML = `
                <div style="font-size: 3rem; font-weight: bold; margin: 30px 0; line-height: 1.5;">
                    ${exercise.correct}
                </div>
                <button class="btn-primary" onclick="app.checkAnswer('${exercise.correct}', '${exercise.correct}')">
                    J'ai lu! 📖
                </button>
            `;
        } else {
            let displayHTML = '';
            if (exercise.showCorrect) {
                if (exercise.type === 'syllable') {
                    const c1 = exercise.correct[0].toUpperCase();
                    const c2 = exercise.correct[1].toUpperCase();
                    displayHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; gap: 20px; font-size: 5rem; font-weight: bold; margin: 20px 0;">
                            <span>${c1}</span>
                            <span style="font-size: 3rem;">+</span>
                            <span>${c2}</span>
                            <span style="font-size: 3rem;">→</span>
                            <span style="color: #FF0000;">${exercise.correct.toUpperCase()}</span>
                        </div>
                    `;
                } else {
                    displayHTML = `<div class="letter-display">${exercise.correct.toUpperCase()}</div>`;
                }
            }
            
            content.innerHTML = `
                ${displayHTML}
                <div class="options-grid">
                    ${exercise.options.map(opt => `
                        <button class="option-btn" onclick="app.checkAnswer('${opt}', '${exercise.correct}')">
                            ${opt.toUpperCase()}
                        </button>
                    `).join('')}
                </div>
            `;
        }
    },
    
    checkAnswer(userAnswer, correctAnswer) {
        const feedback = document.getElementById('feedback');
        const buttons = document.querySelectorAll('.option-btn');
        
        buttons.forEach(btn => btn.style.pointerEvents = 'none');
        
        if (userAnswer === correctAnswer) {
            feedback.textContent = '🎉 Super! Bravo!';
            feedback.className = 'correct';
            buttons.forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === correctAnswer.toLowerCase()) {
                    btn.classList.add('correct');
                }
            });
            this.speak('Bravo! Très bien!', false);
            this.score++;
            setTimeout(() => this.nextExercise(), 1500);
        } else {
            this.hearts--;
            document.getElementById('hearts').textContent = '❤️'.repeat(this.hearts);
            feedback.textContent = '❌ Essaie encore!';
            feedback.className = 'incorrect';
            buttons.forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === userAnswer.toLowerCase()) {
                    btn.classList.add('incorrect');
                }
            });
            this.speak('Oups! Réessaie!', false);
            
            if (this.hearts <= 0) {
                setTimeout(() => {
                    this.speak('Dommage! Réessaie cette arène!', false);
                    this.backToMap();
                }, 2000);
            } else {
                setTimeout(() => {
                    buttons.forEach(btn => {
                        btn.style.pointerEvents = 'auto';
                        btn.classList.remove('incorrect');
                    });
                    feedback.textContent = '';
                    feedback.className = '';
                }, 1500);
            }
        }
    },
    
    completeGym() {
        const successRate = (this.score / this.totalExercises) * 100;
        let starsEarned = successRate >= 90 ? 3 : successRate >= 70 ? 2 : 1;
        
        const gym = this.gyms[this.currentGym];
        
        if (this.expertMode) {
            gym.expertStars = Math.max(gym.expertStars, starsEarned);
            gym.expertBadge = true;
        } else {
            gym.stars = Math.max(gym.stars, starsEarned);
            gym.badge = true;
            if (this.gyms[this.currentGym + 1]) {
                this.gyms[this.currentGym + 1].unlocked = true;
            }
        }
        
        let newPokemon = null;
        
        if (this.expertMode) {
            const evolutionIndex = this.pokedex.findIndex(p => 
                p.gym === this.currentGym && p.isEvolution && !p.unlocked
            );
            if (evolutionIndex !== -1) {
                this.pokedex[evolutionIndex].unlocked = true;
                newPokemon = this.pokedex[evolutionIndex];
            }
        } else {
            const baseIndex = this.pokedex.findIndex(p => 
                p.gym === this.currentGym && !p.isEvolution && !p.unlocked
            );
            if (baseIndex !== -1) {
                this.pokedex[baseIndex].unlocked = true;
                newPokemon = this.pokedex[baseIndex];
            } else {
                const noGymIndex = this.pokedex.findIndex(p => 
                    p.gym === null && !p.unlocked
                );
                if (noGymIndex !== -1) {
                    this.pokedex[noGymIndex].unlocked = true;
                    newPokemon = this.pokedex[noGymIndex];
                }
            }
        }
        
        this.saveProgress();
        this.showVictory(starsEarned, newPokemon);
    },
    
    showVictory(stars, pokemon) {
        const modal = document.getElementById('victory-modal');
        const title = document.getElementById('victory-title');
        const message = document.getElementById('victory-message');
        const starsEarned = document.getElementById('stars-earned');
        const rewardContent = document.getElementById('reward-content');
        
        const gym = this.gyms[this.currentGym];
        
        if (this.expertMode) {
            title.textContent = '💎 EXPERT ! 💎';
            title.className = 'expert';
        } else {
            title.textContent = '🎉 VICTOIRE ! 🎉';
            title.className = 'normal';
        }
        
        message.textContent = `Tu as vaincu ${gym.name} en mode ${this.expertMode ? 'Expert' : 'Normal'}!`;
        starsEarned.textContent = '⭐'.repeat(stars);
        
        if (pokemon) {
            const evolutionText = this.expertMode 
                ? `${pokemon.name} a évolué !` 
                : `Tu as capturé ${pokemon.name} !`;
            
            const pos = this.getSpritePosition(pokemon.pokedexNum);
            // Doubler les positions car le background-size est aussi doublé
            const posX = pos.x * 2;
            const posY = pos.y * 2;
            
            rewardContent.innerHTML = `
                <div class="reward-pokemon-sprite" style="background-position: ${posX}px ${posY}px;"></div>
                <p class="reward-text">${this.expertMode ? '✨' : '🎉'} ${evolutionText} ${this.expertMode ? '✨' : '🎉'}</p>
            `;
            this.speak(`Félicitations! ${evolutionText}`, false);
        } else {
            rewardContent.innerHTML = `
                <div style="font-size: 5rem; margin: 20px 0;">🏆</div>
                <p class="reward-text">Badge obtenu!</p>
            `;
            this.speak('Félicitations! Badge obtenu!', false);
        }
        
        modal.classList.add('active');
    },
    
    closeVictoryModal() {
        document.getElementById('victory-modal').classList.remove('active');
        this.backToMap();
    },
    
    showPokedex() {
        this.showScreen('pokedex-screen');
        this.renderPokedex();
    },
    
    closePokedex() {
        this.backToMap();
    },
    
    renderPokedex() {
        const grid = document.getElementById('pokedex-grid');
        grid.innerHTML = this.pokedex.map(pokemon => {
            if (pokemon.unlocked) {
                const pos = this.getSpritePosition(pokemon.pokedexNum);
                return `
                    <div class="pokemon-card">
                        <div class="pokemon-sprite" style="background-position: ${pos.x}px ${pos.y}px;"></div>
                        <div class="pokemon-name">${pokemon.name}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="pokemon-card locked">
                        <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 4rem; margin: 0 auto 10px;">❓</div>
                        <div class="pokemon-name">???</div>
                    </div>
                `;
            }
        }).join('');
    },
    
    saveProgress() {
        const data = {
            player: this.player,
            gyms: this.gyms,
            pokedex: this.pokedex
        };
        localStorage.setItem('pokemonLecture', JSON.stringify(data));
    },
    
    loadProgress() {
        const saved = localStorage.getItem('pokemonLecture');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.player = data.player || this.player;
                this.gyms = data.gyms || this.gyms;
                this.pokedex = data.pokedex || this.pokedex;
            } catch (e) {
                console.error('Erreur chargement:', e);
            }
        }
    }
};

// Rendre app accessible globalement
window.app = app;

window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
