var fillet = document.getElementsByClassName('fillet-left');
	for (let i = 0; i < fillet.length; i++) {
		var odiv = document.createElement('div');
		odiv.className = 'fillet-right';
		fillet[i].appendChild(odiv);
	}