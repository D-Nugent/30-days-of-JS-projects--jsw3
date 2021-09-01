let storyPage = 0;

const toggleStoryButtons = () => {
  let backBtn = storyBtns[0];
  let forwardBtn = storyBtns[1];
  let startBattleBtn = document.querySelector('.story__desc-start');
  storyPage === 0 ? backBtn.classList.add('story__control--inactive'):backBtn.classList.remove('story__control--inactive')
  storyPage === 3 ? forwardBtn.classList.add('story__control--inactive'):forwardBtn.classList.remove('story__control--inactive')
  storyPage === 3 ? startBattleBtn.classList.remove('primary-btn--inactive'):startBattleBtn.classList.add('primary-btn--inactive')
}

const loadStoryData = (page) => {
  storyContainer.innerHTML = storyDetails[page].description;
}

const changeStoryPage = ({target}) => {
  const direction = target.dataset.direction;
  direction==='forwards'? storyPage +=1: storyPage -= 1;
  toggleStoryButtons();
  loadStoryData(storyPage);
}

const storyContainer = document.querySelector('.story__desc-text')
const storyBtns = document.querySelectorAll('.story__control');
storyBtns.forEach(btn => btn.addEventListener('click',(e)=>changeStoryPage(e)));
loadStoryData(storyPage);