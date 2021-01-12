import { createApp } from 'vue';
import App from './src/App.vue';


let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
	let currentScrollPos = window.pageYOffset;
  	if (prevScrollpos > currentScrollPos) {
    	document.getElementById("searchBar").style.top = "0";
  	} else {
    	document.getElementById("searchBar").style.top = "-100px";
  	}
	prevScrollpos = currentScrollPos;

	// UpButton
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		console.log("block");
		document.getElementById("upButton").style.display = "block";
	} else {
		console.log("None");
		document.getElementById("upButton").style.display = "none";
	}
}


const app = createApp(App);

// const app = Vue.createApp({
// 	data(){
// 		return {
// 			product: "Socks"
// 		}
// 	}
// });
const mountedApp = app.mount("#app");
