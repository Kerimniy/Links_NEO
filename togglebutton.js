function ToggleButton(id){
				let tb = document.getElementById(id);
				if (tb.dataset.st === undefined) {tb.dataset.st = "0"}			
				let checked = Boolean(Number(tb.dataset.st));
				let parent = tb.parentElement
				if (checked===false){
					gsap.to(tb, { x: parent.offsetWidth-tb.offsetWidth, duration: 0.25 });
				}
				else{
					gsap.to(tb, { x: -tb.offsetWidth*0, duration: 0.25 });
				}
				tb.dataset.st = Number(!checked);
			}