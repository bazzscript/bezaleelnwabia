// One-time script to extract text from resume PDF
// Run: node scripts/extract-resume-text.js

const fs = require('fs');
const path = require('path');

async function extractResumeText() {
  try {
    // Try pdfjs-dist first
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
    const resumePath = path.join(__dirname, '..', 'public', 'resume.pdf');
    
    if (!fs.existsSync(resumePath)) {
      console.error('Resume PDF not found at:', resumePath);
      process.exit(1);
    }
    
    const dataBuffer = fs.readFileSync(resumePath);
    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdfDocument = await loadingTask.promise;
    
    let fullText = '';
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    // Save to a JSON file
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'resume-text.json');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify({ text: fullText.trim() }, null, 2));
    console.log('✅ Resume text extracted successfully!');
    console.log(`📄 Saved to: ${outputPath}`);
    console.log(`📊 Text length: ${fullText.trim().length} characters`);
    
  } catch (error) {
    console.error('❌ Error extracting resume text:', error);
    console.log('\n💡 Alternative: Manually copy your resume text and save it to src/data/resume-text.json');
    console.log('   Format: { "text": "your resume text here" }');
    process.exit(1);
  }
}

extractResumeText();

