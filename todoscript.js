let notes = '';
let noteArr = [];
let i = 0;

loadNotes();
    
function creator() {
    let txt = document.getElementById('text').value;
    noteArr[i] = i + ':' + txt;
    let note = `<div class="note" id="note${i}"><button class="edit" onclick="editor('tudu${i}')" title="Edit this note">edit</button><button class="delete" onclick="eraser('note${i}')" title="Delete this note">${'&times;'}</button><span id="tudu${i}">${txt}</span></div>`;
    notes += note;
    document.getElementById('notes').innerHTML = notes;
    textAreaDefaultText();
    showElement('delBtn');
    
    i++;
    saveNotes();
}

function redistributeNo() {
    notes = '';
    for (let n = 0; n < noteArr.length; n++) {
        let subStr = noteArr[n].split(':');
        noteArr[n] = n + ':' + subStr [1];
        
        let note = `<div class="note" id="note${n}"><button class="edit" onclick="editor('tudu${n}')" title="Edit this note">edit</button><button class="delete" onclick="eraser('note${n}')" title="Delete this note">${'&times;'}</button><span id="tudu${n}">${subStr[1]}</span></div>`;
        notes += note;
        document.getElementById('notes').innerHTML = notes;
    }
}
    
function eraser(a) {
    document.getElementById(a).outerHTML = '';
    notes = document.getElementById('notes').innerHTML;
    let no = a.charAt(4);
    noteArr.splice(no, 1);
    redistributeNo();
    saveNotes();
}

function editor(t) {
    document.getElementById('text').style.backgroundColor = 'pink';
    hideElement('createBtn');
    showElement('editBtn');
    document.getElementById('text').value = document.getElementById(t).innerHTML;
    document.addEventListener("keydown", function(k) {
        if (k.which === 27) {
            textAreaDefaultColor();
            textAreaDefaultText();
            hideElement('editBtn');
            showElement('createBtn');
        }
    })
    document.getElementById('editBtn').onclick = overwrite;

    function overwrite() {
        document.getElementById(t).innerHTML = document.getElementById('text').value;
        notes = document.getElementById('notes').innerHTML;
        
        let no = t.charAt(4);
        noteArr[no] = no + ':' + document.getElementById('text').value;
        saveNotes();
        
        textAreaDefaultColor();
        textAreaDefaultText()
        hideElement('editBtn');
        showElement('createBtn');
    }
}
function modalDel() {
    showElement('modal');
    hideElement('editBtn');
    showElement('createBtn');
    textAreaDefaultColor();
    textAreaDefaultText();
}

function deleteAll() {
    notes = '';
    document.getElementById('notes').innerHTML = notes;
    i = 0;
    noteArr = [];
    saveNotes();
    hideElement('delBtn');
    hideElement('modal');
}

function showElement(el) {
    document.getElementById(el).style.display = 'block';
}

function hideElement(el) {
    document.getElementById(el).style.display = 'none';
}

function textAreaDefaultText() {
    document.getElementById('text').value = `Your note...? -- note${i+2}`; //i+2 to have insihgt in script workings
}

function textAreaDefaultColor() {
    document.getElementById('text').style.backgroundColor = '#c2d1f0';
}

function saveNotes() {
    noteStr = JSON.stringify(noteArr);
    localStorage.setItem('postitsArr', noteStr);
}

function loadNotes() {
    if (typeof (Storage) !== 'undefined') {
        document.getElementById('notes').innerHTML = 'Unfortunately your browser does not have the capacity to store notes for you next session';
    }
    let noteStr = localStorage.getItem('postitsArr');
    noteArr = JSON.parse(noteStr);
    if (noteArr) {
        for (let n = 0; n < noteArr.length; n++) {
            let subStr = noteArr[n].split(':');
            i = Number(subStr[0]);
            let txt = subStr[1];
            let note = `<div class="note" id="note${i}"><button class="edit" onclick="editor('tudu${i}')" title="Edit this note">edit</button><button class="delete" onclick="eraser('note${i}')" title="Delete this note">${'&times;'}</button><span id="tudu${i}">${txt}</span></div>`;
            notes += note;
            document.getElementById('notes').innerHTML = notes;
            i++;
        }
    } else {
        noteArr = [];
    }
    if (notes === null) {
        notes = '';
    }
    document.getElementById("notes").innerHTML = notes;
}

if (notes === '') {
    hideElement('delBtn');
} else {
    showElement('delBtn');
}

document.getElementsByClassName('close')[0].onclick = hideElement('modal');
window.onclick = function(k) {
    if (k.target == document.getElementById('modal')) {
        hideElement('modal');
    }
}
document.addEventListener("keydown", function(k) {
    if (k.which === 27) {
        hideElement('modal');
    }
})