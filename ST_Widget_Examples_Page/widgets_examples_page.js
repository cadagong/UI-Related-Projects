
function scroll_to_details(demo) {
    let demoId = demo.getAttribute('id');
    let demoDetails = document.getElementById(`${demoId}-detailed`);
    demoDetails.scrollIntoView({behavior: 'smooth'});
}