inlets=1;
outlets=0;

var log = require('utils.js').log;
var origInputs = {};

function bang(i) {
  var liveObject = new LiveAPI('live_set view selected_track');
  var currentInput = JSON.parse(liveObject.get('input_routing_type')).input_routing_type;
  var airt = JSON.parse(liveObject.get('available_input_routing_types')).available_input_routing_types;

  var ret;

  if (currentInput.display_name !== 'No Input') {
    origInputs[liveObject.id] = currentInput;
    // set to No Input
    ret = airt[airt.length - 1];
  } else {
    // set to Original, default to All Inputs
    ret = origInputs[liveObject.id] || airt[0];
  }

  liveObject.set('input_routing_type', ret);
}
