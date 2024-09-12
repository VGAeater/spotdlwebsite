for (let i = 0; i < 100; i++) {
	let size = 1/(Math.random()*3+0.1);
	document.getElementById("stars").innerHTML += "<div class='star' style='animation: " + (Math.random()*10+5) + "s linear " + (Math.random()*10) + "s flicker infinite; width: " + size + "vmin; height: " + size + "vmin; top: " + Math.random()*100 + "vh; left: " + Math.random()*100 + "vw;'></div>";
}

const area = document.getElementById("area");

async function send() {
	area.innerHTML = "";
	document.getElementById("input").classList.add("big");

	fetch("add/" + document.getElementById("box").value)
	.then(async response => {
		const reader = response.body.getReader();

		while (true) {
    			let { value, done } = await reader.read();
			if (done) {
				area.innerHTML += "DONE!";
				return;
			}
			text = "";
			for (let i = 0; i < value.length; i++) {
				text += String.fromCharCode(value[i]);
			}
			area.innerHTML += text.replace("\n", "<br>");
		}
	});
}

