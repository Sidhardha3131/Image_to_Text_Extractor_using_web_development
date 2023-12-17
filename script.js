function displayImage() {
    const input = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    if (!input.files || input.files.length === 0) {
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
        imagePreview.innerHTML = '';
        imagePreview.appendChild(image);
    };

    reader.readAsDataURL(file);
}

function extractText() {
    const input = document.getElementById('imageInput');
    const outputTextArea = document.getElementById('outputTextArea');

    if (!input.files || input.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/extract', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        outputTextArea.value = data.text;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
