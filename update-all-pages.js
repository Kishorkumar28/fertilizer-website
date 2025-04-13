const fs = require('fs');
const path = require('path');

// Get all HTML files in the current directory
const htmlFiles = fs.readdirSync('.')
  .filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to update`);

// CSS and JS files we want to include on all pages
const cssIncludes = [
  '<link rel="stylesheet" href="css/colors.css">',
  '<link rel="stylesheet" href="css/animations.css">',
  '<link rel="stylesheet" href="css/responsive.css">'
];

const jsIncludes = [
  '<script src="js/modern-effects.js" defer></script>'
];

// Update each file
htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  
  // Read the file content
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if file already has our includes
  const hasAllIncludes = cssIncludes.every(include => content.includes(include)) &&
                         jsIncludes.every(include => content.includes(include));
  
  if (hasAllIncludes) {
    console.log(`  - ${file} already has all required includes.`);
    return;
  }
  
  // Find where to add CSS includes - after the last existing CSS include
  let cssPosition = content.lastIndexOf('</style>');
  if (cssPosition === -1) {
    cssPosition = content.lastIndexOf('<link rel="stylesheet"');
    if (cssPosition !== -1) {
      // Find the end of this line
      cssPosition = content.indexOf('>', cssPosition);
      if (cssPosition !== -1) cssPosition++;
    }
  }
  
  // Fallback - insert before </head>
  if (cssPosition === -1) {
    cssPosition = content.indexOf('</head>');
    if (cssPosition === -1) {
      console.log(`  - Error: Could not find </head> in ${file}`);
      return;
    }
  }
  
  // Add CSS includes
  const cssToAdd = cssIncludes
    .filter(include => !content.includes(include))
    .join('\n    ');
  
  if (cssToAdd) {
    content = content.slice(0, cssPosition) + '\n    ' + cssToAdd + content.slice(cssPosition);
    console.log(`  - Added CSS includes to ${file}`);
  }
  
  // Find where to add JS includes - after the last script tag before </head>
  let jsPosition = content.lastIndexOf('<script', content.indexOf('</head>'));
  if (jsPosition !== -1) {
    // Find the end of this script tag
    jsPosition = content.indexOf('</script>', jsPosition);
    if (jsPosition !== -1) jsPosition += 9; // Length of </script>
  } else {
    // Fallback - insert before </head>
    jsPosition = content.indexOf('</head>');
  }
  
  // Add JS includes
  const jsToAdd = jsIncludes
    .filter(include => !content.includes(include))
    .join('\n    ');
  
  if (jsToAdd) {
    content = content.slice(0, jsPosition) + '\n    ' + jsToAdd + content.slice(jsPosition);
    console.log(`  - Added JS includes to ${file}`);
  }
  
  // Update mobile menu and add animation classes to key elements
  if (!content.includes('animate-fade-in') && content.includes('mobile-menu-button')) {
    // Add animation classes to main sections
    content = content.replace(
      /<section\s+(?=.*class="[^"]*)/g, 
      '<section data-aos="fade-up" '
    );
    
    // Add animation classes to headings
    content = content.replace(
      /<h1\s+(?=.*class="[^"]*)/g, 
      '<h1 class="animate-on-scroll" data-animation="fade-in" '
    );
    
    content = content.replace(
      /<h2\s+(?=.*class="[^"]*)/g, 
      '<h2 class="animate-on-scroll" data-animation="fade-in" '
    );
    
    // Make buttons more interactive
    content = content.replace(
      /<button\s+(?=.*class="[^"]*)((?!magnetic-button)[^>]*)>/g, 
      '<button class="magnetic-button glow-on-hover $1>'
    );
    
    // Add shapes to sections with gradient backgrounds
    content = content.replace(
      /<section[^>]*bg-gradient[^>]*>/g,
      match => match.replace('>', ' class="with-shapes" data-shape-count="5">')
    );
    
    console.log(`  - Added animation classes to ${file}`);
  }
  
  // Save the updated content
  fs.writeFileSync(file, content, 'utf8');
  console.log(`  - Successfully updated ${file}`);
});

console.log('All files updated successfully!');

// Instructions for running this script
console.log('\nTo run this script:');
console.log('1. Open a terminal in your website root directory');
console.log('2. Run: node update-all-pages.js');
console.log('\nThis will add the new CSS and JS files to all your HTML pages');

// Note: You need to manually run this script. It won't execute automatically. 