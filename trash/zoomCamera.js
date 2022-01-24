
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

window.zoomCamera = (element, element1, modelviewer, target, zoom) => {
  
  const modelViewer = document.querySelector(modelviewer);
  modelViewer.cameraTarget=target;
  //modelViewer.cameraOrbit=zoom;
  
  const slides = document.querySelectorAll(".sidebar");
  slides.forEach((element) => {element.classList.remove("selected");});
  element.classList.add("selected");
  
  const button = document.querySelector(`#${element1}`);
  button.classList.add("selected");
  
};

window.switchSrc = (element, modelviewer, name) => {
  const modelViewer = document.querySelector(modelviewer);
  const cameraOrbit = modelViewer.getCameraOrbit();
  const cameraTarget = modelViewer.getCameraTarget();
  modelViewer.src = name;
  modelViewer.cameraTarget = `${cameraTarget.x}m ${cameraTarget.y}m ${cameraTarget.z}m`;
  modelViewer.cameraOrbit = `${cameraOrbit.theta}rad ${cameraOrbit.phi}rad ${cameraOrbit.radius}m`;
  modelViewer.poster = 'https://cdn.glitch.com/656ce103-95c6-4bb9-b176-297d9e2dc19d%2Flogo_kolin.jpg?v=1630933674363';
  const slides = document.querySelectorAll(".slide");
  slides.forEach((element) => {element.classList.remove("selected");});
  element.classList.add("selected");
};

document.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
  // Keep slider interactions from affecting the XR scene.
  ev.preventDefault();
});

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
    
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  
}