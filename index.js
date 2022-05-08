//complicated maths to resolve torque axes
  //𝐹𝑠=|𝐹⃗ |cos(𝜃𝑠,𝐹)
function splitAxes(force) {
  var angle = geofs.animation.values.heading360 * (Math.PI/180)
  if (geofs.animation.values.atilt <= 0) {
  var anglez = geofs.animation.values.atilt - 45
  }
  else {
    var anglez = Math.abs(Math.abs(geofs.animation.values.atilt + 45) - 360)
  }
  
  fx = force * (Math.sin(angle))
  fy = force * (Math.cos(angle))
  fz = force * Math.cos(anglez)
  return [fx, fy, fz];
}

//stall buffeting
function stallForces() {
  if (geofs.animation.values.aoa > 7) {
    geofs.aircraft.instance.rigidBody.applyTorqueImpulse([splitAxes(Math.random()*geofs.animation.values.aoa * 1000)[0],splitAxes(Math.random()*geofs.animation.values.aoa * 1000)[1],0])
  }
}

//ground effect
function groundEffect() {
  if (geofs.animation.values.haglFeet <= 100) {
    geofs.aircraft.instance.rigidBody.applyCentralImpulse([0,0,(-(geofs.animation.values.haglFeet) + 100) * geofs.animation.values.kias])
  }
}

//tiller restriction
geofs.animation.values.tiller = null;
function tiller() {
  if (geofs.animation.values.kias >= 50) {
    geofs.animation.values.tiller = geofs.animation.values.yaw / (geofs.animation.values.kias / 5)
  }
  else {
    geofs.animation.values.tiller = geofs.animation.values.yaw
  }
}

//spoilers/flaps shake
geofs.animation.values.spoilersShake = null;
geofs.animation.values.flapsShake = null;
function getShake() {
  if (geofs.animation.values.airbrakesPosition == 1) {
    geofs.animation.values.spoilersShake = 1 - (Math.random() / 20) * (geofs.animation.values.kias / 200)
  }
  else {
    geofs.animation.values.spoilersShake = geofs.animation.values.airbrakesPosition
  }
  if (geofs.animation.values.flapsPosition == 6) {
    geofs.animation.values.flapsShake = (Math.random() / 20) * (geofs.animation.values.kias / 100);
  }
  else {
    geofs.animation.values.flapsShake = 0;
  }
}
geofs.aircraft.instance.setup.parts[106].animations[1].value = "tiller"
geofs.aircraft.instance.setup.parts[60].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[61].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[62].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[63].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[64].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[65].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[66].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[67].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[68].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[69].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[70].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[71].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[72].animations[0].value = "spoilersShake"
geofs.aircraft.instance.setup.parts[73].animations[0].value = "spoilersShake"

//wingflex re-assignment
function resetLift2(){
geofs.animation.values.liftLeftWing = (-geofs.aircraft.instance.parts.wingleft.lift / 200000)+(geofs.animation.values.accZ)/20;
geofs.animation.values.liftRightWing = (-geofs.aircraft.instance.parts.wingright.lift / 200000)+(geofs.animation.values.accZ)/20;
};
geofs.aircraft.instance.setup.parts[3].animations[1].value = "liftLeftWing"
geofs.aircraft.instance.setup.parts[4].animations[1].value = "liftLeftWing"
geofs.aircraft.instance.setup.parts[5].animations[0].value = "liftLeftWing"
geofs.aircraft.instance.setup.parts[6].animations[0].value = "liftLeftWing"
geofs.aircraft.instance.setup.parts[7].animations[1].value = "liftLeftWing"
geofs.aircraft.instance.setup.parts[8].animations[1].value = "liftRightWing"
geofs.aircraft.instance.setup.parts[9].animations[0].value = "liftRightWing"
geofs.aircraft.instance.setup.parts[10].animations[0].value = "liftRightWing"
//check if flaps are changing position
geofs.animation.values.flapschange = 0
function getFlapChange(){
  if (geofs.animation.values.flapsPosition < geofs.animation.values.flapsTarget || geofs.animation.values.flapsPosition > geofs.animation.values.flapsTarget){
    console.log("flaps extend")
    geofs.animation.values.flapschange = 1
  }
  else{
    geofs.animation.values.flapschange = 0
  }
}

//assign new sounds
geofs.aircraft.instance.definition.sounds[8] = {};
geofs.aircraft.instance.definition.sounds[8].id = "flapssound"
  geofs.aircraft.instance.definition.sounds[8].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/777flap.mp3"
