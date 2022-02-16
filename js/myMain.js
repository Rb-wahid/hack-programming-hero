const milestonesData = JSON.parse(data).data;

console.log(milestonesData);

// load course milestones data

function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${
                milestone._id
              })" /></div>
              <div onclick="openMilestone(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
             ${milestone.modules
               .map((module) => {
                 return ` <div class="module border-b">
                <p>${module.name}</p>
              </div>`;
               })
               .join("")}
            </div>
          </div>`;
    })
    .join("")}`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const showPanel = document.querySelector(".show");
  const activePanel = document.querySelector(".active");

  //! first remove previous active class if any
  if (activePanel && !milestoneElement.classList.contains("active")) {
    activePanel.classList.remove("active");
  }

  // toggle current clicked one
  milestoneElement.classList.toggle("active");
  if (!currentPanel.classList.contains("show") && showPanel)
    showPanel.classList.remove("show");

  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";

  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");

milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestoneList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    milestoneList.removeChild(item);
    doneList.appendChild(item);
  } else {
    doneList.removeChild(item);
    milestoneList.appendChild(item);
  }
  const child = milestoneList.children;
  let sortedMilestoneList = [].slice.call(child).sort((a, b) => a.id - b.id);
 
    sortedMilestoneList.forEach(children => {
        milestoneList.appendChild(children);
    })
  
  
}

loadMilestones();
