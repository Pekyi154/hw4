/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');

    element.addEventListener('click', function () {
        walk();

    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });
    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}


function remove() {
    document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);/* dom.js */


function walk() {
    let el;

    el = document.getElementById('p1');
    showNode(el);

    el = el.firstChild;
    showNode(el);

    el = el.nextSibling;
    showNode(el);

    el = el.lastChild;
    showNode(el);

    el = el.parentNode.parentNode.parentNode;
    showNode(el);

    el = el.querySelector('section > *');
    showNode(el);


}

document.querySelector("#advancedWalkBtn").addEventListener('click', () => {
    document.querySelector("#my-textarea").value = "";
    advanceWalk(document.querySelector("html"));
});

function advanceWalk(element, indentation = 0) {
    const indent = "|---".repeat(indentation)
    console.log(indent + element.tagName);

    document.querySelector("#my-textarea").value += (indent + element.tagName.toLowerCase() + "\n");

    const childNodes = element.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            advanceWalk(childNode, indentation + 1);
        }
    }
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    document.querySelector("#my-textarea").value += (`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`) + "\n";
}


function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}


function cloneP1Tag() {
    let temp = document.querySelector("#p1");
    let clon1 = temp.cloneNode(true);
    document.body.appendChild(clon1);

}

document.querySelector("#cloneBtn").addEventListener("click", () => {
    cloneP1Tag();
});

let countCard = 1;

function cloneTemplateCard() {
    let temp = document.querySelector("template");
    let clon = temp.content.cloneNode(true);
    clon.querySelector(".card-title").innerHTML += " " + countCard;
    document.body.appendChild(clon);
    countCard++;
}

document.querySelector("#advancedCloneBtn").addEventListener('click', () => {
    cloneTemplateCard();
});
//This function modify change the text in the h1 tag to DOM manipulation is fun!
document.querySelector("#advancedModifyBtn").addEventListener('click', () => {
    const h1tag = document.querySelector("h1");
    h1tag.innerHTML = "DOM manipulation is fun!";
    const randomNum = Math.floor((Math.random() * 6) + 1);
    h1tag.style.color = `var(--darkcolor${randomNum})`;
    document.querySelector("#p1").classList.toggle("shmancy");
});

document.querySelector("#addBtn").onclick = () => {
    const create = document.createElement("p");
    const node = document.createTextNode(`New ${document.querySelector("#menu").value} on ${new Date().toLocaleString()}`);
    create.appendChild(node);
    document.body.appendChild(create);
    const arrayColor = ["red", "blue", "yellow", "green", "black", "cyan"]
    create.style.border = `1px ${arrayColor[Math.floor((Math.random() * 6))]} solid`;
    create.classList.add("newElementStyle");
}
document.querySelector("#deleteBySelectorBtn").addEventListener("click", () => {
    const selector = document.querySelector("#cssSelector").value;
    const allMatchElements = document.querySelectorAll(selector);
    if (allMatchElements === null || allMatchElements === undefined || allMatchElements.length === 0) {
        alert("This css selector does not exist in the dom");
    } else {
        for (let j = 0; j < allMatchElements.length; j++) {
            allMatchElements[j].remove();
        }
    }
});
document.querySelector("#safeDeleteBtn").addEventListener('click', () => {
    deleteAllExceptSections();

});

function deleteAllExceptSections() {
    // Get all elements in the DOM
    const allElements = document.body.children;
    for (let elem = 0; elem < allElements.length; elem++) {

        const isSectionElement = allElements[elem].tagName.toLowerCase() === "section";

        if (!isSectionElement) {
            allElements[elem].remove();
        }
    }
}

// Call the function to delete unwanted elements


function safeDeleteAll(element) {  //This method apply safe delete,
    // it delets all the elements in the dom exception the section element and its children and grandchildren
    if (element.tagName === 'SECTION') {
        const children = element.childNodes;
        children.forEach((child) => {
            if (child.nodeType === 1) {
                safeDeleteAll(child);
            } else {
                element.remove();
            }
        })
    }
}

window.addEventListener('DOMContentLoaded', init);