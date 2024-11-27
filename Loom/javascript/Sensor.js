// ranges = null
// parse_ranges()

// inlets = 1;
// // 0: Incoming commands

// outlets = 0;

// var data = {};

// var last_device_number = -1
// var menu_updated = false	

// var last_module = null

// // Upon new data
// function json(j)
// {
// 	post(j);
// 	data = JSON.parse(j); // js object
	
// 	// Check if ranges should be updated
// 	curr_module = this.patcher.getnamed("module_selection").getvalueof()
// 	if(last_module == null || last_module != curr_module) {
// 		update_range()
// 		last_module = curr_module
// 	}
	
// 	// Check device instance number
	
// 	if (menu_updated && device_changed() ) {
// 		menu_updated = false
// 		this.patcher.getnamed("gate_open").message("bang")
// 		post("Resetting")
// 		post()
		
// 		var param_menu = this.patcher.getnamed("parameter_selection");
// 		var module_menu = this.patcher.getnamed("module_selection");
		
// 		param_menu.clear()
// 		module_menu.clear()
// 	}
	
// 	if (!menu_updated) {
// 		update_UI_module_menu()
// 		update_UI_parameter_menu()
		
// 		if (data["ID"] && (data["ID"]["instance"]!=null)) {
// 			last_device_number = data["ID"]["instance"]
// 		}
		
// 		menu_updated = true
		
// 		load_saved_selection()
// 	}

// 	update_UI_parameter_value()	
// }

// // Parse sensorRanges.json
// function parse_ranges() {
// 	//	Credit to https://cycling74.com/forums/sharing-is-fun-example-write-and-read-json-in-javascript
// 	memstr = ""
// 	maxchars = 800
// 	var f = new File("sensorRanges.json","read");
// 	f.open();
// 	if (f.isopen) {
// 		while(f.position<f.eof) {
// 			memstr+=f.readstring(maxchars);
// 		}
// 		f.close();
// 		ranges = JSON.parse(memstr);
// 	} else {
// 		post("Error Reading Default Ranges\n");
// 	}
	
// }

// // Set the scroller min/max to different values based on menu. Either default range or range specified in sensorRanges.json
// function update_range() {
// 	if(ranges != null){
// 		var scroller = this.patcher.getnamed("scroller");
// 		var param_menu = this.patcher.getnamed("parameter_selection").getvalueof();
// 		var module_menu = this.patcher.getnamed("module_selection").getvalueof();
// 		//	Only changes the range if there is some scroller object
// 		if(scroller) {
// 			//	The default range for a sensor (it will be the range if the sensor is not in sensorRanges.json)
// 			var min = -1000
// 			var max = 1000
// 			if(ranges["ranges"][module_menu]) {
// 				//	Certain sensors require different ranges for different modules
// 				if(ranges["ranges"][module_menu][param_menu]) {
// 					sensmin = ranges["ranges"][module_menu][param_menu]["min"]
// 					sensmax = ranges["ranges"][module_menu][param_menu]["max"]
// 					if(typeof sensmax !== 'undefined'){
// 						max = sensmax
// 					}
// 					if(typeof sensmin !== 'undefined'){
// 						min = sensmin
// 					}
// 				//	Some sensors only require one range
// 				} else {
// 					sensmin = ranges["ranges"][module_menu]["min"]
// 					sensmax = ranges["ranges"][module_menu]["max"]
// 					if(typeof sensmax !== 'undefined'){
// 						max = sensmax
// 					}
// 					if(typeof sensmin !== 'undefined'){
// 						min = sensmin
// 					}
// 				}
// 			}
// 			scroller.setmin(min)
// 			scroller.setmax(max)
// 		}
// 	}
// }

// function update_UI_module_menu()
// {
// 	// Get module menu element
// 	var module_menu = this.patcher.getnamed("module_selection");
	
// 	// Get current selection
// 	module_menu.message("pattrmode", 1);
// 	var prev = module_menu.getvalueof();
// 	module_menu.clear();
	
// 	// Update menu with modules
// 	Object.keys(data)
// 		.filter( function (val) { return val != "ID" } )			// Remove ID key
// 		.forEach( function (key) { module_menu.append( key ) } );	// Add to menu

// 	module_menu.set(prev);
// }

// function update_UI_parameter_menu()
// {
// 	if (data == null)
// 	{
// 		return;
// 	}
// 	// Get module menu element
// 	var param_menu = this.patcher.getnamed("parameter_selection");
// 	var module_menu = this.patcher.getnamed("module_selection");

// 	// Get current selection
// 	param_menu.message("pattrmode", 1);
// 	module_menu.message("pattrmode", 1);
// 	var curr_module = module_menu.getvalueof();
// 	var prev = param_menu.getvalueof();
// 	param_menu.clear();
	
// 	// Update menu with module's data
// 	Object.keys( data[curr_module] )
// 		.forEach( function (key) { param_menu.append( key ) } );	// Add to menu
	

