const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\nuno2\\OneDrive\\Documents\\GitHub\\nulpoints.github.io\\SLD';
const htmlPath = path.join(baseDir, 'flashcards.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract inline scripts
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
const scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}

console.log('Found scripts count:', scripts.length);

// Setup a custom mock environment
const domListeners = {};
const mockElement = () => ({
  style: {},
  addEventListener: (event, cb) => {
    if (!domListeners[event]) domListeners[event] = [];
    domListeners[event].push(cb);
  },
  classList: {
    add: () => {},
    remove: () => {},
    toggle: () => {},
    contains: () => false
  },
  querySelector: () => mockElement(),
  querySelectorAll: () => [mockElement()],
  closest: () => mockElement()
});

const window = {
  addEventListener: (event, cb) => {
    if (!domListeners[event]) domListeners[event] = [];
    domListeners[event].push(cb);
  }
};

const document = {
  getElementById: (id) => {
    // console.log('Mock getElementById called for:', id);
    if (id === 'session-size' || id === 'session-scope') {
      return { value: 'all' };
    }
    return mockElement();
  },
  querySelectorAll: (selector) => {
    // console.log('Mock querySelectorAll called for:', selector);
    if (selector === '.source-checkbox:checked') {
      return [{ value: 'Main ASL Dictionary' }];
    }
    if (selector === 'input[name="practice-mode"]:checked' || selector === 'input[name="practice-direction"]:checked') {
      return { value: 'flip' };
    }
    return [mockElement()];
  },
  querySelector: (selector) => {
    // console.log('Mock querySelector called for:', selector);
    if (selector === 'input[name="practice-mode"]:checked' || selector === 'input[name="practice-direction"]:checked') {
      return { value: 'flip' };
    }
    return mockElement();
  },
  addEventListener: (event, cb) => {
    if (!domListeners[event]) domListeners[event] = [];
    domListeners[event].push(cb);
  }
};

// Expose mock variables to global context for eval
global.window = window;
global.document = document;

// Load real files
const sigCalcContent = fs.readFileSync(path.join(baseDir, 'signature_calculator.js'), 'utf8');
const parserContent = fs.readFileSync(path.join(baseDir, 'sld_parser.js'), 'utf8');
const dataContent = fs.readFileSync(path.join(baseDir, 'sld-dictionary-data.js'), 'utf8');

// We need to mock SignatureCalculator so sld_parser can load it
global.SignatureCalculator = function() {
  return { calculate: () => ({ handshapeSignature: 'None' }) };
};

// Evaluate the scripts
try {
  eval(sigCalcContent);
  console.log('Loaded signature_calculator.js');
} catch (e) {
  console.error('Error loading signature_calculator.js:', e);
}

try {
  eval(parserContent);
  console.log('Loaded sld_parser.js');
} catch (e) {
  console.error('Error loading sld_parser.js:', e);
}

try {
  eval(dataContent);
  console.log('Loaded sld-dictionary-data.js');
} catch (e) {
  console.error('Error loading sld-dictionary-data.js:', e);
}

// Evaluate flashcards inline script
scripts.forEach((scriptSrc, idx) => {
  try {
    eval(scriptSrc);
    console.log(`Loaded inline script ${idx}`);
  } catch (e) {
    console.error(`Error loading inline script ${idx}:`, e);
  }
});

// Trigger DOMContentLoaded
console.log('--- Triggering DOMContentLoaded ---');
if (domListeners['DOMContentLoaded']) {
  domListeners['DOMContentLoaded'].forEach(cb => {
    try {
      cb();
      console.log('DOMContentLoaded callback executed successfully');
    } catch (e) {
      console.error('Error during DOMContentLoaded execution:', e);
    }
  });
}
