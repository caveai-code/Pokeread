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
            name: 'Arène Argenta', icon: '📚',
            words: ['chocolat', 'parapluie', 'ordinateur', 'bibliothèque', 'papillon', 'crocodile', 'hélicoptère', 'restaurant',
                    'éléphant', 'pharmacie', 'anniversaire', 'laboratoire', 'supermarket', 'dictionnaire', 'gymnastique', 'maternelle',
                    'automobile', 'réfrigérateur', 'merveilleux', 'extraordinaire'],
            type: 'read-words', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        9: { 
            name: 'Arène Plateau Indigo', icon: '💎',
            sentences: ['Le chat dort.', 'Papa lit.', 'Marie joue.', 'Le chien court.', 'Maman cuisine.',
                'Le soleil brille.', 'Les oiseaux chantent.', 'Julie danse.', 'Marc dessine.', 'Le bébé pleure.',
                'La pluie tombe.', 'Le vent souffle.', 'Pierre mange.', 'Sophie rit.', 'Le train part.'],
            type: 'sentence-choice', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        10: { 
            name: 'Ligue Pokémon', icon: '🏆',
            sentences: ['Le rat lit.', 'Maman a un sac.', 'Papa va au lit.', 'Le lapin saute.', 'Le chat dort.', 'Marie joue.', 'Luc court vite.',
                'Papa lit le journal.', 'Maman fait un gâteau.', 'Le chien aboie fort.', 'Julie va à Paris.', 'Marc aime les pommes.',
                'La lune brille ce soir.', 'Mon ami habite ici.', 'Le soleil se lève tôt.', 'Les oiseaux chantent.', 'Je mange une banane.',
                'Tu dessines bien.', 'Il fait beau.', 'Elle court vite.', 'Nous aimons lire.', 'Vous jouez ensemble.', 'Ils sont gentils.',
                'Le vélo est rouge.', 'La maison est grande.', 'Mon chat est noir.', 'Ta soeur est jolie.', 'Leur jardin est fleuri.'],
            type: 'sentences', unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        }
    },
    
    // Pokédex complet Gen 1 - 151 Pokémon organisés par arène (rareté croissante)
    // gym: numéro d'arène où le Pokémon peut être attrapé
    // isEvolution: true = gagnable en mode expert, false = mode normal
    pokedex: [
        // === ARÈNE 1 - Pokémon très communs ===
        { name: 'Rattata', pokedexNum: 19, unlocked: false, gym: 1, isEvolution: false },
        { name: 'Rattatac', pokedexNum: 20, unlocked: false, gym: 1, isEvolution: true },
        { name: 'Roucool', pokedexNum: 16, unlocked: false, gym: 1, isEvolution: false },
        { name: 'Roucoups', pokedexNum: 17, unlocked: false, gym: 1, isEvolution: true },
        { name: 'Chenipan', pokedexNum: 10, unlocked: false, gym: 1, isEvolution: false },
        { name: 'Chrysacier', pokedexNum: 11, unlocked: false, gym: 1, isEvolution: true },
        { name: 'Aspicot', pokedexNum: 13, unlocked: false, gym: 1, isEvolution: false },
        { name: 'Coconfort', pokedexNum: 14, unlocked: false, gym: 1, isEvolution: true },
        
        // === ARÈNE 2 - Pokémon communs ===
        { name: 'Pikachu', pokedexNum: 25, unlocked: false, gym: 2, isEvolution: false },
        { name: 'Raichu', pokedexNum: 26, unlocked: false, gym: 2, isEvolution: true },
        { name: 'Mélofée', pokedexNum: 35, unlocked: false, gym: 2, isEvolution: false },
        { name: 'Mélodelfe', pokedexNum: 36, unlocked: false, gym: 2, isEvolution: true },
        { name: 'Rondoudou', pokedexNum: 39, unlocked: false, gym: 2, isEvolution: false },
        { name: 'Grodoudou', pokedexNum: 40, unlocked: false, gym: 2, isEvolution: true },
        { name: 'Nosferapti', pokedexNum: 41, unlocked: false, gym: 2, isEvolution: false },
        { name: 'Nosferalto', pokedexNum: 42, unlocked: false, gym: 2, isEvolution: true },
        
        // === ARÈNE 3 - Pokémon assez communs ===
        { name: 'Bulbizarre', pokedexNum: 1, unlocked: false, gym: 3, isEvolution: false },
        { name: 'Herbizarre', pokedexNum: 2, unlocked: false, gym: 3, isEvolution: true },
        { name: 'Salamèche', pokedexNum: 4, unlocked: false, gym: 3, isEvolution: false },
        { name: 'Reptincel', pokedexNum: 5, unlocked: false, gym: 3, isEvolution: true },
        { name: 'Carapuce', pokedexNum: 7, unlocked: false, gym: 3, isEvolution: false },
        { name: 'Carabaffe', pokedexNum: 8, unlocked: false, gym: 3, isEvolution: true },
        { name: 'Mystherbe', pokedexNum: 43, unlocked: false, gym: 3, isEvolution: false },
        { name: 'Ortide', pokedexNum: 44, unlocked: false, gym: 3, isEvolution: true },
        
        // === ARÈNE 4 - Pokémon moyens ===
        { name: 'Abra', pokedexNum: 63, unlocked: false, gym: 4, isEvolution: false },
        { name: 'Kadabra', pokedexNum: 64, unlocked: false, gym: 4, isEvolution: true },
        { name: 'Machoc', pokedexNum: 66, unlocked: false, gym: 4, isEvolution: false },
        { name: 'Machopeur', pokedexNum: 67, unlocked: false, gym: 4, isEvolution: true },
        { name: 'Miaouss', pokedexNum: 52, unlocked: false, gym: 4, isEvolution: false },
        { name: 'Persian', pokedexNum: 53, unlocked: false, gym: 4, isEvolution: true },
        { name: 'Psykokwak', pokedexNum: 54, unlocked: false, gym: 4, isEvolution: false },
        { name: 'Akwakwak', pokedexNum: 55, unlocked: false, gym: 4, isEvolution: true },
        
        // === ARÈNE 5 - Pokémon peu communs ===
        { name: 'Ponyta', pokedexNum: 77, unlocked: false, gym: 5, isEvolution: false },
        { name: 'Galopa', pokedexNum: 78, unlocked: false, gym: 5, isEvolution: true },
        { name: 'Ramoloss', pokedexNum: 79, unlocked: false, gym: 5, isEvolution: false },
        { name: 'Flagadoss', pokedexNum: 80, unlocked: false, gym: 5, isEvolution: true },
        { name: 'Magnéti', pokedexNum: 81, unlocked: false, gym: 5, isEvolution: false },
        { name: 'Magnéton', pokedexNum: 82, unlocked: false, gym: 5, isEvolution: true },
        { name: 'Caninos', pokedexNum: 58, unlocked: false, gym: 5, isEvolution: false },
        { name: 'Arcanin', pokedexNum: 59, unlocked: false, gym: 5, isEvolution: true },
        
        // === ARÈNE 6 - Pokémon rares ===
        { name: 'Fantominus', pokedexNum: 92, unlocked: false, gym: 6, isEvolution: false },
        { name: 'Spectrum', pokedexNum: 93, unlocked: false, gym: 6, isEvolution: true },
        { name: 'Onix', pokedexNum: 95, unlocked: false, gym: 6, isEvolution: false },
        { name: 'Soporifik', pokedexNum: 96, unlocked: false, gym: 6, isEvolution: false },
        { name: 'Hypnomade', pokedexNum: 97, unlocked: false, gym: 6, isEvolution: true },
        { name: 'Krabby', pokedexNum: 98, unlocked: false, gym: 6, isEvolution: false },
        { name: 'Krabboss', pokedexNum: 99, unlocked: false, gym: 6, isEvolution: true },
        { name: 'Voltorbe', pokedexNum: 100, unlocked: false, gym: 6, isEvolution: false },
        { name: 'Électrode', pokedexNum: 101, unlocked: false, gym: 6, isEvolution: true },
        
        // === ARÈNE 7 - Pokémon très rares ===
        { name: 'Rhinocorne', pokedexNum: 111, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Rhinoféros', pokedexNum: 112, unlocked: false, gym: 7, isEvolution: true },
        { name: 'Leveinard', pokedexNum: 113, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Saquedeneu', pokedexNum: 114, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Kangourex', pokedexNum: 115, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Hypotrempe', pokedexNum: 116, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Hypocéan', pokedexNum: 117, unlocked: false, gym: 7, isEvolution: true },
        { name: 'Poissirène', pokedexNum: 118, unlocked: false, gym: 7, isEvolution: false },
        { name: 'Poissoroy', pokedexNum: 119, unlocked: false, gym: 7, isEvolution: true },
        
        // === ARÈNE 8 - Pokémon épiques ===
        { name: 'Stari', pokedexNum: 120, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Staross', pokedexNum: 121, unlocked: false, gym: 8, isEvolution: true },
        { name: 'M. Mime', pokedexNum: 122, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Insécateur', pokedexNum: 123, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Lippoutou', pokedexNum: 124, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Élektek', pokedexNum: 125, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Magmar', pokedexNum: 126, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Scarabrute', pokedexNum: 127, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Tauros', pokedexNum: 128, unlocked: false, gym: 8, isEvolution: false },
        
        // === ARÈNE 9 - Pokémon légendaires mineurs ===
        { name: 'Magicarpe', pokedexNum: 129, unlocked: false, gym: 9, isEvolution: false },
        { name: 'Léviator', pokedexNum: 130, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Lokhlass', pokedexNum: 131, unlocked: false, gym: 9, isEvolution: false },
        { name: 'Métamorph', pokedexNum: 132, unlocked: false, gym: 9, isEvolution: false },
        { name: 'Évoli', pokedexNum: 133, unlocked: false, gym: 9, isEvolution: false },
        { name: 'Aquali', pokedexNum: 134, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Voltali', pokedexNum: 135, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Pyroli', pokedexNum: 136, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Porygon', pokedexNum: 137, unlocked: false, gym: 9, isEvolution: false },
        
        // === ARÈNE 10 (LIGUE) - Pokémon légendaires ===
        { name: 'Ptéra', pokedexNum: 142, unlocked: false, gym: 10, isEvolution: false },
        { name: 'Ronflex', pokedexNum: 143, unlocked: false, gym: 10, isEvolution: false },
        { name: 'Artikodin', pokedexNum: 144, unlocked: false, gym: 10, isEvolution: false },
        { name: 'Électhor', pokedexNum: 145, unlocked: false, gym: 10, isEvolution: true },
        { name: 'Sulfura', pokedexNum: 146, unlocked: false, gym: 10, isEvolution: true },
        { name: 'Minidraco', pokedexNum: 147, unlocked: false, gym: 10, isEvolution: false },
        { name: 'Draco', pokedexNum: 148, unlocked: false, gym: 10, isEvolution: true },
        { name: 'Dracolosse', pokedexNum: 149, unlocked: false, gym: 10, isEvolution: true },
        { name: 'Mewtwo', pokedexNum: 150, unlocked: false, gym: 10, isEvolution: true },
        { name: 'Mew', pokedexNum: 151, unlocked: false, gym: 10, isEvolution: true },
        
        // === Évolutions finales bonus (gagnables dans plusieurs arènes) ===
        { name: 'Papilusion', pokedexNum: 12, unlocked: false, gym: 3, isEvolution: true },
        { name: 'Dardargnan', pokedexNum: 15, unlocked: false, gym: 3, isEvolution: true },
        { name: 'Roucarnage', pokedexNum: 18, unlocked: false, gym: 4, isEvolution: true },
        { name: 'Florizarre', pokedexNum: 3, unlocked: false, gym: 7, isEvolution: true },
        { name: 'Dracaufeu', pokedexNum: 6, unlocked: false, gym: 8, isEvolution: true },
        { name: 'Tortank', pokedexNum: 9, unlocked: false, gym: 8, isEvolution: true },
        { name: 'Rafflesia', pokedexNum: 45, unlocked: false, gym: 6, isEvolution: true },
        { name: 'Alakazam', pokedexNum: 65, unlocked: false, gym: 7, isEvolution: true },
        { name: 'Mackogneur', pokedexNum: 68, unlocked: false, gym: 8, isEvolution: true },
        { name: 'Ectoplasma', pokedexNum: 94, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Amonita', pokedexNum: 138, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Amonistar', pokedexNum: 139, unlocked: false, gym: 9, isEvolution: true },
        { name: 'Kabuto', pokedexNum: 140, unlocked: false, gym: 8, isEvolution: false },
        { name: 'Kabutops', pokedexNum: 141, unlocked: false, gym: 9, isEvolution: true },
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
            
            const loadVoices = () => {
                const voices = this.speech.getVoices();
                // Chercher "Google français" ou une voix Google FR
                this.selectedVoice = voices.find(v => v.name.includes('Google') && v.name.includes('Français'));
                
                if (!this.selectedVoice) {
                     this.selectedVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('fr'));
                }
                
                // Fallback sur n'importe quelle voix FR
                if (!this.selectedVoice) {
                    this.selectedVoice = voices.find(v => v.lang.startsWith('fr'));
                }
                
                // console.log("Voix chargée:", this.selectedVoice ? this.selectedVoice.name : "Défaut");
            };
            
            loadVoices();
            
            if (this.speech.onvoiceschanged !== undefined) {
                this.speech.onvoiceschanged = loadVoices;
            }
        }
    },
    
    speak(text, applyPhonetics = false) {
        if (this.speech) {
            this.speech.cancel();
            
            let spokenText = text;
            
            // Corrections générales (toujours appliquées)
            // Corriger "VI" (chiffre romain 6) en "vie" pour la syllabe
            spokenText = spokenText.replace(/\bVI\b/g, 'vie').replace(/\bVi\b/g, 'vie');
            
            // Corriger ponctuation pour fluidité
            spokenText = spokenText.replace(' !', '.');
            
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
            
            if (this.selectedVoice) {
                utterance.voice = this.selectedVoice;
                
                // Paramètres optimisés pour la voix Google
                if (this.selectedVoice.name.includes('Google')) {
                    utterance.rate = 1.05;
                    utterance.pitch = 1;
                } else {
                    // Paramètres par défaut pour les autres voix (souvent plus robotiques)
                    utterance.rate = 0.9;
                    utterance.pitch = 1.1;
                }
            } else {
                utterance.rate = 0.9;
            }
            
            this.speech.speak(utterance);
        }
    },
    
    startAdventure() {
        const nameInput = document.getElementById('trainer-name');
        this.player.name = nameInput.value.trim() || 'Dresseur';
        
        // Sauvegarder d'abord
        this.saveProgress();
        
        // 1. Masquer tous les écrans pour forcer le reset du layout
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        // 2. Petit délai pour laisser le navigateur réaliser que la page est vide/haute
        setTimeout(() => {
            const mapScreen = document.getElementById('map-screen');
            mapScreen.classList.add('active');
            
            // 3. Force le scroll en haut absolu
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            
            // 4. Mettre à jour l'interface
            this.updateUI();
            
            // 5. Message vocal
            setTimeout(() => {
                this.speak(`Bienvenue ${this.player.name}! Prêt à devenir un maître de la lecture?`, false);
            }, 500);
        }, 10);
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
        
        // Trouver tous les Pokémon disponibles pour cette arène
        const availablePokemon = this.pokedex.filter(p => 
            p.gym === this.currentGym && 
            p.isEvolution === this.expertMode && 
            !p.unlocked
        );
        
        // Choisir un Pokémon aléatoire à montrer
        let pokemon = null;
        if (availablePokemon.length > 0) {
            pokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
        }
        
        // Stocker le Pokémon récompense pour qu'il soit le même à la fin
        this.currentRewardPokemon = pokemon;
        
        this.showScreen('gym-intro-screen');
        
        document.getElementById('intro-gym-name').textContent = gym.name;
        
        const spriteContainer = document.getElementById('intro-pokemon-sprite');
        if (pokemon) {
            const pos = this.getSpritePosition(pokemon.pokedexNum);
            // Doubler les positions car le background-size est aussi doublé
            const posX = pos.x * 2;
            const posY = pos.y * 2;
            spriteContainer.innerHTML = `<div class="reward-pokemon-sprite" style="background-position: ${posX}px ${posY}px;"></div>`;
            
            const remainingCount = availablePokemon.length;
            const message = this.expertMode 
                ? `Un ${pokemon.name} sauvage apparaît ! (${remainingCount} évolutions restantes)`
                : `Un ${pokemon.name} sauvage apparaît ! (${remainingCount} Pokémon restants)`;
            
            document.getElementById('intro-message').textContent = message;
            this.speak(`Un ${pokemon.name} sauvage apparaît !`, false);
        } else {
            spriteContainer.innerHTML = '<div style="font-size: 5rem;">🏆</div>';
            const message = this.expertMode 
                ? 'Tu as toutes les évolutions de cette arène ! Rejoue pour le plaisir !'
                : 'Tu as tous les Pokémon de cette arène ! Essaie le mode Expert !';
            document.getElementById('intro-message').textContent = message;
            this.speak('Prêt à relever le défi ?', false);
        }
    },
    
    startGymExercises() {
        const gym = this.gyms[this.currentGym];
        const mode = this.expertMode ? 'mode expert' : 'mode normal';
        this.speak(`C'est parti pour ${gym.name} en ${mode}!`, false);
        
        this.combo = 0; // Initialiser le combo
        
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
            // Débloquer toutes les arènes ET le mode expert
            Object.keys(this.gyms).forEach(id => {
                this.gyms[id].unlocked = true;
                this.gyms[id].badge = true; // Donne le badge normal pour débloquer le mode expert
            });
            this.speak('Toutes les arènes et modes expert sont débloqués !', false);
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
        } else if (gym.type === 'read-words') {
            exercise = this.createReadWordExercise(gym);
        } else if (gym.type === 'sentence-choice') {
            exercise = this.createSentenceChoiceExercise(gym);
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
        
        // Groupes de sons trop proches à ne jamais mélanger
        const confusingGroups = [
            ['f', 'ph'],
            ['j', 'g'],
            ['k', 'c', 'q'],
            ['s', 'c', 'ç', 'ss'],
            ['z', 's'],
            ['in', 'un', 'ain', 'ein', 'im'],
            ['an', 'en', 'am', 'em'],
            ['on', 'om'],
            ['au', 'eau', 'o'],
            ['ai', 'ei', 'è', 'ê'],
            ['ou', 'u']
        ];
        
        let wrong;
        if (gym.type === 'sounds' || gym.type === 'complex-sounds') {
            // Identifier les sons à exclure (ceux qui ressemblent trop à "correct")
            const excludedSounds = [correct];
            confusingGroups.forEach(group => {
                if (group.includes(correct)) {
                    excludedSounds.push(...group);
                }
            });
            
            // Pour les sons, prendre les autres sons de l'arène comme mauvaises réponses
            // en excluant ceux qui sont phonétiquement trop proches
            wrong = items
                .filter(s => !excludedSounds.includes(s))
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            // Si on n'a pas assez de choix (moins de 3), on complète avec d'autres sons randoms "sûrs" d'autres arènes si nécessaire
            // mais normalement l'arène a assez de sons distincts.
            // Si vraiment pas assez, on prend des sons de base très distincts (a, i, o, u)
            if (wrong.length < 3) {
                const safeBackups = ['a', 'i', 'o', 'u', 'r', 'l', 'm', 'p'].filter(s => !excludedSounds.includes(s));
                while (wrong.length < 3) {
                    const backup = safeBackups[Math.floor(Math.random() * safeBackups.length)];
                    if (!wrong.includes(backup)) {
                        wrong.push(backup);
                    }
                }
            }
        } else {
            // Pour les lettres, prendre d'autres lettres de l'alphabet
            const allOptions = 'abcdefghijklmnopqrstuvwxyz'.split('');
            wrong = allOptions.filter(l => !items.includes(l)).sort(() => Math.random() - 0.5).slice(0, 3);
        }
        
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const pronunciation = gym.pronunciation ? gym.pronunciation[correct] || correct : correct;
        const typeText = gym.type === 'sounds' || gym.type === 'complex-sounds' ? 'son' : 'lettre';
        const article = gym.type === 'sounds' || gym.type === 'complex-sounds' ? 'le' : 'la';
        
        const instruction = this.expertMode 
            ? `Écoute bien et clique sur ${article} bon${article === 'le' ? '' : 'ne'} ${typeText}!`
            : `Clique sur ${article} ${typeText} "${correct.toUpperCase()}"`;
        
        // Ajouter une virgule avant le son pour éviter les liaisons ("le son, on" au lieu de "le son non")
        const audioInstruction = `Trouve ${article} ${typeText}, ${pronunciation}`;
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
    
    // Arène 8 : Lecture de mots longs (comme les phrases mais avec des mots)
    createReadWordExercise(gym) {
        const items = gym.words;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            availableItems = items;
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const instruction = 'Lis ce mot à voix haute!';
        this.currentAudioInstruction = `Lis ce mot. ${correct}`;
        this.currentAudioPhonetics = false;
        
        // En mode expert, ne pas lire le mot
        if (this.expertMode) {
            this.speak('Lis ce mot', false);
        } else {
            this.speak('Lis ce mot', false);
            setTimeout(() => this.speak(correct, false), 1000);
        }
        
        return { type: 'read-word', correct, instruction };
    },
    
    // Arène 9 : Trouver la phrase parmi des options (comme syllabes/mots)
    createSentenceChoiceExercise(gym) {
        const items = gym.sentences;
        let availableItems = items.filter(item => !this.usedItems.includes(item));
        
        if (availableItems.length === 0) {
            availableItems = items;
        }
        
        const correct = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedItems.push(correct);
        
        const wrong = items.filter(s => s !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const instruction = this.expertMode 
            ? 'Écoute bien et clique sur la bonne phrase!'
            : `Clique sur la phrase "${correct}"`;
        
        // Ajouter une virgule pour éviter les liaisons
        const audioInstruction = `Trouve la phrase, ${correct}`;
        this.currentAudioInstruction = audioInstruction;
        this.currentAudioPhonetics = false;
        this.speak(audioInstruction, false);
        
        return { type: 'sentence-choice', correct, options, instruction, showCorrect: !this.expertMode };
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
        
        // En mode expert, ne pas lire la phrase (trop facile sinon)
        if (this.expertMode) {
            this.speak('Lis cette phrase', false);
        } else {
            this.speak('Lis cette phrase', false);
            setTimeout(() => this.speak(correct, false), 1000);
        }
        
        return { type: 'sentence', correct, instruction };
    },
    
    renderExercise(exercise) {
        const content = document.getElementById('exercise-content');
        const instruction = document.getElementById('instruction-text');
        const feedback = document.getElementById('feedback');
        
        instruction.textContent = exercise.instruction;
        feedback.textContent = '';
        feedback.className = '';
        
        if (exercise.type === 'sentence' || exercise.type === 'read-word') {
            // Lecture à voix haute (phrase ou mot long)
            const isWord = exercise.type === 'read-word';
            const escapedCorrect = exercise.correct.replace(/'/g, "\\'");
            content.innerHTML = `
                <div style="font-size: ${isWord ? '4rem' : '3rem'}; font-weight: bold; margin: 30px 0; line-height: 1.5;">
                    ${exercise.correct}
                </div>
                <button class="btn-primary" onclick="app.checkAnswer('${escapedCorrect}', '${escapedCorrect}')">
                    J'ai lu! 📖
                </button>
            `;
        } else if (exercise.type === 'sentence-choice') {
            // Choix parmi des phrases
            let displayHTML = '';
            if (exercise.showCorrect) {
                displayHTML = `<div style="font-size: 1.8rem; font-weight: bold; margin: 20px 0; color: #FF0000; line-height: 1.4;">${exercise.correct}</div>`;
            }
            
            content.innerHTML = `
                ${displayHTML}
                <div style="display: flex; flex-direction: column; gap: 15px; max-width: 600px; margin: 30px auto;">
                    ${exercise.options.map(opt => {
                        const escapedOpt = opt.replace(/'/g, "\\'");
                        const escapedCorrect = exercise.correct.replace(/'/g, "\\'");
                        return `
                            <button class="option-btn" style="font-size: 1.5rem; padding: 20px; text-align: left;" onclick="app.checkAnswer('${escapedOpt}', '${escapedCorrect}')">
                                ${opt}
                            </button>
                        `;
                    }).join('')}
                </div>
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
            this.score++;
            this.combo = (this.combo || 0) + 1;
            
            // Choix du mot de félicitation
            const praises = ['Génial', 'Super', 'Bravo', 'Impressionnant', 'Top', 'Magnifique', 'Excellent', 'Champion', 'Incroyable', 'Fantastique'];
            const randomPraise = praises[Math.floor(Math.random() * praises.length)];
            
            let message = `🎉 ${randomPraise}`;
            let speakMessage = randomPraise;
            
            // 20% de chance d'ajouter le prénom
            if (Math.random() < 0.2 && this.player.name && this.player.name !== 'Dresseur') {
                message += ` ${this.player.name}`;
                speakMessage += ` ${this.player.name}`;
            }
            
            message += ' !';
            
            // Bonus de combo
            if (this.combo >= 3) {
                message += ` 🔥 Série de ${this.combo} !`;
                // On de dit pas "Série de X" à l'oral c'est moins naturel, on garde juste la félicitation
            }
            
            this.speak(speakMessage, false);

            feedback.textContent = message;
            feedback.className = 'correct';
            buttons.forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === correctAnswer.toLowerCase()) {
                    btn.classList.add('correct');
                }
            });
            setTimeout(() => this.nextExercise(), 1500);
        } else {
            this.combo = 0; // Combo brisé
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
        
        if (this.currentRewardPokemon) {
            // Le débloquer
            const pokedexIndex = this.pokedex.findIndex(p => p.pokedexNum === this.currentRewardPokemon.pokedexNum);
            if (pokedexIndex !== -1 && !this.pokedex[pokedexIndex].unlocked) {
                this.pokedex[pokedexIndex].unlocked = true;
                newPokemon = this.pokedex[pokedexIndex];
            }
        }
        // Fallback si pas de Pokémon stocké (ex: rechargement page pendant partie)
        else {
             // Trouver tous les Pokémon non débloqués de cette arène
            const availablePokemon = this.pokedex.filter(p => 
                p.gym === this.currentGym && 
                p.isEvolution === this.expertMode && 
                !p.unlocked
            );
            
            if (availablePokemon.length > 0) {
                const randomIndex = Math.floor(Math.random() * availablePokemon.length);
                const chosenPokemon = availablePokemon[randomIndex];
                
                const pokedexIndex = this.pokedex.findIndex(p => p.pokedexNum === chosenPokemon.pokedexNum);
                if (pokedexIndex !== -1) {
                    this.pokedex[pokedexIndex].unlocked = true;
                    newPokemon = this.pokedex[pokedexIndex];
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
        
        // Trier par numéro Pokédex
        const sortedPokedex = [...this.pokedex].sort((a, b) => a.pokedexNum - b.pokedexNum);
        
        grid.innerHTML = sortedPokedex.map(pokemon => {
            const pos = this.getSpritePosition(pokemon.pokedexNum);
            const gymName = pokemon.gym ? this.gyms[pokemon.gym]?.name || `Arène ${pokemon.gym}` : 'Bonus';
            const modeText = pokemon.isEvolution ? '⚡Expert' : '🎮Normal';
            
            if (pokemon.unlocked) {
                return `
                    <div class="pokemon-card">
                        <div class="pokemon-sprite" style="background-position: ${pos.x}px ${pos.y}px;"></div>
                        <div class="pokemon-name">${pokemon.name}</div>
                        <div style="font-size: 0.7rem; color: #666;">#${pokemon.pokedexNum.toString().padStart(3, '0')}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="pokemon-card locked">
                        <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 5px; opacity: 0.3;">❓</div>
                        <div class="pokemon-name" style="font-size: 0.9rem;">#${pokemon.pokedexNum.toString().padStart(3, '0')}</div>
                        <div style="font-size: 0.65rem; color: #888; margin-top: 3px;">${gymName}</div>
                        <div style="font-size: 0.6rem; color: ${pokemon.isEvolution ? '#9333ea' : '#3B4CCA'};">${modeText}</div>
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
                
                // Fusionner les arènes sauvegardées avec les nouvelles (pour garder les nouvelles arènes)
                if (data.gyms) {
                    Object.keys(data.gyms).forEach(id => {
                        if (this.gyms[id]) {
                            // Garder la progression mais utiliser la structure actuelle
                            this.gyms[id].stars = data.gyms[id].stars || 0;
                            this.gyms[id].badge = data.gyms[id].badge || false;
                            this.gyms[id].expertStars = data.gyms[id].expertStars || 0;
                            this.gyms[id].expertBadge = data.gyms[id].expertBadge || false;
                            this.gyms[id].unlocked = data.gyms[id].unlocked || this.gyms[id].unlocked;
                        }
                    });
                }
                
                // Fusionner les Pokémon sauvegardés avec les nouveaux
                if (data.pokedex) {
                    data.pokedex.forEach(savedPokemon => {
                        const currentPokemon = this.pokedex.find(p => p.pokedexNum === savedPokemon.pokedexNum);
                        if (currentPokemon) {
                            currentPokemon.unlocked = savedPokemon.unlocked || false;
                        }
                    });
                }
            } catch (e) {
                console.error('Erreur chargement:', e);
            }
        }
    },
    
    resetProgress() {
        const password = prompt("Pour tout réinitialiser, tapez le code secret (1234) :");
        if (password === '1234') {
            if (confirm("Attention ! Toute la progression, les badges et les Pokémon seront perdus. Êtes-vous sûr ?")) {
                localStorage.removeItem('pokemonLecture');
                location.reload();
            }
        } else if (password !== null) {
            alert("Code incorrect !");
        }
    }
};

// Rendre app accessible globalement
window.app = app;

window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