// 	param_menu.set(prev);
// 	var param_view =  this.patcher.getnamed("param_view");

// 	var val = data[module_menu.getvalueof()][param_menu.getvalueof()];
	
// 	param_view.set(val);
// 	param_view.message("bang");
// }


// //var last_param = "";
// function update_UI_parameter_value() {
// 	if (data == null) {
// 	  post("Got null data")
// 	  return;
// 	}
  
// 	var param_view = this.patcher.getnamed("param_view");
// 	var param_menu = this.patcher.getnamed("parameter_selection");
// 	var module_menu = this.patcher.getnamed("module_selection");
  
// 	var scroller = this.patcher.getnamed("scroller");
  
// 	var moduleIndex = module_menu.getvalueof();
// 	var paramIndex = param_menu.getvalueof();
  
// 	// Check if moduleIndex exists in the data object
// 	if (data.hasOwnProperty(moduleIndex)) {
// 	  // Check if paramIndex exists within the module
// 	  if (data[moduleIndex].hasOwnProperty(paramIndex)) {
// 		var val = data[moduleIndex][paramIndex];
// 		param_view.set(val);
// 		param_view.message("bang");
// 	  }
// 	}
//   }

// function reset_to_default()
// {
	
// }

// function device_changed()
// {
// 	return !(data["ID"] && (data["ID"]["instance"]!=null) && data["ID"]["instance"] == last_device_number )
		
// }

// function load_saved_selection()
// {
// 	this.patcher.getnamed("load_saved").message("bang")	
// }

inlets = 1;  // One inlet for JSON input
outlets = 1;

var ranges = null;
var currentState = {
    data: {}, // Holds the full data object
    currentModule: null // Tracks the currently selected module
};

// Parse `sensorRanges.json`
function parse_ranges() {
    var memstr = "";
    var maxchars = 800;
    var f = new File("sensorRanges.json", "read");
    f.open();
    if (f.isopen) {
        while (f.position < f.eof) {
            memstr += f.readstring(maxchars);
        }
        f.close();
        ranges = JSON.parse(memstr);
        post("Ranges successfully loaded.\n");
    } else {
        post("Error Reading Default Ranges\n");
    }
}

// Process JSON input
function json(j) {
    currentState.data = JSON.parse(j); // Update the global data

    update_UI_module_menu();
    update_UI_parameter_menu();

    outlet(0, "bang");
}

// Update the module menu UI
function update_UI_module_menu() {
    var module_menu = this.patcher.getnamed("module_selection");
    module_menu.message("pattrmode", 1);
    module_menu.clear();

    // Populate menu with module names (keys from data), sorted alphabetically
    var keys = Object.keys(currentState.data).sort(); // Sort keys alphabetically
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== "ID") { // Exclude the "ID" key
            //post("Adding module: " + key + "\n");
            module_menu.append(key);
        }
    }

    // Reset current module when the menu is updated
    currentState.currentModule = null;
}

// Update the parameter menu UI
function update_UI_parameter_menu() {
    var param_menu = this.patcher.getnamed("parameter_selection");
    var module_menu = this.patcher.getnamed("module_selection");

    param_menu.message("pattrmode", 1);
    module_menu.message("pattrmode", 1);

    var selectedModule = module_menu.getvalueof();

    // Update parameters only if the module has changed
    if (currentState.currentModule !== selectedModule) {
        currentState.currentModule = selectedModule;
        //post("Module switched to: " + selectedModule + "\n");

        param_menu.clear();

        // Check if the selected module exists in the data
        if (currentState.data[String(selectedModule)] && Array.isArray(currentState.data[selectedModule])) {
            var params = currentState.data[selectedModule]; // Get the array of parameters
            for (var i = 0; i < params.length; i++) {
                //post("Adding parameter: " + params[i] + "\n");
                param_menu.append(params[i]);
            }
        } else {
            post("No parameters found for module: " + selectedModule + "\n");
        }
    }
}

// Update the parameter value in the UI
function update_UI_parameter_value() {
    var param_view = this.patcher.getnamed("param_view");
    var param_menu = this.patcher.getnamed("parameter_selection");
    var module_menu = this.patcher.getnamed("module_selection");

    var selectedModule = module_menu.getvalueof();
    var selectedParam = param_menu.getvalueof();

    if (currentState.data[String(selectedModule)]) {
        // Check if selectedParam exists in the array
        var params = currentState.data[selectedModule];
        if (params.indexOf(String(selectedParam)) !== -1) { // Use indexOf for compatibility
            var val = selectedParam; // Since the input data has no specific values, just display the parameter name
            param_view.set(val);
            param_view.message("bang");
        } else {
            post("Invalid parameter selected: " + selectedParam + "\n");
        }
    } else {
        post("Invalid module selected: " + selectedModule + "\n");
        post("data is: " + JSON.stringify(currentState.data) + "\n");
    }
}