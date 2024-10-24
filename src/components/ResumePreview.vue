<template>
    <div class="resume-preview">
      <iframe id="preview-frame" type="text/html" width="100%" height="500px"></iframe>
      <button @click="downloadPdf" class="download-button">Download PDF</button>
    </div>
  </template>
  
  <script>
  import { jsPDF } from "jspdf";
  import DOMPurify from "dompurify";

  export default {
    name: 'ResumePreview',
    props: ['selectedItems'],
    watch: {
      selectedItems: {
        handler: 'updateFrameContent',
        deep: true
      }
    },
    methods: {
      updateFrameContent() {
        const frame = document.getElementById('preview-frame');
        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write('<html><body>');

        for (const section in this.selectedItems) {
          if (this.selectedItems[section].length > 0) {
            doc.write(`<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><ul>`);
            this.selectedItems[section].forEach(item => {
              doc.write(`<li>${item}</li>`);
            });
            doc.write('</ul>');
          }
        }

        doc.write('</body></html>');
        doc.close();
      },
      downloadPdf() {
        const pdf = new jsPDF();

        const frame = document.getElementById('preview-frame');
        const doc = frame.contentDocument || frame.contentWindow.document;
        const htmlContent = doc.body.innerHTML;

        // Use DOMPurify to sanitize the HTML content before converting to PDF
        const cleanHtml = DOMPurify.sanitize(htmlContent);

        pdf.html(cleanHtml, {
          callback: function (pdf) {
            pdf.save('resume.pdf');
          },
          x: 10,
          y: 10
        });
      }
    }
  };
</script>
  
  <style scoped>
  .resume-preview {
    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-left: 20px;
    width: 400px;
    overflow: hidden;
  }
  
  .download-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #0b547c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .download-button:hover {
    background-color: #084565;
  }
  </style>  