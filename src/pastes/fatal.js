function fatalPaste(data){
	const headers = {
		//systemDetails: "Hardware",
		build: "Build version",
		fatal: "Fatal error",
		tracebacks: "Non fatal tracebacks",
		luaErrors: "Lua errors",
		errors: "Non-descript errors",
		scripts: "Loaded scripts",
		warnings: "Warnings",
	}
	var beautifiedOutput = "Summary of your crash:\n\n";
	Object.keys(headers).forEach(k => {
		var content = data[k]
		if (content.length === 0 || content === ""){ return;}

		beautifiedOutput += headers[k] + ":\n";
		if (typeof(content) == "object"){
			beautifiedOutput += content.join('') + "\n\n";
		} else {
			beautifiedOutput += content + "\n\n";
		}
	})
	return beautifiedOutput;
}

module.exports = fatalPaste
