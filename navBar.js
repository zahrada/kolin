var li_items = document.querySelectorAll(".sidebar ul li");
var modelViewer = document.querySelector(".main_container");
var wrapper = document.querySelector(".wrapper");


li_items.forEach((li_item)=>{
	li_item.addEventListener("mouseenter", ()=>{
		if(wrapper.classList.contains("click_collapse")){
			return;
		}
		else{
			li_item.closest(".wrapper").classList.remove("hover_collapse");
		}
	})
})

window.back = () => {
  var li_items = document.querySelectorAll(".sidebar ul li");
  li_items.forEach((li_item)=>{
		li_item.closest(".wrapper").classList.add("hover_collapse");
  })
};

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    })
    
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    
    const mainWindow = document.querySelector('.main_container');
    mainWindow.classList.remove("hover_collapse");
  })
  
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    const modal = button.closest('.modal');
    const modalBody = button.closest('.popis');
    
    var li_items = document.querySelectorAll(".sidebar ul li");
    
    if (modal.classList.contains('hide')) {
          openModal(modal);
          openModal(modalBody);
      
      li_items.forEach((li_item)=>{
			  li_item.closest(".wrapper").classList.remove("hover_collapse");
      }) 
    }
    
    else{
      hideModal(modal);
      hideModal(modalBody);
      
      li_items.forEach((li_item)=>{
			  li_item.closest(".wrapper").classList.add("hover_collapse");
      }) 
    }
  
  })
})

window.backToTown = (element) => {
  
  const modal = document.querySelector('.modal.active');
  closeModal(modal);
  
  var li_items = document.querySelectorAll(".sidebar ul li");
  li_items.forEach((li_item)=>{
		li_item.closest(".wrapper").classList.add("hover_collapse");
  })
  
  const modelViewer = document.querySelector('#model_main');
  const cameraOrbit = modelViewer.getCameraOrbit();
  const cameraTarget = modelViewer.getCameraTarget();
  modelViewer.cameraTarget = `${cameraTarget.x}m ${cameraTarget.y}m ${cameraTarget.z}m`;
  modelViewer.cameraOrbit = `${cameraOrbit.theta}rad ${cameraOrbit.phi}rad ${cameraOrbit.radius}m`;
};

function openModal(modal) {
  if (modal == null) return
  modal.classList.remove('hide')
  modal.classList.add('active')
};

function hideModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  modal.classList.add('hide')
};

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
};

window.zoomCamera = (element, element1, text, target, zoom) => {
  const modelViewer = document.querySelector('#model_main');
  modelViewer.cameraTarget=target;
  modelViewer.cameraOrbit=zoom;
  
  const icons = document.querySelectorAll(".icon");
  icons.forEach((element) => {element.classList.remove("selected");});
  
  const button = document.querySelector(`#${element1}`);
  button.classList.add("selected");
  
  const textHide = document.querySelectorAll(".popis");
  textHide.forEach((element) => {element.classList.remove("selected");});
  
  const textDisplay = document.querySelector(`#${text}`);
  textDisplay.classList.add("selected");
};

window.switchSrc = (element, modelviewer, name) => {
  const modelViewer = document.querySelector(modelviewer);
  const cameraOrbit = modelViewer.getCameraOrbit();
  const cameraTarget = modelViewer.getCameraTarget();
  modelViewer.src = name;
  modelViewer.cameraTarget = `${cameraTarget.x}m ${cameraTarget.y}m ${cameraTarget.z}m`;
  modelViewer.cameraOrbit = `${cameraOrbit.theta}rad ${cameraOrbit.phi}rad ${cameraOrbit.radius}m`;
  modelViewer.poster = 'https://cdn.glitch.com/656ce103-95c6-4bb9-b176-297d9e2dc19d%2Flogo_kolin.jpg?v=1630933674363';
  const icons= document.querySelectorAll(".icon1");
  icons.forEach((element) => {element.classList.remove("selected");});
  element.classList.add("selected");
};

window.switchModel = (element, modelviewer, target, zoom, name) => {
  const modelViewer = document.querySelector(modelviewer);
  modelViewer.src = name;
  modelViewer.cameraTarget = target;
  modelViewer.cameraOrbit = zoom;
  modelViewer.poster = 'https://cdn.glitch.com/656ce103-95c6-4bb9-b176-297d9e2dc19d%2Flogo_kolin.jpg?v=1630933674363';
};

function changePivotpoint(event) {
  var oX = event.offsetX;
  var oY = event.offsetY;
  var model = document.querySelector('#model_main');
  var posandnormal = model.positionAndNormalFromPoint(oX,oY);
  if (posandnormal != null) {
	  var position = posandnormal.position
	  //var normal = posandnormal.normal;
	  var cameraTarget = position.x + "m " + position.y + "m " + position.z + "m";
	  model.cameraTarget = cameraTarget;
  }
  else
  {
	  model.cameraTarget = cameraTarget;
  }
}