const fs = require('fs');
const path = require('path');

describe('README.md Test Note Validation', () => {
  let readmeContent;

  beforeAll(() => {
    readmeContent = fs.readFileSync(path.resolve(__dirname, '../readme.md'), 'utf8');
  });

  test('README should contain a test note section', () => {
    expect(readmeContent).toMatch(/## Testing/i);
  });

  test('Test note should be at least 3 sentences long', () => {
    const testNoteMatch = readmeContent.match(/## Testing\n\n(.*?)(?:\n\n|$)/s);
    expect(testNoteMatch).toBeTruthy();
    
    const testNote = testNoteMatch[1];
    const sentences = testNote.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    expect(sentences.length).toBeGreaterThanOrEqual(3);
  });

  test('Test note should provide meaningful context', () => {
    expect(readmeContent).toMatch(/## Testing/i);
    
    const testNoteMatch = readmeContent.match(/## Testing\n\n(.*?)(?:\n\n|$)/s);
    const testNote = testNoteMatch[1];
    
    const hasTestingKeywords = [
      /test/i, 
      /testing/i, 
      /framework/i, 
      /coverage/i, 
      /runner/i
    ].some(keyword => keyword.test(testNote));
    
    expect(hasTestingKeywords).toBe(true);
  });
});