import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'


let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
	let currentScrollPos = window.pageYOffset;
  	if (prevScrollpos > currentScrollPos) {
    	document.getElementById("searchBar").style.top = "0";
        // console.log("Show");

  	} else {
    	document.getElementById("searchBar").style.top = "-100px";
        // console.log("Hide");
  	}
prevScrollpos = currentScrollPos;
}


createApp(App).mount('#app')
