const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const convertBtn = document.getElementById('convertBtn');

let images = [];

imageInput.addEventListener('change', handleFiles);

function handleFiles(event) {
  preview.innerHTML = '';
  images = Array.from(event.target.files);

  images.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

convertBtn.addEventListener('click', async () => {
  if (images.length === 0) {
    alert("Please upload at least one image.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < images.length; i++) {
    const imgData = await toDataURL(images[i]);
    const image = new Image();
    image.src = imgData;

    await new Promise(resolve => {
      image.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (image.height * imgWidth) / image.width;

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        resolve();
      };
    });
  }

  pdf.save('converted.pdf');
});

function toDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