geofs.aircraft.instance.definition.sounds[8].effects = {"start": {"value": "flapschange"}}
  //assign alarm sounds
  geofs.aircraft.instance.definition.sounds[9] = {};
geofs.aircraft.instance.definition.sounds[9].id = "landinggearwarn"
  geofs.aircraft.instance.definition.sounds[9].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/tlg.mp3"
geofs.aircraft.instance.definition.sounds[9].effects = {"start": {"value": "isGearWarn"}}

  geofs.aircraft.instance.definition.sounds[10] = {};
geofs.aircraft.instance.definition.sounds[10].id = "flapswarn"
  geofs.aircraft.instance.definition.sounds[10].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/tlf.mp3"
geofs.aircraft.instance.definition.sounds[10].effects = {"start": {"value": "isFlapsWarn"}}

  geofs.aircraft.instance.definition.sounds[11] = {};
geofs.aircraft.instance.definition.sounds[11].id = "terrainwarn"
  geofs.aircraft.instance.definition.sounds[11].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/tlt.mp3"
geofs.aircraft.instance.definition.sounds[11].effects = {"start": {"value": "isTerrainWarn"}}

  geofs.aircraft.instance.definition.sounds[12] = {};
geofs.aircraft.instance.definition.sounds[12].id = "pullwarn"
  geofs.aircraft.instance.definition.sounds[12].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/pullup.mp3"
geofs.aircraft.instance.definition.sounds[12].effects = {"start": {"value": "isPullupWarn"}}

  geofs.aircraft.instance.definition.sounds[13] = {};
geofs.aircraft.instance.definition.sounds[13].id = "bankangle"
  geofs.aircraft.instance.definition.sounds[13].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/bankangle.mp3"
geofs.aircraft.instance.definition.sounds[13].effects = {"start": {"value": "isBankWarn"}}

  geofs.aircraft.instance.definition.sounds[14] = {};
geofs.aircraft.instance.definition.sounds[14].id = "1000"
  geofs.aircraft.instance.definition.sounds[14].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/1000gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[14].effects = {"start": {"value": "gpws1000"}}

  geofs.aircraft.instance.definition.sounds[15] = {};
geofs.aircraft.instance.definition.sounds[15].id = "500"
  geofs.aircraft.instance.definition.sounds[15].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/500correct.mp3"
geofs.aircraft.instance.definition.sounds[15].effects = {"start": {"value": "gpws500"}}

  geofs.aircraft.instance.definition.sounds[16] = {};
geofs.aircraft.instance.definition.sounds[16].id = "400"
  geofs.aircraft.instance.definition.sounds[16].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/400gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[16].effects = {"start": {"value": "gpws400"}}

  geofs.aircraft.instance.definition.sounds[17] = {};
geofs.aircraft.instance.definition.sounds[17].id = "300"
  geofs.aircraft.instance.definition.sounds[17].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/300gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[17].effects = {"start": {"value": "gpws300"}}

  geofs.aircraft.instance.definition.sounds[18] = {};
geofs.aircraft.instance.definition.sounds[18].id = "200"
  geofs.aircraft.instance.definition.sounds[18].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/200gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[18].effects = {"start": {"value": "gpws200"}}

  geofs.aircraft.instance.definition.sounds[19] = {};
geofs.aircraft.instance.definition.sounds[19].id = "100"
  geofs.aircraft.instance.definition.sounds[19].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/100gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[19].effects = {"start": {"value": "gpws100"}}

  geofs.aircraft.instance.definition.sounds[20] = {};
geofs.aircraft.instance.definition.sounds[20].id = "50"
  geofs.aircraft.instance.definition.sounds[20].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/50gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[20].effects = {"start": {"value": "gpws50"}}

  geofs.aircraft.instance.definition.sounds[21] = {};
geofs.aircraft.instance.definition.sounds[21].id = "40"
  geofs.aircraft.instance.definition.sounds[21].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/40gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[21].effects = {"start": {"value": "gpws40"}}

  geofs.aircraft.instance.definition.sounds[22] = {};
geofs.aircraft.instance.definition.sounds[22].id = "30"
  geofs.aircraft.instance.definition.sounds[22].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/30gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[22].effects = {"start": {"value": "gpws30"}}

  geofs.aircraft.instance.definition.sounds[23] = {};
geofs.aircraft.instance.definition.sounds[23].id = "20"
  geofs.aircraft.instance.definition.sounds[23].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/20gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[23].effects = {"start": {"value": "gpws20"}}

  geofs.aircraft.instance.definition.sounds[24] = {};
geofs.aircraft.instance.definition.sounds[24].id = "10"
  geofs.aircraft.instance.definition.sounds[24].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/10gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[24].effects = {"start": {"value": "gpws10"}}

