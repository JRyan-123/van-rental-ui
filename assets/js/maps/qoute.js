export async function qoute() {
	const form = document.getElementById('qouteForm');
	const days = document.getElementById('days');
	const pdays = document.getElementById('p-days');
	const hours = document.getElementById('hours');
	const phours = document.getElementById('p-hours');
	const service = document.getElementById('serviceType');
	const notify = document.getElementById('notify');


	// disable duration
	service.addEventListener('change', () => {
		pdays.classList.toggle('clr-sltblack')
		phours.classList.toggle('clr-sltblack')
		notify.classList.toggle('clr-red')
		if (service.value === 'cargo') {
			days.disabled = true;
			
			hours.disabled = true;
			notify.innerHTML = "No need to set duration";
			
		}
		else{
			days.disabled = false;
			hours.disabled = false;
			notify.innerHTML = "Duration";
		}
	})
	

	
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const distance = document.getElementById('distanceDisplay');
		
		const h = Number(hours.value);
		const d = Number(days.value);
		const km = Number(distance.value);

		if (service.value === 'shuttle') shuttle(d, h, km);
		else if (service.value === 'cargo') cargo(km);
		
		
	});
}
function cargo(km){
		let total; 
		total = 700 + (km * 40);
		const duration = "";
		sweetAlert(total, km, duration);
		// console.log(total);		
}
function shuttle(d, h, km){
	
		let L300, driver, gasToll, longDriveFee = 0, durationPenalty = 0, discount = 0, subtotal, total; 
	
		L300 = d * 3500 ;
		driver = d * 1000 ;
		gasToll = Math.ceil(km/25) * 500;

		if (h === 6) {
		    durationPenalty = (d === 0) ? 1250  : 875;
		    driver += (d === 0) ? 500 : 375 ;
		} else if (h === 12) {
		    durationPenalty = (d === 0) ? 2250 : 1750;
		    driver += (d === 0) ? 750 : 500 ;
		} else if (h === 18) {
		    durationPenalty = (d === 0) ? 3000 : 2625;
		    driver += (d === 0) ? 1000 : 625 ;
		}

		if (km > 80) {
			longDriveFee = (km-80)* 10;
		}
		if (km > 140) {
			longDriveFee += (km-140)* 5;
		}
		if (km > 200) {
	    	longDriveFee += (km-200) * 5;
	  	}

	  	

	  	if (days > 4) discount = subtotal * .1;
		subtotal = L300 + driver + gasToll + durationPenalty + longDriveFee;
		total = subtotal - discount;
		const duration = `<p class="mb-2">and duration of : ${d} days and ${h} hours</p>`;
		sweetAlert(total, km, duration);
		// console.log(total);
		// console.log(km, "+ ", L300 ,"+", driver ,"+", gasToll ,"+", durationPenalty  ,"+", longDriveFee ," +", discount);
}

function sweetAlert(total, km, duration){

	const messengerUrl = 'https://m.me/TriarRental';
	Swal.fire({

  html: `
  <div class="d-flex align-items-center justify-content-center mb-4">
      <img src="./assets/imgs/logo.png" class="me-2 rounded-circle" alt="Icon" style="height:50px; width:50px">
      <span class="fw-bold">Triar Rental</span> 

    </div>
    <div class="">
    <p class="mb-0">Estimated distance of : ${km} km</p>
  			${duration}
  		<p class="mb-0">Total :<b >₱ ${total}</b></p>
  	</div>
  `,	
 showCancelButton: true,
    confirmButtonText: '<i class="bi bi-messenger"></i> Connect with messenger',
    cancelButtonText: '<i class="bi bi-arrow-repeat"></i> Retry again',
    customClass: {
      confirmButton: 'btn btn-primary mx-3',
      cancelButton: 'btn btn-warning mx-3'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(messengerUrl, '_blank', 'noopener', 'noreferrer');
    }
  });

}
