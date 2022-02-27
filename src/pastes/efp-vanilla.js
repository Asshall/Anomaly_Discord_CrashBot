const nconf = require("nconf")
const sysHeader = nconf.get("sysHeader")
const headers = nconf.get("pasteHeaders")

function decorateTrace(trace){
  if (!Array.isArray(trace)) return trace;
  let ret = []
  for (let i=0; i < trace.length; i++ ){
	const dec = i+1 == trace.length ? '└' : '├'
	ret[i] = `${dec}─ ${trace[i] }`

  }
  return ret.join('\n')
}

function vanillaPaste(data){
  let beautifiedOutput = "Summary of your crash:\n\n";
  for (let k of Object.keys(headers)) {
	if(k === "systemDetails") {
	  beautifiedOutput += sysHeader + '\n'
	  for (let i of Object.keys(headers[k])){
		beautifiedOutput += `${i}\t: ${data[i].trim()}\n`;
	  }
	  beautifiedOutput += "-".repeat(sysHeader.length) + '\n';
	} else {
	  const content = data[k]
	  if(!content) continue
	  beautifiedOutput += headers[k] + ":\n";
	  if (["Traceback", "LUAStack"].includes(k) && content.length) {
		for (let i = content.length-1; i >= 0; i--){
		beautifiedOutput += `Traceback line : ${content[i].line}\n`;
		  beautifiedOutput += decorateTrace(content[i].value) + "\n\n";
		}
	  } else if (Array.isArray(content)){
		beautifiedOutput += content.map(x => x.value).join('\n') + "\n\n";
	  } else {
		  beautifiedOutput += content.value + "\n\n";
	  }
	}
  }

  return beautifiedOutput
}

module.exports = { vanillaPaste, decorateTrace }
