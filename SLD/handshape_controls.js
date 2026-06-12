//-----------------------------------
// 3D Handshape Model Control Module
//
// Written by Dr. Jacob Tosado
// Published December 22, 2024
// Copyright 2024, All rights reserved.
//
// Last Modified December 22, 2024
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
class Knuckle {
	constructor () {
		this.set = [false, false, false];
		this.target = [0,0,0];
	}
	addTarget (target) {
		this.target = target;
	}
}
class Shape {
	knuckles = new Object();

	constructor () {
		this.knuckles['k1'] = new Knuckle();
		this.knuckles['k2'] = new Knuckle();
		this.knuckles['k3'] = new Knuckle();

		this.k1 = this.knuckles['k1']
		this.k2 = this.knuckles['k2']
		this.k3 = this.knuckles['k3']
	}
	addTargets (targets) {
		this.k1.addTarget(targets[0]);
		this.k2.addTarget(targets[1]);
		this.k3.addTarget(targets[2]);
	}
}
class Finger {
	step = 8 / 180 * Math.PI;
	cnvt = 1 / 180 * Math.PI;
	epsilon = 0.01 / 180 * Math.PI;
	shapes = new Object();
	knuckles = new Object();
	kStarts = new Object();
	axes = ['z', 'x', 'y'];
	k1Offset = [0,0,0];

	constructor (knuckles) {
		this.knuckles['k1'] = knuckles[0];
		this.knuckles['k2'] = knuckles[1];
		this.knuckles['k3'] = knuckles[2];

		this.kStarts['k1'] = [knuckles[0].rotation.z, knuckles[0].rotation.x, knuckles[0].rotation.y];
		this.kStarts['k2'] = [knuckles[1].rotation.z, knuckles[1].rotation.x, knuckles[1].rotation.y];
		this.kStarts['k3'] = [knuckles[2].rotation.z, knuckles[2].rotation.x, knuckles[2].rotation.y];

		// FINGERS
		this.shapes['L'] = new Shape();
		this.shapes['U'] = new Shape();
		this.shapes['C'] = new Shape();
		this.shapes['S'] = new Shape();
		this.shapes['X'] = new Shape();
		this.shapes['S1'] = new Shape();
		this.shapes['S2'] = new Shape();
		this.shapes['S3'] = new Shape();
		this.shapes['R1'] = new Shape();
		this.shapes['R2'] = new Shape();
		// THUMB
		this.shapes['A'] = new Shape();
		this.shapes['E'] = new Shape();
		this.shapes['F'] = new Shape();
		this.shapes['CO1'] = new Shape();
		this.shapes['CO2'] = new Shape();
		this.shapes['CO3'] = new Shape();
		this.shapes['CO4'] = new Shape();
		this.shapes['UO1'] = new Shape();
		this.shapes['UO2'] = new Shape();
		this.shapes['UO3'] = new Shape();
		this.shapes['UO4'] = new Shape();
		this.shapes['E1'] = new Shape();
		this.shapes['E2'] = new Shape();
		this.shapes['E3'] = new Shape();
	}
	targetShape (shape, targets) {
		this.shapes[shape].addTargets(targets);
	}
	setShape (shape, k1Offset) {
		this.k1Offset = k1Offset;
		for (let knuckle in this.shapes[shape].knuckles) {
			this.shapes[shape].knuckles[knuckle].set = [true, true, true];
		}
	}
	moveJoint (shape, knuckle, useOffset) {
		var set = this.shapes[shape].knuckles[knuckle].set;
		var start = this.kStarts[knuckle];
		var target = this.shapes[shape].knuckles[knuckle].target;
		var joint = this.knuckles[knuckle];
		var targetOffset = [0,0,0];

		if (useOffset) {
			targetOffset = this.k1Offset;
		}

		if (set[0] || set[1] || set[2]) {
			for (let X in this.axes) {
				var angle = joint.rotation[this.axes[X]] - start[X];
				var target_low = target[X] + targetOffset[X] - this.epsilon;
				var target_high = target[X] + targetOffset[X] + this.epsilon;

				if (angle <= target_high && angle >= target_low) {
					set[X] = false;
				} else if (angle <= target_high && angle < target_low) {
					joint.rotation[this.axes[X]] += this.step;
				} else if (angle >= target_low && angle > target_high) {
					joint.rotation[this.axes[X]] -= this.step;
				}
			}
		}
	}
	moveJoints () {
		for (let shape in this.shapes) {
			for (let knuckle in this.shapes[shape].knuckles) {
				if (knuckle == 'k1') {
					this.moveJoint(shape, knuckle, true);
				} else {
					this.moveJoint(shape, knuckle, false);
				}
			}
		}
	}
}
export class HanshapeControls {
	irregulars = {'ES^SSS':1, 'ESS^SS':2, 'ESSS^S':3};
	fingers = [];
	signature = '';
	irregular = false;
	irregularAbduction = [false, false, false];
	signatureSpellingError = 'Valid signature.';
	flexion0 = false;
	sig = [];
	abduction = [false,false,false];