geofs.aircraft.instance.definition.sounds[0].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/777enginelow.mp3"
geofs.aircraft.instance.definition.sounds[1].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/777enginemid.mp3"
geofs.aircraft.instance.definition.sounds[2].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/777enginehigh.mp3"
geofs.aircraft.instance.definition.sounds[3].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/777enginehigh.mp3"



audio.init(geofs.aircraft.instance.definition.sounds)
geofs.aircraft.instance.definition.sounds[0].effects.volume.ratio = 100
geofs.aircraft.instance.definition.sounds[0].effects.volume.ramp = [100, 500, 2000, 10000]
geofs.aircraft.instance.definition.sounds[1].effects.volume.ratio = 100
geofs.aircraft.instance.definition.sounds[2].effects.volume.ratio = 100
geofs.aircraft.instance.definition.sounds[3].effects.volume.ratio = 100
geofs.aircraft.instance.definition.sounds[4].effects.volume.ratio = 100

// get running average to dampen control inputs
let pitchInputs = [0, 0, 0, 0, 0, 0, 0];
let rollInputs = [0, 0, 0, 0, 0, 0, 0];
let yawInputs = [0, 0, 0, 0, 0, 0, 0];
geofs.animation.values.averagePitch = null;
geofs.animation.values.averageRoll = null;
geofs.animation.values.averageYaw = null;
geofs.animation.values.outerAveragePitch = null;
geofs.animation.values.outerAverageRoll = null;
geofs.animation.values.outerAverageYaw = null;
function pushInputs(){
  pitchInputs.push(geofs.animation.values.computedPitch);
  rollInputs.push(geofs.animation.values.roll);
  yawInputs.push(geofs.animation.values.computedYaw);
}

function computeOutputs(){
  if (geofs.aircraft.instance.setup.autopilot) {
    geofs.animation.values.outerAveragePitch = geofs.animation.values.pitch
geofs.animation.values.outerAverageRoll = geofs.animation.values.roll
geofs.animation.values.outerAverageYaw = geofs.animation.values.yaw
    return;
  }
  else {
var pitchcheck = movingAvg(pitchInputs, 6, 6);
var rollcheck = movingAvg(rollInputs, 6, 6);
 var yawcheck = movingAvg(yawInputs, 6, 6);
  geofs.animation.values.averagePitch = pitchcheck[pitchcheck.length - 3]
geofs.animation.values.averageRoll = rollcheck[rollcheck.length - 3];
geofs.animation.values.averageYaw = yawcheck[yawcheck.length - 3];
  geofs.animation.values.outerAveragePitch = clamp(geofs.animation.values.averagePitch / (geofs.animation.values.kias / 200), -1, 1);
geofs.animation.values.outerAverageRoll = clamp(geofs.animation.values.averageRoll / (geofs.animation.values.kias / 100), -1, 1);
geofs.animation.values.outerAverageYaw = clamp(geofs.animation.values.averageYaw / (geofs.animation.values.kias / 100), -1, 1);
  }
}

function movingAvg(array, countBefore, countAfter) {
  if (countAfter == undefined) countAfter = 0;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const subArr = array.slice(Math.max(i - countBefore, 0), Math.min(i + countAfter + 1, array.length));
    const avg = subArr.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0) / subArr.length;
    result.push(avg);
  }
  return result;
}
geofs.aircraft.instance.parts.aileronleft.animations[0].value = "outerAverageRoll"
geofs.aircraft.instance.parts.aileronright.animations[0].value = "outerAverageRoll"
geofs.aircraft.instance.parts.flaperonleft.animations[0].value = "averageRoll"
geofs.aircraft.instance.parts.flaperonright.animations[0].value = "averageRoll"
geofs.aircraft.instance.parts.elevleft.animations[0].value = "outerAveragePitch"
geofs.aircraft.instance.parts.elevright.animations[0].value = "outerAveragePitch"
geofs.aircraft.instance.parts.rudder.animations[0].value = "averageYaw"

geofs.animation.values.computedPitch = 0
geofs.animation.values.computedYaw = 0
geofs.animation.values.computedRoll = 0
let lastPitchValue = 0
let gLimitedPitch =  0
let increment = 0
let deadZone = 0.01
let tiltToHold = 0
let pitchStage1 = 0
function computePitch(){
//implement tilt hold
  if (geofs.animation.values.pitch <= deadZone && geofs.animation.values.pitch >= -deadZone){
    
  pitchStage1 = -(tiltToHold - geofs.animation.values.atilt) / 10
    
}
  else{
    tiltToHold = geofs.animation.values.atilt
    pitchStage1 = geofs.animation.values.pitch
  }
  geofs.animation.values.computedPitch = clamp(pitchStage1, -1, 1)
}

