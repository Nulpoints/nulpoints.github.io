//-----------------------------------
// Signature Calculator Module
//
// Written by Dr. Jacob Tosado
// Published October 9, 2024
// Copyright 2024, All rights reserved.
//
// Last Modified October 31, 2024
//
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
class SignatureCalculator {
	constructor() {
		this.categories = ['s','l','y','h','v','m','w','b','f'];
		this.endingCharacters = ['a','e','c','u','o'];
		this.modifiers = ['x','r'];
		this.irregularHandshapes = {'so':'E^XSSS','lo':'CLCCC+','yo':'CCCCL+','ho':'CLLCC+','vo':'CL|LCC+','mo':'CLLLC+','wo':'CL|L|LC+','bo':'CCLLL+','fo':'CCL|L|L+','sle':'ES^SSS','she':'ESS^SS','sme':'ESSS^S','vla':'ALUSS','vle':'ELUSS'};
		this.shape;
		this.focus = [false,false,false,false];
		this.abduction = [false,false,false];
		this.extension = [false,false,false,false];
		this.k1Flexion = [false,false,false,false];
		this.k2k3PartialFlexion = [false,false,false,false];
		this.k2k3FullFlexion = [false,false,false,false];
		this.thumb = 'a';
		this.thumbContact = false;
		this.crossed = false;
		this.category = '';
		this.fullyExtendedThumb = false;
		this.primaryFlexion = false;
		this.secondaryFlexion = false;
		this.secondary = '';
		this.lastAction = 'contract';
		this.handshapeSpellingError = '';
	};
	shapeList(handshapeEntry) {
		var shapeString = handshapeEntry;
		shapeString = shapeString.toLowerCase();
		shapeString = shapeString.replace('á', 'a');
		shapeString = shapeString.replace('é', 'e');
		shapeString = shapeString.replace('ć', 'c');
		shapeString = shapeString.replace('ú', 'u');
		shapeString = shapeString.replace('ó', 'o');
		this.shape = shapeString.split('');
	};
	invalidShapeLength() {
		if (this.shape.length < 2) {return true;}else{return false;}
	};
	invalidShapeCharacters() {
		var result = false;
		for (var i = 0; i <= this.shape.length - 1; i++) {
			if (! this.categories.includes(this.shape[i]) && ! this.endingCharacters.includes(this.shape[i]) && ! this.modifiers.includes(this.shape[i])) {result = true;}
		};
		return result;
	};
	foundDuplicates() {
		var shapeCopy = [...this.shape]
		var result = false;
		for (var i = 0; i <= shapeCopy.length - 1; i++) {
			var L = shapeCopy.pop();
			if (shapeCopy.includes(L)) {result = true;}
		};
		return result;
	};
	invalidShapeStart() {
		var result = false;
		if (! this.categories.includes(this.shape[0])) {result = true;}
		return result;
	};
	invalidShapeEnd() {
		var result = false;
		if (! this.endingCharacters.includes(this.shape[this.shape.length-1])) {result = true;}
		return result;
	};
	invalid_A() {
		var result = false;
		if (this.shape.includes('a') && !(this.shape[this.shape.length-1] == 'a')) {result = true;}
		return result;
	};
	invalid_E() {
		var result = false;
		if (this.shape.includes('e') && !(this.shape[this.shape.length-1] == 'e')) {result = true;}
		return result;
	};
	invalid_O() {
		var result = false;
		if (this.shape.includes('o')) {
			if (! this.shape[this.shape.length-1] == 'o') {result = true;}
			else if (this.shape.length > 2 && ! ['c','u'].includes(this.shape[this.shape.length-2])) {result = true;}
		}
		return result;
	};
	invalid_C() {
		var result = false;
		if (this.shape.includes('c')) {
			if (!(this.shape[this.shape.length-1] == 'c')) {
				if (!(this.shape[this.shape.length-2] == 'c')) {
					if (!(this.shape[this.shape.length-3] == 'c')) {result = true;}
					else if (!['r','x','u'].includes(this.shape[this.shape.length-2])) {result = true;}
				}
			}
		}
		return result;
	};
	invalid_U() {
		var result = false;
		if (this.shape.includes('u')) {
			if (!(this.shape[this.shape.length-1] == 'u')) {
				if (!(this.shape[this.shape.length-2] == 'u')) {
					if (!(this.shape[this.shape.length-3] == 'u')) {result = true;}
					else if (!['r','x','c'].includes(this.shape[this.shape.length-2])) {result = true;}
				}
			}
		}
		return result;
	};
	invalid_X() {
		var result = false;
		if (this.shape.includes('x')) {
			if (!(this.shape[this.shape.length-2] == 'x')) {
				if (!(this.shape[this.shape.length-3] == 'x')) {result = true;}
				else if (!['r','u','c'].includes(this.shape[this.shape.length-2])) {result = true;}
			}
		}
		return result;
	};
	invalid_R() {
		var result = false;
		if (this.shape.includes('r')) {
			if (!(this.shape[this.shape.length-2] == 'r')) {
				if (!(this.shape[this.shape.length-3] == 'r')) {result = true;}
				else if (!['x','u','c'].includes(this.shape[this.shape.length-2])) {result = true;}
			}
		}
		return result;
	};
	invalid_F() {
		var result = false;
		if (this.shape.includes('f')) {
			if (!(this.shape[0] == 'f')) {
				if (!(this.shape[this.shape.length-1] == 'a')) {result = true;}
				else if (!(this.shape[this.shape.length-2] == 'f')) {
					if (!['x','u','c','r'].includes(this.shape[this.shape.length-2])) {result = true;}
					else if (!(this.shape[this.shape.length-3] == 'f')) {
						if (!['x','u','c','r'].includes(this.shape[this.shape.length-3])) {result = true;}
						else if (!(this.shape[this.shape.length-4] == 'f')) {result = true;}
					}
				}
			}
		}
		return result;
	};
	handshapeSpellCheck() {
		if (this.invalidShapeLength()) {this.handshapeSpellingError = 'Spelling must contain two or more characters.'; return false}
		else if (this.invalidShapeCharacters()) {this.handshapeSpellingError = 'Spelling must contain only characters<br>A E C U O R X S L Y V H W M F B.'; return false}
		else if (this.foundDuplicates()) {this.handshapeSpellingError = 'Spelling may not contain repeated letters.'; return false}
		else if (this.invalidShapeStart()) {this.handshapeSpellingError = 'Spelling must start with only characters<br>S L Y V H W M F B.'; return false}
		else if (this.invalidShapeEnd()) {this.handshapeSpellingError = 'Spelling must end with only<br>A E C U O.'; return false}
		else if (this.invalid_A()) {this.handshapeSpellingError = 'The letter A must occur at the end.'; return false}
		else if (this.invalid_E()) {this.handshapeSpellingError = 'The letter E must occur at the end.'; return false}
		else if (this.invalid_O()) {this.handshapeSpellingError = 'The letter O must occur at the end; or follow C or U.'; return false}
		else if (this.invalid_C()) {this.handshapeSpellingError = 'The letter C must occur at the end; or preceed<br>A, E, U, O, UO, UA, UE, RA, RE, XA, XE.'; return false}
		else if (this.invalid_U()) {this.handshapeSpellingError = 'The letter U must occur at the end; or preceed<br>A, E, C, O, CO, CA, CE, RA, RE, XA, XE.'; return false}
		else if (this.invalid_X()) {this.handshapeSpellingError = 'The letter X must preceed<br>A, E, C, U, CO, CA, CE, UO, UA, UE, RA, RE.'; return false}
		else if (this.invalid_R()) {this.handshapeSpellingError = 'The letter R must preceed<br>A, E, C, U, CO, CA, CE, UO, UA, UE, XA, XE.'; return false}
		else if (this.invalid_F()) {this.handshapeSpellingError = 'The letter F must occur at the start or preceed combinations of<br>A, X, R, C, U.'; return false}
		else {return [true, '']};
	};
	irregularHandshape() {
		if (this.irregularHandshapes[this.shape.join('')]) {
			return this.irregularHandshapes[this.shape.join('')]
		} else {return false}
	};
	handshapeReset() {
		this.focus = [false,false,false,false]
		this.abduction = [false,false,false]
		this.extension = [false,false,false,false]
		this.k1Flexion = [false,false,false,false]
		this.k2k3PartialFlexion = [false,false,false,false]
		this.k2k3FullFlexion = [false,false,false,false]
		this.thumb = 'a'
		this.thumbContact = false
		this.crossed = false
		this.category = ''
		this.fullyExtendedThumb = false
		this.primaryFlexion = false
		this.secondaryFlexion = false
		this.secondary = ''
		this.lastAction = 'contract'
		this.handshapeSpellingError = ''
	};
	refocus(fingers, action) {
		switch(action) {
			case 'extend':
				if (!(this.lastAction == 'extend')) {
					this.focus = [false,false,false,false]
					this.lastAction = 'extend'
				}
				this.focus[fingers] = true;
				break;
			case 'contract':
				if (!(this.lastAction == 'contract')) {
					this.focus = [false,false,false,false]
					this.lastAction = 'contract'
				}
				this.focus[fingers] = true;
				break;
			case 'abduct':
				if (fingers.includes(3) && !this.abduction[2]) {
					if (this.abduction[1] || !this.extension[1]) {
						this.focus = [false,false,true,true]
					} else if ((this.abduction[0] && !this.abduction[1]) || (!this.extension[0] && !this.abduction[1])) {
						this.focus = [false,true,true,false]
					} else if (!this.abduction[0] && !this.abduction[1]) {
						this.focus = [true,true,true,false]
					}
					this.abduction[2] = true
				} else if (fingers.includes(2) && !fingers.includes(3) && !this.abduction[1]) {
					if ((this.abduction[0] && this.abduction[2]) || (!this.extension[0] && !this.extension[3]) || (this.extension[0] && this.abduction[0] && !this.extension[3]) || (!this.extension[0] && this.abduction[2] && this.extension[3])) {
						this.focus = [false,true,true,false]
					} else if ((this.extension[0] && this.abduction[0] && !this.abduction[2] && this.extension[3]) || (!this.extension[0] && !this.abduction[2] && this.extension[3])) {
						this.focus = [false,false,true,true]
					} else if ((this.extension[0] && !this.abduction[0] && this.abduction[2] && this.extension[3]) || (this.extension[0] && !this.abduction[0] && !this.extension[3])) {
						this.focus = [true,true,false,false]
					} else if (this.extension[0] && !this.abduction[0] && !this.abduction[2] && this.extension[3]) {
						this.focus = [true,true,true,true]
					}
					this.abduction[1] = true
				} else if (fingers.includes(1) && !fingers.includes(2) && !this.abduction[0]) {
					if (this.abduction[1] || !this.extension[2]) {
						this.focus = [true,true,false,false]
					} else if ((!this.abduction[1] && this.abduction[2]) || (!this.abduction[1] && !this.extension[3])) {
						this.focus = [false,true,true,false]
					} else if (this.extension[2] && !this.abduction[1] && !this.abduction[2] && this.extension[3]) {
						this.focus = [false,true,true,true]
					}
					this.abduction[0] = true
				}
				this.lastAction = 'abduct';
				break;
			case 'adduct':
				if (fingers.includes(3)) {
					if ((this.abduction[1] && this.extension[1]) || (!this.extension[1])) {
						this.focus = [false,false,true,true]
					} else if ((!this.abduction[1] && this.extension[1] && this.abduction[0] && this.extension[0]) || (!this.abduction[1] && this.extension[1] && !this.extension[0])) {
						this.focus = [false,true,true,true]
					} else if (!this.abduction[1] && this.extension[1] && !this.abduction[0] && this.extension[0]) {
						this.focus = [true,true,true,true]
					}
				} else if (fingers.includes(2) && !fingers.includes(3)) {
					if ((this.abduction[0] && this.abduction[2]) || (this.abduction[0] && !this.extension[3]) || (!this.extension[0] && !this.extension[3]) || (!this.extension[0] && this.abduction[2])) {
						this.focus = [false,true,true,false]
					} else if (this.abduction[0] && !this.abduction[2] && this.extension[3]) {
						this.focus = [false,true,true,true]
					} else if ((this.extension[0] && !this.abduction[0] && this.abduction[2] && this.extension[3]) || (this.extension[0] && !this.abduction[0] && !this.extension[3])) {
						this.focus = [true,true,true,false]
					} else if (this.extension[0] && !this.abduction[0] && !this.abduction[2] && this.extension[3]) {
						this.focus = [true,true,true,true]
					}
				} else if (fingers.includes(1) && !fingers.includes(2)) {
					if ((this.extension[2] && this.abduction[1]) || (!this.extension[2])) {
						this.focus = [true,true,false,false]
					} else if ((!this.abduction[1] && this.extension[2] && this.abduction[2] && this.extension[3]) || (!this.abduction[1] && this.extension[2] && !this.extension[3])) {
						this.focus = [true,true,true,false]
					} else if (!this.abduction[1] && this.extension[2] && !this.abduction[2] && this.extension[3]) {
						this.focus = [true,true,true,true]
					}
				}
				this.lastAction = 'adduct';
				break;
		}
	}
	contract(digit) {
		this.focus[digit] = true
		this.extension[digit] = false
		this.k1Flexion[digit] = false
		this.k2k3PartialFlexion[digit] = false
		this.k2k3FullFlexion[digit] = false
		this.refocus(digit, 'contract')
		switch(digit) {
			case 0:
				this.abduction[0] = false;
				break;
			case 1:
				this.abduction[0] = false;
				this.abduction[1] = false;
				break;
			case 2:
				this.abduction[1] = false;
				this.abduction[2] = false;
				break;
			case 3:
				this.abduction[2] = false;
				break;
		}
	};
	operationS() {
		this.contract(0)
		this.focus[0] = true
	};
	operationL() {
		if (this.extension[0] && this.extension[1]) {
			this.contract(1)
		} else {
			this.extension[0] = true
			this.abduction[0] = true
			this.refocus(0, 'extend')
		}
	};
	operationY() {
		if (this.extension[3]) {
			if (this.extension[2] && !this.abduction[2]) {
				this.refocus([2,3], 'abduct')
			} else if (this.extension[2] && this.abduction[2]) {
				this.contract(2)
			} else if (!this.extension[2]) {
				this.extension[3] = true
				this.abduction[2] = true
				this.refocus(3, 'extend')
			}
		} else {
			this.extension[3] = true
			this.abduction[2] = true
			this.refocus(3, 'extend')
		}
	};
	operationH() {
	    if (this.extension[1]) {
	        if (this.extension[0]) {
	            if (this.abduction[0]) {
	                this.abduction[0] = false
	                this.refocus([0,1], 'adduct')
	            } else if (this.extension[2]) {
	                this.contract(2)
	            }
	        } else if (this.extension[2]) {
	            this.contract(2)
	        } else {
	            this.refocus(1, 'extend')
	        }
	    } else if (this.extension[0]) {
	        this.extension[1] = true;
	        this.abduction[0] = false;
	        this.abduction[1] = true;
	        this.refocus([0,1], 'adduct')
	    } else {
	        this.extension[1] = true;
	        this.abduction[0] = true;
	        this.abduction[1] = true;
	        this.refocus(1, 'extend')
	    }
	};
	operationM(){
	    if (this.extension[2]) {
	        if (this.extension[1]) {
	            if (this.abduction[1]) {
	                this.abduction[1] = false
	                this.refocus([1,2], 'adduct')
	            } else {
	                this.contract(3)
	            }
	        } else if (this.extension[3]) {
	            this.contract(3)
	        } else {
	            this.refocus(2, 'extend')
	        }
	    } else if (this.extension[1]) {
	        this.extension[2] = true
	        this.abduction[1] = false
	        this.refocus([1,2], 'adduct')
	    } else {
	        this.extension[2] = true
	        this.abduction[1] = true
	        this.abduction[2] = true
	        this.refocus(2, 'extend')
	    }
	};
	operationB() {
		if (this.extension[3]) {
		    if (this.extension[2]) {
		        this.abduction[2] = false
		        this.refocus([2,3], 'adduct')
		    } else {
		        this.abduction[2] = true
		        this.refocus(3, 'extend')
		    }
		} else if (this.extension[2]) {
		    this.extension[3] = true
		    this.abduction[2] = false
		    this.refocus([2,3], 'adduct')

		} else {
		    this.extension[3] = true
		    this.abduction[2] = true
		    this.refocus(3, 'extend')
		}
	};
	operationV() {
	    if (this.extension[1]) {
	        if ((this.abduction[0] && this.extension[0] && this.abduction[1] && this.extension[2]) || (!this.extension[0] && this.extension[2])) {
	        	this.contract(2);
	        } else if ((this.abduction[0] && this.extension[0] && !this.extension[2]) || (!this.extension[0] && !this.extension[2])) {
	            this.refocus(1, 'extend');
	        } else if (!this.abduction[0] && this.extension[0]) {
	            this.refocus([0,1], 'abduct');
	        }
	    } else {
	        this.extension[1] = true;
	        this.abduction[0] = true;
	        this.abduction[1] = true;
	        this.refocus(1, 'extend');
	    }
	};
	operationW() {
		if (this.extension[2]) {
		    if ((this.abduction[1] && this.extension[1] && this.abduction[2] && this.extension[3]) || (!this.extension[1] && this.extension[3])) {
		        this.contract(3)
		    } else if ((this.abduction[1] && this.extension[1] && !this.extension[3]) || (!this.extension[1] && !this.extension[3])) {
		        this.refocus(2, 'extend')
		    } else if (!this.abduction[1] && this.extension[1])
		        this.refocus([1,2], 'abduct')
		} else {
		    this.extension[2] = true
		    this.abduction[1] = true
		    this.abduction[2] = true
		    this.refocus(2, 'extend')
		}
	};
	operationA() {
		if (this.fullyExtendedThumb) {
			this.thumb = 'f'
		} else {
			this.thumb = 'a'
		}
	};
	operationE() {
		this.thumb = 'e'
	};
	operationF() {
		this.fullyExtendedThumb = true
	};
	operationC() {
		this.thumb = 'c';
		if (this.primaryFlexion) {
			this.secondaryFlexion = true
			this.secondary = 'c'
		} else {
			this.primaryFlexion = true
			for (var n = 0; n <= this.focus.length - 1; n++) {
				var active = this.focus[n]
			    if (active) {
			        this.k2k3PartialFlexion[n] = true
			    }
			}
		}	
	};
	operationU() {
		this.thumb = 'u';
		if (this.primaryFlexion) {
			this.secondaryFlexion = true
			this.secondary = 'u'
		} else {
			this.primaryFlexion = true
			for (var n = 0; n <= this.focus.length - 1; n++) {
				var active = this.focus[n]
			    if (active) {
			        this.k1Flexion[n] = true
			    }
			}
		}	
	};
	operationR() {
		this.crossed = true
		if (this.primaryFlexion) {
			this.secondaryFlexion = true
			this.secondary = 'r'
		} else {
			this.primaryFlexion = true
			for (var n = 0; n <= this.focus.length - 1; n++) {
				var active = this.focus[n]
				if (active) {
					this.k2k3PartialFlexion[n] = true
				}
			}
		}	
	};
	operationX() {
		if (this.primaryFlexion) {
			this.secondaryFlexion = true
			this.secondary = 'x'
		} else {
			this.primaryFlexion = true
			for (var n = 0; n <= this.focus.length - 1; n++) {
				var active = this.focus[n]
				if (active) {
					this.k2k3FullFlexion[n] = true
				}
			}
		}	
	};
	operationO() {
		this.thumbContact = true
	};
	categoryS() {
		this.handshapeReset()
		this.category = 's'
		this.lastAction = 'None'
	};
	categoryL() {
		this.handshapeReset()
		this.operationL()
		this.category = 'l'
		this.lastAction = 'None'
	};
	categoryY() {
		this.handshapeReset()
		this.operationY()
		this.category = 'y'
		this.lastAction = 'None'
	};
	categoryV() {
		this.handshapeReset()
		this.operationH()
		this.operationL()
		this.category = 'v'
		this.lastAction = 'None'
	};
	categoryH() {
		this.handshapeReset()
		this.operationL()
		this.operationH()
		this.category = 'h'
		this.lastAction = 'None'
	};
	categoryW() {
		this.handshapeReset()
		this.operationM()
		this.operationH()
		this.operationL()
		this.category = 'w'
		this.lastAction = 'None'
	};
	categoryM() {
		this.handshapeReset()
		this.operationL()
		this.operationH()
		this.operationM()
		this.category = 'm'
		this.lastAction = 'None'
	};
	categoryF() {
		this.handshapeReset()
		this.operationB()
		this.operationM()
		this.operationH()
		this.operationL()
		this.category = 'f'
		this.lastAction = 'None'
	};
	categoryB() {
		this.handshapeReset()
		this.operationL()
		this.operationH()
		this.operationM()
		this.operationB()
		this.category = 'b'
		this.lastAction = 'None'
	}
	setCategory(L) {
		switch(L){
			case 's':
				this.categoryS();
				break;
			case 'l':
				this.categoryL();
				break;
			case 'y':
				this.categoryY();
				break;
			case 'v':
				this.categoryV();
				break;
			case 'h':
				this.categoryH();
				break;
			case 'w':
				this.categoryW();
				break;
			case 'm':
				this.categoryM();
				break;
			case 'f':
				this.categoryF();
				break;
			case 'b':
				this.categoryB();
				break;
		}
	};
	signature() {
		var result
	    var sig = [this.thumb]
	    for (var n = 0; n <= this.extension.length - 1; n++) {
	    	var extended = this.extension[n]
	        if (!extended && !this.focus[n]) {
	            sig.push('s')
	        } else if (extended && !this.focus[n]) {
	            sig.push('l')
	        } else if (extended && this.focus[n]) {
	            if (this.k1Flexion[n]) {
	                sig.push('u')
	            } else if (this.k2k3PartialFlexion[n]) {
	                sig.push('c')
	            } else if (this.k2k3FullFlexion[n]) {
	                sig.push('x')
	            } else {
	                sig.push('l')
	            }
	        } else if (!extended && this.focus[n]) {
	            if (this.k1Flexion[n]) {
	                sig.push('u')
	            }else if (this.k2k3PartialFlexion[n]) {
	                sig.push('c')
	            } else if (this.k2k3FullFlexion[n]) {
	                sig.push('x')
	            } else {
	                sig.push('s')
	            }
	        }
	        if (n < 3 && extended) {
	            if (!this.k2k3PartialFlexion[n] && !this.k1Flexion[n] && !this.k2k3FullFlexion[n]) {
	                if (!this.k2k3PartialFlexion[n+1] && !this.k1Flexion[n+1] && !this.k2k3FullFlexion[n+1] && this.extension[n+1]) {
	                    if (this.abduction[n]) {
	                        sig.push('|')
	                    }
	                }
	            } else if (this.k2k3PartialFlexion[n] && this.k2k3PartialFlexion[n+1]) {
	                if (this.abduction[n]) {
	                    sig.push('|')
	                }
	            } else if (this.k1Flexion[n] && this.k1Flexion[n+1]) {
	                if (this.abduction[n]) {
	                    sig.push('|')
	                }
	            } else if (this.k2k3FullFlexion[n] && this.k2k3FullFlexion[n+1]) {
	                if (this.abduction[n]) {
	                    sig.push('|')
	                }
	            }
	        }
	    };
	    if (this.crossed && !(this.secondary == 'r')) {
	        var sigR = sig.join('').toUpperCase();
	        if (sigR.includes('CC')) {
	            var q = sigR.slice(1).split('CC');
	            if ((q.length == 2) && (q[1] == '')) {
	                result = this.thumb.toUpperCase().concat( sigR.slice(1).replaceAll('CC','RR') )
	            } else if ((q.length == 2) && (q[0] == '') && !(q[1][0] == 'C')) {
	                result = this.thumb.toUpperCase().concat( sigR.slice(1).replaceAll('CC','RR') )
	            } else if ((q.length == 2) && !(q[0] == '') && !(q[1] == '') && !(q[0] == 'C') && !(q[1] == 'C')) {
	                result = this.thumb.toUpperCase().concat( sigR.slice(1).replaceAll('CC','RR') )
	            } else if ((q.length > 2) && (q[1] == '|')) {
	                result = this.thumb.toUpperCase().concat( sigR.slice(1).replaceAll('CC','RR') )
	            } else {
	            	this.handshapeSpellingError = 'The character R requires a stem handshape with distinct pairs of adducted fingers.'
	                result = false
	            }
	        } else {
	        	this.handshapeSpellingError = 'The character R requires a stem handshape with distinct pairs of adducted fingers.'
	            result = false
	        }
	    } else {
	        result = sig.join('').toUpperCase()
	    }
	    if (this.secondaryFlexion && !(this.secondary == 'r')) {
	    	var sig2 = result.split('L')
	    	if (sig2.length > 1) {
	    		result = result.replaceAll('L', this.secondary.toUpperCase())
	    	} else {
	    		this.handshapeSpellingError = 'The stem handshape must have extended fingers to further flex.'
	    		result = false}
	    } else if (this.secondaryFlexion && (this.secondary == 'r')) {
	    	var sig2 = result.split('LL')
	    	if (sig2.length > 1) {
	    		result = result.replaceAll('LL', 'RR')
	    	} else {
	    		this.handshapeSpellingError = 'The stem handshape must have  distinct pairs of extended fingers to cross.'
	    		result = false}
	    }
	    if (this.thumbContact) {result = result.concat('+')}
	    return result;
	};
	calculate(handshapeEntry) {
		this.shapeList(handshapeEntry);
		var start = true
		var correct = this.handshapeSpellCheck()
		if (!correct) {
			return {'handshapeSignature': 'None', 'comments': this.handshapeSpellingError}
		} else if (this.irregularHandshape()) {
			return {'handshapeSignature': this.irregularHandshape(), 'comments': 'Valid irregular handshape.'}
		} else {
			for (var i = 0; i <= this.shape.length - 1; i++) {
				var L = this.shape[i]
				if (start) {
					start = false
					this.setCategory(L)
				} else {
					switch (L) {
						case 's':
							this.operationS();
							break;
						case 'l':
							this.operationL();
							break;
						case 'y':
							this.operationY();
							break;
						case 'h':
							this.operationH();
							break;
						case 'v':
							this.operationV();
							break;
						case 'm':
							this.operationM();
							break;
						case 'w':
							this.operationW();
							break;
						case 'b':
							this.operationB();
							break;
						case 'a':
							this.operationA();
							break;
						case 'e':
							this.operationE();
							break;
						case 'f':
							this.operationF();
							break;
						case 'c':
							this.operationC();
							break;
						case 'u':
							this.operationU();
							break;
						case 'r':
							this.operationR();
							break;
						case 'x':
							this.operationX();
							break;
						case 'o':
							this.operationO();
							break;
					}
				}
			}
			var sig = this.signature()
			if (sig) {
				return {'handshapeSignature': sig, 'comments': 'Valid handshape.'}
			} else {
				return {'handshapeSignature': 'None', 'comments': this.handshapeSpellingError}
			}
		}
	};
};