	constructor (model, mixer, orbitControls, camera) {
		this.model = model;
		this.mixer = mixer;
		this.orbit = orbitControls;
		this.camera = camera;

		this.cnvt = 1 / 180 * Math.PI;
		this.step = 1 / 180 * Math.PI;

		// INDEX FINGER
		this.indexFinger = new Finger([
				this.model.getObjectByName('index_k1'),
				this.model.getObjectByName('index_k2'),
				this.model.getObjectByName('index_k3')
			]);
		this.finger = this.indexFinger;

		this.indexFinger.targetShape('L', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('U', [
				[88 * this.cnvt, 0 * this.cnvt, -16 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('C', [
				[40 * this.cnvt, 0 * this.cnvt, -16 * this.cnvt],
				[48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('S', [
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('X', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('R1', [
				[16 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.indexFinger.targetShape('S1', [
				[64 * this.cnvt, 0 * this.cnvt, -16 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);

		// MIDDLE FINGER
		this.middleFinger = new Finger([
				this.model.getObjectByName('middle_k1'),
				this.model.getObjectByName('middle_k2'),
				this.model.getObjectByName('middle_k3')
			]);

		this.middleFinger.targetShape('L', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('U', [
				[-88 * this.cnvt, 0 * this.cnvt, 8 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('C', [
				[-40 * this.cnvt, 0 * this.cnvt, 8 * this.cnvt],
				[48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('S', [
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('X', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('R2', [
				[16 * this.cnvt, -16 * this.cnvt, 0 * this.cnvt],
				[40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-32 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('R1', [
				[16 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt],
				[40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.middleFinger.targetShape('S2', [
				[-64 * this.cnvt, 0 * this.cnvt, 16 * this.cnvt],
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);

		// RING FINGER
		this.ringFinger = new Finger([
				this.model.getObjectByName('ring_k1'),
				this.model.getObjectByName('ring_k2'),
				this.model.getObjectByName('ring_k3')
			]);

		this.ringFinger.targetShape('L', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('U', [
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('C', [
				[-40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-48 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('S', [
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('X', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('R2', [
				[-16 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('R1', [
				[16 * this.cnvt, -24 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.ringFinger.targetShape('S3', [
				[-64 * this.cnvt, 0 * this.cnvt, -16 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);


		// PINKY FINGER
		this.pinkyFinger = new Finger([
				this.model.getObjectByName('pinky_k1'),
				this.model.getObjectByName('pinky_k2'),
				this.model.getObjectByName('pinky_k3')
			]);

		this.pinkyFinger.targetShape('L', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.pinkyFinger.targetShape('U', [
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.pinkyFinger.targetShape('C', [
				[-40 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-32 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-32 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.pinkyFinger.targetShape('S', [
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.pinkyFinger.targetShape('X', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[-88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.pinkyFinger.targetShape('R2', [
				[-16 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);

		// THUMB
		this.thumb = new Finger([
				this.model.getObjectByName('thumb_k1'),
				this.model.getObjectByName('thumb_k2'),
				this.model.getObjectByName('thumb_k3')
			]);

		this.thumb.targetShape('U', [
				[88 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('C', [
				[64 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt],
				[-48 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('A', [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('E', [
				[88 * this.cnvt, 0 * this.cnvt, 24 * this.cnvt],
				[-24 * this.cnvt, 48 * this.cnvt, 24 * this.cnvt],
				[-24 * this.cnvt, 24 * this.cnvt, 24 * this.cnvt]
			]);
		this.thumb.targetShape('F', [
				[0 * this.cnvt, -32 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('CO1', [
				[56 * this.cnvt, 8 * this.cnvt, 24 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 88 * this.cnvt],
				[0 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('CO2', [
				[48 * this.cnvt, 40 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 88 * this.cnvt],
				[0 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('CO3', [
				[64 * this.cnvt, 48 * this.cnvt, 0 * this.cnvt],
				[-16 * this.cnvt, 16 * this.cnvt, 88 * this.cnvt],
				[0 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('CO4', [
				[64 * this.cnvt, 72 * this.cnvt, 0 * this.cnvt],
				[-24 * this.cnvt, 16 * this.cnvt, 88 * this.cnvt],
				[0 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('UO1', [
				[64 * this.cnvt, 0 * this.cnvt, 32 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('UO2', [
				[72 * this.cnvt, 0 * this.cnvt, 40 * this.cnvt],
				[16 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('UO3', [
				[80 * this.cnvt, 0 * this.cnvt, 48 * this.cnvt],
				[24 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('UO4', [
				[88 * this.cnvt, 0 * this.cnvt, 40 * this.cnvt],
				[24 * this.cnvt, 24 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 16 * this.cnvt, 0 * this.cnvt]
			]);
		this.thumb.targetShape('E1', [
				[8 * this.cnvt, 24 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 40 * this.cnvt, 40 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 16 * 1 * this.cnvt]
			]);
		this.thumb.targetShape('E2', [
				[8 * this.cnvt, 32 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 40 * this.cnvt, 40 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 16 * 1 * this.cnvt]
			]);
		this.thumb.targetShape('E3', [
				[16 * this.cnvt, 56 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 40 * this.cnvt, 40 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 16 * 1 * this.cnvt]
			]);

		this.fingers.push(this.thumb);
		this.fingers.push(this.indexFinger);
		this.fingers.push(this.middleFinger);
		this.fingers.push(this.ringFinger);
		this.fingers.push(this.pinkyFinger);
	}
	update () {
		for (let finger in this.fingers) {
			this.fingers[finger].moveJoints();
		}
	}

	signatureReset () {
		this.irregular = false;
		this.irregularAbduction = [false, false, false];
		this.signatureSpellingError = 'Valid signature.';
		this.flexion0 = false;
		this.sig = [];
		this.abduction = [false,false,false];
	}
	sigList() {
		this.signatureReset();
		var sigString = this.signature;
		sigString = sigString.toUpperCase();
		// this.sig0 = sigString
		if (sigString.includes('+')) {sigString = sigString.replaceAll('+',''); this.flexion0 = true}
		this.sig = sigString.split('');
		for (let x in this.sig) {
			if (this.sig[x] == '|') {
				if (x == 2) {
					this.abduction[0] = true;
				} else if (x == 3) {
					this.abduction[1] = true;
				} else if ((x == 4) && (this.abduction[0])) {
					this.abduction[1] = true;
				} else if ((x == 4) && (!this.abduction[0] && !this.abduction[1])) {
					this.abduction[2] = true;
				} else if ((x == 5)) {
					this.abduction[2] = true;
				} else if (x == 6) {
					this.abduction[2] = true;
				}
			} else if (this.sig[x] == '^' && ['2','3','4'].includes(x)) {
				this.irregularAbduction[x - 2] = true;
			}
		}
		this.sigLetters = sigString.replaceAll('|','').replaceAll('^','').split('');
	}
	invalidSigLength() {
		if ((this.sig.length < 5) || (this.sig.length > 8)) {return true}
	}
	invalidSigCharacters() {
		for (var i = 0; i <= this.sig.length - 1; i++) {
			if (!['A','E','F','C','U','^'].includes(this.sig[i]) && !['S','L','C','U','X','R','|'].includes(this.sig[i])) {return true}
		}
	}
	invalidSigStart() {
		if (!['A','E','F','C','U'].includes(this.sig[0])) {return true}
	}
	invalidSigEnd() {
		if (!['S','L','C','U','X','R'].includes(this.sig[this.sig.length-1])) {return true}
	}
	invalidSecond() {
		if (!['S','L','C','U','X','R'].includes(this.sig[1])) {return true}
	}
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
	}
	invalid_RR() {
		if (this.sig.includes('R')) {
			if (!this.sig.join('').includes('RR')) {return true}
			else if (this.sig.join('').split('RR').includes('R') || this.sig.slice(1).reverse().join('').split('RR').includes('R')) {return true}
		}
	}
	invalidThumb() {
		if ((this.sig[0] == 'C' && !this.sig.slice(1).includes('C')) || (this.sig[0] == 'U' && !this.sig.slice(1).includes('U'))) {return true}
	}
	tooManyFingers() {
		return (this.sigLetters.length > 5);
	}
	tooManyAbductions() {
		if (this.sig.join('').includes('||')) {return true}
	}
	tooManyFlexions() {
		if ((this.sig.includes('C') && this.sig.includes('U') && this.sig.includes('X')) ||
			(this.sig.includes('R') && this.sig.includes('C') && this.sig.includes('U')) ||
			(this.sig.includes('X') && this.sig.includes('R') && this.sig.includes('C')) ||
			(this.sig.includes('U') && this.sig.includes('X') && this.sig.includes('R')) ) {return true}
	}
	signatureSpellCheck() {
		if (this.irregulars[this.sig.join('')]) {
			this.irregular = true;
			return true;
		} else {
			if (this.invalidSigLength()) {this.signatureSpellingError = 'Five to eight characters are required.'; return false;}
			else if (this.invalidSigCharacters()) {this.signatureSpellingError = 'Signature must include only the following characters:<br>A E F U C S L X R | ^ +'; return false;}
			else if (this.invalidSigStart()) {this.signatureSpellingError = 'The first character must be one of the following:<br>A E F U C'; return false;}
			else if (this.invalidSigEnd()) {this.signatureSpellingError = 'The last character must be one of the following:<br>S L C U X R'; return false;}
			else if (this.invalidSecond()) {this.signatureSpellingError = 'The second character must be one of the following:<br>S L C U X R'; return false;}
			else if (this.invalidAbduction()) {this.signatureSpellingError = 'Signature may not contain | between different characters, or between S and S.'; return false;}
			else if (this.invalid_RR()) {this.signatureSpellingError = 'The character R must occur as the pair RR.'; return false;}
			else if (this.invalidThumb()) {this.signatureSpellingError = 'The thumb in the C or U configuration must have at least one finger in the C or U configuration, respectively.'; return false;}
			else if (this.tooManyFingers()) {this.signatureSpellingError = 'Signature may only contain four finger characters.'; return false;}
			else if (this.tooManyAbductions()) {this.signatureSpellingError = 'Signature may not contain || pairs.'; return false;}
			else if (this.tooManyFlexions()) {this.signatureSpellingError = 'Signature may only contain two kinds of flexion characters.'; return false;}
			else {return true;}
		}
	}

	getk1Offset () {
		var k1Offset = [
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt],
				[0 * this.cnvt, 0 * this.cnvt, 0 * this.cnvt]
			];
		if (this.abduction[0]) {
			k1Offset[1] = [0 * this.cnvt, -32 * this.cnvt, 0 * this.cnvt];
		}
		if (this.abduction[1]) {
			k1Offset[3] = [0 * this.cnvt, -16 * this.cnvt, 0 * this.cnvt];
			if (this.abduction[2]) {
				k1Offset[4] = [0 * this.cnvt, -32 * this.cnvt, 0 * this.cnvt];
			} else {
				k1Offset[4] = [0 * this.cnvt, -16 * this.cnvt, 0 * this.cnvt];
			}
		}
		if (this.abduction[2] && !this.abduction[1]) {
			k1Offset[4] = [0 * this.cnvt, -16 * this.cnvt, 0 * this.cnvt];
		}
		return k1Offset;
	}
	mapCharacters () {
		var isR2 = false;
		var foundTouch = false
		for (let x in this.sigLetters) {
			if (this.sigLetters[x] == 'R') {
				if (isR2) {
					this.sigLetters[x] = 'R' + 2;
					isR2 = false;
					if ((x <= 3) && (this.sigLetters[(x * 1) + 1] == 'L')) {
						if (x == 2) {
							this.abduction[1] = true;
						} else if (x == 3) {
							this.abduction[2] = true;
						}
					}
				} else {
					this.sigLetters[x] = 'R' + 1;
					isR2 = true;
					if ((x >= 2) && (this.sigLetters[x-1] == 'L')) {
						if (x == 2) {
							this.abduction[0] = true;
						} else if (x == 3) {
							this.abduction[1] = true;
						}
					}
				}	
			}
			if (this.flexion0 && !foundTouch && !(x == 0)) {
				if (this.sigLetters[0] == this.sigLetters[x]) {
					if (this.sigLetters[x] == 'C') {
						this.sigLetters[0] = 'CO' + x;
						foundTouch = true;
					} else if (this.sigLetters[x] == 'U') {
						this.sigLetters[0] = 'UO' + x;
						foundTouch = true;
					}
				}
				
			}
		}
		if (this.irregular) {
			if (this.irregularAbduction[0]) {
				this.sigLetters[0] = 'E1';
				this.sigLetters[1] = 'S1';
			} else if (this.irregularAbduction[1]) {
				this.sigLetters[0] = 'E2';
				this.sigLetters[1] = 'S1';
				this.sigLetters[2] = 'S2';
			} else if (this.irregularAbduction[2]) {
				this.sigLetters[0] = 'E3';
				this.sigLetters[1] = 'S1';
				this.sigLetters[2] = 'S2';
				this.sigLetters[3] = 'S3';
			}
		}
	}
	setHandshape (signature) {
		this.signature = signature;
		this.sigList();
		var correct = this.signatureSpellCheck();
		if (!correct) {
			return this.signatureSpellingError;
		} else {
			this.mapCharacters();
			var k1Offset = this.getk1Offset();
			for (let x in this.sigLetters) {
				this.fingers[x].setShape(this.sigLetters[x], k1Offset[x]);
			}
			return this.signatureSpellingError;
		}
	}
}