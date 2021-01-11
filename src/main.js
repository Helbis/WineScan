import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'

//Get the button
// const mybutton = document.getElementById("upButton");

let prevScrollpos = window.pageYOffset;
// const searchBar = document.getElementById("searchBar");
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
		document.getElementById("upButton").style.display = "block";
	} else {
		document.getElementById("upButton").style.display = "none";
	}
}


createApp(App).mount('#app')
