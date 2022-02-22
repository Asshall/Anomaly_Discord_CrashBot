const sysHeader = "--------[ Your system specifications ]--------"
const headers = {
  systemDetails : {
	CPU: "CPU",
	GPU: "GPU",
	Build: "Build",
	Dx: "Dx version"
  },
  Fatal: "Fatal error",
  LUAStack: "Lua fatal traceback",
  Traceback: "Lua non fatal tracebacks",
  LUAError: "Lua errors",
  EngineError: "Engine errors",
  ModelError: "Model errors",
  Script: "Non-eft-vanilla loaded scripts",
  Warning: "Warnings",
}
function decorateTrace(trace){
  if (!Array.isArray(trace)) {return trace}
  let ret = []
  for (let i=0; i < trace.length; i++ ){
	let dec = '├'
	if (i+1 == trace.length) {dec = '└'}

	ret[i] = `${dec}─ ` + trace[i]

  }
  return ret.join('\n')
}

function vanillaPaste(data){
  let beautifiedOutput = "Summary of your crash:\n\n";
  function traverse(k) {
	if(k === "systemDetails") {
	  beautifiedOutput += sysHeader + '\n'
	  for (let i of Object.keys(headers[k])){
		beautifiedOutput += `${i}\t: ${data[i].trim()}\n`
	  }
	  beautifiedOutput += "-".repeat(sysHeader.length) + '\n'
	} else {
	  let content = data[k]
	  if (content !== undefined){

		beautifiedOutput += headers[k] + ":\n";
		if (["Traceback", "LUAStack"].includes(k) && content.length > 0) {
		  for (let i = content.length-1; i >= 0; i--){
		  beautifiedOutput += "Traceback line : " + content[i].line + '\n'
			beautifiedOutput += decorateTrace(content[i].value) + "\n\n"
		  }
		} else if (Array.isArray(content)){
		  beautifiedOutput += content.map(x => x.value).join('\n') + "\n\n";
		} else {
			beautifiedOutput += content.value + "\n\n";
		}
	  }
	}
  }

  Object.keys(headers).forEach(traverse)
  return beautifiedOutput
}

module.exports = { vanillaPaste, decorateTrace }
