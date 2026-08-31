/**
 * SignFont Symbols & Digraphs Master Data Definition
 * Centralized repository for handshapes, diacritics, action areas, locations, movements, and digraphs.
 */

(function (global) {
  'use strict';

  // --- Handshapes (a-u) ---
  const HANDSHAPES = {
    'a': 'fist (A)',
    'b': 'flat hand (B)',
    'c': 'cupped hand (C)',
    'd': 'pointing hand (1)',
    'e': 'fingerspelling E',
    'f': 'index, middle, ring spread (W)',
    'g': 'thumb and index extended (G)',
    'h': 'index and middle extended (H/U)',
    'i': 'pinky extended (I)',
    'j': 'pinky and index extended (HORNS)',
    'k': 'middle extended, thumb on edge (K/P)',
    'l': 'middle finger extended',
    'm': 'index, middle, ring touching (M)',
    'n': 'index, middle, ring, pinky spread (4)',
    'o': 'thumb loop with joined fingers (O)',
    'p': 'thumb and fingers spread (5)',
    'q': 'loop between thumb and middle (8)',
    'r': 'index and middle twisted (R)',
    's': 'fist with thumb over fingers (S)',
    't': 'fist with thumb under index (T)',
    'u': 'index and middle spread (V)'
  };

  // --- Handshape Diacritics (P-Z, -) ---
  const DIACRITICS = {
    'P': 'thumb extended parallel',
    'Q': 'loop (e.g., baby-O)',
    'R': 'curled fingers',
    'S': 'bent at proximal joint',
    'T': 'thumb extended, fingers curled',
    'U': 'thumb extended, fingers bent',
    'V': 'pinky extended',
    'W': 'thumb laid alongside',
    'X': 'non-significant fingers extended',
    'Y': 'thumb laid over/tucked',
    'Z': 'thumb perpendicular',
    '-': 'syllable separation'
  };

  // --- Action Areas (! to +) ---
  const ACTION_AREAS = {
    '!': 'palm side',
    '"': 'back side',
    '#': 'palm side of fingers',
    '$': 'heel of hand',
    '%': 'radial edge',
    '&': 'ulnar edge',
    '(': 'distal end (tip)',
    ')': 'elbow end',
    '*': 'space between thumb/digits',
    '+': 'between adjacent fingers'
  };

  // --- Locations (/ to =) ---
  const LOCATIONS = {
    '/': 'Ipsilateral Temple',
    '0': 'Forehead',
    '1': 'Contralateral Temple',
    '2': 'Ipsilateral Ear',
    '3': 'Nose',
    '4': 'Contralateral ear',
    '5': 'Ipsilateral cheek',
    '6': 'Chin / mouth',
    '7': 'Contralateral cheek',
    '8': 'Ipsilateral shoulder',
    '9': 'Sternum (chest)',
    ':': 'Contralateral shoulder',
    ';': 'Ipsilateral abdomen',
    '<': 'Middle abdomen',
    '=': 'Contralateral abdomen'
  };

  // --- Movements & Modifiers (A-M, N, y, O, v, w, x, z) ---
  const MOVEMENTS = {
    'A': 'Move toward ipsilateral side',
    'B': 'Move away from ipsilateral side',
    'C': 'Move back and forth laterally',
    'D': 'Move upwards',
    'E': 'Move downwards',
    'F': 'Move toward the body',
    'G': 'Move away from the body',
    'H': 'Circular path movement',
    'I': 'Twist wrist inward',
    'J': 'Twist wrist outward',
    'K': 'Wiggle the fingers',
    'L': 'Touch',
    'M': 'Continuous contact',
    'N': 'Pause / virtual contact',
    'y': 'Sequential Repetition',
    'O': 'Virtual continuous contact',
    'v': 'Simultaneous identical movement by both hands',
    'w': 'Alternating identical movement by both hands',
    'x': 'Simultaneous retrograde movement by non-dominant hand',
    'z': 'Slow emphasis, super tense (Fast when doubled: zz)'
  };

  // --- Digraphs & Multigraphs ---
  const DIGRAPHS = {
    // --- Handshape Digraphs & Classifiers ---
    'aP': { category: 'Handshape', desc: 'Numeral 10 / upright inanimate object classifier (thumb extended from fist)' },
    'aQ': { category: 'Handshape', desc: 'Sturdy grasping classifier (thumb in crook of curled index)' },
    'bP': { category: 'Handshape', desc: 'Flat objects & planes classifier (thumb extended from flat hand)' },
    'bR': { category: 'Handshape', desc: 'Convex/concave surface classifier (curled fist)' },
    'cQ': { category: 'Handshape', desc: 'Small 2D round object classifier / C-handshape' },
    'cS': { category: 'Handshape', desc: 'Bent-C handshape (proximal knuckles bent)' },
    'dP': { category: 'Handshape', desc: 'Fingerspelling L (1 handshape with parallel extended thumb)' },
    'dQ': { category: 'Handshape', desc: 'Fingerspelling D (index extended, thumb loop)' },
    'dR': { category: 'Handshape', desc: 'Fingerspelling X (index curled at medial/distal joints)' },
    'dT': { category: 'Handshape', desc: 'Bent-L (index curled, thumb extended)' },
    'dS': { category: 'Handshape', desc: 'Pointing index bent at proximal joint (phonetic alternate for 1)' },
    'dW': { category: 'Handshape', desc: 'Pointing hand with thumb alongside middle finger' },
    'ÃR': { category: 'Handshape', desc: 'Tip-contact index alternate' },
    'fQS': { category: 'Handshape', desc: 'Flattened F (fQ) instrument classifier for grasping small objects' },
    'gQ': { category: 'Handshape', desc: 'Flat baby-O (grasping small object classifier)' },
    'hZ': { category: 'Handshape', desc: 'Rectilinear movement classifier (U-handshape with thumb perpendicular)' },
    'hRY': { category: 'Handshape', desc: 'Fingerspelling N (index & middle touching & curled, thumb tucked)' },
    'uR': { category: 'Handshape', desc: 'Curled-V classifier (index & middle spread & curled)' },
    'uS': { category: 'Handshape', desc: 'Angle-V (pointing fingertips straight spread towards PA)' },
    'ÔR': { category: 'Handshape', desc: 'Lenited curled-V classifier' },
    'uP': { category: 'Handshape', desc: 'Numeral 3 handshape (V + extended thumb)' },
    'uT': { category: 'Handshape', desc: 'Curled 3 (thumb extended anchor, index & middle curled)' },
    'iP': { category: 'Handshape', desc: 'Fingerspelling Y / small rod classifier' },
    'jP': { category: 'Handshape', desc: 'I LOVE YOU handshape (HORNS + thumb)' },
    'jS': { category: 'Handshape', desc: 'Bent-HORNS alternate' },
    'oQ': { category: 'Handshape', desc: 'Baby-O (thumb-index loop, other fingers tucked)' },
    'oS': { category: 'Handshape', desc: 'Flat-O (tense alternate of O)' },
    'pR': { category: 'Handshape', desc: 'Claw classifier (tense 5 handshape)' },
    'ÏR': { category: 'Handshape', desc: 'Curled-5 classifier (lax variant of claw)' },
    'pS': { category: 'Handshape', desc: 'Bent-5 classifier' },
    'qX': { category: 'Handshape', desc: 'D handshape variant (ring & pinky tucked)' },
    'qP': { category: 'Handshape', desc: 'Open-8 handshape (feelings, emotions)' },
    'qQ': { category: 'Handshape', desc: 'Tightened 8 handshape (thumb holding middle)' },

    // --- Action Area Digraphs ---
    '!P': { category: 'Action Area', desc: 'Base of thumb on palm side' },
    '!Q': { category: 'Action Area', desc: 'Well in center of palm' },
    '!S': { category: 'Action Area', desc: 'Fleshy ridge overlying proximal finger joints' },
    '!V': { category: 'Action Area', desc: 'Ulnar edge of palm side of hand' },
    '!X': { category: 'Action Area', desc: 'Ulnar edge of palm side closest to wrist' },
    '!Z': { category: 'Action Area', desc: 'Radial edge of palm side closest to wrist' },
    '"P': { category: 'Action Area', desc: 'Back of forearm' },
    '"Q': { category: 'Action Area', desc: 'Back of fingers' },
    '"S': { category: 'Action Area', desc: 'Back of wrist' },
    '#P': { category: 'Action Area', desc: 'Pad of thumb' },
    '#Q': { category: 'Action Area', desc: 'Pad of index fingertip' },
    '#R': { category: 'Action Area', desc: 'Pad of middle finger' },
    '#S': { category: 'Action Area', desc: 'Pad of ring finger' },
    '#V': { category: 'Action Area', desc: 'Pad of pinky finger' },
    '#Z': { category: 'Action Area', desc: 'Pads of all fingers collectively' },
    '$P': { category: 'Action Area', desc: 'Ventral side of forearm' },
    '$Q': { category: 'Action Area', desc: 'Radial end of heel of hand' },
    '$S': { category: 'Action Area', desc: 'Ventral side of wrist' },
    '$V': { category: 'Action Area', desc: 'Ulnar end of heel of hand' },
    '%P': { category: 'Action Area', desc: 'Radial edge of extended finger(s)' },
    '%Q': { category: 'Action Area', desc: "Radial edge of most-radial extended finger's tip" },
    '%S': { category: 'Action Area', desc: 'Radial edge of proximal phalanx of thumb' },
    '%Z': { category: 'Action Area', desc: 'Radial edge of wrist' },
    '&P': { category: 'Action Area', desc: 'Ulnar edge of extended finger(s)' },
    '&Q': { category: 'Action Area', desc: "Ulnar edge of most-ulnar extended finger's tip" },
    '&Z': { category: 'Action Area', desc: 'Ulnar edge of wrist' },
    '(P': { category: 'Action Area', desc: 'Tip of thumb' },
    '(Q': { category: 'Action Area', desc: 'Tip of index finger' },
    '(R': { category: 'Action Area', desc: 'Tip of middle finger' },
    '(S': { category: 'Action Area', desc: 'Tip of ring finger' },
    '(V': { category: 'Action Area', desc: 'Tip of pinky finger' },
    '(X': { category: 'Action Area', desc: 'Fingernail(s) of extended finger(s)' },
    ')P': { category: 'Action Area', desc: 'Underside of upper arm, nearest armpit' },
    ')R': { category: 'Action Area', desc: 'Ventral side (crook) of elbow' },
    ')S': { category: 'Action Area', desc: 'Underside of upper arm, nearest elbow' },
    ')X': { category: 'Action Area', desc: 'Outer side of upper arm, nearest elbow' },
    ')Z': { category: 'Action Area', desc: 'Outer side of upper arm, nearest shoulder' },
    '*Q': { category: 'Action Area', desc: 'Within lumen of thumb-loop (radial approach)' },
    '*X': { category: 'Action Area', desc: 'Within lumen of thumb-loop (ulnar approach)' },
    '+P': { category: 'Action Area', desc: 'Between thumb and index finger' },
    '+Q': { category: 'Action Area', desc: 'Digital interstice closest to great knuckles' },
    '+R': { category: 'Action Area', desc: 'Between index finger and middle finger' },
    '+S': { category: 'Action Area', desc: 'Between middle finger and ring finger' },
    '+V': { category: 'Action Area', desc: 'Between ring finger and pinky finger' },
    '+Z': { category: 'Action Area', desc: 'Digital interstice closest to fingertips' },

    // --- Location Digraphs ---
    '/V': { category: 'Location', desc: 'Top of head above ipsilateral temple' },
    '/Z': { category: 'Location', desc: 'Ipsilateral brow' },
    '/W': { category: 'Location', desc: 'Just to ipsilateral side of ipsilateral temple' },
    '/Q': { category: 'Location', desc: 'Up to 6" above ipsilateral temple' },
    '0V': { category: 'Location', desc: 'Top of head above forehead' },
    '0Q': { category: 'Location', desc: 'Up to 6" above center of forehead' },
    '1V': { category: 'Location', desc: 'Top of head above contralateral temple' },
    '1Z': { category: 'Location', desc: 'Contralateral brow' },
    '1W': { category: 'Location', desc: 'Just to contralateral side of contralateral temple' },
    '1Q': { category: 'Location', desc: 'Up to 6" above contralateral temple' },
    '2Q': { category: 'Location', desc: 'Ipsilateral eye' },
    '3V': { category: 'Location', desc: 'Ipsilateral side of nose' },
    '3Q': { category: 'Location', desc: 'Bottom of nose' },
    '3Z': { category: 'Location', desc: 'Contralateral side of nose' },
    '4Q': { category: 'Location', desc: 'Contralateral eye' },
    '5V': { category: 'Location', desc: 'Ipsilateral corner of mouth' },
    '5Z': { category: 'Location', desc: 'Ipsilateral side under chin' },
    '5W': { category: 'Location', desc: 'To ipsilateral side of ipsilateral cheek' },
    '6V': { category: 'Location', desc: 'Upper lip' },
    '6W': { category: 'Location', desc: 'Teeth' },
    '6X': { category: 'Location', desc: 'Lower lip' },
    '6Y': { category: 'Location', desc: 'Tongue' },
    '6Z': { category: 'Location', desc: 'Central under chin' },
    '7V': { category: 'Location', desc: 'Contralateral corner of mouth' },
    '7Z': { category: 'Location', desc: 'Contralateral side under chin' },
    '7W': { category: 'Location', desc: 'To contralateral side of contralateral cheek' },
    '8Z': { category: 'Location', desc: 'Ipsilateral side of neck' },
    '8V': { category: 'Location', desc: 'Top of ipsilateral shoulder' },
    '8X': { category: 'Location', desc: 'Ipsilateral front of ribcage (breast)' },
    '8Q': { category: 'Location', desc: 'Ipsilateral armpit' },
    '8W': { category: 'Location', desc: 'Just to ipsilateral side of ipsilateral shoulder' },
    '9Z': { category: 'Location', desc: 'Larynx, front of throat' },
    '9V': { category: 'Location', desc: 'Hollow of neck, top of sternum' },
    '9X': { category: 'Location', desc: 'Bottom of sternum' },
    ':Z': { category: 'Location', desc: 'Contralateral side of neck' },
    ':V': { category: 'Location', desc: 'Top of contralateral shoulder' },
    ':X': { category: 'Location', desc: 'Contralateral front of ribcage (breast)' },
    ':Q': { category: 'Location', desc: 'Contralateral armpit' },
    ':W': { category: 'Location', desc: 'Just to contralateral side of contralateral shoulder' },
    ';X': { category: 'Location', desc: 'Ipsilateral bottom of ribcage' },
    ';Q': { category: 'Location', desc: 'Ipsilateral groin area' },
    ';Z': { category: 'Location', desc: 'Ipsilateral thigh' },
    ';V': { category: 'Location', desc: 'Ipsilateral hip' },
    ';T': { category: 'Location', desc: 'Ipsilateral outer thigh' },
    ';R': { category: 'Location', desc: 'Ipsilateral inner thigh' },
    ';W': { category: 'Location', desc: 'To ipsilateral side of ipsilateral side/hip' },
    '<X': { category: 'Location', desc: 'Solar plexus, below sternum' },
    '<Q': { category: 'Location', desc: 'Middle groin area' },
    '=X': { category: 'Location', desc: 'Contralateral bottom of ribcage' },
    '=Q': { category: 'Location', desc: 'Contralateral groin area' },
    '=Z': { category: 'Location', desc: 'Contralateral thigh' },
    '=V': { category: 'Location', desc: 'Contralateral hip' },
    '=T': { category: 'Location', desc: 'Contralateral outer thigh' },
    '=R': { category: 'Location', desc: 'Contralateral inner thigh' },
    '=W': { category: 'Location', desc: 'To contralateral side of contralateral side/hip' },

    // --- Movement Digraphs ---
    'J!': { category: 'Movement', desc: 'Nod wrist with palm leading' },
    'J"': { category: 'Movement', desc: 'Nod wrist with back of hand leading' },
    'J%': { category: 'Movement', desc: 'Wave wrist toward radial side' },
    'J&': { category: 'Movement', desc: 'Wave wrist toward ulnar side' },
    'KZ': { category: 'Movement', desc: 'Simultaneous wiggling' },
    'KX': { category: 'Movement', desc: 'Sequential or random wiggling' },
    'LS': { category: 'Movement', desc: 'Contact on proximal side of vertical surface' },
    'LV': { category: 'Movement', desc: 'Contact on top of horizontal surface' },
    'LQ': { category: 'Movement', desc: 'Contact on ipsilateral side of sagittal surface' },
    'LR': { category: 'Movement', desc: 'Contact on distal side of vertical surface' },
    'LZ': { category: 'Movement', desc: 'Contact on bottom of horizontal surface' },
    'LX': { category: 'Movement', desc: 'Contact on contralateral side of sagittal surface' },
    'LP': { category: 'Movement', desc: 'Contact at an angle' },
    'MS': { category: 'Movement', desc: 'Continuous contact on proximal side of vertical surface' },
    'MV': { category: 'Movement', desc: 'Continuous contact on top of horizontal surface' },
    'MQ': { category: 'Movement', desc: 'Continuous contact on ipsilateral side of sagittal surface' },
    'MR': { category: 'Movement', desc: 'Continuous contact on distal side of vertical surface' },
    'MZ': { category: 'Movement', desc: 'Continuous contact on bottom of horizontal surface' },
    'MX': { category: 'Movement', desc: 'Continuous contact on contralateral side of sagittal surface' },
    'MP': { category: 'Movement', desc: 'Continuous contact at an angle' },
    'NS': { category: 'Movement', desc: 'Virtual contact on proximal side of imaginary vertical surface' },
    'NV': { category: 'Movement', desc: 'Virtual contact on top of imaginary horizontal surface' },
    'NQ': { category: 'Movement', desc: 'Virtual contact on ipsilateral side of imaginary sagittal surface' },
    'NR': { category: 'Movement', desc: 'Virtual contact on distal side of imaginary vertical surface' },
    'NZ': { category: 'Movement', desc: 'Virtual contact on bottom of imaginary horizontal surface' },
    'NX': { category: 'Movement', desc: 'Virtual contact on contralateral side of imaginary sagittal surface' },
    'OS': { category: 'Movement', desc: 'Virtual sliding contact on proximal side of imaginary vertical surface' },
    'OV': { category: 'Movement', desc: 'Virtual sliding contact on top of imaginary horizontal surface' },
    'OQ': { category: 'Movement', desc: 'Virtual sliding contact on ipsilateral side of imaginary sagittal surface' },
    'OR': { category: 'Movement', desc: 'Virtual sliding contact on distal side of imaginary vertical surface' },
    'OZ': { category: 'Movement', desc: 'Virtual sliding contact on bottom of imaginary horizontal surface' },
    'OX': { category: 'Movement', desc: 'Virtual sliding contact on contralateral side of imaginary sagittal surface' },
    'yQ': { category: 'Movement', desc: 'Interrupted or incremental repetition' },
    'zz': { category: 'Movement', desc: 'Fast emphasis (increased speed and size)' },

    // --- Non-Manual Markers & Hand Switch Digraphs ---
    '?V': { category: 'Marker', desc: 'WH question (lowered chin)' },
    '?S': { category: 'Marker', desc: 'YES/NO question (raised chin)' },
    '[P': { category: 'Marker', desc: 'Tilt head toward dominant side' },
    ']P': { category: 'Marker', desc: 'Tilt head toward non-dominant side' },
    ']Q': { category: 'Marker', desc: 'Switch to non-dominant hand active' },
    '[Q': { category: 'Marker', desc: 'Switch back to dominant hand active' }
  };

  /**
   * Helper function to extract search keywords / clean aliases for flexible grading
   */
  function extractAliases(symbol, description) {
    const aliases = new Set();
    aliases.add(description.trim().toLowerCase());

    // Extract content inside parentheses: e.g. "fist (A)" -> "a", "fist"
    const parenMatch = description.match(/\(([^)]+)\)/);
    if (parenMatch) {
      aliases.add(parenMatch[1].trim().toLowerCase());
      const beforeParen = description.replace(/\([^)]+\)/g, '').trim().toLowerCase();
      if (beforeParen) aliases.add(beforeParen);
    }

    // Extract before slash/hyphen: e.g. "Chin / mouth" -> "chin", "mouth"
    if (description.includes('/')) {
      description.split('/').forEach(part => {
        const clean = part.replace(/\([^)]+\)/g, '').trim().toLowerCase();
        if (clean) aliases.add(clean);
      });
    }

    return Array.from(aliases);
  }

  // --- Build Structured Flashcard Card Database ---
  const SYMBOL_FLASHCARDS = [];

  // 1. Handshapes
  Object.keys(HANDSHAPES).forEach(sym => {
    SYMBOL_FLASHCARDS.push({
      id: 'handshape_' + sym,
      english: HANDSHAPES[sym],
      signs: [sym],
      category: 'Handshape',
      subcategory: 'Handshapes',
      aliases: extractAliases(sym, HANDSHAPES[sym])
    });
  });

  // 2. Diacritics
  Object.keys(DIACRITICS).forEach(sym => {
    SYMBOL_FLASHCARDS.push({
      id: 'diacritic_' + sym,
      english: DIACRITICS[sym],
      signs: [sym],
      category: 'Diacritic',
      subcategory: 'Diacritics',
      aliases: extractAliases(sym, DIACRITICS[sym])
    });
  });

  // 3. Action Areas
  Object.keys(ACTION_AREAS).forEach(sym => {
    SYMBOL_FLASHCARDS.push({
      id: 'action_area_' + sym,
      english: ACTION_AREAS[sym],
      signs: [sym],
      category: 'Action Area',
      subcategory: 'Action Areas',
      aliases: extractAliases(sym, ACTION_AREAS[sym])
    });
  });

  // 4. Locations
  Object.keys(LOCATIONS).forEach(sym => {
    SYMBOL_FLASHCARDS.push({
      id: 'location_' + sym,
      english: LOCATIONS[sym],
      signs: [sym],
      category: 'Location',
      subcategory: 'Locations',
      aliases: extractAliases(sym, LOCATIONS[sym])
    });
  });

  // 5. Movements
  Object.keys(MOVEMENTS).forEach(sym => {
    SYMBOL_FLASHCARDS.push({
      id: 'movement_' + sym,
      english: MOVEMENTS[sym],
      signs: [sym],
      category: 'Movement',
      subcategory: 'Movements',
      aliases: extractAliases(sym, MOVEMENTS[sym])
    });
  });

  // 6. Digraphs
  Object.keys(DIGRAPHS).forEach(sym => {
    const item = DIGRAPHS[sym];
    let subcategory = 'Digraphs';
    if (item.category === 'Handshape') subcategory = 'Handshape Digraphs';
    else if (item.category === 'Action Area') subcategory = 'Action Area Digraphs';
    else if (item.category === 'Location') subcategory = 'Location Digraphs';
    else if (item.category === 'Movement') subcategory = 'Movement Digraphs';
    else if (item.category === 'Marker') subcategory = 'Marker Digraphs';

    SYMBOL_FLASHCARDS.push({
      id: 'digraph_' + sym,
      english: item.desc,
      signs: [sym],
      category: 'Digraph',
      subcategory: subcategory,
      aliases: extractAliases(sym, item.desc)
    });
  });

  // Export to global window object
  const SignFontSymbols = {
    HANDSHAPES,
    DIACRITICS,
    ACTION_AREAS,
    CONTACTS: ACTION_AREAS, // Backward-compatibility alias
    LOCATIONS,
    MOVEMENTS,
    DIGRAPHS,
    SYMBOL_FLASHCARDS,

    // Tokenizer helper
    tokenize: function (sign) {
      if (!sign) return [];
      const tokens = [];
      let i = 0;
      while (i < sign.length) {
        let matched = false;
        for (let len = 3; len >= 2; len--) {
          if (i + len <= sign.length) {
            const sub = sign.substring(i, i + len);
            if (DIGRAPHS[sub]) {
              tokens.push({
                token: sub,
                desc: DIGRAPHS[sub].desc,
                category: DIGRAPHS[sub].category
              });
              i += len;
              matched = true;
              break;
            }
          }
        }
        if (!matched) {
          const char = sign[i];
          let desc = 'Unknown marker';
          let category = 'Other';
          if (HANDSHAPES[char]) {
            desc = HANDSHAPES[char];
            category = 'Handshape';
          } else if (DIACRITICS[char]) {
            desc = DIACRITICS[char];
            category = 'Diacritic';
          } else if (ACTION_AREAS[char]) {
            desc = ACTION_AREAS[char];
            category = 'Action Area';
          } else if (LOCATIONS[char]) {
            desc = LOCATIONS[char];
            category = 'Location';
          } else if (MOVEMENTS[char]) {
            desc = MOVEMENTS[char];
            category = 'Movement';
          }
          tokens.push({ token: char, desc, category });
          i++;
        }
      }
      return tokens;
    }
  };

  // Expose as global properties for easy consumption across all pages
  global.SIGNFONT_HANDSHAPES = HANDSHAPES;
  global.SIGNFONT_DIACRITICS = DIACRITICS;
  global.SIGNFONT_ACTION_AREAS = ACTION_AREAS;
  global.SIGNFONT_CONTACTS = ACTION_AREAS;
  global.SIGNFONT_LOCATIONS = LOCATIONS;
  global.SIGNFONT_MOVEMENTS = MOVEMENTS;
  global.SIGNFONT_DIGRAPHS = DIGRAPHS;
  global.SIGNFONT_SYMBOL_FLASHCARDS = SYMBOL_FLASHCARDS;
  global.SignFontSymbols = SignFontSymbols;

  // Also define legacy variables on window for zero breaking changes in existing pages
  if (typeof window !== 'undefined') {
    window.HANDSHAPES = HANDSHAPES;
    window.DIACRITICS = DIACRITICS;
    window.ACTION_AREAS = ACTION_AREAS;
    window.CONTACTS = ACTION_AREAS;
    window.LOCATIONS = LOCATIONS;
    window.MOVEMENTS = MOVEMENTS;
    window.DIGRAPHS = DIGRAPHS;
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