function computeYaw(){
      if (geofs.animation.values.atilt >= -70 && geofs.animation.values.atilt <= 70){
  if (geofs.animation.values.gearPosition == 1){
    if (geofs.animation.values.aroll >= -75 && geofs.animation.values.aroll <= 75){
  geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
    if (geofs.animation.values.aroll <= -75 && geofs.animation.values.aroll >= -90){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
        if (geofs.animation.values.aroll <= -90 && geofs.animation.values.aroll >= -105){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
    if (geofs.animation.values.aroll <= 75 && geofs.animation.values.aroll >= 90){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
        if (geofs.animation.values.aroll <= 90 && geofs.animation.values.aroll >= 105){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
        if (geofs.animation.values.aroll <= -75 && geofs.animation.values.aroll >= 75){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1)
    }
  }
  else{
    if (geofs.animation.values.aroll >= -75 && geofs.animation.values.aroll <= 75){
  geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
    if (geofs.animation.values.aroll <= -75 && geofs.animation.values.aroll >= -90){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
        if (geofs.animation.values.aroll <= -90 && geofs.animation.values.aroll >= -105){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
    if (geofs.animation.values.aroll <= 75 && geofs.animation.values.aroll >= 90){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw - ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
        if (geofs.animation.values.aroll <= 90 && geofs.animation.values.aroll >= 105){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
        if (geofs.animation.values.aroll >= 75 && geofs.animation.values.aroll <= -75){
        geofs.animation.values.computedYaw = clamp(geofs.animation.values.yaw + ( geofs.aircraft.instance.htrAngularSpeed[0]*50), -1, 1) / 2
    }
  }
                }
  else{
    geofs.animation.values.computedYaw = geofs.animation.values.yaw
  }
}


//implement smooth gear tilting
let restingPoint = 16.152139372973117
geofs.animation.values.gearTilt = null;

function tiltGear(){
  if (geofs.animation.values.haglFeet <= 18){
    geofs.animation.values.gearTilt = clamp((restingPoint * geofs.animation.values.haglFeet)/15, 18.5, 20)
  }
}

geofs.aircraft.instance.parts.bogeyright.animations[0].value = "gearTilt"
geofs.aircraft.instance.parts.bogeyleft.animations[0].value = "gearTilt"
geofs.aircraft.instance.parts.bogeyright.animations[0].offset = -27
geofs.aircraft.instance.parts.bogeyleft.animations[0].offset = -27
 delete geofs.aircraft.instance.parts.bogeyright.animations[0].lt
delete geofs.aircraft.instance.parts.bogeyleft.animations[0].lt




//detect and execute GPWS callouts
let isApprConfig = false;
 geofs.animation.values.isFlapsWarn = 0;
geofs.animation.values.isGearWarn = 0;
geofs.animation.values.isTerrainWarn = 0;
 geofs.animation.values.isPullupWarn = 0;
 geofs.animation.values.isBankWarn = 0;
 geofs.animation.values.gpws1000 = 0;
 geofs.animation.values.gpws500 = 0;
 geofs.animation.values.gpws400 = 0;
 geofs.animation.values.gpws300 = 0;
 geofs.animation.values.gpws200 = 0;
 geofs.animation.values.gpws100 = 0;
 geofs.animation.values.gpws50 = 0;
 geofs.animation.values.gpws40 = 0;
 geofs.animation.values.gpws30 = 0;
 geofs.animation.values.gpws20 = 0;
 geofs.animation.values.gpws10 = 0;

function getGearFlapsWarn() {
if (geofs.animation.values.groundContact == 1) {
  geofs.animation.values.isGearWarn = 0;
  geofs.animation.values.isFlapsWarn = 0;
  return;
}
	if (geofs.animation.values.haglFeet <= 500 && geofs.animation.values.gearPosition == 1 && geofs.animation.values.climbrate < 0 && geofs.animation.values.isPullupWarn == 0) {
		geofs.animation.values.isGearWarn = 1;
	} else {
		geofs.animation.values.isGearWarn = 0;
	}

	if (geofs.animation.values.haglFeet <= 1000 && geofs.animation.values.flapsPosition == 0 && geofs.animation.values.climbrate < 0 && geofs.animation.values.isPullupWarn == 0) {
		geofs.animation.values.isFlapsWarn = 1;
	} else {
		geofs.animation.values.isFlapsWarn = 0;
	}
}

function testTerrainorAppr() {
	if (geofs.animation.values.gearPosition == 0) {
		if (geofs.animation.values.haglFeet <= 1000 && geofs.animation.values.climbrate <= -100 && geofs.animation.values.climbrate >= -5000 && geofs.animation.values.isGearWarn == 0 && geofs.animation.values.isFlapsWarn == 0 && isApprConfig == 0) {
			geofs.animation.values.isTerrainWarn = 1;
		} else {
			geofs.animation.values.isTerrainWarn = 0;
		}

		if (geofs.animation.values.haglFeet <= 5000 && geofs.animation.values.climbrate <= -2000 || geofs.animation.values.haglFeet <= 1000 && geofs.animation.values.climbrate <= -5000) {
			geofs.animation.values.isPullupWarn = 1;
		} else {
			geofs.animation.values.isPullupWarn = 0;
		}
	} else {
		geofs.animation.values.isTerrainWarn = 0;
    geofs.animation.values.isPullupWarn = 0;
		return;
	}
}


function testForApproach(){
  if (geofs.animation.values.isFlapsWarn == 0 && geofs.animation.values.isGearWarn == 0 && geofs.animation.values.climbrate <= -1){
    isApprConfig = true
  }
  else{
    isApprConfig = false
  }
}

function doRadioAltCall(){
  if (isApprConfig){
  if (geofs.animation.values.haglFeet <= 1000 + restingPoint && geofs.animation.values.haglFeet >= 900 + restingPoint){
    geofs.animation.values.gpws1000 = 1;
  }
  else{
    geofs.animation.values.gpws1000 = 0;
  }
   if (geofs.animation.values.haglFeet <= 500 + restingPoint && geofs.animation.values.haglFeet >= 400 + restingPoint){
    geofs.animation.values.gpws500 = 1;
  }
  else{
    geofs.animation.values.gpws500 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 400 + restingPoint && geofs.animation.values.haglFeet >= 300 + restingPoint){
    geofs.animation.values.gpws400 = 1;
  }
  else{
    geofs.animation.values.gpws400 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 300 + restingPoint && geofs.animation.values.haglFeet >= 200 + restingPoint){
    geofs.animation.values.gpws300 = 1;
  }
  else{
    geofs.animation.values.gpws300 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 200 + restingPoint && geofs.animation.values.haglFeet >= 100 + restingPoint){
    geofs.animation.values.gpws200 = 1;
  }
  else{
    geofs.animation.values.gpws200 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 100 + restingPoint && geofs.animation.values.haglFeet >= 50 + restingPoint){
    geofs.animation.values.gpws100 = 1;
  }
  else{
    geofs.animation.values.gpws100 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 50 + restingPoint && geofs.animation.values.haglFeet >= 40 + restingPoint){
    geofs.animation.values.gpws50 = 1;
  }
  else{
    geofs.animation.values.gpws50 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 40 + restingPoint && geofs.animation.values.haglFeet >= 30 + restingPoint){
    geofs.animation.values.gpws40 = 1;
  }
  else{
    geofs.animation.values.gpws40 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 30 + restingPoint && geofs.animation.values.haglFeet >= 20 + restingPoint){
    geofs.animation.values.gpws30 = 1;
  }
  else{
    geofs.animation.values.gpws30 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 20 + restingPoint && geofs.animation.values.haglFeet >= 10 + restingPoint){
    geofs.animation.values.gpws20 = 1;
  }
  else{
    geofs.animation.values.gpws20 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 10 + restingPoint && geofs.animation.values.haglFeet >= 5 + restingPoint){
    geofs.animation.values.gpws10 = 1;
  }
  else{
    geofs.animation.values.gpws10 = 0;
  } 
}
  else {
    geofs.animation.values.gpws1000 = 0;
    geofs.animation.values.gpws500 = 0;
    geofs.animation.values.gpws400 = 0;
    geofs.animation.values.gpws300 = 0;
    geofs.animation.values.gpws200 = 0;
    geofs.animation.values.gpws100 = 0;
    geofs.animation.values.gpws50 = 0;
    geofs.animation.values.gpws40 = 0;
    geofs.animation.values.gpws30 = 0;
    geofs.animation.values.gpws20 = 0;
    geofs.animation.values.gpws10 = 0;
  }
}

  
setInterval(function(){
  groundEffect()
  getShake()
  computeYaw()
  tiltGear();
  computePitch();
  pushInputs();
  computeOutputs();
  resetLift2();
  getFlapChange();
  getGearFlapsWarn()
  testTerrainorAppr()
  testForApproach()
  doRadioAltCall()
  tiller()
  stallForces()
}, 20)
