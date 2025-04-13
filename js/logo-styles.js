/**
 * Logo Styling Script
 * This script finds all instances of "fertilizer.map" and applies custom styling to the "MAP" part
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to style the MAP part of "fertilizer.map"
    function styleLogoText() {
        // Find all text nodes in the body
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.includes('fertilizer.map')) {
                textNodes.push(node);
            }
        }

        // Replace each occurrence of 'fertilizer.map' with styled version
        textNodes.forEach(textNode => {
            const container = textNode.parentNode;
            
            // Skip if parent is a script, style or already processed
            if (container.tagName === 'SCRIPT' || 
                container.tagName === 'STYLE' || 
                container.classList.contains('logo-processed')) {
                return;
            }
            
            // Create a temporary div to hold the HTML
            const tempDiv = document.createElement('div');
            
            // Replace "fertilizer.map" with styled HTML - just MAP now with colored letters
            const newContent = textNode.nodeValue.replace(
                /fertilizer\.map/g, 
                '<span class="logo-text"><span class="logo-m">M</span><span class="logo-a">A</span><span class="logo-p">P</span></span>'
            );
            
            tempDiv.innerHTML = newContent;
            
            // Replace the text node with the new nodes
            while (tempDiv.firstChild) {
                container.insertBefore(tempDiv.firstChild, textNode);
            }
            
            // Remove the original text node
            container.removeChild(textNode);
            
            // Mark as processed
            container.classList.add('logo-processed');
        });
    }

    // Apply the styling
    styleLogoText();
}); 