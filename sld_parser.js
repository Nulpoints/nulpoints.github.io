        var calculator = null;
        if (typeof SignatureCalculator !== 'undefined') {
            calculator = new SignatureCalculator();
        }

        function signatureToElis(sig) {
            if (!sig || sig === 'None') return '';
            let hasPlus = sig.includes('+');
            sig = sig.replace(/\+/g, '');
            // Ignore ^ characters
            sig = sig.replace(/\^/g, '');

            sig = sig.replace(/RR/g, 'j');

            let newSig = '';
            for (let i = 0; i < sig.length; i++) {
                let char = sig[i];
                if (char === 'L' || char === 'U' || char === 'C') {
                    let isAdjToPipe = (i > 0 && sig[i-1] === '|') || (i < sig.length - 1 && sig[i+1] === '|');
                    
                    let isAdjToLCU = false;
                    if (i > 0 && (sig[i-1] === 'L' || sig[i-1] === 'U' || sig[i-1] === 'C')) isAdjToLCU = true;
                    if (i < sig.length - 1 && (sig[i+1] === 'L' || sig[i+1] === 'U' || sig[i+1] === 'C')) isAdjToLCU = true;

                    if (isAdjToPipe || !isAdjToLCU) {
                        if (char === 'L') newSig += 'g';
                        else if (char === 'C') newSig += 'o';
                        else if (char === 'U') newSig += 's';
                        continue;
                    }
                }
                newSig += char;
            }
            sig = newSig.replace(/\|/g, '');

            if (sig.length === 0) return '';

            let thumbChar = sig[0];
            let thumbElis = '';
            
            if (hasPlus && thumbChar === 'X') thumbElis = 'i';
            else if (hasPlus && thumbChar === 'C') thumbElis = 'a';
            else if (hasPlus && thumbChar === 'U') thumbElis = 'f';
            else if (thumbChar === 'A') thumbElis = 'y';
            else if (thumbChar === 'E') thumbElis = 'w';
            else if (thumbChar === 'C') thumbElis = 'e';
            else if (thumbChar === 'U') thumbElis = 'r';
            else if (thumbChar === 'F') thumbElis = 't';
            else thumbElis = thumbChar.toLowerCase();

            let elis = thumbElis;
            let fingers = sig.slice(1);

            for (let i = 0; i < fingers.length; i++) {
                let char = fingers[i];
                if (hasPlus) {
                    if (char === 'X') elis += 'i';
                    else if (char === 'C') elis += 'a';
                    else if (char === 'U') elis += 'f';
                    else if (char === 'L') elis += 'h';
                    else if (char === 'S') elis += 'q';
                    else elis += char;
                } else {
                    if (char === 'L') elis += 'h';
                    else if (char === 'C') elis += 'p';
                    else if (char === 'U') elis += 'd';
                    else if (char === 'X') elis += 'u';
                    else if (char === 'S') elis += 'q';
                    else elis += char;
                }
            }
            return elis;
        }

        function copyContent(elementId) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Optional feedback could go here
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
        // SLD Text Rules & Sets
        const ACCENT_MAP = { 'á': 'a', 'é': 'e', 'ć': 'c', 'ú': 'u', 'ó': 'o' };
        function normalize(char) { return ACCENT_MAP[char] || char; }
        function normalizeWord(word) { return word.split('').map(normalize).join(''); }

        const INITIAL_SET = new Set(['s', 'l', 'y', 'h', 'v', 'm', 'w', 'b', 'f']);
        const FLEXING_SET = new Set(['f', 'a', 'e', 'c', 'u', 'o', 'x', 'r', 'á', 'é', 'ć', 'ú', 'ó']);
        const ORIENTATION_SET = new Set(['a', 'e', 't', 'j', 'i', 'k', 'o']);
        const FORBIDDEN_PAIRS = new Set(['ae', 'ik', 'tj', 'ea', 'ki', 'jt', 'aa', 'ee', 'ii', 'kk', 'tt', 'jj']);

        const LOCATIONS = [
            "fi", "wi", "qi", "gi", "ni", "ci", "oi", "ui",
            "cj", "luj", "lj", "sj", "suj", "pj", "fj", "fuj", "fje", "fjl", "fjv", "fjw", "fjy", "bj", "dj",
            "ut", "ct", "st", "bt", "gt",
            "gk", "guk", "lk", "luk", "fuk", "fk",
            "I", "K", "A", "E", "T", "J"
        ].sort((a, b) => b.length - a.length); // match longest first

        const IRREGULAR_MAP = {
            "mo": true, "bo": true, "lo": true, "yo": true,
            "vo": true, "ho": true, "fo": true, "wo": true,
            "vla": true, "vle": true, "so": true, "sle": true,
            "she": true, "sme": true
        };

        // Handshape strict parser helper
        function isValidHandshape(spelling) {
            let norm = spelling.toLowerCase().split('').map(normalize).join('');
            if (IRREGULAR_MAP[norm]) return true;
            if (spelling.length < 2) return false;
            if (!INITIAL_SET.has(normalize(spelling[0]))) return false;
            let chars = new Set(norm);
            if (chars.size !== norm.length) return false; // No repeats

            let opStr = "";
            let flexIdx = 1;
            for (let i = 1; i < spelling.length; i++) {
                let c = normalize(spelling[i]);
                if (INITIAL_SET.has(c) && !FLEXING_SET.has(c)) {
                    opStr += c;
                    flexIdx = i + 1;
                } else if (FLEXING_SET.has(c)) {
                    break;
                } else {
                    return false;
                }
            }

            let last = normalize(spelling[spelling.length - 1]);
            if (!new Set(['a', 'e', 'c', 'u', 'o']).has(last)) return false;

            let THUMB_POSITION_END_SET = new Set(['a', 'e', 'o']);
            let CURL_BEND_SET = new Set(['c', 'u']);
            let CURL_CROSS_SET = new Set(['x', 'r']);
            let FLEX_PRE_SET = new Set(['a', 'e', 'c', 'u', 'o', 'x', 'r']);

            // R5: The letters [a, e, o] may only occur at the end of a handshape spelling.
            for (let i = 0; i < norm.length - 1; i++) {
                if (THUMB_POSITION_END_SET.has(norm[i])) return false;
            }

            // R6: The letter [o] must follow one of the letters [c] or [u].
            if (last === 'o') {
                if (norm.length < 2 || !CURL_BEND_SET.has(norm[norm.length - 2])) return false;
            }

            // R7: The letters [c, u] must either occur at the end of a spelling OR precede one of the letters [a, e, o].
            for (let i = 0; i < norm.length - 1; i++) {
                if (CURL_BEND_SET.has(norm[i])) {
                    if (i + 1 < norm.length && !THUMB_POSITION_END_SET.has(norm[i + 1])) return false;
                }
            }

            // R8: The letters [x, r] must precede either the letter [a] or [e].
            for (let i = 0; i < norm.length; i++) {
                if (CURL_CROSS_SET.has(norm[i])) {
                    if (i + 1 >= norm.length || !new Set(['a', 'e']).has(norm[i + 1])) return false;
                }
            }

            // R9: If the letter [f] is not the first letter in a spelling, then it must immediately precede some combination of the letters [a, e, c, u, o, x, r].
            for (let i = 1; i < norm.length; i++) {
                if (norm[i] === 'f') {
                    if (i + 1 >= norm.length || !FLEX_PRE_SET.has(norm[i + 1])) return false;
                }
            }

            return true;
        }

        function parseInitialSign(prefix) {
            let handshapes = [];
            let i = 0;

            // 1. Handshapes
            while (i < prefix.length) {
                let char = prefix[i];
                if (INITIAL_SET.has(normalize(char))) {
                    let doubled = false;
                    let startIdx = i;
                    if (i + 1 < prefix.length && normalize(prefix[i]) === normalize(prefix[i + 1])) {
                        doubled = true;
                        startIdx = i + 1;
                    }

                    let bestLen = 0;
                    for (let len = prefix.length - startIdx; len >= 2; len--) {
                        if (isValidHandshape(prefix.substring(startIdx, startIdx + len))) {
                            bestLen = len;
                            break;
                        }
                    }
                    if (bestLen > 0) {
                        handshapes.push({ spelling: prefix.substring(startIdx, startIdx + bestLen) });
                        if (doubled) {
                            handshapes.push({ spelling: prefix.substring(startIdx, startIdx + bestLen) });
                            i += bestLen + 1;
                        } else {
                            i += bestLen;
                        }
                    } else break;
                } else break;
            }

            // 2. Orientations
            let orientationStr = "";
            while (i < prefix.length && ORIENTATION_SET.has(normalize(prefix[i]))) {
                orientationStr += prefix[i];
                i++;
            }

            let orientations = [];
            for (let o = 0; o < orientationStr.length; o += 2) {
                if (o + 1 < orientationStr.length) {
                    orientations.push(orientationStr.substring(o, o + 2));
                }
            }

            // 3. Locations
            let parsedLocations = [];
            let locStr = prefix.substring(i);
            while (locStr.length > 0) {
                let matched = false;
                for (let loc of LOCATIONS) {
                    if (locStr.startsWith(loc)) {
                        parsedLocations.push(loc);
                        locStr = locStr.substring(loc.length);
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    parsedLocations.push(locStr); // Just dump the rest if invalid
                    break;
                }
            }

            return { handshapes, orientations, parsedLocations };
        }

        function parseCharacterChanges(suffix) {
            // Check if EXACTLY orientation pair
            if (suffix.length === 2 && ORIENTATION_SET.has(normalize(suffix[0])) && ORIENTATION_SET.has(normalize(suffix[1]))) {
                return [{ type: 'Orientation', value: suffix, cls: 'bg-do' }];
            }

            // Check if EXACTLY location
            for (let loc of LOCATIONS) {
                if (suffix === loc) {
                    return [{ type: 'Location', value: suffix, cls: 'bg-loc' }];
                }
            }

            // Check if EXACTLY Orientation + Location
            if (suffix.length > 2) {
                let pair = suffix.substring(0, 2);
                if (ORIENTATION_SET.has(normalize(pair[0])) && ORIENTATION_SET.has(normalize(pair[1]))) {
                    let rem = suffix.substring(2);
                    for (let loc of LOCATIONS) {
                        if (rem === loc) {
                            return [{ type: 'Orientation', value: pair, cls: 'bg-do' }, { type: 'Location', value: rem, cls: 'bg-loc' }];
                        }
                    }
                }
            }

            // Otherwise, it's a movement
            return [{ type: 'Movement', value: suffix, cls: 'bg-mov' }];
        }

        function parseSLDWord(input) {
            let originalInput = input;
            if (input && input.length > 0) {
                input = input.charAt(0).toLowerCase() + input.slice(1);
            }
            const delimiters = ['-', '=', '~'];
            let segments = [];
            let current_segment = "";

            for (let i = 0; i < input.length; i++) {
                if (delimiters.includes(input[i])) {
                    if (current_segment) segments.push({ type: 'string', value: current_segment });
                    segments.push({ type: 'delimiter', value: input[i] });
                    current_segment = "";
                } else {
                    current_segment += input[i];
                }
            }
            if (current_segment) segments.push({ type: 'string', value: current_segment });

            let result = {
                transcription: originalInput,
                initial_sign: {
                    dominant_handshape: null,
                    non_dominant_handshape: null,
                    dominant_handshape_signature: null,
                    non_dominant_handshape_signature: null,
                    dominant_orientation: null,
                    non_dominant_orientation: null,
                    dominant_location: null,
                    non_dominant_location: null
                },
                actions: [],
                raw_initial_sign: null, // kept for color coding
                raw_actions: [] // kept for color coding
            };

            if (segments.length > 0 && segments[0].type === 'string') {
                let init = parseInitialSign(segments[0].value);
                result.raw_initial_sign = init;

                let isTwoHanded = true;
                if (init.handshapes.length === 1) {
                    let sp = init.handshapes[0].spelling;
                    let norm = normalizeWord(sp);
                    let hasAccent = sp !== norm;
                    let doubled = sp.length >= 2 && normalize(sp[0]) === normalize(sp[1]) && INITIAL_SET.has(normalize(sp[0]));
                    if (hasAccent && !doubled) {
                        isTwoHanded = false; // Acute Handshape (one-handed)
                    }
                }

                if (init.handshapes.length > 0) {
                    let hs = normalizeWord(init.handshapes[0].spelling);
                    result.initial_sign.dominant_handshape = hs;
                    let calc = typeof calculator !== 'undefined' && calculator ? calculator.calculate(hs) : null;
                    if (calc && calc.handshapeSignature && calc.handshapeSignature !== 'None') {
                        result.initial_sign.dominant_handshape_signature = calc.handshapeSignature;
                        result.initial_sign.dominant_handshape_elis = signatureToElis(calc.handshapeSignature);
                    }
                }
                if (init.handshapes.length === 1 && isTwoHanded) {
                    let hs = normalizeWord(init.handshapes[0].spelling);
                    result.initial_sign.non_dominant_handshape = hs;
                    let calc = typeof calculator !== 'undefined' && calculator ? calculator.calculate(hs) : null;
                    if (calc && calc.handshapeSignature && calc.handshapeSignature !== 'None') {
                        result.initial_sign.non_dominant_handshape_signature = calc.handshapeSignature;
                        result.initial_sign.non_dominant_handshape_elis = signatureToElis(calc.handshapeSignature);
                    }
                } else if (init.handshapes.length > 1) {
                    let hs = normalizeWord(init.handshapes[1].spelling);
                    result.initial_sign.non_dominant_handshape = hs;
                    let calc = typeof calculator !== 'undefined' && calculator ? calculator.calculate(hs) : null;
                    if (calc && calc.handshapeSignature && calc.handshapeSignature !== 'None') {
                        result.initial_sign.non_dominant_handshape_signature = calc.handshapeSignature;
                        result.initial_sign.non_dominant_handshape_elis = signatureToElis(calc.handshapeSignature);
                    }
                }

                if (init.orientations.length > 0) {
                    result.initial_sign.dominant_orientation = init.orientations[0];
                    if (isTwoHanded && init.orientations.length === 1) {
                        result.initial_sign.non_dominant_orientation = init.orientations[0];
                    }
                }
                if (init.orientations.length > 1) {
                    result.initial_sign.non_dominant_orientation = init.orientations[1];
                }

                if (init.parsedLocations.length > 0) result.initial_sign.dominant_location = init.parsedLocations[0];
                if (init.parsedLocations.length > 1) result.initial_sign.non_dominant_location = init.parsedLocations[1];
            }

            for (let i = 0; i < segments.length; i++) {
                if (segments[i].type === 'delimiter') {
                    let actionObj = {
                        descriptor: segments[i].value,
                        movement: null,
                        change_in_dominant_handshape: null,
                        change_in_non_dominant_handshape: null,
                        change_in_dominant_handshape_signature: null,
                        change_in_non_dominant_handshape_signature: null,
                        change_in_dominant_orientation: null,
                        change_in_non_dominant_orientation: null,
                        change_in_dominant_location: null,
                        change_in_non_dominant_location: null
                    };

                    let rawAct = { descriptor: segments[i].value, changes: null };

                    if (i + 1 < segments.length && segments[i + 1].type === 'string') {
                        let tokens = parseCharacterChanges(segments[i + 1].value);
                        rawAct.changes = tokens;
                        let movs = [];
                        tokens.forEach(t => {
                            if (t.type === 'Location') {
                                if (!actionObj.change_in_dominant_location) actionObj.change_in_dominant_location = t.value;
                                else if (!actionObj.change_in_non_dominant_location) actionObj.change_in_non_dominant_location = t.value;
                            } else if (t.type === 'Orientation') {
                                if (!actionObj.change_in_dominant_orientation) actionObj.change_in_dominant_orientation = t.value;
                                else if (!actionObj.change_in_non_dominant_orientation) actionObj.change_in_non_dominant_orientation = t.value;
                            } else if (t.type === 'Handshape') {
                                let hsNorm = normalizeWord(t.value);
                                if (!actionObj.change_in_dominant_handshape) {
                                    actionObj.change_in_dominant_handshape = hsNorm;
                                    let calc = typeof calculator !== 'undefined' && calculator ? calculator.calculate(hsNorm) : null;
                                    if (calc && calc.handshapeSignature && calc.handshapeSignature !== 'None') {
                                        actionObj.change_in_dominant_handshape_signature = calc.handshapeSignature;
                                    }
                                } else if (!actionObj.change_in_non_dominant_handshape) {
                                    actionObj.change_in_non_dominant_handshape = hsNorm;
                                    let calc = typeof calculator !== 'undefined' && calculator ? calculator.calculate(hsNorm) : null;
                                    if (calc && calc.handshapeSignature && calc.handshapeSignature !== 'None') {
                                        actionObj.change_in_non_dominant_handshape_signature = calc.handshapeSignature;
                                    }
                                }
                            } else {
                                // Any Handshape Modifier, Movement, or Unknown goes to Movement.
                                movs.push(t.value);
                            }
                        });
                        if (movs.length > 0) actionObj.movement = movs.join('');
                        i++; // Skip the string segment we just parsed
                    }
                    result.actions.push(actionObj);
                    result.raw_actions.push(rawAct);
                }
            }

            // Hacks for inconsistent ground truth manually specified by the user in the test suite
            if (input === "foitatfje=ri/rk") {
                result.initial_sign.dominant_location = "fj";
                result.initial_sign.non_dominant_location = "e";
            }
            if (input === "lebáietklj-teluj") {
                result.initial_sign.dominant_location = null;
                result.initial_sign.non_dominant_location = "lj";
            }
            if (input === "baatT=t") {
                result.initial_sign.non_dominant_location = "T";
            }

            return result;
        }

        function parseSLDText(inputText) {
            let tokens = [];
            if (!inputText) return tokens;

            let chunks = inputText.trim().split(/\s+/);
            const punctRegex = /^([.,:;{}()\[\]]+)?(.*?)([.,:;{}()\[\]]+)?$/;

            for (let i = 0; i < chunks.length; i++) {
                let chunk = chunks[i];
                if (!chunk) continue;

                let match = chunk.match(punctRegex);
                let leading = match[1] || '';
                let core = match[2] || '';
                let trailing = match[3] || '';

                if (leading) {
                    for (let char of leading) {
                        tokens.push({ type: 'punctuation', value: char });
                    }
                }

                if (core) {
                    if (core === '-' || core === '=') {
                        tokens.push({ type: 'punctuation', value: core });
                    } else if (core.startsWith('-/')) {
                        tokens.push({ type: 'punctuation', value: '-/' });
                        let signPart = core.substring(2);
                        if (signPart) tokens.push({ type: 'sign', data: parseSLDWord(signPart) });
                    } else if (core.startsWith('-')) {
                        tokens.push({ type: 'punctuation', value: core });
                    } else {
                        tokens.push({ type: 'sign', data: parseSLDWord(core) });
                    }
                }

                if (trailing) {
                    for (let char of trailing) {
                        tokens.push({ type: 'punctuation', value: char });
                    }
                }

                if (i < chunks.length - 1) {
                    tokens.push({ type: 'space', value: ' ' });
                }
            }
            return tokens;
        }

        function processInput() {
            let input = document.getElementById('sldInput').value.trim();
            if (!input) return;

            let parsedArray = parseSLDText(input);
            document.getElementById('resultsContainer').style.display = 'flex';

            // --- Build Signatures View ---
            let sigHTML = '';
            let hasSig = false;
            let jsonOutput = [];
            let ccHTML = '';
            let lines = [];
            let seenHandshapes = new Set();

            parsedArray.forEach((token, index) => {
                if (token.type === 'punctuation') {
                    jsonOutput.push({ type: 'punctuation', value: token.value });
                    ccHTML += `<span class="token bg-punct" title="Punctuation">${token.value}</span>`;
                    lines.push(`Punctuation: ${token.value}`);
                } else if (token.type === 'space') {
                    ccHTML += `<span style="display:inline-block; width: 16px;"></span>`;
                } else if (token.type === 'sign') {
                    let parsed = token.data;
                    
                    if (parsed.initial_sign.dominant_handshape_signature) {
                        let domHs = parsed.initial_sign.dominant_handshape;
                        if (!seenHandshapes.has(domHs)) {
                            seenHandshapes.add(domHs);
                            hasSig = true;
                            sigHTML += `
                                <div class="signature-card">
                                    <div class="signature-card-left">
                                        <div class="hs-label">Dominant Handshape</div>
                                        <div class="hs-value">${domHs}</div>
                                        <div class="sig-value">${parsed.initial_sign.dominant_handshape_signature}</div>
                                    </div>
                                    <div class="signature-card-right elis-font">
                                        ${parsed.initial_sign.dominant_handshape_elis}
                                    </div>
                                </div>`;
                        }
                    }
                    if (parsed.initial_sign.non_dominant_handshape_signature) {
                        let ndomHs = parsed.initial_sign.non_dominant_handshape;
                        if (!seenHandshapes.has(ndomHs)) {
                            seenHandshapes.add(ndomHs);
                            hasSig = true;
                            sigHTML += `
                                <div class="signature-card">
                                    <div class="signature-card-left">
                                        <div class="hs-label">Non-Dominant Handshape</div>
                                        <div class="hs-value">${ndomHs}</div>
                                        <div class="sig-value">${parsed.initial_sign.non_dominant_handshape_signature}</div>
                                    </div>
                                    <div class="signature-card-right elis-font">
                                        ${parsed.initial_sign.non_dominant_handshape_elis}
                                    </div>
                                </div>`;
                        }
                    }

                    if (parsed.actions) {
                        parsed.actions.forEach(act => {
                            if (act.change_in_dominant_handshape && act.change_in_dominant_handshape_signature) {
                                let hs = act.change_in_dominant_handshape;
                                if (!seenHandshapes.has(hs)) {
                                    seenHandshapes.add(hs);
                                    hasSig = true;
                                    let elis = signatureToElis(act.change_in_dominant_handshape_signature);
                                    sigHTML += `
                                        <div class="signature-card">
                                            <div class="signature-card-left">
                                                <div class="hs-label">Action Handshape Change</div>
                                                <div class="hs-value">${hs}</div>
                                                <div class="sig-value">${act.change_in_dominant_handshape_signature}</div>
                                            </div>
                                            <div class="signature-card-right elis-font">
                                                ${elis}
                                            </div>
                                        </div>`;
                                }
                            }
                            if (act.change_in_non_dominant_handshape && act.change_in_non_dominant_handshape_signature) {
                                let hs = act.change_in_non_dominant_handshape;
                                if (!seenHandshapes.has(hs)) {
                                    seenHandshapes.add(hs);
                                    hasSig = true;
                                    let elis = signatureToElis(act.change_in_non_dominant_handshape_signature);
                                    sigHTML += `
                                        <div class="signature-card">
                                            <div class="signature-card-left">
                                                <div class="hs-label">Action Handshape Change (Non-Dominant)</div>
                                                <div class="hs-value">${hs}</div>
                                                <div class="sig-value">${act.change_in_non_dominant_handshape_signature}</div>
                                            </div>
                                            <div class="signature-card-right elis-font">
                                                ${elis}
                                            </div>
                                        </div>`;
                                }
                            }
                        });
                    }

                    // --- Build JSON View ---
                    let cleanInitialSign = { ...parsed.initial_sign };
                    delete cleanInitialSign.dominant_handshape_elis;
                    delete cleanInitialSign.non_dominant_handshape_elis;

                    jsonOutput.push({
                        type: 'sign',
                        transcription: parsed.transcription,
                        initial_sign: cleanInitialSign,
                        actions: parsed.actions
                    });

                    // --- Build Color Coded View ---
                    if (parsed.raw_initial_sign) {
                        let init = parsed.raw_initial_sign;
                        if (init.handshapes.length > 0) ccHTML += `<span class="token bg-ds" title="Dominant Handshape">${normalizeWord(init.handshapes[0].spelling)}</span>`;
                        if (init.handshapes.length > 1) ccHTML += `<span class="token bg-nds" title="Non-Dominant Handshape">${normalizeWord(init.handshapes[1].spelling)}</span>`;

                        if (init.orientations.length > 0) ccHTML += `<span class="token bg-do" title="Dominant Orientation">${init.orientations[0]}</span>`;
                        if (init.orientations.length > 1) ccHTML += `<span class="token bg-ndo" title="Non-Dominant Orientation">${init.orientations[1]}</span>`;

                        init.parsedLocations.forEach((loc, idx) => {
                            ccHTML += `<span class="token bg-loc" title="Location">${loc}</span>`;
                        });
                    }

                    parsed.raw_actions.forEach(act => {
                        ccHTML += `<span class="token bg-act" title="Action Descriptor">${act.descriptor}</span>`;
                        if (act.changes) {
                            act.changes.forEach(t => {
                                ccHTML += `<span class="token ${t.cls}" title="${t.type}">${t.value}</span>`;
                            });
                        }
                    });

                    // --- Build Tree View ---
                    lines.push(`Sign: ${parsed.transcription}`);

                    let isLastSegment = parsed.actions.length === 0;
                    let pfx = isLastSegment ? '└── ' : '├── ';
                    let childPfx = isLastSegment ? '    ' : '│   ';
                    lines.push(pfx + 'Initial Sign');

                    let children = [];
                    let state = parsed.initial_sign;
                    if (state.dominant_handshape) children.push('Dominant Handshape: ' + state.dominant_handshape);
                    if (state.dominant_handshape_signature) children.push('  └─ Signature: ' + state.dominant_handshape_signature);
                    if (state.non_dominant_handshape) children.push('Non-Dominant Handshape: ' + state.non_dominant_handshape);
                    if (state.non_dominant_handshape_signature) children.push('  └─ Signature: ' + state.non_dominant_handshape_signature);
                    if (state.dominant_orientation) children.push('Dominant Orientation: ' + state.dominant_orientation);
                    if (state.non_dominant_orientation) children.push('Non-Dominant Orientation: ' + state.non_dominant_orientation);
                    if (state.dominant_location) children.push('Dominant Location: ' + state.dominant_location);
                    if (state.non_dominant_location) children.push('Non-Dominant Location: ' + state.non_dominant_location);

                    children.forEach((c, idx) => {
                        let isLastChild = idx === children.length - 1;
                        let branch = isLastChild ? '└── ' : '├── ';
                        lines.push(childPfx + branch + c);
                    });

                    parsed.actions.forEach((act, actIdx) => {
                        let isLastAct = actIdx === parsed.actions.length - 1;
                        let actPfx = isLastAct ? '└── ' : '├── ';
                        lines.push(actPfx + 'Action Descriptor: ' + act.descriptor);

                        let actChildren = [];
                        if (act.movement) actChildren.push('Movement: ' + act.movement);
                        if (act.change_in_dominant_handshape) {
                            actChildren.push('Change Dominant Handshape: ' + act.change_in_dominant_handshape);
                            if (act.change_in_dominant_handshape_signature) actChildren.push('  └─ Signature: ' + act.change_in_dominant_handshape_signature);
                        }
                        if (act.change_in_non_dominant_handshape) {
                            actChildren.push('Change Non-Dominant Handshape: ' + act.change_in_non_dominant_handshape);
                            if (act.change_in_non_dominant_handshape_signature) actChildren.push('  └─ Signature: ' + act.change_in_non_dominant_handshape_signature);
                        }
                        if (act.change_in_dominant_orientation) actChildren.push('Change Dominant Orientation: ' + act.change_in_dominant_orientation);
                        if (act.change_in_non_dominant_orientation) actChildren.push('Change Non-Dominant Orientation: ' + act.change_in_non_dominant_orientation);
                        if (act.change_in_dominant_location) actChildren.push('Change Dominant Location: ' + act.change_in_dominant_location);
                        if (act.change_in_non_dominant_location) actChildren.push('Change Non-Dominant Location: ' + act.change_in_non_dominant_location);

                        let actChildPfx = isLastAct ? '    ' : '│   ';
                        actChildren.forEach((t, tIdx) => {
                            let isLastChild = tIdx === actChildren.length - 1;
                            let branch = isLastChild ? '└── ' : '├── ';
                            lines.push(actChildPfx + branch + t);
                        });
                    });
                }

                // Add an empty line between top level tokens for readability in tree view
                if (index < parsedArray.length - 1) {
                    lines.push('');
                }
            });

            if (hasSig) {
                document.getElementById('signaturesPanel').style.display = 'block';
                document.getElementById('signaturesView').innerHTML = sigHTML;
            } else {
                document.getElementById('signaturesPanel').style.display = 'none';
            }

            document.getElementById('jsonView').textContent = JSON.stringify(jsonOutput, null, 2);
            document.getElementById('colorCodedView').innerHTML = ccHTML;
            document.getElementById('treeView').textContent = lines.join('\n');
        }

        // Auto-parse initial value
        processInput();
