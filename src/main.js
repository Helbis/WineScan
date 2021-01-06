import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'


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
}


createApp(App).mount('#app')
