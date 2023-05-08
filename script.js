const numNodes = document.getElementById("num-nodes");
const percentageText = document.getElementById("percent-chance");
let currentPercentage = 75;

function generateNodes(line, num) {
    deleteNodes(line);
    for (let i = 0; i < num; i++) {
        const node = document.createElement("input");
        node.type = "checkbox";
        node.style.pointerEvents = "none";
        line.appendChild(node);
    }
}

function deleteNodes(line) {
    const checkboxes = line.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
        checkbox.remove();
    });
}

function setPercentage(percentage) {
    currentPercentage = Math.min(Math.max(percentage, 25), 75);
    percentageText.value = "" + currentPercentage + "%";
}

function init() {
    setPercentage(75);
    createLinesWithNodes(numNodes.value);
    numNodes.addEventListener("change", () => {
        checkedIndex = -1;
        setPercentage(75);
        createLinesWithNodes(numNodes.value);
    });
}

function createLinesWithNodes(numNodes) {
    for (let i = 1; i <= 3; i++) {
        const line = document.getElementById("line" + i);
        line.innerHTML = "";
        generateNodes(line, numNodes);
        createTryButton(line);
    }
}

function createTryButton(line) {
    const tryButton = document.createElement("button");
    tryButton.className = "try-button";
    tryButton.textContent = "Try";
    line.appendChild(tryButton);
    let tryCount = 0;
    let checkedIndex = -1;

    tryButton.addEventListener("click", () => {
        const checkboxes = line.querySelectorAll("input[type=checkbox]");
        const numCheckboxes = checkboxes.length;
        const maxReached = Array.from(checkboxes).every(checkbox => checkbox.checked);

        if (!maxReached && numCheckboxes > 0) {
            tryCount++;
            checkedIndex = (checkedIndex + 1) % numCheckboxes;
            const checkbox = checkboxes[checkedIndex];
            const random = Math.floor(Math.random() * 100);

            if (random < currentPercentage) {
                checkbox.checked = true;
                checkbox.classList.add("success");
                setPercentage(currentPercentage - 10);
            } else {
                checkbox.checked = true;
                checkbox.classList.add("fail");
                setPercentage(currentPercentage + 10);
            }
        }
    });
}

numNodes.addEventListener("change", init);
window.addEventListener("load", init);