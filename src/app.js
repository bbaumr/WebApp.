document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const fileList = document.getElementById('fileList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput').files[0];

        if (fileInput) {
            const formData = new FormData();
            formData.append('file', fileInput);

            try {
                const response = await fetch('/api/uploadFile', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    loadFiles();
                } else {
                    console.error('Fehler beim Hochladen der Datei');
                }
            } catch (error) {
                console.error('Fehler beim Hochladen der Datei', error);
            }
        }
    });

    async function loadFiles() {
        try {
            const response = await fetch('/api/getFiles');
            const files = await response.json();

            fileList.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = `/api/downloadFile/${file.id}`;
                link.textContent = file.filename;
                li.appendChild(link);
                fileList.appendChild(li);
            });
        } catch (error) {
            console.error('Fehler beim Laden der Dateien', error);
        }
    }

    loadFiles();
});
