/* eslint-env browser, jquery */
/* global MCD openModal closeModal */

function saveProject(project, redirect) {
	if (!project.editable) {
		window.location.href = redirect;
	} else {
		$.ajax({
			type: 'POST',
			url: `/api/projects/${project.id}`,
			contentType: 'application/json',
			data: JSON.stringify(project),
			dataType: 'json',
			success: () => {
				window.location.href = redirect;
			},
		});
	}
}

function loginModal(modal, callback) {
	modal.title.innerHTML = 'Sauvegarder votre projet démarré';
	modal.content.textContent = 'Pour sauvegarder votre projet et le retrouver dans la rubrique “Mon espace projet”, connectez-vous avec votre compte Leroy Merlin ou créer un compte';
	modal.cancel.textContent = 'Annuler';
	modal.submit.textContent = 'Continuer';
	modal.submit.onclick = (event) => {
		MCD.LMConnect.authenticate().then(() => {
			closeModal(event);
			return callback();
		});
	};
	openModal(null, modal.container);
}

function saveProjectLogged(project, modal) {
	MCD.LMConnect.isLogged().then((isLogged) => {
		if (isLogged) {
			saveProject(project, '/mon-espace-projet');
		} else {
			loginModal(modal, () => {
				saveProject(project, '/mon-espace-projet');
			});
		}
	});
}
