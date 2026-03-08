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
    currentGame: 'letters', // 'letters' ou 'counting'
    pokedexReturnTo: 'game-select-screen', // écran vers lequel revenir depuis le Pokédex
    pokedexFilter: 'all', // 'all', 'letters', 'counting'
    
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
    
    // ===== JEU DES CHIFFRES — 7 ARÈNES =====
    countingGyms: {
        c1: {
            name: 'Arène de Nouveauborgen', icon: '🌸',
            type: 'visual-addition',
            unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c2: {
            name: 'Arène de Doublonville', icon: '🔢',
            type: 'numeric-addition',
            unlocked: true, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c3: {
            name: 'Arène de Granivern', icon: '🔟',
            type: 'tens-addition',
            unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c4: {
            name: 'Arène de Calvabalt', icon: '➖',
            type: 'visual-subtraction',
            unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c5: {
            name: "Arène d'Aquatilis", icon: '💧',
            type: 'numeric-subtraction',
            unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c6: {
            name: 'Arène de Volucité', icon: '✖️',
            type: 'matrix-multiplication',
            unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
        },
        c7: {
            name: 'Ligue des Chiffres', icon: '🏆',
            type: 'advanced-multiplication',
            unlocked: false, stars: 0, badge: false, expertStars: 0, expertBadge: false
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

        // ===== GEN 2 — 100 Pokémon de Johto (game: 'counting') =====
        // === ARÈNE c1 — Additions Visuelles ===
        { name: 'Germignon', pokedexNum: 152, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },
        { name: 'Macronium', pokedexNum: 153, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Méganium', pokedexNum: 154, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Héricendre', pokedexNum: 155, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },
        { name: 'Feurisson', pokedexNum: 156, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Typhlosion', pokedexNum: 157, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Kaiminus', pokedexNum: 158, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },
        { name: 'Crocrodil', pokedexNum: 159, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Aligatueur', pokedexNum: 160, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Fouinette', pokedexNum: 161, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },
        { name: 'Fouinar', pokedexNum: 162, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Hoothoot', pokedexNum: 163, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },
        { name: 'Noarfang', pokedexNum: 164, unlocked: false, gym: 'c1', isEvolution: true, game: 'counting' },
        { name: 'Coxy', pokedexNum: 165, unlocked: false, gym: 'c1', isEvolution: false, game: 'counting' },

        // === ARÈNE c2 — Additions Numériques ===
        { name: 'Coxyclaque', pokedexNum: 166, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Mimigal', pokedexNum: 167, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Migalos', pokedexNum: 168, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Nostenfer', pokedexNum: 169, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Loupio', pokedexNum: 170, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Lanturn', pokedexNum: 171, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Pichu', pokedexNum: 172, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Mélo', pokedexNum: 173, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Toudoudou', pokedexNum: 174, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Togépi', pokedexNum: 175, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Togétic', pokedexNum: 176, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Natu', pokedexNum: 177, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },
        { name: 'Xatu', pokedexNum: 178, unlocked: false, gym: 'c2', isEvolution: true, game: 'counting' },
        { name: 'Wattouat', pokedexNum: 179, unlocked: false, gym: 'c2', isEvolution: false, game: 'counting' },

        // === ARÈNE c3 — Dizaines ===
        { name: 'Lainergie', pokedexNum: 180, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Pharamp', pokedexNum: 181, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Joliflor', pokedexNum: 182, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Marill', pokedexNum: 183, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Azumarill', pokedexNum: 184, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Simularbre', pokedexNum: 185, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Tarpaud', pokedexNum: 186, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Granivol', pokedexNum: 187, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Floravol', pokedexNum: 188, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Cotovol', pokedexNum: 189, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Capumain', pokedexNum: 190, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Tournegrin', pokedexNum: 191, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },
        { name: 'Héliatronc', pokedexNum: 192, unlocked: false, gym: 'c3', isEvolution: true, game: 'counting' },
        { name: 'Yanma', pokedexNum: 193, unlocked: false, gym: 'c3', isEvolution: false, game: 'counting' },

        // === ARÈNE c4 — Soustractions Visuelles ===
        { name: 'Axoloto', pokedexNum: 194, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Maraiste', pokedexNum: 195, unlocked: false, gym: 'c4', isEvolution: true, game: 'counting' },
        { name: 'Mentali', pokedexNum: 196, unlocked: false, gym: 'c4', isEvolution: true, game: 'counting' },
        { name: 'Noctali', pokedexNum: 197, unlocked: false, gym: 'c4', isEvolution: true, game: 'counting' },
        { name: 'Cornèbre', pokedexNum: 198, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Roigada', pokedexNum: 199, unlocked: false, gym: 'c4', isEvolution: true, game: 'counting' },
        { name: 'Feuforêve', pokedexNum: 200, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Zarbi', pokedexNum: 201, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Qulbutoké', pokedexNum: 202, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Girafarig', pokedexNum: 203, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Pomdepik', pokedexNum: 204, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Foretress', pokedexNum: 205, unlocked: false, gym: 'c4', isEvolution: true, game: 'counting' },
        { name: 'Insolourdo', pokedexNum: 206, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },
        { name: 'Scorplane', pokedexNum: 207, unlocked: false, gym: 'c4', isEvolution: false, game: 'counting' },

        // === ARÈNE c5 — Soustractions Numériques ===
        { name: 'Steelix', pokedexNum: 208, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Snubbull', pokedexNum: 209, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Granbull', pokedexNum: 210, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Qwilfish', pokedexNum: 211, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Cizayox', pokedexNum: 212, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Caratroc', pokedexNum: 213, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Scarhino', pokedexNum: 214, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Farfuret', pokedexNum: 215, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Teddiursa', pokedexNum: 216, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Ursaring', pokedexNum: 217, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Limagma', pokedexNum: 218, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Volcaropod', pokedexNum: 219, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },
        { name: 'Marcacrin', pokedexNum: 220, unlocked: false, gym: 'c5', isEvolution: false, game: 'counting' },
        { name: 'Cochignon', pokedexNum: 221, unlocked: false, gym: 'c5', isEvolution: true, game: 'counting' },

        // === ARÈNE c6 — Multiplications Visuelles ===
        { name: 'Corayon', pokedexNum: 222, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Rémoraid', pokedexNum: 223, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Octillery', pokedexNum: 224, unlocked: false, gym: 'c6', isEvolution: true, game: 'counting' },
        { name: 'Cadoizo', pokedexNum: 225, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Mantide', pokedexNum: 226, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Airmure', pokedexNum: 227, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Malosse', pokedexNum: 228, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Démolosse', pokedexNum: 229, unlocked: false, gym: 'c6', isEvolution: true, game: 'counting' },
        { name: 'Hyporoi', pokedexNum: 230, unlocked: false, gym: 'c6', isEvolution: true, game: 'counting' },
        { name: 'Phanpy', pokedexNum: 231, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Donphan', pokedexNum: 232, unlocked: false, gym: 'c6', isEvolution: true, game: 'counting' },
        { name: 'Porygon2', pokedexNum: 233, unlocked: false, gym: 'c6', isEvolution: true, game: 'counting' },
        { name: 'Cerfrousse', pokedexNum: 234, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },
        { name: 'Queulorior', pokedexNum: 235, unlocked: false, gym: 'c6', isEvolution: false, game: 'counting' },

        // === ARÈNE c7 — Multiplications Avancées ===
        { name: 'Debugant', pokedexNum: 236, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Kapoera', pokedexNum: 237, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Lippu', pokedexNum: 238, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Élekid', pokedexNum: 239, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Magby', pokedexNum: 240, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Écrémeuh', pokedexNum: 241, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Leuphorie', pokedexNum: 242, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Raikou', pokedexNum: 243, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Entei', pokedexNum: 244, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Suicune', pokedexNum: 245, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Embrylex', pokedexNum: 246, unlocked: false, gym: 'c7', isEvolution: false, game: 'counting' },
        { name: 'Ymphect', pokedexNum: 247, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Tyranocif', pokedexNum: 248, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Lugia', pokedexNum: 249, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Ho-Oh', pokedexNum: 250, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
        { name: 'Celebi', pokedexNum: 251, unlocked: false, gym: 'c7', isEvolution: true, game: 'counting' },
    ],
    
    // Fonction pour obtenir la position du sprite Gen 1
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

    // Fonction pour obtenir la position du sprite Gen 2
    // Le sprite sheet Gen 2 inclut les 28 formes de Zarbi (#201)
    // Donc pour les Pokémon #202+, on compense l'offset de 27 cases supplémentaires
    getSpritePositionGen2(pokedexNum) {
        const ZARBI_FORMS = 28; // Zarbi a 28 formes dans le sprite sheet
        const spriteSize = 80;
        const columns = 12;

        let index = pokedexNum - 152; // Index 0-based depuis #152 Germignon
        if (pokedexNum > 201) {
            // Sauter les formes Zarbi supplémentaires (28 formes - 1 entrée Pokédex = 27 extras)
            index += (ZARBI_FORMS - 1);
        }

        const col = index % columns;
        const row = Math.floor(index / columns);

        return { x: -(col * spriteSize), y: -(row * spriteSize) };
    },

    // Détecte les dimensions du sprite Gen 2 et ajuste le CSS
    detectGen2SpriteSize() {
        const img = new Image();
        img.onload = () => {
            const nativeW = img.naturalWidth;
            const nativeH = img.naturalHeight;
            const cols = 12;
            const nativeSpriteW = nativeW / cols;
            const displaySize = 80;
            const scale = displaySize / nativeSpriteW;
            const cssW = Math.round(nativeW * scale);
            const cssH = Math.round(nativeH * scale);
            document.documentElement.style.setProperty('--gen2-bg-size', `${cssW}px ${cssH}px`);
            document.documentElement.style.setProperty('--gen2-bg-size-2x', `${cssW * 2}px ${cssH * 2}px`);
        };
        img.src = 'sprite_pokemon_gen2.png';
    },
    
    init() {
        this.loadProgress();
        this.setupSpeech();
        this.detectGen2SpriteSize();
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
            const mapScreen = document.getElementById('game-select-screen');
            mapScreen.classList.add('active');
            
            // 3. Force le scroll en haut absolu
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            
            // 4. Mettre à jour l'interface
            this.updateGameSelectUI();

            // 5. Message vocal
            setTimeout(() => {
                this.speak(`Bienvenue ${this.player.name}! Quel jeu veux-tu faire aujourd'hui?`, false);
            }, 500);
        }, 10);
    },

    showGameSelect() {
        this.showScreen('game-select-screen');
        this.updateGameSelectUI();
    },

    startLetterGame() {
        this.currentGame = 'letters';
        this.showScreen('map-screen');
        this.updateUI();
        this.speak('Jeu des Lettres ! Bonne chance !', false);
    },

    startCountingGame() {
        this.currentGame = 'counting';
        this.showScreen('counting-map-screen');
        this.updateCountingUI();
        this.speak('Jeu des Chiffres ! À toi de jouer !', false);
    },
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },
    
    selectGym(gymId, isExpert = false) {
        this.currentGame = 'letters';
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

        this.showGymIntro();
    },

    selectCountingGym(gymId, isExpert = false) {
        this.currentGame = 'counting';
        const gym = this.countingGyms[gymId];
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

        this.showGymIntro();
    },
    
    showGymIntro() {
        const gym = this.currentGame === 'counting'
            ? this.countingGyms[this.currentGym]
            : this.gyms[this.currentGym];

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
            const isGen2 = pokemon.game === 'counting';
            const pos = isGen2
                ? this.getSpritePositionGen2(pokemon.pokedexNum)
                : this.getSpritePosition(pokemon.pokedexNum);
            const posX = pos.x * 2;
            const posY = pos.y * 2;
            const spriteClass = isGen2 ? 'reward-pokemon-sprite-gen2' : 'reward-pokemon-sprite';
            spriteContainer.innerHTML = `<div class="${spriteClass}" style="background-position: ${posX}px ${posY}px;"></div>`;

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
        const gym = this.currentGame === 'counting'
            ? this.countingGyms[this.currentGym]
            : this.gyms[this.currentGym];
        const mode = this.expertMode ? 'mode expert' : 'mode normal';
        this.speak(`C'est parti pour ${gym.name} en ${mode}!`, false);
        
        this.combo = 0; // Initialiser le combo
        
        this.showScreen('exercise-screen');
        this.updateExerciseUI();
        this.nextExercise();
    },
    
    backToMap() {
        if (this.currentGame === 'counting') {
            this.showScreen('counting-map-screen');
            this.updateCountingUI();
        } else {
            this.showScreen('map-screen');
            this.updateUI();
        }
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
            Object.keys(this.gyms).forEach(id => {
                this.gyms[id].unlocked = true;
                this.gyms[id].badge = true;
            });
            Object.keys(this.countingGyms).forEach(id => {
                this.countingGyms[id].unlocked = true;
                this.countingGyms[id].badge = true;
            });
            this.speak('Toutes les arènes et modes expert sont débloqués !', false);
        } else {
            Object.keys(this.gyms).forEach(id => {
                const gymId = parseInt(id);
                if (gymId > 1) {
                    const prevGym = this.gyms[gymId - 1];
                    this.gyms[gymId].unlocked = prevGym ? prevGym.badge : false;
                }
            });
            [1, 2, 3, 4].forEach(id => { this.gyms[id].unlocked = true; });

            const countingOrder = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
            countingOrder.forEach((id, idx) => {
                this.countingGyms[id].unlocked = idx <= 1 ? true : (this.countingGyms[countingOrder[idx - 1]]?.badge || false);
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
        const totalPokemon = this.pokedex.filter(p => p.unlocked && !p.game).length;

        document.getElementById('total-badges').textContent = totalBadges;
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

    updateCountingUI() {
        const el = (id) => document.getElementById(id);
        if (el('counting-player-name')) el('counting-player-name').textContent = this.player.name;
        if (el('counting-player-level')) el('counting-player-level').textContent = this.player.level;

        const countingBadges = Object.values(this.countingGyms).filter(g => g.badge).length;
        const countingPokemon = this.pokedex.filter(p => p.game === 'counting' && p.unlocked).length;

        if (el('counting-total-badges')) el('counting-total-badges').textContent = countingBadges;
        if (el('counting-pokemon-count')) el('counting-pokemon-count').textContent = countingPokemon;

        this.renderCountingGyms();
    },

    updateGameSelectUI() {
        const el = (id) => document.getElementById(id);
        if (el('game-select-player-name')) el('game-select-player-name').textContent = this.player.name;

        const lettersBadges = Object.values(this.gyms).filter(g => g.badge).length;
        const lettersPokemon = this.pokedex.filter(p => !p.game && p.unlocked).length;
        const countingBadges = Object.values(this.countingGyms).filter(g => g.badge).length;
        const countingPokemon = this.pokedex.filter(p => p.game === 'counting' && p.unlocked).length;
        const totalPokemon = lettersPokemon + countingPokemon;

        if (el('letters-badges')) el('letters-badges').textContent = lettersBadges;
        if (el('letters-pokemon')) el('letters-pokemon').textContent = lettersPokemon;
        if (el('counting-badges-select')) el('counting-badges-select').textContent = countingBadges;
        if (el('counting-pokemon-select')) el('counting-pokemon-select').textContent = countingPokemon;
        if (el('total-pokemon-count')) el('total-pokemon-count').textContent = totalPokemon;
    },

    renderCountingGyms() {
        const container = document.getElementById('counting-gyms-container');
        if (!container) return;
        container.innerHTML = '';

        Object.keys(this.countingGyms).forEach(id => {
            const gym = this.countingGyms[id];
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
                    <button class="btn-gym btn-gym-normal" onclick="app.selectCountingGym('${id}', false)" ${!gym.unlocked ? 'disabled' : ''}>
                        ${gym.badge ? '🔁 Rejouer' : '▶️ Jouer'}
                    </button>
                    ${gym.badge ? `
                        <button class="btn-gym btn-gym-expert" onclick="app.selectCountingGym('${id}', true)">
                            ${gym.expertBadge ? '🔁 Expert' : '⚡ Expert'}
                        </button>
                    ` : ''}
                </div>
            `;

            container.appendChild(card);
        });
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
        const gym = this.currentGame === 'counting'
            ? this.countingGyms[this.currentGym]
            : this.gyms[this.currentGym];
        document.getElementById('current-gym-name').textContent = gym.name;
        document.getElementById('current-exercise').textContent = this.currentExercise + 1;
        document.getElementById('total-exercises').textContent = this.totalExercises;
        document.getElementById('hearts').textContent = '❤️'.repeat(this.hearts);
        document.getElementById('helper-icon').textContent = this.expertMode ? '💎' : (this.currentGame === 'counting' ? '🔢' : '⚡');
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

        let exercise = null;

        if (this.currentGame === 'counting') {
            const cGym = this.countingGyms[this.currentGym];
            if (cGym.type === 'visual-addition') exercise = this.createVisualAdditionExercise();
            else if (cGym.type === 'numeric-addition') exercise = this.createNumericAdditionExercise();
            else if (cGym.type === 'tens-addition') exercise = this.createTensAdditionExercise();
            else if (cGym.type === 'visual-subtraction') exercise = this.createVisualSubtractionExercise();
            else if (cGym.type === 'numeric-subtraction') exercise = this.createNumericSubtractionExercise();
            else if (cGym.type === 'matrix-multiplication') exercise = this.createMatrixMultiplicationExercise();
            else if (cGym.type === 'advanced-multiplication') exercise = this.createAdvancedMultiplicationExercise();
        } else {
            const gym = this.gyms[this.currentGym];
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
    
    // ===== GÉNÉRATEURS D'EXERCICES DE COMPTAGE =====

    // Génère 4 options (bonne réponse + 3 distracteurs) retournées sous forme de strings
    generateDistractors(correct, max, min = 0, step = 1) {
        const distractors = new Set();
        const candidates = [
            correct - step, correct + step,
            correct - 2 * step, correct + 2 * step,
            correct - 3 * step, correct + 3 * step
        ];
        for (const c of candidates) {
            if (distractors.size >= 3) break;
            if (c !== correct && c >= min) distractors.add(c);
        }
        // Compléter si besoin par des valeurs aléatoires
        let attempts = 0;
        while (distractors.size < 3 && attempts < 100) {
            attempts++;
            const range = Math.max(max - min, step * 8);
            const r = min + Math.floor(Math.random() * (range / step + 1)) * step;
            if (r !== correct && !distractors.has(r)) distractors.add(r);
        }
        return [correct, ...distractors].sort(() => Math.random() - 0.5).map(n => String(n));
    },

    // Arène c1 — Additions Visuelles
    createVisualAdditionExercise() {
        const emojis = ['⚪', '⚡', '🥚', '🫐', '🌟', '💎', '🔥', '💧'];
        let a, b;
        if (this.expertMode) {
            const total = Math.floor(Math.random() * 15) + 11; // 11-25
            a = Math.floor(Math.random() * (total - 1)) + 1;
            b = total - a;
        } else {
            const total = Math.floor(Math.random() * 9) + 2; // 2-10
            a = Math.floor(Math.random() * (total - 1)) + 1;
            b = total - a;
        }
        const emojiA = emojis[Math.floor(Math.random() * emojis.length)];
        let emojiB = emojis[Math.floor(Math.random() * emojis.length)];
        if (emojiA === emojiB) emojiB = emojis[(emojis.indexOf(emojiA) + 1) % emojis.length];

        const correct = a + b;
        const options = this.generateDistractors(correct, this.expertMode ? 25 : 10, 2);
        const instruction = 'Combien d\'objets au total ?';
        this.currentAudioInstruction = instruction;
        this.currentAudioPhonetics = false;
        this.speak(`Combien y a-t-il d'objets en tout ?`, false);
        return { type: 'visual-addition', a, b, emojiA, emojiB, correct: String(correct), options, instruction };
    },

    // Arène c2 — Additions Numériques
    createNumericAdditionExercise() {
        let a, b;
        if (this.expertMode) {
            const total = Math.floor(Math.random() * 15) + 11; // 11-25
            a = Math.floor(Math.random() * (total - 1)) + 1;
            b = total - a;
        } else {
            const total = Math.floor(Math.random() * 11); // 0-10
            a = Math.floor(Math.random() * (total + 1));
            b = total - a;
        }
        const correct = a + b;
        const options = this.generateDistractors(correct, this.expertMode ? 25 : 10, 0);
        this.currentAudioInstruction = `Combien font ${a} plus ${b} ?`;
        this.currentAudioPhonetics = false;
        this.speak(this.currentAudioInstruction, false);
        return { type: 'numeric-addition', a, b, correct: String(correct), options, instruction: 'Quel est le résultat ?' };
    },

    // Arène c3 — Additions de Dizaines
    createTensAdditionExercise() {
        let a, b;
        if (this.expertMode) {
            a = (Math.floor(Math.random() * 10) + 1) * 10; // 10-100
            b = (Math.floor(Math.random() * 10) + 1) * 10;
            while (a + b > 150) b = Math.max(10, b - 10);
        } else {
            const pairs = [[10,10],[10,20],[10,30],[10,40],[20,20],[20,30],[20,10],[30,10],[30,20],[40,10]];
            const pair = pairs[Math.floor(Math.random() * pairs.length)];
            a = pair[0]; b = pair[1];
        }
        const correct = a + b;
        const options = this.generateDistractors(correct, this.expertMode ? 150 : 50, 10, 10);
        this.currentAudioInstruction = `Combien font ${a} plus ${b} ?`;
        this.currentAudioPhonetics = false;
        this.speak(this.currentAudioInstruction, false);
        return { type: 'tens-addition', a, b, correct: String(correct), options, instruction: 'Quel est le résultat ?' };
    },

    // Arène c4 — Soustractions Visuelles
    createVisualSubtractionExercise() {
        const emojis = ['⚪', '⚡', '🥚', '🫐', '🌟'];
        let total, subtract;
        if (this.expertMode) {
            total = Math.floor(Math.random() * 14) + 11; // 11-24
            subtract = Math.floor(Math.random() * (total - 1)) + 1;
        } else {
            total = Math.floor(Math.random() * 9) + 2; // 2-10
            subtract = Math.floor(Math.random() * (total - 1)) + 1;
        }
        const correct = total - subtract;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const options = this.generateDistractors(correct, total - 1, 0);
        this.currentAudioInstruction = `Il y a ${total} objets, on en retire ${subtract}. Combien en reste-t-il ?`;
        this.currentAudioPhonetics = false;
        this.speak('Combien en reste-t-il ?', false);
        return { type: 'visual-subtraction', total, subtract, emoji, correct: String(correct), options, instruction: 'Combien en reste-t-il ?' };
    },

    // Arène c5 — Soustractions Numériques
    createNumericSubtractionExercise() {
        let a, b;
        if (this.expertMode) {
            a = Math.floor(Math.random() * 25) + 1; // 1-25
            b = Math.floor(Math.random() * (a + 1)); // 0 à a
        } else {
            a = Math.floor(Math.random() * 10) + 1; // 1-10
            b = Math.floor(Math.random() * (a + 1)); // 0 à a
        }
        const correct = a - b;
        const options = this.generateDistractors(correct, this.expertMode ? 25 : 10, 0);
        this.currentAudioInstruction = `Combien font ${a} moins ${b} ?`;
        this.currentAudioPhonetics = false;
        this.speak(this.currentAudioInstruction, false);
        return { type: 'numeric-subtraction', a, b, correct: String(correct), options, instruction: 'Quel est le résultat ?' };
    },

    // Arène c6 — Multiplications Visuelles (Matrices)
    createMatrixMultiplicationExercise() {
        const emojis = ['⚡', '🌟', '⚪', '🥚', '🫐', '🔥', '💧', '💎'];
        let a, b;
        if (this.expertMode) {
            a = Math.floor(Math.random() * 5) + 1; // 1-5
            b = Math.floor(Math.random() * 5) + 1; // 1-5
        } else {
            a = Math.floor(Math.random() * 3) + 1; // 1-3
            b = Math.floor(Math.random() * 3) + 1; // 1-3
        }
        const correct = a * b;
        const maxVal = this.expertMode ? 25 : 9;
        const options = this.generateDistractors(correct, maxVal, 1);
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.currentAudioInstruction = `Combien font ${a} fois ${b} ?`;
        this.currentAudioPhonetics = false;
        this.speak(`Combien y a-t-il d'objets dans le tableau ?`, false);
        return { type: 'matrix-multiplication', a, b, emoji, correct: String(correct), options, instruction: `${a} × ${b} = ?` };
    },

    // Arène c7 — Multiplications Avancées (sans matrice)
    createAdvancedMultiplicationExercise() {
        let a, b;
        if (this.expertMode) {
            a = Math.floor(Math.random() * 7) + 4; // 4-10
            b = Math.floor(Math.random() * 7) + 4; // 4-10
        } else {
            a = Math.floor(Math.random() * 3) + 4; // 4-6
            b = Math.floor(Math.random() * 3) + 4; // 4-6
        }
        const correct = a * b;
        const maxVal = this.expertMode ? 100 : 36;
        const options = this.generateDistractors(correct, maxVal, 1, 2);
        this.currentAudioInstruction = `Combien font ${a} fois ${b} ?`;
        this.currentAudioPhonetics = false;
        this.speak(this.currentAudioInstruction, false);
        return { type: 'advanced-multiplication', a, b, correct: String(correct), options, instruction: `${a} × ${b} = ?` };
    },

    renderExercise(exercise) {
        const content = document.getElementById('exercise-content');
        const instruction = document.getElementById('instruction-text');
        const feedback = document.getElementById('feedback');

        instruction.textContent = exercise.instruction;
        feedback.textContent = '';
        feedback.className = '';

        // ===== Exercices du Jeu des Chiffres =====
        const countingTypes = ['visual-addition', 'numeric-addition', 'tens-addition',
            'visual-subtraction', 'numeric-subtraction', 'matrix-multiplication', 'advanced-multiplication'];

        if (countingTypes.includes(exercise.type)) {
            this.renderCountingExercise(exercise, content);
            return;
        }

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

    // ===== RENDU DES EXERCICES DE COMPTAGE =====
    renderCountingExercise(exercise, content) {
        const optionsHTML = (options) => `
            <div class="options-grid">
                ${options.map(opt => `
                    <button class="option-btn" onclick="app.checkAnswer('${opt}', '${exercise.correct}')" style="font-size: 2.5rem;">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;

        if (exercise.type === 'visual-addition') {
            // Affichage groupes d'objets : [A objets] + [B objets] = ?
            const lineA = exercise.emojiA.repeat(exercise.a);
            const lineB = exercise.emojiB.repeat(exercise.b);
            content.innerHTML = `
                <div style="text-align: center; margin: 10px 0;">
                    <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
                        <div class="visual-group" style="font-size: ${exercise.a > 10 ? '1.8rem' : '2.5rem'}; line-height: 1.5; word-break: break-all; max-width: 180px;">${lineA}</div>
                        <span class="visual-operator">+</span>
                        <div class="visual-group" style="font-size: ${exercise.b > 10 ? '1.8rem' : '2.5rem'}; line-height: 1.5; word-break: break-all; max-width: 180px;">${lineB}</div>
                        <span class="visual-question">= ?</span>
                    </div>
                </div>
                ${optionsHTML(exercise.options)}
            `;
        } else if (exercise.type === 'visual-subtraction') {
            const kept = exercise.correct;
            const removed = exercise.subtract;
            const emoji = exercise.emoji;
            const keptHTML = `<span class="subtraction-kept">${emoji.repeat(Number(kept))}</span>`;
            const removedHTML = `<span class="subtraction-removed">${emoji.repeat(removed)}</span>`;
            content.innerHTML = `
                <div class="subtraction-display">
                    <div style="font-size: ${exercise.total > 12 ? '1.8rem' : '2.5rem'}; word-break: break-all; line-height: 1.6; max-width: 350px; margin: 0 auto;">
                        ${keptHTML}${removedHTML}
                    </div>
                    <div style="font-size: 1.4rem; color: #666; margin-top: 8px;">
                        ${exercise.total} − ${exercise.subtract} = ?
                    </div>
                </div>
                ${optionsHTML(exercise.options)}
            `;
        } else if (exercise.type === 'matrix-multiplication') {
            let matrixHTML = '<div class="matrix-grid">';
            for (let row = 0; row < exercise.a; row++) {
                matrixHTML += '<div class="matrix-row">';
                for (let col = 0; col < exercise.b; col++) {
                    matrixHTML += `<span class="matrix-cell">${exercise.emoji}</span>`;
                }
                matrixHTML += '</div>';
            }
            matrixHTML += '</div>';
            content.innerHTML = `
                <div style="text-align: center; font-size: 2.5rem; font-weight: bold; color: #3B4CCA; margin: 10px 0;">
                    ${exercise.a} × ${exercise.b} = ?
                </div>
                <div style="text-align: center; margin: 10px 0;">${matrixHTML}</div>
                ${optionsHTML(exercise.options)}
            `;
        } else {
            // Affichage numérique (additions, dizaines, soustractions numériques, multiplications avancées)
            const operator = exercise.type === 'numeric-addition' || exercise.type === 'tens-addition' ? '+'
                : exercise.type === 'numeric-subtraction' ? '−' : '×';
            content.innerHTML = `
                <div class="math-display">${exercise.a} ${operator} ${exercise.b} = ?</div>
                ${optionsHTML(exercise.options)}
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

        if (this.currentGame === 'counting') {
            const gym = this.countingGyms[this.currentGym];
            if (this.expertMode) {
                gym.expertStars = Math.max(gym.expertStars, starsEarned);
                gym.expertBadge = true;
            } else {
                gym.stars = Math.max(gym.stars, starsEarned);
                gym.badge = true;
                // Débloquer l'arène suivante
                const countingOrder = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
                const idx = countingOrder.indexOf(this.currentGym);
                if (idx >= 0 && idx < countingOrder.length - 1) {
                    this.countingGyms[countingOrder[idx + 1]].unlocked = true;
                }
            }
        } else {
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

        const gym = this.currentGame === 'counting'
            ? this.countingGyms[this.currentGym]
            : this.gyms[this.currentGym];

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

            const isGen2 = pokemon.game === 'counting';
            const pos = isGen2
                ? this.getSpritePositionGen2(pokemon.pokedexNum)
                : this.getSpritePosition(pokemon.pokedexNum);
            const posX = pos.x * 2;
            const posY = pos.y * 2;
            const spriteClass = isGen2 ? 'reward-pokemon-sprite-gen2' : 'reward-pokemon-sprite';

            rewardContent.innerHTML = `
                <div class="${spriteClass}" style="background-position: ${posX}px ${posY}px;"></div>
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
    
    showPokedex(returnTo = null) {
        this.pokedexReturnTo = returnTo || (
            this.currentGame === 'counting' ? 'counting-map-screen' : 'game-select-screen'
        );
        this.showScreen('pokedex-screen');
        this.renderPokedex();
    },

    closePokedex() {
        const dest = this.pokedexReturnTo || 'game-select-screen';
        this.showScreen(dest);
        if (dest === 'map-screen') this.updateUI();
        else if (dest === 'counting-map-screen') this.updateCountingUI();
        else this.updateGameSelectUI();
    },

    filterPokedex(filter) {
        this.pokedexFilter = filter;
        document.querySelectorAll('.pokedex-filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filter-' + filter).classList.add('active');
        this.renderPokedex();
    },
    
    renderPokedex() {
        const grid = document.getElementById('pokedex-grid');
        const unlockedCount = document.getElementById('pokedex-unlocked-count');

        const filter = this.pokedexFilter || 'all';

        // Filtrer selon la génération sélectionnée
        let pokedexToShow = [...this.pokedex].sort((a, b) => a.pokedexNum - b.pokedexNum);
        if (filter === 'letters') pokedexToShow = pokedexToShow.filter(p => !p.game);
        else if (filter === 'counting') pokedexToShow = pokedexToShow.filter(p => p.game === 'counting');

        const unlocked = pokedexToShow.filter(p => p.unlocked).length;
        if (unlockedCount) unlockedCount.textContent = this.pokedex.filter(p => p.unlocked).length;

        grid.innerHTML = pokedexToShow.map(pokemon => {
            const isGen2 = pokemon.game === 'counting';
            const pos = isGen2
                ? this.getSpritePositionGen2(pokemon.pokedexNum)
                : this.getSpritePosition(pokemon.pokedexNum);
            const spriteClass = isGen2 ? 'pokemon-sprite-gen2' : 'pokemon-sprite';

            const gymSource = isGen2 ? this.countingGyms[pokemon.gym] : this.gyms[pokemon.gym];
            const gymName = gymSource?.name || `Arène ${pokemon.gym}`;
            const modeText = pokemon.isEvolution ? '⚡Expert' : '🎮Normal';

            if (pokemon.unlocked) {
                return `
                    <div class="pokemon-card">
                        <div class="${spriteClass}" style="background-position: ${pos.x}px ${pos.y}px;"></div>
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
            countingGyms: this.countingGyms,
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

                // Fusionner les arènes lettres sauvegardées
                if (data.gyms) {
                    Object.keys(data.gyms).forEach(id => {
                        if (this.gyms[id]) {
                            this.gyms[id].stars = data.gyms[id].stars || 0;
                            this.gyms[id].badge = data.gyms[id].badge || false;
                            this.gyms[id].expertStars = data.gyms[id].expertStars || 0;
                            this.gyms[id].expertBadge = data.gyms[id].expertBadge || false;
                            this.gyms[id].unlocked = data.gyms[id].unlocked || this.gyms[id].unlocked;
                        }
                    });
                }

                // Fusionner les arènes chiffres sauvegardées
                if (data.countingGyms) {
                    Object.keys(data.countingGyms).forEach(id => {
                        if (this.countingGyms[id]) {
                            this.countingGyms[id].stars = data.countingGyms[id].stars || 0;
                            this.countingGyms[id].badge = data.countingGyms[id].badge || false;
                            this.countingGyms[id].expertStars = data.countingGyms[id].expertStars || 0;
                            this.countingGyms[id].expertBadge = data.countingGyms[id].expertBadge || false;
                            this.countingGyms[id].unlocked = data.countingGyms[id].unlocked || this.countingGyms[id].unlocked;
                        }
                    });
                }

                // Fusionner les Pokémon sauvegardés (Gen 1 et Gen 2)
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
    
    exportProgress() {
        try {
            const data = {
                player: this.player,
                gyms: this.gyms,
                countingGyms: this.countingGyms,
                pokedex: this.pokedex,
                exportDate: new Date().toISOString()
            };
            
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/octet-stream' }); // application/json parfois ouvert dans le navigateur mobile
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // Nom du fichier avec la date
            const dateStr = new Date().toISOString().split('T')[0];
            a.download = `sauvegarde-pokemon-lecture-${dateStr}.json`;
            
            document.body.appendChild(a);
            a.click();
            
            // Délai pour mobile
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 1000);
        } catch (e) {
            console.error(e);
            alert("Erreur lors de l'export: " + e.message);
        }
    },
    
    triggerImport() {
        // Simple click sur l'input file caché
        const input = document.getElementById('import-file');
        if (input) {
            input.click();
        } else {
            alert("Erreur: Impossible de trouver le champ d'import.");
        }
    },
    
    importProgress(input) {
        const file = input.files[0];
        if (!file) return;
        
        if (!confirm("Attention ! Importer une sauvegarde va remplacer votre progression actuelle. \nVoulez-vous continuer ?")) {
            input.value = ''; // Reset input
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target.result;
                const data = JSON.parse(json);
                
                // Vérification basique de la structure
                if (!data.player || !data.gyms || !data.pokedex) {
                    throw new Error("Format de fichier invalide");
                }
                
                // Sauvegarder les nouvelles données
                localStorage.setItem('pokemonLecture', JSON.stringify(data));
                
                alert("Sauvegarde importée avec succès ! La page va se recharger.");
                location.reload();
            } catch (error) {
                console.error("Erreur d'importation:", error);
                alert("Erreur lors de l'importation du fichier. Vérifiez qu'il s'agit bien d'une sauvegarde valide.");
            }
        };
        reader.readAsText(file);
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
