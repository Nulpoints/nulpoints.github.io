//-----------------------------------
// Handshape Calculator Module
//
// Written by Dr. Jacob Tosado
// Published October 12, 2024
// Copyright 2024, All rights reserved.
//
// Last Modified October 31, 2024
//
// For the advancement of deaf and
// hard-of-hearing communities around 
// the world by providing a dictionary
// accessible to everyone.
//-----------------------------------
/*!
@fileoverview signature_calculator - Signature Calculator Module
@author Dr.Jacob Tosado
@version 1

Copyright (c) 2024, Dr. Jacob Tosado.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
class HandshapeCalculator {
	constructor() {
		this.signatureDict = {'ALLLL': {'name': 'ba', 'status': 'Regular.'}, 'CCCCC': {'name': 'bc', 'status': 'Regular.'}, 'ALLLS': {'name': 'ma', 'status': 'Regular.'}, 'CLLLC': {'name': 'myc', 'status': 'Regular.'}, 'ALLSL': {'name': 'bha', 'status': 'Regular.'}, 'CLLCL': {'name': 'bhc', 'status': 'Regular.'}, 'ALSLL': {'name': 'bla', 'status': 'Regular.'}, 'CLCLL': {'name': 'blc', 'status': 'Regular.'}, 'ASLLL': {'name': 'bsa', 'status': 'Regular.'}, 'CCLLL': {'name': 'bsc', 'status': 'Regular.'}, 'ALLL|L': {'name': 'bya', 'status': 'Regular.'}, 'CCCCL': {'name': 'byc', 'status': 'Regular.'}, 'AL|LLL': {'name': 'bva', 'status': 'Regular.'}, 'CLCCC': {'name': 'bvc', 'status': 'Regular.'}, 'ALL|LL': {'name': 'bwa', 'status': 'Regular.'}, 'CCC|CC': {'name': 'bwc', 'status': 'Regular.'}, 'CCCCS': {'name': 'mc', 'status': 'Regular.'}, 'ALLSS': {'name': 'ha', 'status': 'Regular.'}, 'CLLCS': {'name': 'mhc', 'status': 'Regular.'}, 'ALSLS': {'name': 'wla', 'status': 'Regular.'}, 'CLCLS': {'name': 'wlc', 'status': 'Regular.'}, 'ASLLS': {'name': 'msa', 'status': 'Regular.'}, 'CCLLS': {'name': 'msc', 'status': 'Regular.'}, 'AL|LLS': {'name': 'wma', 'status': 'Regular.'}, 'CLCCS': {'name': 'mvc', 'status': 'Regular.'}, 'ALL|LS': {'name': 'wha', 'status': 'Regular.'}, 'CCCLS': {'name': 'whc', 'status': 'Regular.'}, 'CLLSC': {'name': 'hyc', 'status': 'Regular.'}, 'CCCSS': {'name': 'hc', 'status': 'Regular.'}, 'ALSSS': {'name': 'la', 'status': 'Regular.'}, 'CLCSS': {'name': 'vlc', 'status': 'Regular.'}, 'ASLSS': {'name': 'vsa', 'status': 'Regular.'}, 'CCLSS': {'name': 'vsc', 'status': 'Regular.'}, 'AL|LSS': {'name': 'va', 'status': 'Regular.'}, 'CC|CSS': {'name': 'vc', 'status': 'Regular.'}, 'ALSSL': {'name': 'yla', 'status': 'Regular.'}, 'CLSSC': {'name': 'lyc', 'status': 'Regular.'}, 'CLSCS': {'name': 'lwc', 'status': 'Regular.'}, 'CCSSS': {'name': 'lc', 'status': 'Regular.'}, 'ASSSS': {'name': 'sa', 'status': 'Regular.'}, 'ASSSL': {'name': 'ya', 'status': 'Regular.'}, 'CSSSC': {'name': 'yc', 'status': 'Regular.'}, 'ASSLS': {'name': 'swa', 'status': 'Regular.'}, 'CSSCS': {'name': 'swc', 'status': 'Regular.'}, 'CSCSS': {'name': 'svc', 'status': 'Regular.'}, 'ASSL|L': {'name': 'ywa', 'status': 'Regular.'}, 'CSSCL': {'name': 'ywc', 'status': 'Regular.'}, 'ASLSL': {'name': 'yva', 'status': 'Regular.'}, 'CSCSL': {'name': 'yvc', 'status': 'Regular.'}, 'CCSSL': {'name': 'ylc', 'status': 'Regular.'}, 'AL|LSL': {'name': 'fva', 'status': 'Regular.'}, 'CL|LSC': {'name': 'vyc', 'status': 'Regular.'}, 'AL|L|LS': {'name': 'wa', 'status': 'Regular.'}, 'CL|LCS': {'name': 'wvc', 'status': 'Regular.'}, 'AL|L|LL': {'name': 'fba', 'status': 'Regular.'}, 'CL|LCC': {'name': 'fbc', 'status': 'Regular.'}, 'ASL|LS': {'name': 'wsa', 'status': 'Regular.'}, 'CCL|LS': {'name': 'wsc', 'status': 'Regular.'}, 'AL|L|L|L': {'name': 'fa', 'status': 'Regular.'}, 'CL|L|LC': {'name': 'fwc', 'status': 'Regular.'}, 'CC|C|CS': {'name': 'wc', 'status': 'Regular.'}, 'AL|LL|L': {'name': 'fma', 'status': 'Regular.'}, 'CLCCL': {'name': 'fmc', 'status': 'Regular.'}, 'ALL|L|L': {'name': 'fha', 'status': 'Regular.'}, 'CCCL|L': {'name': 'fhc', 'status': 'Regular.'}, 'ALSL|L': {'name': 'fla', 'status': 'Regular.'}, 'CLCL|L': {'name': 'flc', 'status': 'Regular.'}, 'ASL|L|L': {'name': 'fsa', 'status': 'Regular.'}, 'CCL|L|L': {'name': 'fsc', 'status': 'Regular.'}, 'CL|LCL': {'name': 'fvc', 'status': 'Regular.'}, 'CC|C|C|C': {'name': 'fc', 'status': 'Regular.'}, 'CLSC|C': {'name': 'lwyc', 'status': 'Regular.'}, 'ASLL|L': {'name': 'bsya', 'status': 'Regular.'}, 'CSCCL': {'name': 'bsyc', 'status': 'Regular.'}, 'CLLC|C': {'name': 'bwyc', 'status': 'Regular.'}, 'CLSLC': {'name': 'mlyc', 'status': 'Regular.'}, 'CSLLC': {'name': 'msyc', 'status': 'Regular.'}, 'CL|LLC': {'name': 'vmyc', 'status': 'Regular.'}, 'CLL|LC': {'name': 'mwyc', 'status': 'Regular.'}, 'CSLSC': {'name': 'vsyc', 'status': 'Regular.'}, 'CLCSC': {'name': 'lvyc', 'status': 'Regular.'}, 'CSSC|C': {'name': 'swyc', 'status': 'Regular.'}, 'CSCSC': {'name': 'svyc', 'status': 'Regular.'}, 'CCSSC': {'name': 'slyc', 'status': 'Regular.'}, 'CL|LC|C': {'name': 'vwyc', 'status': 'Regular.'}, 'CSL|LC': {'name': 'wsyc', 'status': 'Regular.'}, 'CCLCL': {'name': 'fsyc', 'status': 'Regular.'}, 'CLCLC': {'name': 'fwlc', 'status': 'Regular.'}, 'CLCSL': {'name': 'vylc', 'status': 'Regular.'}, 'CCSCS': {'name': 'swlc', 'status': 'Regular.'}, 'CCSCL': {'name': 'ywlc', 'status': 'Regular.'}, 'CC|CSL': {'name': 'yvlc', 'status': 'Regular.'}, 'CC|CLL': {'name': 'bwvc', 'status': 'Regular.'}, 'CCLCS': {'name': 'wsvc', 'status': 'Regular.'}, 'CC|CLS': {'name': 'mwvc', 'status': 'Regular.'}, 'CLC|CS': {'name': 'lwvc', 'status': 'Regular.'}, 'CSC|CS': {'name': 'swvc', 'status': 'Regular.'}, 'CSC|CL': {'name': 'ywvc', 'status': 'Regular.'}, 'CC|CL|L': {'name': 'fhvc', 'status': 'Regular.'}, 'CLLCC': {'name': 'fhbc', 'status': 'Regular.'}, 'CCCLL': {'name': 'fbhc', 'status': 'Regular.'}, 'CCCSL': {'name': 'fvhc', 'status': 'Regular.'}, 'ASL|LL': {'name': 'bswa', 'status': 'Regular.'}, 'CSLCC': {'name': 'bswc', 'status': 'Regular.'}, 'CSLCS': {'name': 'vswc', 'status': 'Regular.'}, 'CSSLC': {'name': 'ymwc', 'status': 'Regular.'}, 'CLC|CL': {'name': 'fmwc', 'status': 'Regular.'}, 'CCL|LC': {'name': 'fswc', 'status': 'Regular.'}, 'CCLLC': {'name': 'bsmc', 'status': 'Regular.'}, 'CSCCS': {'name': 'vsmc', 'status': 'Regular.'}, 'CLSCC': {'name': 'flbc', 'status': 'Regular.'}, 'CSCCC': {'name': 'msbc', 'status': 'Regular.'}, 'ASSLL': {'name': 'ymba', 'status': 'Regular.'}, 'CSSCC': {'name': 'ymbc', 'status': 'Regular.'}, 'CCLL|L': {'name': 'bysc', 'status': 'Regular.'}, 'CCL|LL': {'name': 'bwsc', 'status': 'Regular.'}, 'CCLSL': {'name': 'yvsc', 'status': 'Regular.'}, 'CCSLS': {'name': 'lwsc', 'status': 'Regular.'}, 'CCSL|L': {'name': 'ywsc', 'status': 'Regular.'}, 'CCLSC': {'name': 'vslyc', 'status': 'Regular.'}, 'CCSC|C': {'name': 'sywlc', 'status': 'Regular.'}, 'CC|CSC': {'name': 'slvyc', 'status': 'Regular.'}, 'CLC|C|C': {'name': 'lvwyc', 'status': 'Regular.'}, 'CSC|C|C': {'name': 'sywvc', 'status': 'Regular.'}, 'CSLC|C': {'name': 'vswyc', 'status': 'Regular.'}, 'CLSCL': {'name': 'flywc', 'status': 'Regular.'}, 'CSLCL': {'name': 'fsvwc', 'status': 'Regular.'}, 'CC|C|CL': {'name': 'ywvlc', 'status': 'Regular.'}, 'CCSLL': {'name': 'ymblc', 'status': 'Regular.'}, 'CSCLS': {'name': 'wlsvc', 'status': 'Regular.'}, 'CCLCC': {'name': 'bsmhc', 'status': 'Regular.'}, 'CSCLL': {'name': 'blsvc', 'status': 'Regular.'}, 'CSCL|L': {'name': 'flsvc', 'status': 'Regular.'}, 'CCCLC': {'name': 'flswc', 'status': 'Regular.'}, 'CCSLC': {'name': 'ywsmc', 'status': 'Regular.'}, 'CCLC|C': {'name': 'vswylc', 'status': 'Regular.'}, 'CSC|CC': {'name': 'bswcc', 'status': 'Not used.'}, 'CSCLC': {'name': 'wlsvyc', 'status': 'Regular.'}, 'CSCC|C': {'name': 'bsycc', 'status': 'Not used.'}, 'CLC|CC': {'name': 'lvwbcc', 'status': 'Not used.'}, 'CLCC|C': {'name': 'lvmycc', 'status': 'Not used.'}, 'CC|C|CC': {'name': 'fbcc', 'status': 'Not used.'}, 'CC|CLC': {'name': 'wlvycc', 'status': 'Not used.'}, 'CC|CC|C': {'name': 'fmcc', 'status': 'Not used.'}, 'CC|CCS': {'name': 'wmcc', 'status': 'Not used.'}, 'CC|CCL': {'name': 'ylvmcc', 'status': 'Not used.'}, 'CC|CCC': {'name': 'bvcc', 'status': 'Not used.'}, 'CCSCC': {'name': 'flbcc', 'status': 'Not used.'}, 'CCC|C|C': {'name': 'fhcc', 'status': 'Not used.'}, 'CCC|CS': {'name': 'whcc', 'status': 'Not used.'}, 'CCC|CL': {'name': 'ylhwcc', 'status': 'Not used.'}, 'CCCSC': {'name': 'fvhcc', 'status': 'Not used.'}, 'CCCC|C': {'name': 'bycc', 'status': 'Not used.'}, 'E^XSSS': {'name': 'so', 'status': 'Irregular.'}, 'ES^SSS': {'name': 'sle', 'status': 'Irregular.'}, 'ESS^SS': {'name': 'she', 'status': 'Irregular.'}, 'ESSS^S': {'name': 'sme', 'status': 'Irregular.'}, 'CLCCC+': {'name': 'lo', 'status': 'Irregular.'}, 'CCCCL+': {'name': 'yo', 'status': 'Irregular.'}, 'CLLCC+': {'name': 'ho', 'status': 'Irregular.'}, 'CL|LCC+': {'name': 'vo', 'status': 'Irregular.'}, 'CLLLC+': {'name': 'mo', 'status': 'Irregular.'}, 'CL|L|LC+': {'name': 'wo', 'status': 'Irregular.'}, 'CCLLL+': {'name': 'bo', 'status': 'Irregular.'}, 'CCL|L|L+': {'name': 'fo', 'status': 'Irregular.'}}
		this.sig
		this.sig0
		this.flexionO = false
		this.signatureSpellingError = ''
	};
	signatureReset() {
		this.flexionO = false
		this.signatureSpellingError = ''
	};
	sigList(signatureEntry) {
		this.signatureReset()
		var sigString = signatureEntry
		sigString = sigString.toUpperCase()
		this.sig0 = sigString
		if (sigString.includes('+')) {sigString = sigString.replaceAll('+',''); this.flexionO = true}
		this.sig = sigString.split('')
	};
	invalidSigLength() {
		if ((this.sig.length < 5) || (this.sig.length > 8)) {return true}
	};
	invalidSigCharacters() {
		for (var i = 0; i <= this.sig.length - 1; i++) {
			if (!['A','E','F','C','U'].includes(this.sig[i]) && !['S','L','C','U','X','R','|'].includes(this.sig[i])) {return true}
		}
	};
	invalidSigStart() {
		if (!['A','E','F','C','U'].includes(this.sig[0])) {return true}
	};
	invalidSigEnd() {
		if (!['S','L','C','U','X','R'].includes(this.sig[this.sig.length-1])) {return true}
	};
	invalidSecond() {
		if (!['S','L','C','U','X','R'].includes(this.sig[1])) {return true}
	};
	invalidAbduction() {
		if (this.sig.join('').includes('S|S') || this.sig.join('').includes('S|L') || this.sig.join('').includes('S|C') || 
			this.sig.join('').includes('S|U') || this.sig.join('').includes('S|X') || this.sig.join('').includes('S|R') ||
			this.sig.join('').includes('L|S') || this.sig.join('').includes('C|S') || this.sig.join('').includes('U|S') ||
			this.sig.join('').includes('X|S') || this.sig.join('').includes('R|S') ||
			this.sig.join('').includes('U|L') || this.sig.join('').includes('U|C') || 
			this.sig.join('').includes('U|X') || this.sig.join('').includes('U|R') ||
			this.sig.join('').includes('L|U') || this.sig.join('').includes('C|U') ||
			this.sig.join('').includes('X|U') || this.sig.join('').includes('R|U') ||
			this.sig.join('').includes('C|L') ||
			this.sig.join('').includes('C|X') || this.sig.join('').includes('C|R') ||
			this.sig.join('').includes('L|C') ||
			this.sig.join('').includes('X|C') || this.sig.join('').includes('R|C') ||
			this.sig.join('').includes('X|L') ||
			this.sig.join('').includes('X|R') ||
			this.sig.join('').includes('L|X') ||
			this.sig.join('').includes('R|X') ||
			this.sig.join('').includes('R|L') ||
			this.sig.join('').includes('L|R')) {return true}
	};
	invalid_RR() {
		if (this.sig.includes('R')) {
			if (!this.sig.join('').includes('RR')) {return true}
			else if (this.sig.join('').split('RR').includes('R') || this.sig.slice(1).reverse().join('').split('RR').includes('R')) {return true}
		}
	};
	invalidThumb() {
		if ((this.sig[0] == 'C' && !this.sig.slice(1).includes('C')) || (this.sig[0] == 'U' && !this.sig.slice(1).includes('U'))) {return true}
	}
	tooManyFingers() {
		if (this.sig.slice(1).join('').split('|').join('').length > 4) {return true}
	};
	tooManyAbductions() {
		if (this.sig.join('').includes('||')) {return true}
	};
	tooManyFlexions() {
		if ((this.sig.includes('C') && this.sig.includes('U') && this.sig.includes('X')) ||
			(this.sig.includes('R') && this.sig.includes('C') && this.sig.includes('U')) ||
			(this.sig.includes('X') && this.sig.includes('R') && this.sig.includes('C')) ||
			(this.sig.includes('U') && this.sig.includes('X') && this.sig.includes('R')) ) {return true}
	};
	signatureSpellCheck() {
		if (this.invalidSigLength()) {this.signatureSpellingError = 'Five to eight characters are required.'; return false}
		else if (this.invalidSigCharacters()) {this.signatureSpellingError = 'Signature must include only the following characters:<br>A E F U C S L X R |'; return false}
		else if (this.invalidSigStart()) {this.signatureSpellingError = 'The first character must be one of the following:<br>A E F U C'; return false}
		else if (this.invalidSigEnd()) {this.signatureSpellingError = 'The last character must be one of the following:<br>S L C U X R'; return false}
		else if (this.invalidSecond()) {this.signatureSpellingError = 'The second character must be one of the following:<br>S L C U X R'; return false}
		else if (this.invalidAbduction()) {this.signatureSpellingError = 'Signature may not contain | between different characters, or between S and S.'; return false}
		else if (this.invalid_RR()) {this.signatureSpellingError = 'The character R must occur as the pair RR.'; return false}
		else if (this.invalidThumb()) {this.signatureSpellingError = 'The thumb in the C or U configuration must have at least one finger in the C or U configuration, respectively.'; return false}
		else if (this.tooManyFingers()) {this.signatureSpellingError = 'Signature may only contain four finger characters.'; return false}
		else if (this.tooManyAbductions()) {this.signatureSpellingError = 'Signature may not contain || pairs.'; return false}
		else if (this.tooManyFlexions()) {this.signatureSpellingError = 'Signature may only contain two kinds of flexion characters.'; return false}
		else {return true}
	};
	getHandshapeSpellings() {
		var sig1
		var sig2
		var shape1
		var shape2
		var result = {}
		if (this.sig.slice(1).includes('C') || this.sig.slice(1).includes('U') || this.sig.slice(1).includes('X') || this.sig.slice(1).includes('R')) {
			if (this.sig.slice(1).includes('C')) {
				if (this.sig.slice(1).includes('U') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'C') {
						sig1 = ['U'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('U','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','u').concat('c')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'U') {
						sig1 = ['C'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('U','L')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('u')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ca')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.concat('ua')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ce')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.concat('ue')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('ca')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replaceAll('c','fc').concat('ua')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ca')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.concat('ua')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('ca')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.concat('ua')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ca')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replaceAll('c','fc').concat('ua')}}
							}
						} else {
							result = {}
						}
					}
				} else if (this.sig.slice(1).includes('X') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'C') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','x').concat('c')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('xa')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ca')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('xe')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ce')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name'] 
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fc').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fx').concat('ca')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ca')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fc').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ca')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fx').concat('ca')}}
							}
						} else {
							result = {}
						}
					}
				} else if (this.sig.slice(1).includes('R') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'C') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('C','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','r').concat('c')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('ra')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ca')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('re')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ce')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('C','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name'] 
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fc').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('ca')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ca')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fc').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ca')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('ca')}}
							}
						} else {
							result = {}
						}
					}
				} else if (!this.sig.slice(1).includes('U') && !this.sig.slice(1).includes('X') && !this.sig.slice(1).includes('R')) {
					if (this.sig[0] == 'C') {
						sig1 = this.sig.join('')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1 }}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('a') }}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.concat('e') }}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							if (shape1[0] == 'f') {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','ca') }}
							} else {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fca') }}
							}
							
						}
					}
				}
			} else if (this.sig.slice(1).includes('U')) {
				if (this.sig.slice(1).includes('X') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'U') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('U','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','x').concat('u')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','u').concat('xa')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ua')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','u').concat('xe')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ue')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('X','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('X','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name'] 
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fx').concat('ua')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','u').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ua')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','x').concat('ua')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','u').concat('xa')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fx').concat('ua')}}
							}
						} else {
							result = {}
						}
					}
				} else if (this.sig.slice(1).includes('R') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'U') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('U','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','r').concat('u')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ra')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ua')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('re')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ue')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('U','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('U','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name'] 
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('ua')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ca')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fu').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('ua')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('ua')}}
							}
						} else {
							result = {}
						}
					}
				} else if (!this.sig.slice(1).includes('X') && !this.sig.slice(1).includes('R')) {
					if (this.sig[0] == 'U') {
						sig1 = this.sig.join('').replaceAll('U','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u') }}
						}
					} else if (this.sig[0] == 'A') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('U','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('a') }}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('U','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('e') }}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('U','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							if (shape1[0] == 'f') {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','u').concat('a') }}
							} else {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','fu').replaceAll('c','u').concat('a') }}
							}
							
						}
					}
				}
			} else if (this.sig.slice(1).includes('X')) {
				if (this.sig.slice(1).includes('R') && !this.sig.slice(1).includes('L')) {
					if (this.sig[0] == 'A') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('X','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('X','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('ra')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('xa')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('X','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('X','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name']
							result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('re')},
							            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('xe')}}
						} else {
							result = {}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['q'].concat(this.sig.slice(1))
						sig1 = sig1.join('').replaceAll('R','L').replaceAll('X','C').replaceAll('q','C')
						sig2 = ['q'].concat(this.sig.slice(1))
						sig2 = sig2.join('').replaceAll('X','L').replaceAll('R','C').replaceAll('q','C')
						if (this.signatureDict[sig1] && this.signatureDict[sig2]) {
							shape1 = this.signatureDict[sig1]['name']
							shape2 = this.signatureDict[sig2]['name'] 
							if (!(shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fx').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('xa')}}
							} else if ((shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('xa')}}
							} else if (!(shape1[0] == 'f') && (shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fx').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','r').concat('xa')}}
							} else if ((shape1[0] == 'f') && !(shape2[0] == 'f')) {
								result =   {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('ra')},
								            'spelling2':{'stemSig':sig2, 'stemShape':shape2, 'shape':shape2.replace('c','fr').concat('xa')}}
							}
						} else {
							result = {}
						}
					}
				} else if (!this.sig.slice(1).includes('R')) {
					if (this.sig[0] == 'A') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('X','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('a') }}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('X','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('e') }}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('X','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							if (shape1[0] == 'f') {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','x').concat('a') }}
							} else {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replace('c','fx').replace('c','x').concat('a') }}
							}
							
						}
					}
				}
			} else if (this.sig.slice(1).includes('R')) {
				if (true) {
					if (this.sig[0] == 'A') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('R','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','ra') }}
						}
					} else if (this.sig[0] == 'E') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('R','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','re') }}
						}
					} else if (this.sig[0] == 'F') {
						sig1 = ['C'].concat(this.sig.slice(1)).join('').replaceAll('R','C')
						if (this.signatureDict[sig1]) {
							shape1 = this.signatureDict[sig1]['name']
							if (shape1[0] == 'f') {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','ra') }}
							} else {
								result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('c','fra') }}
							}
						}
					}
				}
			}
		} else {
			if (this.sig[0] == 'A') {
				sig1 = this.sig.join('')
				if (this.signatureDict[sig1]) {
					shape1 = this.signatureDict[sig1]['name']
					result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1 }}
				}
			} else if (this.sig[0] == 'E') {
				sig1 = ['A'].concat(this.sig.slice(1)).join('')
				if (this.signatureDict[sig1]) {
					shape1 = this.signatureDict[sig1]['name']
					result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('a','e') }}
				}
			} else if (this.sig[0] == 'F') {
				sig1 = ['A'].concat(this.sig.slice(1)).join('')
				if (this.signatureDict[sig1]) {
					shape1 = this.signatureDict[sig1]['name']
					if (shape1[0] == 'f') {
						result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1 }}
					} else {
						result = {'spelling1':{'stemSig':sig1, 'stemShape':shape1, 'shape':shape1.replaceAll('a','fa') }}
					}
				}
			}
		}
		if (this.flexionO && !(Object.keys(result).length == 0)) {
			if (result['spelling1']['shape'][result['spelling1']['shape'].length-1] == 'c' ||
				result['spelling1']['shape'][result['spelling1']['shape'].length-1] == 'u') {
				if (Object.keys(result).length == 1) {
					result['spelling1']['shape'] = result['spelling1']['shape'].concat('o')
				} else if (Object.keys(result).length > 1) {
					result['spelling1']['shape'] = result['spelling1']['shape'].concat('o')
					result['spelling2']['shape'] = result['spelling2']['shape'].concat('o')
				}
			} else {this.signatureSpellingError = 'The thumb may not be in the A, E, or F configuration when the + is applied.'; result = {}}
		} else if (this.flexionO) {this.signatureSpellingError = 'The thumb may not be in the A, E, or F configuration when the + is applied.'; result = {}}
		return result
	};
	calculate(signatureEntry) {
		this.sigList(signatureEntry);
		var result = {}
		var start = true;
		var correct = this.signatureSpellCheck();
		if (this.signatureDict[this.sig0]) {
			result['handshapeNumber'] = 'One stem handshape found.'
			result['spelling1'] = this.signatureDict[this.sig0]['name']
			result['stemShape1'] = this.signatureDict[this.sig0]['name']
			result['stemSig1'] = this.sig0
			result['handshapeStatus1'] = this.signatureDict[this.sig0]['status']
			result['spelling2'] = ''
			result['stemShape2'] = ''
			result['stemSig2'] = ''
			result['handshapeStatus2'] = ''
			return result

		} else if (!correct) {
			result['handshapeNumber'] = this.signatureSpellingError
			result['spelling1'] = ''
			result['stemShape1'] = ''
			result['stemSig1'] = ''
			result['handshapeStatus1'] = ''
			result['spelling2'] = ''
			result['stemShape2'] = ''
			result['stemSig2'] = ''
			result['handshapeStatus2'] = ''
			return result
		} else {
			var handshapeSpellingDict = this.getHandshapeSpellings()
			if (Object.keys(handshapeSpellingDict).length == 1) {
				result['handshapeNumber'] = 'One stem handshape found.'
				result['spelling1'] = handshapeSpellingDict['spelling1']['shape']
				result['stemShape1'] = handshapeSpellingDict['spelling1']['stemShape']
				result['stemSig1'] = handshapeSpellingDict['spelling1']['stemSig']
				result['handshapeStatus1'] = this.signatureDict[handshapeSpellingDict['spelling1']['stemSig']]['status']
				result['spelling2'] = ''
				result['stemShape2'] = ''
				result['stemSig2'] = ''
				result['handshapeStatus2'] = ''
				return result
			} else if (Object.keys(handshapeSpellingDict).length > 1) {
				result['handshapeNumber'] = 'Two stem handshapes found.'
				result['spelling1'] = handshapeSpellingDict['spelling1']['shape']
				result['stemShape1'] = handshapeSpellingDict['spelling1']['stemShape']
				result['stemSig1'] = handshapeSpellingDict['spelling1']['stemSig']
				result['handshapeStatus1'] = this.signatureDict[handshapeSpellingDict['spelling1']['stemSig']]['status']
				result['spelling2'] = handshapeSpellingDict['spelling2']['shape']
				result['stemShape2'] = handshapeSpellingDict['spelling2']['stemShape']
				result['stemSig2'] = handshapeSpellingDict['spelling2']['stemSig']
				result['handshapeStatus2'] = this.signatureDict[handshapeSpellingDict['spelling2']['stemSig']]['status']
				return result
			} else {
				result['handshapeNumber'] = this.signatureSpellingError
				result['spelling1'] = ''
				result['stemShape1'] = ''
				result['stemSig1'] = ''
				result['handshapeStatus1'] = ''
				result['spelling2'] = ''
				result['stemShape2'] = ''
				result['stemSig2'] = ''
				result['handshapeStatus2'] = ''
				return result
			}
		}
	};
};