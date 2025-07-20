isAnimated = false;
		let intervalId;
		let isPaused = false;
		let imagesPack1 = [document.getElementById("img0"),document.getElementById("img1")];
		let imagesPack2 = [document.getElementById("img2"),document.getElementById("img3")];
		let pathsPack1 = ["static/images/kha-app.webp","static/images/bindm.webp","static/images/bindp.webp","static/images/git-links.webp","static/images/kha-331.webp"];
		let pathsPack2 = ["static/images/npps0.webp","static/images/npps1.webp","static/images/npps2.webp","static/images/tss0.webp","static/images/tss1.webp"];
		let radioButtonsPack1 = document.getElementsByName("s1");	
		let radioButtonsPack2 = document.getElementsByName("s2");	
		
		function updatePanelPosition() {
			  const kvadWidth = document.querySelector(".menuDiv").offsetWidth;
			  if (isAnimated) {
				gsap.to("#menu", { x: kvadWidth * 1, duration: 0 });
			  } else {
				gsap.to("#menu", { x: 0, duration: 0 }); 
			  }
			}
		
		function dvizh2(){
		
			isAnimated = !isAnimated;
			if (isAnimated==true){
				gsap.to("#menu", { x: document.querySelector(".menuDiv").offsetWidth * 1.00, duration: 0.5 });
				gsap.to("#arrow", { rotation: 180, duration: 0.4 })

			}
			else{
				gsap.to("#menu", { x: 0, duration: 0.5 });
				gsap.to("#arrow", { rotation: 0, duration: 0.4 })

			}
		}
		
		function pauseInterval() {
			if (!isPaused) {
				isPaused = true;
				clearInterval(intervalId); 
				setTimeout(() => {
					intervalId = setInterval(() => NextSlide(), 7000); 
					isPaused = false;
				}, 5000);
			}
		}
		
		document.addEventListener('keydown', (e) => changeImg('-',imagesPack1,pathsPack1,radioButtonsPack1));  

		function changeImg(_type,images,paths,radioButtons){
			
			if (images[0].dataset.switchNum === undefined) {images[0].dataset.switchNum = "0"}
			if (images[0].dataset.imageNum === undefined) {images[0].dataset.imageNum = "0"}
			
			let imageNum = Number(images[0].dataset.imageNum);
			let switchNum = Number(images[0].dataset.switchNum);
			
			if (_type == "+"){ switchNum +=1; imageNum +=1;} else{ switchNum +=1; imageNum -=1;}
			
			if ((imageNum)>4){imageNum=0;}else if (imageNum<0){imageNum=4;}
					
			if (switchNum>1){switchNum=0;}		
			try{
				if (_type == "+" || _type == "-"){radioButtons[Math.abs(imageNum)].checked = true; images[Math.round(Math.abs(images[0].style.opacity))].src = paths[Math.abs(imageNum)]; }
				else{images[Math.round(Math.abs(images[0].style.opacity))].src = paths[Number(_type)]; imageNum = Number(_type);}
			
			}	
			catch(error){
				
			}

			gsap.to(images[0], { opacity:Math.round(Math.abs(images[0].style.opacity-1)), duration: 0.75 });
			gsap.to(images[1], { opacity: Math.round(Math.abs(images[1].style.opacity-1)), duration: 0.75 });	
			
			images[0].dataset.imageNum = String(imageNum);
			images[0].dataset.switchNum = String(switchNum);

			
		}
			
		function Start(){
		

			intervalId = setInterval(() => NextSlide() , 7000);
			imagesPack1 = [document.getElementById("img0"),document.getElementById("img1")];
			pathsPack1 = ["static/images/kha-app.webp","static/images/bindm.webp","static/images/bindp.webp","static/images/git-links.webp","static/images/kha-331.webp"];
			radioButtonsPack1 = document.getElementsByName("s1");	
			
		}
		
		function NextSlide(){
			setTimeout(()=> changeImg("+",imagesPack2,pathsPack2,radioButtonsPack2),500);			
			changeImg("+",imagesPack1,pathsPack1,radioButtonsPack1)
		}

		function smoothscroll(id) {
			formaSend = document.getElementById(id);
    		formaSend.scrollIntoView({ behavior: 'smooth' });
		}
		
		function inDev(){
			alert( "Не доступно на данный момент" );
		}

		window.addEventListener("resize", updatePanelPosition);